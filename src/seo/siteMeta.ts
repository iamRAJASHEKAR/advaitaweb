import { strings } from "../comms/strings";

export const siteUrl = "https://advaitahygiene.com";

export const siteMeta = {
  siteName: strings.brand.name,
  legalName: strings.company.legalName,
  title: `${strings.company.legalName} | Wholesale Hygiene Bengaluru`,
  description: `${strings.company.legalName}. ${strings.company.gstLabel} ${strings.company.gstNumber}. ${strings.company.cinLabel} ${strings.company.cinNumber}. Wholesale washroom, waste management & cleaning supplies. Bengaluru, Karnataka. Phone ${strings.header.phoneDisplay}. Email ${strings.header.mail}.`,
  keywords:
    "Advaita Hygiene Solutions Private Limited, wholesale hygiene Bengaluru, GST 29ABECA8426C1ZQ, washroom supplies, waste management, cleaning chemicals",
};

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: strings.company.legalName,
        alternateName: strings.brand.name,
        legalName: strings.company.legalName,
        taxID: strings.company.gstNumber,
        identifier: {
          "@type": "PropertyValue",
          name: "CIN",
          value: strings.company.cinNumber,
        },
        url: siteUrl,
        email: strings.header.mail,
        telephone: strings.header.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "92-A, ITI HBCS Layout, Chandra Layout Extension II Stage, Chandra Layout, Bengaluru, Karnataka 560039",
          addressLocality: "Bengaluru",
          postalCode: "560039",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        areaServed: ["Bengaluru", "Karnataka", "India"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: strings.company.legalName,
        alternateName: strings.brand.name,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: strings.company.legalName,
        alternateName: strings.brand.name,
        description: strings.businessOverview.intro,
        url: siteUrl,
        telephone: strings.header.phone,
        email: strings.header.mail,
        taxID: strings.company.gstNumber,
        identifier: {
          "@type": "PropertyValue",
          name: "CIN",
          value: strings.company.cinNumber,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "92-A, ITI HBCS Layout, Chandra Layout Extension II Stage, Chandra Layout, Bengaluru, Karnataka 560039",
          addressLocality: "Bengaluru",
          postalCode: "560039",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        areaServed: ["Bengaluru", "Karnataka", "India"],
        parentOrganization: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}
