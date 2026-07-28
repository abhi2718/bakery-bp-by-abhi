import { site } from "@/config/site.config";
import { waLink } from "@/lib/whatsapp";
import Reveal from "@/components/ui/Reveal";
import { InstagramIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

export default function HoursContact() {
  const { hours, contactPanel, contact } = site;
  const wa = waLink(contact.whatsappGreeting);

  return (
    <section className="section tight" id="contact">
      <div className="wrap split">
        <Reveal className="panel">
          <span className="eyebrow">{hours.eyebrow}</span>
          <h3>{hours.title}</h3>
          <p className="sub">{hours.blurb}</p>
          <ul className="hours">
            {hours.rows.map((r) => (
              <li key={r.d}>
                <span className="d">{r.d}</span>
                <span className="t">{r.t}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 22 }}>
            <a className="btn btn-primary" href="#shop">
              {hours.ctaLabel}
            </a>
          </div>
        </Reveal>

        <Reveal className="panel">
          <span className="eyebrow">{contactPanel.eyebrow}</span>
          <h3>{contactPanel.title}</h3>
          <p className="sub">{contactPanel.blurb}</p>

          <div className="addr">
            <InstagramIcon />
            <a className="phone" href={contact.instagram} target="_blank" rel="noopener">
              {contact.instagramHandle} on Instagram
            </a>
          </div>

          <div className="addr">
            <PhoneIcon />
            <a className="phone" href={wa} target="_blank" rel="noopener">
              {contact.whatsappDisplay}
            </a>
          </div>

          <div className="addr">
            <PinIcon />
            {/* Only publish a full street address if the owner wants it public. */}
            <span>
              Home bakery in {contact.area}, {contact.city}
              <br />
              {contact.addressNote}
            </span>
          </div>

          <div style={{ marginTop: 24 }}>
            <a
              className="btn btn-ig block"
              href={contact.instagram}
              target="_blank"
              rel="noopener"
            >
              {contactPanel.ctaLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
