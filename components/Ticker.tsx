const SPARK = "#F37338";
const PURPLE = "#3B0F66";

const items = [
  "Zero ad spend",
  "Volledig beheerd",
  "NL-only",
  "Maandelijks ≤4 plekken",
  "Garantie of we werken gratis door",
];

// Duplicate so CSS translateX(-50%) creates a seamless loop
const row = [...items, ...items];

export default function Ticker() {
  return (
    <section
      style={{
        padding: "24px 0",
        background: "#141413",
        overflow: "hidden",
        borderTop: `1px solid ${PURPLE}66`,
        borderBottom: `1px solid ${PURPLE}66`,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 48,
          whiteSpace: "nowrap",
          animation: "ticker-scroll 40s linear infinite",
          willChange: "transform",
        }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              color: "#F3F0EE",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              flexShrink: 0,
            }}
          >
            {t}
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: SPARK,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </section>
  );
}
