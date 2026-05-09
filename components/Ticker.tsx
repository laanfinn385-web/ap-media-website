const SPARK = "#F37338";
const PURPLE = "#3B0F66";

const items = [
  "Zero ad spend",
  "Volledig beheerd",
  "NL-only",
  "Maandelijks ≤4 plekken",
  "Garantie of we werken gratis door",
];

// 4 copies per group so one group is always wider than the viewport.
// paddingRight adds the trailing gap so -50% lands exactly on the seam.
const groupItems = [...items, ...items, ...items, ...items];

function TickerGroup({ hide }: { hide?: boolean }) {
  return (
    <div
      aria-hidden={hide}
      style={{ display: "flex", gap: 48, flexShrink: 0, paddingRight: 48 }}
    >
      {groupItems.map((t, i) => (
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
            whiteSpace: "nowrap",
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
  );
}

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
      {/* Two identical groups. The animation moves -50% = exactly one group width.
          When group 1 scrolls off-left, group 2 is already filling the screen.
          The keyframe resets and the loop is invisible. */}
      <div
        style={{
          display: "flex",
          animation: "ticker-scroll 40s linear infinite",
        }}
      >
        <TickerGroup />
        <TickerGroup hide />
      </div>
    </section>
  );
}
