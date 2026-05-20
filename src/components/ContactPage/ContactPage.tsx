import "../PrivacyPolicyPage/PrivacyPolicyPage.css";
import { strings } from "../../comms/strings";

type ContactPageProps = {
  onGetQuote?: () => void;
};

export function ContactPage({ onGetQuote }: ContactPageProps) {
  const whatsappUrl = `https://wa.me/${strings.header.phone.replace(/\D/g, "")}`;

  return (
    <section className="shell privacy-policy" id="contact-us">
      <div className="privacy-policy__card">
        <header className="privacy-policy__header">
          <p className="eyebrow">Get in touch</p>
          <h1 className="privacy-policy__title">{strings.nav.contactUs}</h1>
          <p className="privacy-policy__intro">
            Reach {strings.brand.name} ({strings.company.legalName}) for wholesale quotes, product
            availability, and order support. We respond to business enquiries during working hours.
          </p>
        </header>

        <div className="privacy-policy__content">
          <section className="privacy-policy__section">
            <h2>Business contact</h2>
            <p className="privacy-policy__contact">
              <strong>{strings.company.legalName}</strong>
              <br />
              {strings.company.gstLabel}: {strings.company.gstNumber}
              <br />
              <br />
              <strong>Address</strong>
              <br />
              {strings.header.location}
              <br />
              <br />
              <strong>Phone</strong>
              <br />
              <a className="privacy-policy__phone" href={`tel:${strings.header.phone}`}>
                {strings.header.phoneDisplay}
              </a>
              <br />
              <br />
              <strong>Email</strong>
              <br />
              <a className="privacy-policy__contact-link" href={`mailto:${strings.header.mail}`}>
                {strings.header.mail}
              </a>
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>Request a quote</h2>
            <p>
              Share your product list and quantities for a wholesale quotation. Pricing is confirmed in
              writing before order placement.
            </p>
            {onGetQuote ? (
              <button type="button" className="btn btn--primary" onClick={onGetQuote}>
                {strings.closing.primaryCta}
              </button>
            ) : null}
            <p style={{ marginTop: "16px" }}>
              <a
                className="btn btn--whatsapp"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {strings.closing.whatsappCta}
              </a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
