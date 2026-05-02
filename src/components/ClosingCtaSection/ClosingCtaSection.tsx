import "./ClosingCtaSection.css";
import { strings } from "../../comms/strings";

type ClosingCtaSectionProps = {
  onPrimaryCta: () => void;
};

export function ClosingCtaSection({ onPrimaryCta }: ClosingCtaSectionProps) {
  const whatsappUrl = `https://wa.me/91${strings.header.phone.replace(/\D/g, "")}`;

  return (
    <section id="contact-us" className="shell section section--closing">
      <div className="closing-contact">
        <div className="closing-contact__actions">
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

        <address className="closing-contact__details" aria-label="Contact details">
           <p className="closing-contact__eyebrow">Contact us</p>

          <div className="closing-contact__item">
            <svg className="closing-contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div>
              <span className="closing-contact__label">Location</span>
              <span className="closing-contact__value">{strings.header.location}</span>
            </div>
          </div>
          <div className="closing-contact__item">
            <svg className="closing-contact__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div>
              <span className="closing-contact__label">Phone number</span>
              <a className="closing-contact__value" href={`tel:${strings.header.phone}`}>
                {strings.header.phone}
              </a>
            </div>
          </div>
        </address>
      </div>
    </section>
  );
}
