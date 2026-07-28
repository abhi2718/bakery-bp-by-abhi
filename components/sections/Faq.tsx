import { site } from "@/config/site.config";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";

export default function Faq() {
  if (!site.faq.length) return null;

  return (
    <section className="section tight" id="faq">
      <div className="wrap">
        <Reveal>
          <SectionHead
            eyebrow="Before you order"
            title="Questions we get |every week|."
            center
          />
        </Reveal>

        <Reveal className="faq">
          {site.faq.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
