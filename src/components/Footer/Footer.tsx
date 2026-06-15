import { Link } from "react-router-dom";
import "./Footer.css";
import { strings } from "../../comms/strings";
import { paths } from "../../routes/paths";
import { LegalIdentityNotice } from "../LegalIdentityNotice/LegalIdentityNotice";
import { FooterSocialLinks } from "./FooterSocialLinks";
import { GetDirectionsLink } from "../GetDirectionsLink/GetDirectionsLink";

type FooterProps = {
  onHome: () => void;
  onCatalog: () => void;
  onProducts: () => void;
};

export function Footer({
  onHome,
  onCatalog,
  onProducts,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner shell">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <p className="site-footer__name">{strings.brand.name}</p>
            <LegalIdentityNotice />
            <p className="site-footer__tagline">{strings.footer.tagline}</p>
            <p className="site-footer__service-area">
              <strong>Service area:</strong> {strings.company.serviceArea}
            </p>
            <FooterSocialLinks />
          </div>

          <div className="site-footer__nav-group">
            <nav className="site-footer__nav" aria-label="Footer quick links">
              <p className="site-footer__heading">{strings.footer.linksHeading}</p>
              <ul className="site-footer__links">
                <li>
                  <button type="button" className="site-footer__link" onClick={onHome}>
                    Home
                  </button>
                </li>
                <li>
                  <Link to={paths.about} className="site-footer__link">
                    {strings.nav.aboutUs}
                  </Link>
                </li>
                <li>
                  <button type="button" className="site-footer__link" onClick={onProducts}>
                    {strings.nav.products}
                  </button>
                </li>
                <li>
                  <button type="button" className="site-footer__link" onClick={onCatalog}>
                    {strings.nav.catalogue}
                  </button>
                </li>
                <li>
                  <Link to={paths.contact} className="site-footer__link">
                    {strings.nav.contactUs}
                  </Link>
                </li>
              </ul>
            </nav>

            <nav className="site-footer__nav" aria-label="Footer legal links">
              <p className="site-footer__heading">{strings.footer.legalHeading}</p>
              <ul className="site-footer__links">
                <li>
                  <Link to={paths.privacyPolicy} className="site-footer__link">
                    {strings.nav.privacyPolicy}
                  </Link>
                </li>
                <li>
                  <Link to={paths.termsAndConditions} className="site-footer__link">
                    {strings.nav.termsOfService}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <address className="site-footer__contact" aria-label="Business contact">
            <p className="site-footer__heading">{strings.footer.contactHeading}</p>
            <p className="site-footer__contact-line">{strings.header.location}</p>
            <p className="site-footer__contact-line">
              <a href={`tel:${strings.header.phone}`}>{strings.header.phoneDisplay}</a>
            </p>
            <p className="site-footer__contact-line">
              <a href={`mailto:${strings.header.mail}`}>{strings.header.mail}</a>
            </p>
            <GetDirectionsLink variant="footer" />
          </address>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            {strings.footer.copyright(year, strings.company.legalName)}
          </p>
          <p className="site-footer__disclaimer">{strings.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
