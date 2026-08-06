import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./BottomNav.css";
import { strings } from "../../comms/strings";
import { paths } from "../../routes/paths";

type BottomNavProps = {
  onHome: () => void;
  onAbout: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onProducts: () => void;
  onContact: () => void;
};

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19.5c1.8-3.2 4.2-4.8 7-4.8s5.2 1.6 7 4.8" />
    </svg>
  );
}

function IconProducts() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8z" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </svg>
  );
}

function IconContact() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 5h16v14H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function IconCall() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function BottomNav({
  onHome,
  onAbout,
  onPrivacy,
  onTerms,
  onProducts,
  onContact,
}: BottomNavProps) {
  const { pathname } = useLocation();
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const phoneHref = `tel:${strings.header.phone}`;

  const isHome = pathname === paths.home;
  const isAboutSection =
    pathname === paths.about ||
    pathname === paths.privacyPolicy ||
    pathname === paths.termsAndConditions;
  const isContact = pathname === paths.contact;
  const isProducts =
    pathname === paths.products ||
    pathname.startsWith("/category/") ||
    pathname.startsWith("/product/") ||
    pathname === paths.bioMedicalWasteSolutions ||
    pathname === paths.bioMedicalWasteBin;

  useEffect(() => {
    setAboutMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!aboutMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAboutMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [aboutMenuOpen]);

  const chooseOption = (action: () => void) => {
    setAboutMenuOpen(false);
    action();
  };

  return (
    <>
      <nav className="bottom-nav" aria-label={strings.bottomNav.ariaLabel}>
        <button
          type="button"
          className={`bottom-nav__item${isHome ? " bottom-nav__item--active" : ""}`}
          onClick={onHome}
          aria-current={isHome ? "page" : undefined}
        >
          <IconHome />
          <span>{strings.bottomNav.home}</span>
        </button>

        <button
          type="button"
          className={`bottom-nav__item${isAboutSection || aboutMenuOpen ? " bottom-nav__item--active" : ""}`}
          onClick={() => setAboutMenuOpen(true)}
          aria-expanded={aboutMenuOpen}
          aria-haspopup="dialog"
        >
          <IconProfile />
          <span>{strings.bottomNav.profile}</span>
        </button>

        <button
          type="button"
          className={`bottom-nav__item${isProducts ? " bottom-nav__item--active" : ""}`}
          onClick={onProducts}
          aria-current={isProducts ? "page" : undefined}
        >
          <IconProducts />
          <span>{strings.bottomNav.products}</span>
        </button>

        <button
          type="button"
          className={`bottom-nav__item${isContact ? " bottom-nav__item--active" : ""}`}
          onClick={onContact}
          aria-current={isContact ? "page" : undefined}
        >
          <IconContact />
          <span>{strings.bottomNav.contact}</span>
        </button>

        <a href={phoneHref} className="bottom-nav__item bottom-nav__item--call">
          <IconCall />
          <span>{strings.bottomNav.call}</span>
        </a>
      </nav>

      {aboutMenuOpen && (
        <div className="bottom-nav-sheet" role="presentation">
          <button
            type="button"
            className="bottom-nav-sheet__backdrop"
            aria-label={strings.bottomNav.closeMenu}
            onClick={() => setAboutMenuOpen(false)}
          />
          <div
            className="bottom-nav-sheet__panel"
            role="dialog"
            aria-modal="true"
            aria-label={strings.bottomNav.aboutMenuTitle}
          >
            <p className="bottom-nav-sheet__title">{strings.bottomNav.aboutMenuTitle}</p>
            <ul className="bottom-nav-sheet__list">
              <li>
                <button
                  type="button"
                  className={`bottom-nav-sheet__option${pathname === paths.about ? " bottom-nav-sheet__option--active" : ""}`}
                  onClick={() => chooseOption(onAbout)}
                >
                  {strings.nav.aboutUs}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`bottom-nav-sheet__option${pathname === paths.privacyPolicy ? " bottom-nav-sheet__option--active" : ""}`}
                  onClick={() => chooseOption(onPrivacy)}
                >
                  {strings.nav.privacyPolicy}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`bottom-nav-sheet__option${pathname === paths.termsAndConditions ? " bottom-nav-sheet__option--active" : ""}`}
                  onClick={() => chooseOption(onTerms)}
                >
                  {strings.nav.termsOfService}
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="bottom-nav-sheet__cancel"
              onClick={() => setAboutMenuOpen(false)}
            >
              {strings.bottomNav.cancel}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
