import "../PrivacyPolicyPage/PrivacyPolicyPage.css";
import { strings } from "../../comms/strings";

export function AboutUsPage() {
  return (
    <section className="shell privacy-policy" id="about-us">
      <div className="privacy-policy__card">
        <header className="privacy-policy__header">
          <p className="eyebrow">About us</p>
          <h1 className="privacy-policy__title">{strings.nav.aboutUs}</h1>
          <p className="privacy-policy__intro">
            <strong>{strings.company.legalName}</strong> trades as{" "}
            <strong>{strings.brand.name}</strong>. We are a Bengaluru-based wholesaler and distributor
            of washroom hygiene, cleaning, and waste management products for retailers, distributors,
            corporate offices, hospitals, and institutions.
          </p>
        </header>

        <div className="privacy-policy__content">
          <section className="privacy-policy__section">
            <h2>What we do</h2>
            <p>
              We source and supply commercial-grade hygiene products including pedal bins, open-top
              dustbins, cleaning chemicals, dispensers, and related facility supplies. Our team supports
              bulk enquiries, quotations, and dispatch coordination for business customers across Karnataka.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>Registered business details</h2>
            <ul>
              <li>
                <strong>Legal name:</strong> {strings.company.legalName}
              </li>
              <li>
                <strong>{strings.company.gstLabel}:</strong> {strings.company.gstNumber}
              </li>
              <li>
                <strong>Registered address:</strong> {strings.header.location}
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                <a className="privacy-policy__phone" href={`tel:${strings.header.phone}`}>
                  {strings.header.phoneDisplay}
                </a>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a className="privacy-policy__contact-link" href={`mailto:${strings.header.mail}`}>
                  {strings.header.mail}
                </a>
              </li>
            </ul>
          </section>

          <section className="privacy-policy__section">
            <h2>Why businesses work with us</h2>
            <ul>
              <li>Single point of contact for quotes, lead times, and dispatch</li>
              <li>Consistent product quality for institutional and corporate requirements</li>
              <li>Transparent pricing shared at quotation stage before order confirmation</li>
              <li>Local support from our Bengaluru office during business hours</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
