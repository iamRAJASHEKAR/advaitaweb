import "../PrivacyPolicyPage/PrivacyPolicyPage.css";
import "./ContactPage.css";
import { strings } from "../../comms/strings";
import { GetDirectionsLink } from "../GetDirectionsLink/GetDirectionsLink";

type ContactPageProps = {
  onGetQuote?: () => void;
};

export function ContactPage({ onGetQuote }: ContactPageProps) {
  const whatsappUrl = `https://wa.me/${strings.header.phone.replace(/\D/g, "")}`;

  return (
    <section className="shell privacy-policy" id="contact-us">
      <div className="privacy-policy__card">
        <header className="privacy-policy__header">
          <h1 className="privacy-policy__title">{strings.nav.contactUs}</h1>
          <p className="privacy-policy__intro">{strings.contactPage.intro1}</p>
          <p className="privacy-policy__intro">{strings.contactPage.intro2}</p>
          <div className="contact-page__hours">
            <p className="contact-page__hours-heading">
              <strong>{strings.contactPage.businessHoursHeading}</strong>
            </p>
            <p className="privacy-policy__intro">{strings.contactPage.businessHoursBody}</p>
          </div>
          <p className="contact-page__tagline">
            <strong>{strings.contactPage.tagline}</strong>
          </p>
        </header>

        <div className="privacy-policy__content">
          <section className="privacy-policy__section">
            <h2>Business contact</h2>
            <div className="privacy-policy__contact">
              <p>
                <strong>{strings.company.legalName}</strong>
                <br />
                {strings.company.gstLabel} {strings.company.gstNumber}
                <br />
                {strings.company.cinLabel} {strings.company.cinNumber}
              </p>
              <p>
                <strong>Address</strong>
                <br />
                {strings.header.location}
              </p>
              <GetDirectionsLink variant="page" />
              <p>
                <strong>Phone</strong>
                <br />
                <a className="privacy-policy__phone" href={`tel:${strings.header.phone}`}>
                  {strings.header.phoneDisplay}
                </a>
              </p>
              <p>
                <strong>Email</strong>
                <br />
                <a className="privacy-policy__contact-link" href={`mailto:${strings.header.mail}`}>
                  {strings.header.mail}
                </a>
              </p>
            </div>
          </section>

          <section className="privacy-policy__section">
            <h2>{strings.businessOverview.serviceAreaHeading}</h2>
            <p>{strings.company.serviceArea}</p>
          </section>

          <section className="privacy-policy__section">
            <h2>Request a quote</h2>
            <p>
              Share your product list and quantities for a wholesale quotation. Pricing is confirmed in
              writing before order placement.
            </p>
            <div className="contact-page__actions">
              {onGetQuote ? (
                <button type="button" className="btn btn--primary" onClick={onGetQuote}>
                  {strings.closing.primaryCta}
                </button>
              ) : null}
              <a
                className="btn btn--whatsapp"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {strings.closing.whatsappCta}
              </a>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
