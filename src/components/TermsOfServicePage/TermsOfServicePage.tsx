import "../PrivacyPolicyPage/PrivacyPolicyPage.css";
import { strings } from "../../comms/strings";
export function TermsOfServicePage() {
  return (
    <section className="shell privacy-policy">
      <div className="privacy-policy__card">
        <header className="privacy-policy__header">
          <p className="eyebrow">Legal</p>
          <h1 className="privacy-policy__title">{strings.nav.termsOfService}</h1>
          <p className="privacy-policy__effective-date">Effective Date: February 28, 2026</p>
          <p className="privacy-policy__intro">
            These Terms of Service ("Terms") govern business transactions and use of the website operated
            by <strong>{strings.company.legalName}</strong> trading as{" "}
            <strong>{strings.brand.name}</strong>. By requesting a quote, placing an order, or using our
            website, you agree to these Terms on behalf of your organization.
          </p>
        </header>

        <div className="privacy-policy__content">
          <section className="privacy-policy__section">
            <h2>1. Business customers only</h2>
            <p>
              We supply products and services to registered businesses, institutions, and trade buyers.
              We do not sell to individual consumers for personal use through this website.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>2. Quotations and pricing</h2>
            <p>
              Prices displayed on the website or in marketing materials are indicative unless confirmed in
              a written quotation. Final price, taxes, freight, and minimum order quantities are confirmed
              at quotation and invoice stage. {strings.company.gstLabel} {strings.company.gstNumber}.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>3. Orders and payment</h2>
            <p>
              Orders are confirmed only after written acceptance and, where applicable, receipt of advance
              payment or purchase order approval. We reserve the right to decline orders that cannot be
              fulfilled due to stock, regulatory, or credit reasons.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>4. Delivery</h2>
            <p>
              Delivery timelines are estimates shared at order confirmation. Risk of loss passes to the
              buyer upon delivery to the agreed location or handover to the buyer&apos;s carrier, unless
              otherwise stated in the invoice.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>5. Returns and defects</h2>
            <p>
              Report transit damage or quantity discrepancies within 48 hours of delivery with photos and
              invoice reference. Manufacturing defects reported within the warranty period stated on the
              invoice will be reviewed for repair, replacement, or credit at our discretion. Custom or
              non-standard orders may not be returnable unless defective.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>6. Product information</h2>
            <p>
              Specifications, images, and descriptions are provided for business reference. Minor
              variations in dimensions, finish, or packaging may occur between batches without affecting
              fit for intended commercial use.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>7. Limitation of liability</h2>
            <p>
              To the extent permitted by applicable law, our liability is limited to the value of the
              specific products supplied under the invoice giving rise to the claim. We are not liable
              for indirect, consequential, or loss-of-profit damages.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>8. Governing law</h2>
            <p>
              These Terms are governed by the laws of India. Courts in Bengaluru, Karnataka shall have
              exclusive jurisdiction, subject to applicable commercial dispute resolution agreed in writing.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>9. Contact Information</h2>
            <p>
              For questions, requests, or concerns regarding these Terms of Service or your business orders,
              please contact:
            </p>
            <p className="privacy-policy__contact">
              <strong>{strings.company.legalName}</strong>
              <br />
              Trading as: {strings.brand.name}
              <br />
              {strings.company.gstLabel} {strings.company.gstNumber}
              <br />
              {strings.company.cinLabel} {strings.company.cinNumber}
              <br />
              Phone:{" "}
              <a className="privacy-policy__phone" href={`tel:${strings.header.phone}`}>
                {strings.header.phoneDisplay}
              </a>
              <br />
              Email:{" "}
              <a className="privacy-policy__contact-link" href={`mailto:${strings.header.mail}`}>
                {strings.header.mail}
              </a>
              <br />
              Address: {strings.header.location}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

