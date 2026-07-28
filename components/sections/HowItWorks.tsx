import { site } from "@/config/site.config";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";

export default function HowItWorks() {
  const h = site.how;

  return (
    <section className="section tight" id="how">
      <div className="wrap">
        <Reveal>
          <SectionHead eyebrow={h.eyebrow} title={h.title} blurb={h.blurb} center />
        </Reveal>

        <div className="steps">
          {h.steps.map((s, i) => (
            <Reveal className="step" key={s.title}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </Reveal>
          ))}
        </div>

        <p className="fineprint" style={{ marginTop: 24, textAlign: "center" }}>
          {h.footnote}
        </p>
      </div>
    </section>
  );
}
