import { site } from "@/config/site.config";
import { accent } from "@/lib/accent";
import Reveal from "@/components/ui/Reveal";

/**
 * The "one thing that makes this bakery different" section. Set
 * lowSugar.enabled to false in config and it disappears — remember to drop
 * its link from `nav` too.
 */
export default function LowSugar() {
  const ls = site.lowSugar;
  if (!ls.enabled) return null;

  return (
    <section className="section" id="lowsugar">
      <div className="wrap split middle">
        <Reveal>
          <span className="eyebrow">{ls.eyebrow}</span>
          <div className="sec-head flush">
            <h2 className="display">{accent(ls.title)}</h2>
          </div>
          {/* Keep this wording conservative — no sugar-free / diabetic /
              keto claims anywhere on the site. */}
          {ls.paragraphs.map((p, i) => (
            <p className="prose" key={i}>
              {p}
            </p>
          ))}
          <a className="btn btn-primary" href="#shop">
            {ls.ctaLabel}
          </a>
          <p className="fineprint" style={{ marginTop: 20 }}>
            {ls.disclaimer}
          </p>
        </Reveal>

        <Reveal className="panel">
          <span className="eyebrow">{ls.panelEyebrow}</span>
          <h3>{ls.panelTitle}</h3>
          <ul className="hours" style={{ marginTop: 18 }}>
            {ls.rows.map((r) => (
              <li key={r.d}>
                <span className="d">{r.d}</span>
                <span className="t">{r.t}</span>
              </li>
            ))}
          </ul>
          <p className="sub" style={{ marginTop: 20 }}>
            {ls.panelNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
