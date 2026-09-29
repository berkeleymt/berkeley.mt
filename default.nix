{ lib, stdenvNoCC, tailwindcss, zola, baseUrl ? null }:

stdenvNoCC.mkDerivation {
  pname = "berkeley.mt";
  version = "1.0.0";
  src = ./.;
  nativeBuildInputs = [ tailwindcss zola ];
  buildPhase = ''
    tailwindcss -i ./static/input.css -o ./static/style.css
    zola build -o "$out" ${lib.optionalString (baseUrl != null) "--base-url ${baseUrl}"}
    # Zola renders pages as <path>/index.html; turn calendar pages into
    # <path>.ics files with the CRLF line endings iCalendar requires.
    for d in "$out"/*.ics; do
      if [ -d "$d" ]; then sed 's/$/\r/' "$d/index.html" > "$d.tmp" && rm -r "$d" && mv "$d.tmp" "$d"; fi
    done
    sed -i 's|\.ics/</loc>|.ics</loc>|' "$out/sitemap.xml"
  '';
}
