// Renders a 1–5 bowl rating as filled/empty 🥣 emoji.
export function BowlScore({
  value,
  max = 5,
  size = "text-xl",
}: {
  value: number;
  max?: number;
  size?: string;
}) {
  const clamped = Math.max(0, Math.min(max, Math.round(value)));
  return (
    <span
      className={`${size} tracking-tight`}
      role="img"
      aria-label={`${clamped} out of ${max} bowls`}
      title={`${clamped}/${max}`}
    >
      {"🥣".repeat(clamped)}
      <span className="opacity-20">{"🥣".repeat(max - clamped)}</span>
    </span>
  );
}
