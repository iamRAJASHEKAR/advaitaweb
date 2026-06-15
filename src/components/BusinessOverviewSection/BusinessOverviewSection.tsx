import { Link } from "react-router-dom";
import type { ProductCategory } from "../../comms/types";
import { strings } from "../../comms/strings";
import { paths } from "../../routes/paths";
import { LegalIdentityNotice } from "../LegalIdentityNotice/LegalIdentityNotice";
import "./BusinessOverviewSection.css";

type BusinessOverviewSectionProps = {
  categories: ProductCategory[];
  onAbout: () => void;
};

export function BusinessOverviewSection({
  categories,
  onAbout,
}: BusinessOverviewSectionProps) {
  return (
    <section className="shell section business-overview" id="about-business" aria-labelledby="about-business-title">
      <div className="business-overview__card">
        <p className="eyebrow">{strings.businessOverview.eyebrow}</p>
        <h2 id="about-business-title" className="section__title">
          {strings.businessOverview.title}
        </h2>
        <LegalIdentityNotice variant="page" />
        <p className="section__body">{strings.businessOverview.intro}</p>

        <div className="business-overview__grid">
          <div className="business-overview__block">
            <h3>{strings.businessOverview.serviceAreaHeading}</h3>
            <p>{strings.company.serviceArea}</p>
          </div>

          <div className="business-overview__block">
            <h3>{strings.businessOverview.categoriesHeading}</h3>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <strong>{category.name}</strong> — {category.tagline}
                </li>
              ))}
            </ul>
          </div>

          <div className="business-overview__block business-overview__contact">
            <h3>{strings.businessOverview.contactHeading}</h3>
            <p>
              <strong>{strings.company.legalName}</strong>
            </p>
            <p>
              {strings.company.gstLabel} {strings.company.gstNumber}
              <br />
              {strings.company.cinLabel} {strings.company.cinNumber}
            </p>
            <p>
              <strong>Address:</strong> {strings.header.location}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${strings.header.phone}`}>{strings.header.phoneDisplay}</a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${strings.header.mail}`}>{strings.header.mail}</a>
            </p>
          </div>

          <div className="business-overview__block">
            <h3>{strings.nav.aboutUs}</h3>
            <p>
              Learn more about our wholesale operations, registered business details, and how we support
              B2B buyers across Karnataka and India.
            </p>
            <p>
              <button type="button" className="btn btn--outline" onClick={onAbout}>
                {strings.nav.aboutUs}
              </button>{" "}
              <Link to={paths.contact} className="btn btn--ghost">
                {strings.nav.contactUs}
              </Link>
            </p>
          </div>
        </div>

        <p className="business-overview__policies">{strings.businessOverview.policiesNote}</p>
        <div className="business-overview__policy-links">
          <Link to={paths.privacyPolicy}>{strings.nav.privacyPolicy}</Link>
          <Link to={paths.termsAndConditions}>{strings.nav.termsOfService}</Link>
          <Link to={paths.contact}>{strings.nav.contactUs}</Link>
        </div>
      </div>
    </section>
  );
}
