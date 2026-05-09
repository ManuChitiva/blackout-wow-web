"use client";

type NavHomeAuraTextProps = {
  text: string;
  variant: "title" | "sub";
};

export function NavHomeAuraText({ text, variant }: NavHomeAuraTextProps) {
  const chars = Array.from(text);
  const delayMs = variant === "title" ? 95 : 65;

  return (
    <span>
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
