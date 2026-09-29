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
  const dlList = gs => gs.map(g => `<div><div class="d">${longDay(g.on)}</div><ul>${g.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");

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

    const key = `${slot}|${st}|${el.clientWidth}`;
    if (!force && el.dataset.key === key) {
      const nw = el.querySelector(".now");
      if (nw) { nw.textContent = nowTxt; fit(el); }
      return;
    }
    el.dataset.key = key;

    let h = `<div class="w${mode === "page" ? " page" : ""}">`;
    if (mode !== "page") h += `<div class="eyebrow">At a Glance</div><div class="w-title">${esc(ev.event_title)}</div><div class="w-date">${esc(ev.date_text)}</div>`;
    h += `<div class="st">${st}</div><div class="tl">`;
    const lastEnd = x(dayNum(last.end) + 1), tl = x(dayNum(ev.event_day));
    phases.forEach((p, i) => {
      const l = x(dayNum(p.start)), w = x(dayNum(p.end) + 1) - l;
      h += `<div class="band${i % 2 ? " alt" : ""}" style="left:${l}%;width:${w}%"></div>`;
      if (i) h += `<div class="div" style="left:${l}%"></div>`;
    });
    h += `<div class="band closed" style="left:${lastEnd}%;width:${tl - lastEnd}%"></div><div class="div" style="left:${lastEnd}%"></div>`;
    for (let d = a; d < b - 1; d++) if (new Date(d * MS_DAY).getUTCDay() === 6)
      h += `<div class="wk" style="left:${x(d)}%;width:${2 / span * 100}%"></div>`;
    h += `<div class="nowrow">${inRange && nowTxt ? `<span class="now" data-l1="${x(slot + 1)}%" data-l2="${x(slot)}%">${nowTxt}</span>` : ""}</div><div class="labs">`;
    phases.forEach(p => {
      const l = x(dayNum(p.start)), r = x(dayNum(p.end) + 1);
      h += `<span class="lab${p === cur ? " cur" : ""}" style="left:${(l + r) / 2}%" data-short="${esc(p.short || "")}">${esc(p.short || p.name)}</span>`;
    });
    h += `<span class="lab muted" style="left:${(lastEnd + tl) / 2}%">Closed</span></div><div class="bar">`;
    if (slot > a) h += `<div class="fill" style="width:${Math.min(slot >= b ? 100 : x(slot), lastEnd)}%"></div>`;
    h += `</div><div class="ticks">`;
    group(deadlines.filter(k => k.on !== ev.event_day)).forEach(g =>
      h += `<span class="dia${now >= endOf(g.on) ? " past" : ""}" style="left:${x(dayNum(g.on) + .5)}%" title="${esc(longDay(g.on) + ": " + g.items.join(", "))}"></span>`);
    h += `</div><div class="tline" style="left:${tl}%"></div>`;
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
    const upcoming = group(deadlines.filter(k => now < endOf(k.on)));
    if (upcoming.length) h += `<div class="sub">Upcoming deadlines</div><div class="dl">${dlList(upcoming)}</div>`;
    const items = (ev.news || []).filter(c => now >= pacInstant(c.show_from) && (!c.hide_after || now < endOf(c.hide_after)))
      .sort((p, q) => q.show_from.localeCompare(p.show_from));
    if (items.length) {
      h += `<div class="news"><div class="sub">What's new<a class="btn" href="/news/">All news →</a></div><div class="rows">`;
      items.forEach(c => h += `<a class="btn row" href="${esc(c.href)}"><span class="txt"><b>${esc(c.title)}</b> <span>— ${esc(c.blurb)}</span></span>${c.hide_after ? `<span class="when">Until ${short(c.hide_after)}</span>` : ""}<span class="go">→</span></a>`);
      h += `</div></div>`;
    }
    const past = group(deadlines.filter(k => now >= endOf(k.on))).reverse();
    if (past.length) h += `<div class="news pastdl"><div class="sub">Past deadlines</div><div class="dl">${dlList(past)}</div></div>`;
    el.innerHTML = h + `</div>`;
    fit(el);
  }

  // Shorten or hide labels that collide, keep the countdown inside the
  // timeline, and cut the Today band where it passes a phase label.
  function fit(el) {
    const tlEl = el.querySelector(".tl"), t = tlEl.getBoundingClientRect();
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
    const nw = el.querySelector(".now");
    if (nw) {
      const full = nw.textContent, variants = [full, full.replace(/ in .*$/, "")];
      const fits = () => { const r = box(nw); return r.left >= t.left - 1 && r.right <= t.right + 1; };
      outer: for (const v of variants) {
        nw.textContent = v;
        for (const f of [false, true]) {
          nw.classList.toggle("flip", f);
          nw.style.left = f ? nw.dataset.l2 : nw.dataset.l1;
          if (fits()) break outer;
        }
      }
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
  window.addEventListener("resize", () => draw(false));
  if (!fixed) setInterval(() => draw(false), 60000);
})();
