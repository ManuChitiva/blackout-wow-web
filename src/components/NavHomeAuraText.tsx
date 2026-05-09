"use client";

type NavHomeAuraTextProps = {
  text: string;
  variant: "title" | "sub";
  /** Applied on the wrapping span so letter spans inherit typography */
  className?: string;
};

export function NavHomeAuraText({
  text,
  variant,
  className,
}: NavHomeAuraTextProps) {
  const chars = Array.from(text);
  const delayMs = variant === "title" ? 95 : 65;

  return (
    <span className={className}>
      {chars.map((ch, i) => (
        <span
          key={i}
          className={
            variant === "title"
              ? "nav-brand-aura-letter nav-brand-aura-letter--title"
              : "nav-brand-aura-letter nav-brand-aura-letter--sub"
          }
          style={{ animationDelay: `${i * delayMs}ms` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}
