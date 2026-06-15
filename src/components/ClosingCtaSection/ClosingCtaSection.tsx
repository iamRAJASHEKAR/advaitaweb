import "./ClosingCtaSection.css";
import { strings } from "../../comms/strings";

type ClosingCtaSectionProps = {
  onPrimaryCta: () => void;
};

export function ClosingCtaSection({ onPrimaryCta }: ClosingCtaSectionProps) {
  const whatsappUrl = `https://wa.me/${strings.header.phone.replace(/\D/g, "")}`;

  return (
    <section className="shell section section--closing">
      <div className="closing-cta-block">
        <h2>{strings.closing.title}</h2>
        <p className="closing-subtext">{strings.closing.subtitle}</p>
        <div className="closing-cta">
          <a
            className="btn btn--whatsapp btn--lg"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {strings.closing.whatsappCta}
          </a>
          <button className="btn btn--primary btn--lg" onClick={onPrimaryCta}>
            {strings.closing.primaryCta}
          </button>
        </div>
      </div>
    </section>
  );
}
