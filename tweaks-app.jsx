const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "light",
  "accent": "#B5704A",
  "displayFont": "Instrument Serif"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  "#B5704A", // terracotta (default)
  "#7C8B5A", // muted olive
  "#3A6E8F", // muted teal-blue
  "#9C4F4F", // muted brick
];

const FONT_OPTIONS = [
  "Instrument Serif",
  "Cormorant Garamond",
  "EB Garamond",
];

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Mode (light vs ink)
  useEffect(() => {
    document.body.setAttribute("data-mode", t.mode);
  }, [t.mode]);

  // Accent color override
  useEffect(() => {
    const id = "__accent-override";
    let s = document.getElementById(id);
    if (!s) { s = document.createElement("style"); s.id = id; document.head.appendChild(s); }
    s.textContent = `
      :root { --accent: ${t.accent}; --accent-soft: ${t.accent}1a; }
      [data-mode="ink"] { --accent: ${t.accent}; --accent-soft: ${t.accent}24; }
    `;
  }, [t.accent]);

  // Display font swap
  useEffect(() => {
    const id = "__font-override";
    let s = document.getElementById(id);
    if (!s) { s = document.createElement("style"); s.id = id; document.head.appendChild(s); }
    // ensure font loaded
    const linkId = "__font-link-" + t.displayFont.replace(/\s+/g, "");
    if (!document.getElementById(linkId)) {
      const l = document.createElement("link");
      l.id = linkId; l.rel = "stylesheet";
      l.href = `https://fonts.googleapis.com/css2?family=${t.displayFont.replace(/\s+/g, "+")}:ital,wght@0,400;0,500;0,600;1,400&display=swap`;
      document.head.appendChild(l);
    }
    s.textContent = `:root { --serif: '${t.displayFont}', 'Times New Roman', serif; }`;
  }, [t.displayFont]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Aparência">
        <TweakRadio
          label="Modo"
          value={t.mode}
          onChange={(v) => setTweak("mode", v)}
          options={[
            { value: "light", label: "Cream" },
            { value: "ink", label: "Ink" },
          ]}
        />
        <TweakColor
          label="Destaque"
          value={t.accent}
          onChange={(v) => setTweak("accent", v)}
          options={ACCENT_OPTIONS}
        />
      </TweakSection>

      <TweakSection label="Tipografia">
        <TweakSelect
          label="Display"
          value={t.displayFont}
          onChange={(v) => setTweak("displayFont", v)}
          options={FONT_OPTIONS.map(f => ({ value: f, label: f }))}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<TweaksApp />);
