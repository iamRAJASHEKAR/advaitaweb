import { Link } from "react-router-dom";
import "../PrivacyPolicyPage/PrivacyPolicyPage.css";
import { strings } from "../../comms/strings";
import { paths } from "../../routes/paths";

const EFFECTIVE_DATE = "February 28, 2026";

export function TermsOfServicePage() {
  return (
    <section className="shell privacy-policy" id="terms-and-conditions">
      <div className="privacy-policy__card">
        <header className="privacy-policy__header">
          <p className="eyebrow">Legal</p>
          <h1 className="privacy-policy__title">{strings.nav.termsOfService}</h1>
          <p className="privacy-policy__effective-date">Effective date: {EFFECTIVE_DATE}</p>
          <p className="privacy-policy__intro">
            These Terms and Conditions (“Terms”) govern wholesale supply, quotations, orders, and use
            of the website operated by <strong>{strings.company.legalName}</strong> trading as{" "}
            <strong>{strings.brand.name}</strong>. By requesting a quote, placing an order, or using
            our website on behalf of an organization, you agree to these Terms.
          </p>
          <p className="privacy-policy__intro privacy-policy__intro--note">
            We supply <strong>business customers only</strong> — retailers, distributors, corporate
            offices, institutions, and trade buyers. These Terms do not apply to individual consumer
            retail purchases for personal use.
          </p>
        </header>

        <div className="privacy-policy__content">
          <section className="privacy-policy__section">
            <h2>1. B2B supply &amp; eligibility</h2>
            <p>
              All sales are business-to-business (B2B). You represent that you are authorized to act
              on behalf of your organization and that purchase orders, payments, and delivery
              instructions you provide are valid for that entity.
            </p>
            <p>
              We may request business registration details, GST information, or credit references
              before confirming large or first-time orders.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>2. Website use</h2>
            <p>
              Product images, specifications, and catalogue content on advaitahygiene.com are provided
              for business reference. You agree not to misuse the site, attempt unauthorized access,
              scrape content for competitive misuse, or submit false enquiry information.
            </p>
            <p>
              Enquiry forms require consent to be contacted and acknowledgement of our{" "}
              <Link to={paths.privacyPolicy}>Privacy Policy</Link> and these Terms.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>3. Quotations &amp; pricing</h2>
            <p>
              Prices shown on the website, in marketing materials, or in informal communication are{" "}
              <strong>indicative only</strong> unless confirmed in a written quotation or tax invoice.
            </p>
            <ul>
              <li>Final unit price, taxes (GST), freight, and minimum order quantity (MOQ) are stated at quotation or invoice stage</li>
              <li>Quotations are valid for the period stated on the quote; otherwise, 7 calendar days unless we agree otherwise in writing</li>
              <li>We may revise pricing if raw material, freight, or statutory costs change before order confirmation</li>
              <li>Our GST registration: {strings.company.gstLabel} {strings.company.gstNumber}</li>
            </ul>
            <p>
              A quotation does not reserve stock until a purchase order is accepted by us in writing.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>4. Orders &amp; acceptance</h2>
            <p>An order is binding only when all of the following apply:</p>
            <ul>
              <li>You submit a purchase order or written order confirmation with product, quantity, and delivery details</li>
              <li>We accept the order in writing (email confirmation, proforma invoice, or tax invoice)</li>
              <li>Any required advance payment or credit approval is received, where applicable</li>
            </ul>
            <p>
              We reserve the right to decline or cancel orders due to stock unavailability, credit
              concerns, regulatory restrictions, incomplete information, or pricing errors. If we
              cancel after payment, we will refund amounts received for undelivered goods.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>5. Payment terms</h2>
            <p>Payment terms are agreed per order and stated on the quotation or invoice. Unless otherwise agreed:</p>
            <ul>
              <li>First-time or large-value orders may require advance payment or part advance</li>
              <li>Approved credit customers must pay within the due date on the tax invoice</li>
              <li>Payments may be made by bank transfer or other methods we approve in writing</li>
              <li>Late payments may attract interest or suspension of further supply as permitted by law</li>
            </ul>
            <p>
              Title to goods remains with us until full payment is received, where permitted under
              applicable law and unless otherwise stated on the invoice.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>6. Delivery &amp; risk of loss</h2>
            <p>
              Delivery timelines shared at order confirmation are <strong>estimates</strong>. Actual
              dispatch may vary due to stock, logistics, weather, or force majeure events.
            </p>
            <ul>
              <li>Delivery is to the address agreed in the order or handover to your nominated carrier</li>
              <li>Freight charges and delivery responsibility (ex-works, FOR, or other Incoterms) are stated on the invoice</li>
              <li>Risk of loss or damage passes to you upon delivery to the agreed location or carrier handover, unless otherwise stated in writing</li>
              <li>You are responsible for inspecting goods on receipt and noting visible damage on the delivery document where possible</li>
            </ul>
          </section>

          <section className="privacy-policy__section">
            <h2>7. Cancellation &amp; order changes</h2>
            <p>
              Orders for standard stocked items may be cancelled or modified only before dispatch, subject
              to our written approval. Cancellation after picking, packing, or dispatch may incur
              restocking or logistics charges.
            </p>
            <p>
              Custom, imported, or non-standard items ordered specifically for you generally{" "}
              <strong>cannot be cancelled</strong> once production or procurement has started, unless we
              agree otherwise in writing.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>8. Returns, shortages &amp; transit damage</h2>
            <p>To report an issue, contact us promptly with invoice number, photos, and delivery details:</p>
            <ul>
              <li>
                <strong>Transit damage or shortages:</strong> notify us within 48 hours of delivery
              </li>
              <li>
                <strong>Wrong item supplied:</strong> notify us within 7 days of delivery
              </li>
              <li>
                Returns must be in original packaging where practicable and subject to inspection
              </li>
            </ul>
            <p>
              Approved returns may be replaced, credited, or refunded at our discretion. We do not accept
              returns of opened chemicals or hygiene consumables unless defective or supplied in error.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>9. Warranty &amp; product quality</h2>
            <p>
              We supply products intended for commercial and institutional use. Manufacturer warranties,
              where applicable, are passed on as stated on the invoice or product documentation.
            </p>
            <ul>
              <li>Manufacturing defects reported within the warranty period on the invoice will be reviewed for repair, replacement, or credit</li>
              <li>Warranty does not cover misuse, improper storage, normal wear, or unauthorized modification</li>
              <li>Minor batch variations in dimensions, finish, shade, or packaging may occur without affecting commercial fitness for purpose</li>
            </ul>
          </section>

          <section className="privacy-policy__section">
            <h2>10. Product information &amp; compliance</h2>
            <p>
              Specifications, certifications, and safety data are provided based on manufacturer
              information available at the time of supply. You are responsible for ensuring products
              are suitable for your intended application and for complying with local regulations at
              the place of use.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>11. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by applicable law:
            </p>
            <ul>
              <li>
                Our total liability for any claim relating to a specific order is limited to the
                invoice value of the products giving rise to the claim
              </li>
              <li>
                We are not liable for indirect, incidental, consequential, or loss-of-profit damages,
                including business interruption or loss of goodwill
              </li>
              <li>
                We are not liable for delays or failures caused by events beyond our reasonable control
                (see Section 12)
              </li>
            </ul>
            <p>
              Nothing in these Terms limits liability that cannot be excluded under applicable Indian law.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>12. Force majeure</h2>
            <p>
              We are not liable for failure or delay in performance caused by events outside our
              reasonable control, including natural disasters, strikes, transport disruptions,
              government actions, pandemics, or supplier shortages. We will notify you where
              practicable and resume performance when the event ends.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>13. Intellectual property</h2>
            <p>
              Website content, logos, catalogue materials, and marketing assets are owned by us or our
              licensors. You may not reproduce or distribute them without prior written permission,
              except for internal business evaluation of products offered for sale.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>14. Governing law &amp; dispute jurisdiction</h2>
            <p>
              These Terms are governed by the laws of <strong>India</strong>. Subject to any separate
              written arbitration or commercial agreement between the parties, courts in{" "}
              <strong>Bengaluru, Karnataka</strong> shall have exclusive jurisdiction over disputes
              arising from these Terms or related B2B supply.
            </p>
            <p>
              We encourage good-faith resolution by contacting our sales team before initiating
              formal proceedings.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>15. Changes to these Terms</h2>
            <p>
              We may update these Terms when our business practices or legal requirements change.
              The effective date at the top of this page will be revised when updates are posted.
              Orders accepted before a change remain subject to the Terms in effect at acceptance.
            </p>
            <p>
              Related document: <Link to={paths.privacyPolicy}>{strings.nav.privacyPolicy}</Link>
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>16. Terms enquiries</h2>
            <p>
              For questions about quotations, orders, delivery, or these Terms, contact our business
              team:
            </p>
            <div className="privacy-policy__grievance">
              <p>
                <strong>{strings.company.legalName}</strong>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a className="privacy-policy__contact-link" href={`mailto:${strings.header.mail}`}>
                  {strings.header.mail}
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a className="privacy-policy__phone" href={`tel:${strings.header.phone}`}>
                  {strings.header.phoneDisplay}
                </a>
              </p>
            </div>
            <p>
              Full business contact details are on our <Link to={paths.contact}>Reach us</Link> page.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
