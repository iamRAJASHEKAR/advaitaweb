import "./Footer.css";
import { strings } from "../../comms/strings";

type FooterProps = {
  onHome: () => void;
  onAbout: () => void;
  onContact: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onCatalog: () => void;
  onProducts: () => void;
};

export function Footer({
  onHome,
  onAbout,
  onContact,
  onPrivacy,
  onTerms,
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
            <p className="site-footer__legal-name">{strings.company.legalName}</p>
            <p className="site-footer__tagline">{strings.footer.tagline}</p>
            <p className="site-footer__gst">
              {strings.company.gstLabel}: {strings.company.gstNumber}
            </p>
          </div>

          <nav className="site-footer__nav" aria-label="Footer quick links">
            <p className="site-footer__heading">{strings.footer.linksHeading}</p>
            <ul className="site-footer__links">
              <li>
                <button type="button" className="site-footer__link" onClick={onHome}>
                  Home
                </button>
              </li>
              <li>
                <button type="button" className="site-footer__link" onClick={onAbout}>
                  {strings.nav.aboutUs}
                </button>
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
                <button type="button" className="site-footer__link" onClick={onContact}>
                  {strings.nav.contactUs}
                </button>
              </li>
            </ul>
          </nav>

          <nav className="site-footer__nav" aria-label="Footer legal links">
            <p className="site-footer__heading">{strings.footer.legalHeading}</p>
            <ul className="site-footer__links">
              <li>
                <button type="button" className="site-footer__link" onClick={onPrivacy}>
                  {strings.nav.privacyPolicy}
                </button>
              </li>
              <li>
                <button type="button" className="site-footer__link" onClick={onTerms}>
                  {strings.nav.termsOfService}
                </button>
              </li>
            </ul>
          </nav>

          <address className="site-footer__contact" aria-label="Business contact">
            <p className="site-footer__heading">{strings.footer.contactHeading}</p>
            <p className="site-footer__contact-line">{strings.header.location}</p>
            <p className="site-footer__contact-line">
              <a href={`tel:${strings.header.phone}`}>{strings.header.phoneDisplay}</a>
            </p>
            <p className="site-footer__contact-line">
              <a href={`mailto:${strings.header.mail}`}>{strings.header.mail}</a>
            </p>
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
