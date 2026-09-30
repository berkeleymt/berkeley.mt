// At a Glance widget. Reads each .glance element's JSON config (page front
// matter `extra`) and draws the status, timeline, deadlines, and news.
// All dates in the config are BMT (Pacific) calendar dates; deadlines are
// 11:59 PM Pacific on that date. Times are displayed in Pacific.
(() => {
  const TZ = "America/Los_Angeles";
  const MS_DAY = 864e5;
  const dayNum = s => Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10)) / MS_DAY;
  const offFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, timeZoneName: "shortOffset" });
  const pacOffset = s => {
    const name = offFmt.formatToParts(new Date(dayNum(s) * MS_DAY + 12 * 36e5)).find(p => p.type === "timeZoneName").value;
    return Number(name.replace("GMT", "")) || 0;
  };
  const pacInstant = (date, hm = "00:00") => {
    const [h, m] = hm.split(":").map(Number);
    return new Date(Date.UTC(+date.slice(0, 4), +date.slice(5, 7) - 1, +date.slice(8, 10), h - pacOffset(date), m));
  };
  const endOf = d => new Date(pacInstant(d, "23:59").getTime() + 60e3);
  const dayFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
  const pacDay = t => { const p = Object.fromEntries(dayFmt.formatToParts(t).map(x => [x.type, x.value])); return Date.UTC(+p.year, +p.month - 1, +p.day) / MS_DAY; };
  const utcDate = s => new Date(dayNum(s) * MS_DAY);
  const short = s => utcDate(s).toLocaleDateString("en-US", { timeZone: "UTC", month: "short", day: "numeric" });
  const longDay = s => utcDate(s).toLocaleDateString("en-US", { timeZone: "UTC", weekday: "short", month: "short", day: "numeric" });
  const pacTime = t => t.toLocaleString("en-US", { timeZone: TZ, weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" });
  const dur = ms => {
    const d = Math.floor(ms / MS_DAY), h = Math.floor(ms % MS_DAY / 36e5), m = Math.floor(ms % 36e5 / 6e4);
    return d >= 2 ? `${d} days, ${h} hr` : d === 1 ? `1 day, ${h} hr` : `${h} hr, ${m} min`;
  };
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const group = list => {
    const out = [];
    list.forEach(k => { const g = out.find(g => g.on === k.on); g ? g.items.push(k.label) : out.push({ on: k.on, items: [k.label] }); });
    return out.sort((p, q) => p.on.localeCompare(q.on));
  };
  const dlList = (gs, evDay) => gs.map(g => `<div><div class="d"><i class="${g.on === evDay ? "ev" : ""}"></i>${longDay(g.on)}</div><ul>${g.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");

  function render(el, ev, now, force) {
    const mode = el.dataset.mode;
    const phases = ev.phases || [], deadlines = ev.deadlines || [];
    const first = phases[0], last = phases[phases.length - 1];
    const a = dayNum(first.start), b = dayNum(ev.event_day) + 1, span = b - a;
    const x = d => (d - a) / span * 100;
    const slot = pacDay(now), inRange = slot >= a && slot < b;
    const opens = pacInstant(first.start, (ev.opens || "").slice(11) || "00:00");
    const startAt = pacInstant(ev.event_day, ev.event_starts || "00:00");
    const cur = phases.find(p => now >= (p === first ? opens : pacInstant(p.start)) && now < endOf(p.end));
    const multi = phases.length > 1;
    const stat = (k, v) => `<div><span class="k">${k}</span><span class="v">${v}</span></div>`;
    let st, nowTxt = "";
    if (now < opens) { st = stat("Registration", "Opens " + pacTime(opens)); nowTxt = `Opens in ${dur(opens - now)}`; }
    else if (cur) {
      st = (multi ? stat("Now open", esc(cur.short || cur.name)) : stat("Registration", "Open")) +
        stat("Price", `${esc(cur.price)} per student`) +
        stat(multi ? `${esc(cur.short || cur.name)} ends` : "Closes", pacTime(new Date(endOf(cur.end) - 60e3)));
      nowTxt = `${dur(endOf(cur.end) - now)} left${multi ? ` in ${cur.short || cur.name}` : ""}`;
    } else if (now < startAt) { st = stat("Registration", "Closed") + stat(esc(ev.event_label), longDay(ev.event_day)); nowTxt = `${dur(startAt - now)} to go`; }
    else if (now < endOf(ev.event_day)) st = stat(esc(ev.event_label), "Today!");
    else st = stat(esc(ev.event_title), "Has ended. Thanks for competing!") +
      (ev.results ? `<a class="btn reg" href="${esc(ev.results)}">Results Available</a>` : stat("Results", "Results Not Available"));

    const up = group(deadlines.filter(k => now < endOf(k.on)));
    const pageUrl = new URL(mode === "page" ? location.pathname : el.dataset.href, location.origin).href;
    const state = now < opens ? `Registration opens ${pacTime(opens)}.`
      : cur ? `${cur.name} is open, ${cur.price} per student, ${nowTxt}.`
      : now < startAt ? `Registration is closed. ${ev.event_label}: ${longDay(ev.event_day)}.`
      : now < endOf(ev.event_day) ? `${ev.event_label} is today!` : "The event has ended.";
    const next = up[0] && up[0].on !== ev.event_day ? ` Next deadline, ${longDay(up[0].on)}: ${up[0].items.join("; ")}.` : "";
    el.dataset.shareTitle = `${ev.event_title} at a Glance`;
    el.dataset.shareText = `${ev.event_title}: ${state}${next}`;
    el.dataset.shareUrl = pageUrl;
    const key = `${slot}|${st}|${el.clientWidth}`;
    if (!force && el.dataset.key === key) {
      const nw = el.querySelector(".now:not(.tag)");
      if (nw) { nw.textContent = nowTxt; fit(el); }
      return;
    }
    el.dataset.key = key;

    let h = `<div class="w${mode === "page" ? " page" : ""}">`;
    if (mode !== "page") h += `<div class="eyebrow">At a Glance</div><div class="w-title">${esc(ev.event_title)}</div><div class="w-date">${esc(ev.date_text)}</div>`;
    h += `<div class="st">${st}<button type="button" class="btn share">Share</button></div><div class="tl">`;
    const lastEnd = x(dayNum(last.end) + 1), tl = x(dayNum(ev.event_day));
    phases.forEach((p, i) => {
      const l = x(dayNum(p.start)), w = x(dayNum(p.end) + 1) - l;
      h += `<div class="band${i % 2 ? " alt" : ""}" style="left:${l}%;width:${w}%"></div>`;
      if (i) h += `<div class="div" style="left:${l}%"></div>`;
    });
    h += `<div class="band closed" style="left:${lastEnd}%;width:${tl - lastEnd}%"></div><div class="div" style="left:${lastEnd}%"></div>`;
    for (let d = a; d < b - 1; d++) if (new Date(d * MS_DAY).getUTCDay() === 6)
      h += `<div class="wk" style="left:${x(d)}%;width:${2 / span * 100}%"></div>`;
    h += `<div class="nowrow">${inRange ? `${nowTxt ? `<span class="now" data-l1="${x(slot + 1)}%" data-l2="${x(slot)}%">${nowTxt}</span>` : ""}<span class="now tag" data-l1="${x(slot + 1)}%" data-l2="${x(slot)}%">Today</span>` : ""}</div><div class="labs">`;
    phases.forEach(p => {
      const l = x(dayNum(p.start)), r = x(dayNum(p.end) + 1);
      h += `<span class="lab${p === cur ? " cur" : ""}" style="left:${(l + r) / 2}%" data-short="${esc(p.short || "")}">${esc(p.short || p.name)}</span>`;
    });
    h += `<span class="lab muted" style="left:${(lastEnd + tl) / 2}%">Closed</span></div><div class="bar">`;
    if (slot > a) h += `<div class="fill" style="width:${Math.min(slot >= b ? 100 : x(slot), lastEnd)}%"></div>`;
    h += `</div><div class="ticks">`;
    group(deadlines.filter(k => k.on !== ev.event_day)).forEach(g =>
      h += `<button type="button" class="dia${now >= endOf(g.on) ? " past" : ""}" style="left:${x(dayNum(g.on) + .5)}%" aria-label="${esc(longDay(g.on) + ": " + g.items.join(", "))}" data-day="${esc(longDay(g.on))}" data-items="${esc(JSON.stringify(g.items))}"></button>`);
    h += `</div><div class="tip" hidden></div><div class="tline" style="left:${tl}%"></div>`;
    if (inRange) h += `<div class="today" style="left:${x(slot)}%;width:${100 / span}%"></div>`;
    h += `<div class="axis">`;
    let n = 0;
    for (let d = a; d < b; d++) {
      const s = new Date(d * MS_DAY).toISOString().slice(0, 10);
      if (s === ev.event_day) h += `<span class="tday" style="left:${x(d)}%">${short(s)}</span>`;
      else if (new Date(d * MS_DAY).getUTCDay() === 6) h += `<span class="${n++ % 2 ? "odd" : ""}" style="left:${x(d + .5)}%">${short(s)}</span>`;
    }
    h += `</div></div>`;

    if (mode !== "page") {
      el.innerHTML = h + `<a class="btn more" href="${esc(el.dataset.href)}">See all dates and updates →</a></div>`;
      fit(el);
      return;
    }
    if (up.length) h += `<div class="sub">Upcoming deadlines</div><div class="dl">${dlList(up, ev.event_day)}</div>`;
    if (ev.calendar) {
      const ics = new URL(ev.calendar, location.origin).href, webcal = ics.replace(/^https?:/, "webcal:");
      h += `<div class="cal"><span>Add these dates to your calendar:</span><a class="btn" href="${esc(webcal)}">Apple / Outlook</a><a class="btn" href="https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcal)}" target="_blank" rel="noopener">Google Calendar</a><a class="btn" href="${esc(ics)}" download>Download .ics</a></div>`;
    }
    const items = (ev.news || []).filter(c => now >= pacInstant(c.show_from) && (!c.hide_after || now < endOf(c.hide_after)))
      .sort((p, q) => q.show_from.localeCompare(p.show_from));
    if (items.length) {
      h += `<div class="news"><div class="sub">What's new<a class="btn" href="/news/">All news →</a></div><div class="rows">`;
      items.forEach(c => h += `<a class="btn row" href="${esc(c.href)}"><span class="txt"><b>${esc(c.title)}</b> <span>— ${esc(c.blurb)}</span></span>${c.hide_after ? `<span class="when">Until ${short(c.hide_after)}</span>` : ""}<span class="go">→</span></a>`);
      h += `</div></div>`;
    }
    const past = group(deadlines.filter(k => now >= endOf(k.on))).reverse();
    if (past.length) h += `<div class="news pastdl"><div class="sub">Past deadlines</div><div class="dl">${dlList(past, ev.event_day)}</div></div>`;
    el.innerHTML = h + `</div>`;
    fit(el);
  }

  // Shorten or hide labels that collide, keep the countdown inside the
  // timeline, and cut the Today band where it passes a phase label.
  function fit(el) {
    const tlEl = el.querySelector(".tl"), t = tlEl.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    el.querySelectorAll(".div, .tline").forEach(d => {
      d.dataset.p ||= d.style.left;
      d.style.left = Math.round(parseFloat(d.dataset.p) / 100 * tlEl.clientWidth * dpr) / dpr + "px";
    });
    const box = s => s.getBoundingClientRect();
    const labs = [...el.querySelectorAll(".labs .lab")];
    const clash = (p, q) => box(p).right > box(q).left - 4;
    labs.forEach(s => { s.style.display = ""; });
    labs.forEach((s, i) => {
      const nx = labs[i + 1], pv = labs[i - 1];
      if (((nx && clash(s, nx)) || (pv && clash(pv, s)) || box(s).left < t.left || box(s).right > t.right) && s.dataset.short) s.textContent = s.dataset.short;
    });
    labs.forEach((s, i) => {
      const pv = labs.slice(0, i).filter(q => q.style.display !== "none").pop();
      if ((pv && clash(pv, s)) || box(s).right > t.right + 1 || box(s).left < t.left - 1) s.style.display = "none";
    });
    // "Today" sits on the opposite side of the band from the countdown.
    const nw = el.querySelector(".now:not(.tag)"), tg = el.querySelector(".now.tag");
    if (tg) {
      const place = (s, right) => { s.classList.toggle("flip", !right); s.style.left = right ? s.dataset.l1 : s.dataset.l2; };
      const fits = s => { const r = box(s); return r.left >= t.left - 1 && r.right <= t.right + 1; };
      let ok = false;
      if (nw) {
        nw.style.display = "";
        const full = nw.textContent.replace(/^Today · /, "");
        tg.style.display = "";
        outer: for (const v of [full, full.replace(/ in .*$/, "")]) {
          nw.textContent = v;
          for (const right of [true, false]) {
            place(nw, right); place(tg, !right);
            if (fits(nw) && fits(tg)) { ok = true; break outer; }
          }
        }
        if (!ok) outer2: for (const v of [full, full.replace(/ in .*$/, "")]) {
          nw.textContent = `Today · ${v}`;
          for (const right of [true, false]) {
            place(nw, right);
            if (fits(nw)) { ok = true; tg.style.display = "none"; break outer2; }
          }
        }
        if (!ok) { nw.textContent = full; nw.style.display = "none"; }
      }
      if (!ok) for (const right of [false, true]) { place(tg, right); if (fits(tg)) break; }
    }
    const tdy = el.querySelector(".today");
    if (tdy) {
      const r = box(tdy);
      const hit = labs.filter(s => s.style.display !== "none").map(box).find(b => b.left - 3 < r.right && b.right + 3 > r.left);
      tdy.style.background = hit ? `linear-gradient(var(--tc) 0 ${hit.top - r.top - 1}px, transparent 0 ${hit.bottom - r.top + 1}px, var(--tc) 0)` : "";
    }
    const td = el.querySelector(".axis .tday");
    if (td) {
      const l = box(td).left;
      el.querySelectorAll(".axis span:not(.tday)").forEach(s => { if (box(s).right > l - 6) s.style.visibility = "hidden"; });
    }
  }

  // `?glance-date=YYYY-MM-DD&glance-time=HH:MM` (Pacific) previews another day.
  const q = new URLSearchParams(location.search);
  const fixed = q.get("glance-date") ? pacInstant(q.get("glance-date"), q.get("glance-time") || "12:00") : null;
  const widgets = [...document.querySelectorAll(".glance[data-mode]")].map(el => ({ el, ev: JSON.parse(el.querySelector("script").textContent) }));
  const draw = force => { const now = fixed || new Date(); widgets.forEach(w => render(w.el, w.ev, now, force)); };
  draw(true);

  const tipFor = dia => dia.closest(".tl").querySelector(".tip");
  const showTip = (dia, pin) => {
    const tip = tipFor(dia), tl = dia.closest(".tl");
    tip.innerHTML = `<button type="button" class="x" aria-label="Close">×</button><b>${esc(dia.dataset.day)}</b><ul>${JSON.parse(dia.dataset.items).map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
    tip.hidden = false;
    tip.dataset.pin = pin ? "1" : "";
    const c = dia.offsetLeft, w = tip.offsetWidth;
    tip.style.left = Math.max(0, Math.min(tl.clientWidth - w, c - w / 2)) + "px";
    tl.querySelectorAll(".dia.on").forEach(d => d.classList.remove("on"));
    dia.classList.add("on");
  };
  const hideTips = all => document.querySelectorAll(".glance .tip:not([hidden])").forEach(tip => {
    if (!all && tip.dataset.pin) return;
    tip.hidden = true;
    tip.dataset.pin = "";
    tip.closest(".tl").querySelectorAll(".dia.on").forEach(d => d.classList.remove("on"));
  });
  document.addEventListener("click", e => {
    if (e.target.closest(".glance .tip")) { if (e.target.closest(".x")) hideTips(true); return; }
    const dia = e.target.closest(".glance .dia");
    if (dia && !(dia.classList.contains("on") && tipFor(dia).dataset.pin)) { hideTips(true); showTip(dia, true); }
    else hideTips(true);
    const sh = e.target.closest(".glance .share");
    if (!sh) return;
    const g = sh.closest(".glance"), { shareTitle: title, shareText: text, shareUrl: url } = g.dataset;
    const done = msg => { sh.textContent = msg; setTimeout(() => { sh.textContent = "Share"; }, 2000); };
    if (navigator.share) navigator.share({ title, text, url }).catch(() => {});
    else navigator.clipboard.writeText(`${text} ${url}`).then(() => done("Copied!"), () => done("Couldn't copy"));
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") hideTips(true); });
  // Hover popups close after a short delay so the pointer can cross the gap into them.
  let hideTimer;
  document.addEventListener("mouseover", e => {
    const dia = e.target.closest(".glance .dia");
    if (dia || e.target.closest(".glance .tip")) clearTimeout(hideTimer);
    if (dia && !tipFor(dia).dataset.pin) showTip(dia, false);
  });
  document.addEventListener("mouseout", e => {
    if (!e.target.closest(".glance .dia, .glance .tip") || e.relatedTarget?.closest?.(".glance .dia, .glance .tip")) return;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => hideTips(false), 300);
  });
  window.addEventListener("resize", () => draw(false));
  if (!fixed) setInterval(() => draw(false), 60000);
})();
