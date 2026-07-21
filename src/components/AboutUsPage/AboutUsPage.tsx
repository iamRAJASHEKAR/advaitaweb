import { Link } from "react-router-dom";
import { useEffect } from "react";
import { catalogData } from "../../comms/comms";
import { strings } from "../../comms/strings";
import { paths } from "../../routes/paths";
import { CompanyFactsheet } from "../CompanyFactsheet/CompanyFactsheet";
import { useAboutJsonLd } from "../../seo/useAboutJsonLd";
import { getRouteSeo } from "../../seo/pageSeo";
import { usePageSeo } from "../../seo/usePageSeo";
import "../PrivacyPolicyPage/PrivacyPolicyPage.css";
import "./AboutUsPage.css";

export function AboutUsPage() {
  const { company, aboutPage, companyProfile } = strings;

  usePageSeo(getRouteSeo(paths.about));
  useAboutJsonLd();

  useEffect(() => {
    document.getElementById("crawlable-home-summary")?.setAttribute("hidden", "");
    document.getElementById("crawlable-about-page")?.removeAttribute("hidden");
  }, []);

  return (
    <section className="shell privacy-policy about-page" id="about-us">
      <div className="privacy-policy__card">
        <header className="privacy-policy__header about-page__hero">
          <p className="eyebrow">{aboutPage.eyebrow}</p>
          <h1 className="privacy-policy__title">{company.legalName}</h1>
          <p className="about-page__location">Chandra Layout, Bengaluru, Karnataka · GST registered supplier</p>
          <p className="privacy-policy__intro">
            Trading as <strong>{strings.brand.name}</strong> — {strings.brand.subtitleLine2}
          </p>
        </header>

        <CompanyFactsheet />

        <div className="privacy-policy__content">
          <section className="privacy-policy__section">
            <h2>{companyProfile.aboutCompanyHeading}</h2>
            <p>{companyProfile.aboutCompanyBody}</p>
            <p>{aboutPage.historyBody}</p>
          </section>

          <section className="privacy-policy__section">
            <h2>{companyProfile.managementHeading}</h2>
            <ul className="about-page__directors">
              {aboutPage.directors.map((director) => (
                <li key={director.name}>
                  <strong>{director.name}</strong>
                  <span>{director.role}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="privacy-policy__section">
            <h2>{aboutPage.modelHeading}</h2>
            <p>{aboutPage.modelBody}</p>
            <ul>
              {aboutPage.modelPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-policy__section">
            <h2>{aboutPage.productsHeading}</h2>
            <p>Explore our wholesale product categories:</p>
            <div className="about-page__product-grid">
              {catalogData.categories.map((category) => (
                <article key={category.id} className="about-page__product-card">
                  <h3>{category.name}</h3>
                  <p>{category.tagline}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="privacy-policy__section">
            <h2>{aboutPage.sectorsHeading}</h2>
            <p>{aboutPage.sectorsBody}</p>
            <ul className="about-page__sectors">
              {catalogData.industries.map((industry) => (
                <li key={industry.name}>{industry.name}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-policy__section">
            <h2>{companyProfile.infrastructureHeading}</h2>
            <p>{companyProfile.infrastructureBody}</p>
          </section>

          <section className="privacy-policy__section about-page__commerce">
            <div>
              <h2>{companyProfile.paymentHeading}</h2>
              <ul>
                {companyProfile.paymentModes.map((mode) => (
                  <li key={mode}>{mode}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>{companyProfile.shipmentHeading}</h2>
              <ul>
                {companyProfile.shipmentModes.map((mode) => (
                  <li key={mode}>{mode}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="privacy-policy__section">
            <h2>{strings.businessOverview.serviceAreaHeading}</h2>
            <p>{company.serviceArea}</p>
          </section>

          <section className="privacy-policy__section">
            <h2>{aboutPage.fulfillmentHeading}</h2>
            <p>{aboutPage.fulfillmentIntro}</p>
            <ol className="about-page__fulfillment">
              {aboutPage.fulfillmentSteps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="privacy-policy__section">
            <h2>{aboutPage.operationsHeading}</h2>
            <ul>
              {aboutPage.operationsPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="privacy-policy__section">
            <h2>Contact &amp; quotations</h2>
            <p>
              Phone{" "}
              <a className="privacy-policy__contact-link" href={`tel:${strings.header.phone}`}>
                {strings.header.phoneDisplay}
              </a>
              {" · "}
              Email{" "}
              <a className="privacy-policy__contact-link" href={`mailto:${strings.header.mail}`}>
                {strings.header.mail}
              </a>
            </p>
            <p>
              <Link to={paths.contact}>Reach us</Link> for wholesale quotes ·{" "}
              <Link to={paths.privacyPolicy}>{strings.nav.privacyPolicy}</Link> ·{" "}
              <Link to={paths.termsAndConditions}>{strings.nav.termsOfService}</Link>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
