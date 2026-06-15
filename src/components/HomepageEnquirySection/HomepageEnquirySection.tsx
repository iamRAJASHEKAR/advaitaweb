import { Link } from "react-router-dom";
import { strings } from "../../comms/strings";
import { paths } from "../../routes/paths";
import { LeadCaptureForm } from "../LeadCapture/LeadCapture";
import "./HomepageEnquirySection.css";

type HomepageEnquirySectionProps = {
  onGetQuote?: () => void;
};

export function HomepageEnquirySection({ onGetQuote }: HomepageEnquirySectionProps) {
  return (
    <section className="shell homepage-enquiry" id="bulk-pricing" aria-labelledby="bulk-pricing-title">
      <div className="homepage-enquiry__card">
        <div className="homepage-enquiry__intro">
          <p className="eyebrow">Wholesale enquiry</p>
          <h2 id="bulk-pricing-title">Request bulk pricing</h2>
          <p className="homepage-enquiry__text">{strings.homepageCompliance.shortIntro}</p>
          <p className="homepage-enquiry__contact">
            <a href={`tel:${strings.header.phone}`}>{strings.header.phoneDisplay}</a>
            {" · "}
            <a href={`mailto:${strings.header.mail}`}>{strings.header.mail}</a>
          </p>
          <nav className="homepage-enquiry__policies" aria-label="Legal pages">
            <Link to={paths.privacyPolicy}>{strings.nav.privacyPolicy}</Link>
            <Link to={paths.termsAndConditions}>{strings.nav.termsOfService}</Link>
            <Link to={paths.contact}>{strings.nav.contactUs}</Link>
          </nav>
          {onGetQuote ? (
            <button type="button" className="btn btn--primary homepage-enquiry__quote-btn" onClick={onGetQuote}>
              {strings.closing.primaryCta}
            </button>
          ) : null}
        </div>
        <LeadCaptureForm variant="homepage" />
      </div>
    </section>
  );
}
