export default function Eyebrow({
  children,
  center,
  color = "#141413",
  dot = "#F37338",
}: {
  children: React.ReactNode;
  center?: boolean;
  color?: string;
  dot?: string;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.56px",
        textTransform: "uppercase",
        color,
        justifyContent: center ? "center" : "flex-start",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: dot,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  );
}
