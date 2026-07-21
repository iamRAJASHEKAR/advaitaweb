import { useEffect } from "react";
import { strings } from "../comms/strings";
import { siteUrl } from "./siteMeta";

const SCRIPT_ID = "about-page-jsonld";

export function useAboutJsonLd() {
  useEffect(() => {
    const payload = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: strings.company.legalName,
      alternateName: strings.brand.name,
      url: `${siteUrl}/about`,
      foundingDate: "2026-02-07",
      taxID: strings.company.gstNumber,
      identifier: {
        "@type": "PropertyValue",
        name: "CIN",
        value: strings.company.cinNumber,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: strings.header.location,
        addressLocality: "Bengaluru",
        postalCode: "560039",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      email: strings.header.mail,
      telephone: strings.header.phone,
      founder: strings.aboutPage.directors.map((director) => ({
        "@type": "Person",
        name: director.name,
        jobTitle: director.role,
      })),
      employee: {
        "@type": "Person",
        name: strings.companyProfile.companyCeo,
        jobTitle: "Chief Executive Officer",
      },
    };

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(payload);

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, []);
}
