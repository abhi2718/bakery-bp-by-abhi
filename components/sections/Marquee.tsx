import { site } from "@/config/site.config";

/** The list is rendered twice — the animation slides exactly one copy. */
export default function Marquee() {
  if (!site.marquee.length) return null;
  const run = [...site.marquee, ...site.marquee];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {run.map((word, i) => (
          <span key={i}>
            {word}
            <span />
          </span>
        ))}
      </div>
    </div>
  );
}
