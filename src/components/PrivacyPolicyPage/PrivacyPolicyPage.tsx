import { Link } from "react-router-dom";
import "./PrivacyPolicyPage.css";
import { strings } from "../../comms/strings";
import { paths } from "../../routes/paths";

const EFFECTIVE_DATE = "February 28, 2026";

export function PrivacyPolicyPage() {
  return (
    <section className="shell privacy-policy" id="privacy-policy">
      <div className="privacy-policy__card">
        <header className="privacy-policy__header">
          <p className="eyebrow">Legal</p>
          <h1 className="privacy-policy__title">Privacy Policy</h1>
          <p className="privacy-policy__effective-date">Effective date: {EFFECTIVE_DATE}</p>
          <p className="privacy-policy__intro">
            This Privacy Policy explains what personal and business information{" "}
            <strong>{strings.company.legalName}</strong> (“we”, “us”, “our”) collects when you
            visit <strong>advaitahygiene.com</strong>, submit an enquiry, call us, email us, or
            interact with our advertising. It also explains how we use that information, how long we
            keep it, and how you can contact us about privacy.
          </p>
          <p className="privacy-policy__intro privacy-policy__intro--note">
            We supply products and services to <strong>business customers only</strong> (retailers,
            distributors, institutions, and trade buyers). This policy is not intended for
            individual consumer retail purchases.
          </p>
        </header>

        <div className="privacy-policy__content">
          <section className="privacy-policy__section" id="scope">
            <h2>1. Scope &amp; who this applies to</h2>
            <p>
              This policy applies to information collected through our website, enquiry forms, phone
              calls, email, WhatsApp Business, and online advertising that directs users to our
              site. It covers representatives of organizations who contact us for quotations,
              orders, delivery, or account support.
            </p>
            <p>
              By using our website or submitting an enquiry, you confirm you are acting on behalf of
              a business and that you have authority to share the contact details you provide.
            </p>
          </section>

          <section className="privacy-policy__section" id="collect">
            <h2>2. Information we collect</h2>
            <p>Depending on how you interact with us, we may collect:</p>
            <ul>
              <li>Organization name and business type</li>
              <li>Contact person name and job role</li>
              <li>Phone number and email address</li>
              <li>Business and delivery addresses</li>
              <li>GST number, billing details, and purchase order references</li>
              <li>Product requirements, quantities, and enquiry messages</li>
              <li>Communication records (calls, emails, WhatsApp messages related to your enquiry)</li>
              <li>Payment reference details where applicable (we do not store full card numbers on this website)</li>
              <li>Technical data such as IP address, browser type, device type, and pages visited</li>
            </ul>
            <p>
              We collect only information that is reasonably necessary for B2B sales, delivery, and
              customer support.
            </p>
          </section>

          <section className="privacy-policy__section" id="sources">
            <h2>3. How we collect information</h2>
            <p>We collect information when you:</p>
            <ul>
              <li>Submit a quote request, bulk pricing form, or other enquiry on our website</li>
              <li>Call our business phone number or email our sales team</li>
              <li>Message us on WhatsApp Business</li>
              <li>Place or confirm a purchase order and related invoicing details</li>
              <li>Click or interact with our online advertisements (for example, Google Ads)</li>
              <li>Browse our website (through cookies and similar technologies described below)</li>
            </ul>
          </section>

          <section className="privacy-policy__section" id="consent">
            <h2>4. Consent &amp; lawful use</h2>
            <p>
              When you submit an enquiry form on our website, you must tick a consent checkbox
              confirming that:
            </p>
            <ul>
              <li>
                You agree that we may contact you by phone, WhatsApp, or email about your business
                enquiry
              </li>
              <li>You have read this Privacy Policy and our Terms of Service</li>
            </ul>
            <p>
              We process your information to respond to enquiries, prepare quotations, fulfil
              orders, maintain business records, and comply with applicable tax and commercial laws
              in India, including legitimate business interests related to wholesale distribution.
            </p>
            <p>
              You may withdraw marketing consent at any time by emailing us (see Section 12). Withdrawal
              does not affect processing already completed or processing required by law.
            </p>
          </section>

          <section className="privacy-policy__section" id="use">
            <h2>5. How we use your information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Respond to enquiries and share product or pricing information</li>
              <li>Prepare quotations, proposals, and confirmed order documentation</li>
              <li>Process orders, invoicing, GST billing, and delivery coordination</li>
              <li>Provide after-sales support and repeat-order assistance</li>
              <li>Maintain accounts, audit trails, and regulatory records</li>
              <li>Improve website performance, security, and user experience</li>
              <li>Measure advertising effectiveness and prevent misuse or fraud</li>
            </ul>
            <p>We do not sell your personal or business contact data to third parties.</p>
          </section>

          <section className="privacy-policy__section" id="cookies">
            <h2>6. Cookies &amp; tracking technologies</h2>
            <p>
              Our website may use cookies, local storage, and similar technologies. These are small
              files or identifiers stored on your device that help the site function and help us
              understand usage.
            </p>
            <p>We may use:</p>
            <ul>
              <li>
                <strong>Essential cookies</strong> — required for basic site operation and security
              </li>
              <li>
                <strong>Analytics cookies</strong> — to understand page visits, traffic sources, and
                performance
              </li>
              <li>
                <strong>Advertising cookies</strong> — to measure ad conversions and improve campaign
                relevance (for example, Google Ads tags)
              </li>
            </ul>
            <p>
              You can control cookies through your browser settings. Blocking some cookies may limit
              certain site features. Where required, we will seek appropriate consent for non-essential
              cookies.
            </p>
          </section>

          <section className="privacy-policy__section" id="advertising">
            <h2>7. Advertising &amp; analytics</h2>
            <p>
              We may use third-party advertising and analytics services (such as Google Ads / Google
              tag) to measure enquiries generated from online campaigns. These providers may collect
              device and usage information according to their own privacy policies.
            </p>
            <p>
              Data collected through advertising tags is used to understand which campaigns lead to
              site visits or form submissions. We do not use advertising data to sell contact lists.
            </p>
          </section>

          <section className="privacy-policy__section" id="sharing">
            <h2>8. When we share information</h2>
            <p>We share information only when needed and only with:</p>
            <ul>
              <li>
                <strong>Logistics partners</strong> — name, phone, and delivery address to dispatch
                goods
              </li>
              <li>
                <strong>Payment processors or banks</strong> — to process payments you authorize
              </li>
              <li>
                <strong>IT and hosting providers</strong> — under confidentiality obligations for
                website hosting, email, or form delivery
              </li>
              <li>
                <strong>Professional advisers</strong> — accountants or auditors where required
              </li>
              <li>
                <strong>Authorities</strong> — when required by law, court order, or regulatory
                request
              </li>
            </ul>
            <p>We limit shared data to what is necessary for each specific purpose.</p>
          </section>

          <section className="privacy-policy__section" id="retention">
            <h2>9. How long we keep data</h2>
            <p>We retain information only as long as reasonably required for:</p>
            <ul>
              <li>Active enquiries and ongoing customer relationships</li>
              <li>Contract fulfilment, warranties, and dispute resolution</li>
              <li>Accounting, GST, tax, and statutory record-keeping under Indian law</li>
              <li>Security monitoring and fraud prevention</li>
            </ul>
            <p>
              When data is no longer needed, we delete, anonymize, or securely archive it in line
              with our internal retention schedule and legal obligations.
            </p>
          </section>

          <section className="privacy-policy__section" id="security">
            <h2>10. How we protect data</h2>
            <p>We apply reasonable administrative and technical safeguards, including:</p>
            <ul>
              <li>Access controls and password protection on business systems</li>
              <li>Secure storage of digital records with limited staff access</li>
              <li>Periodic review of access permissions and operational controls</li>
              <li>Use of reputable hosting and communication providers</li>
            </ul>
            <p>
              No online transmission or storage method is completely risk-free. If you believe your
              information has been compromised, contact us promptly using the details in Section 12.
            </p>
          </section>

          <section className="privacy-policy__section" id="rights">
            <h2>11. Your rights &amp; choices</h2>
            <p>Subject to applicable law, business contacts may request to:</p>
            <ul>
              <li>Access personal or business contact information we hold about your organization</li>
              <li>Correct inaccurate or outdated details</li>
              <li>Request deletion where we are not legally required to retain the data</li>
              <li>Opt out of promotional follow-ups (operational messages about active orders may still be sent)</li>
              <li>Raise concerns about how your data is handled</li>
            </ul>
            <p>
              To make a request, email us with your organization name and the nature of your request.
              We may verify your identity or authority before acting on it.
            </p>
          </section>

          <section className="privacy-policy__section" id="grievance">
            <h2>12. Grievance &amp; privacy contact</h2>
            <p>
              If you have questions, complaints, or requests regarding this Privacy Policy or how we
              handle your information, contact our privacy / grievance point:
            </p>
            <div className="privacy-policy__grievance">
              <p>
                <strong>Data protection contact</strong>
                <br />
                {strings.company.legalName}
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
              <p>
                <strong>Postal address:</strong> {strings.header.location}
              </p>
              <p className="privacy-policy__response-time">
                We aim to acknowledge privacy-related requests within <strong>7 business days</strong>{" "}
                and resolve them within a reasonable timeframe depending on the request type.
              </p>
            </div>
            <p>
              For general sales enquiries (not privacy-specific), visit our{" "}
              <Link to={paths.contact}>Reach us</Link> page.
            </p>
          </section>

          <section className="privacy-policy__section" id="children">
            <h2>13. Children&apos;s information</h2>
            <p>
              Our website and wholesale services are directed at businesses and authorized
              representatives. We do not knowingly collect personal information from children under
              18. If you believe a minor has submitted data through our site, contact us and we will
              take appropriate steps to delete it.
            </p>
          </section>

          <section className="privacy-policy__section" id="third-party">
            <h2>14. Third-party websites</h2>
            <p>
              Our site may link to external websites (for example, maps, catalogues, or social
              profiles). We are not responsible for the privacy practices of those sites. Please
              review their policies before sharing information with them.
            </p>
          </section>

          <section className="privacy-policy__section" id="changes">
            <h2>15. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy when our practices, technology, or legal requirements
              change. The effective date at the top of this page will be revised when updates are
              posted. Continued use of our website after changes constitutes acceptance of the updated
              policy.
            </p>
            <p>
              Related document:{" "}
              <Link to={paths.termsAndConditions}>{strings.nav.termsOfService}</Link>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
