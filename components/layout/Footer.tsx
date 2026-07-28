import { site } from "@/config/site.config";
import { waLink } from "@/lib/whatsapp";
import BrandMark from "@/components/ui/BrandMark";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";

export default function Footer() {
  const wa = waLink(site.contact.whatsappGreeting);

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <BrandMark />
            <p className="fa">{site.footer.blurb}</p>
            <div className="foot-socials">
              <a
                href={site.contact.instagram}
                target="_blank"
                rel="noopener"
                aria-label={`${site.brand.name} on Instagram`}
              >
                <InstagramIcon />
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener"
                aria-label={`${site.brand.name} on WhatsApp`}
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <div className="foot-cols">
            {site.footer.columns.map((col) => (
              <div className="foot-col" key={col.title}>
                <h4>{col.title}</h4>
                {col.items.map((item, i) =>
                  item.text || !item.href ? (
                    <p key={i}>{item.label}</p>
                  ) : (
                    <a
                      key={i}
                      /* href:'wa' is shorthand for the WhatsApp link */
                      href={item.href === "wa" ? wa : item.href}
                      {...(item.href.startsWith("http") || item.href === "wa"
                        ? { target: "_blank", rel: "noopener" }
                        : {})}
                    >
                      {item.label}
                    </a>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="foot-bottom">
          <span>
            © {new Date().getFullYear()} {site.brand.name}
            {site.brand.suffix ? ` ${site.brand.suffix}` : ""}. All rights reserved.
            {site.contact.fssai ? ` ${site.contact.fssai}.` : ""}
          </span>
          {site.footer.credit ? (
            <span className="credit">
              Website by{" "}
              {site.footer.creditUrl ? (
                <a href={site.footer.creditUrl} target="_blank" rel="noopener">
                  <b>{site.footer.credit}</b>
                </a>
              ) : (
                <b>{site.footer.credit}</b>
              )}
            </span>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
