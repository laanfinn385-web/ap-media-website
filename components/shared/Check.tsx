export default function Check({
  size = 18,
  color = "#fff",
  bg = "#3B0F66",
}: {
  size?: number;
  color?: string;
  bg?: string;
}) {
  return (
    <span
      style={{
        width: size + 10,
        height: size + 10,
        borderRadius: "50%",
        background: bg,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="5 12 10 17 19 7" />
      </svg>
    </span>
  );
}
