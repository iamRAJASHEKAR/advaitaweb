import "./PrivacyPolicyPage.css";
import { strings } from "../../comms/strings";

export function PrivacyPolicyPage() {
  return (
    <section className="shell privacy-policy">
      <div className="privacy-policy__card">
        <header className="privacy-policy__header">
          <p className="eyebrow">Legal</p>
          <h1 className="privacy-policy__title">Privacy Policy</h1>
          <p className="privacy-policy__effective-date">Effective Date: February 28, 2026</p>
          <p className="privacy-policy__intro">
            At {strings.brand.name} ("Company", "we", "us", "our"), we are committed to protecting the privacy of
            business information shared with us. This Privacy Policy explains how we collect, use, store, and
            protect information when businesses interact with us through our website, phone, email, WhatsApp
            Business, and online advertising platforms.
          </p>
          <p className="privacy-policy__intro">
            This policy is intended for business customers only. We supply products and services to organizations
            and institutions, not individual consumers.
          </p>
        </header>

        <div className="privacy-policy__content">
          <section className="privacy-policy__section">
            <h2>1. Information We Collect</h2>
            <p>
              We collect business-related information necessary for inquiries, quotations, order processing,
              invoicing, delivery, and account management.
            </p>
            <ul>
              <li>Company name</li>
              <li>Contact person name and designation</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Business address and delivery address</li>
              <li>GST details and billing information</li>
              <li>Purchase requirements, inquiry details, and communication history</li>
              <li>Payment-related reference details (such as transaction IDs), where applicable</li>
            </ul>
            <p>We may collect this information when you:</p>
            <ul>
              <li>Submit forms on our website</li>
              <li>Contact us by phone, email, or WhatsApp Business</li>
              <li>Engage with our online advertisements (such as Google Ads or LinkedIn)</li>
              <li>Request quotations, product details, demos, callbacks, or commercial proposals</li>
            </ul>
          </section>

          <section className="privacy-policy__section">
            <h2>2. How We Use Information</h2>
            <p>We use collected information for legitimate business purposes, including:</p>
            <ul>
              <li>Responding to inquiries and sharing product/service information</li>
              <li>Preparing quotations, proposals, and pricing</li>
              <li>Processing purchase orders, invoicing, and delivery coordination</li>
              <li>Managing customer accounts and ongoing business communication</li>
              <li>Providing post-sales support and service follow-up</li>
              <li>Maintaining records for accounting, tax, audit, and compliance obligations</li>
              <li>Improving website performance, user experience, and marketing effectiveness</li>
              <li>Preventing fraud, misuse, and unauthorized activities</li>
            </ul>
            <p>We do not use customer information for unrelated purposes.</p>
          </section>

          <section className="privacy-policy__section">
            <h2>3. Data Sharing &amp; Disclosure</h2>
            <p>We do not sell customer data.</p>
            <p>We do not share customer data with third parties except in the following cases:</p>
            <ul>
              <li>Logistics and delivery partners: to fulfill orders and coordinate dispatch/delivery</li>
              <li>Approved payment providers or banks: to process payments</li>
              <li>
                Service providers: for website hosting, communication, analytics, or operational support under
                confidentiality and security obligations
              </li>
              <li>
                Legal or regulatory authorities: when disclosure is required by law, legal process, or government
                order
              </li>
            </ul>
            <p>Any sharing is limited to the minimum information required for the specific purpose.</p>
          </section>

          <section className="privacy-policy__section">
            <h2>4. Data Security Measures</h2>
            <p>
              We implement reasonable and standard security practices to protect business information from
              unauthorized access, misuse, alteration, or loss.
            </p>
            <ul>
              <li>Password-protected systems and controlled user access</li>
              <li>Secure storage of digital records</li>
              <li>Periodic review of access and operational controls</li>
              <li>Use of standard cybersecurity and administrative safeguards</li>
            </ul>
            <p>
              While we take appropriate precautions, no method of transmission or storage is completely risk-free.
              We continuously work to improve security practices.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>5. Cookies &amp; Tracking Technologies</h2>
            <p>Our website may use cookies and similar technologies for:</p>
            <ul>
              <li>Basic website functionality</li>
              <li>Performance monitoring and analytics</li>
              <li>Measuring advertising effectiveness, including Google Ads and LinkedIn campaigns</li>
            </ul>
            <p>
              These tools help us understand site usage and improve customer experience. You may manage cookie
              preferences through your browser settings. Disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>6. Data Retention Policy</h2>
            <p>We retain business information only as long as necessary for:</p>
            <ul>
              <li>Inquiry handling and customer relationship management</li>
              <li>Contractual and operational purposes</li>
              <li>Accounting, tax, invoicing, and audit requirements</li>
              <li>Compliance with applicable legal and regulatory obligations</li>
            </ul>
            <p>
              When information is no longer required, we take reasonable steps to securely delete, anonymize, or
              archive it as per internal policy and legal requirements.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>7. Third-Party Links</h2>
            <p>
              Our website or communications may contain links to third-party websites or platforms. We are not
              responsible for the privacy practices, content, or security of third-party sites. We encourage you to
              review their privacy policies before sharing information.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>8. Customer Rights</h2>
            <p>As a business customer, you may request to:</p>
            <ul>
              <li>Access or review the business information we hold about your organization</li>
              <li>Correct or update inaccurate information</li>
              <li>Request deletion of information, subject to legal or contractual retention requirements</li>
              <li>Withdraw consent for specific communications where applicable</li>
            </ul>
            <p>
              To exercise these rights, contact us using the details in the Contact Information section. We may
              verify identity or authorization before processing requests.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>9. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory
              changes. Updated versions will be posted on our website with the revised effective date. Continued
              interaction with us after updates constitutes acceptance of the revised policy.
            </p>
          </section>

          <section className="privacy-policy__section">
            <h2>10. Contact Information</h2>
            <p>For questions, requests, or concerns regarding this Privacy Policy or your business data, please contact:</p>
            <p className="privacy-policy__contact">
              <strong>{strings.brand.name}</strong>
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
