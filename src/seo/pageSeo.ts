import { catalogData } from "../comms/comms";
import { strings } from "../comms/strings";
import { categoryUrl, paths, productUrl } from "../routes/paths";
import { siteMeta } from "./siteMeta";

export type RouteSeo = {
  title: string;
  description: string;
  path: string;
};

const legalName = strings.company.legalName;

export function getProductSeo(productId: string): RouteSeo | null {
  const product = catalogData.products.find((p) => p.id === productId);
  if (!product) {
    return null;
  }

  const canonicalPath = productUrl(productId);
  const description =
    product.description.length > 155
      ? `${product.description.slice(0, 152)}…`
      : product.description;

  return {
    title: `${product.name} | ${legalName}`,
    description: `${description} Wholesale pricing from Bengaluru. Call ${strings.header.phoneDisplay}.`,
    path: canonicalPath,
  };
}

export function getCategorySeo(categoryId: string): RouteSeo | null {
  const category = catalogData.categories.find((c) => c.id === categoryId);
  if (!category) {
    return null;
  }

  return {
    title: `${category.name} | ${legalName}`,
    description: `${category.tagline} ${category.lead}. Wholesale supply across Bengaluru and India.`,
    path: categoryUrl(categoryId),
  };
}

export const routeSeo: Record<string, RouteSeo> = {
  [paths.home]: {
    title: siteMeta.title,
    description: siteMeta.description,
    path: paths.home,
  },
  [paths.privacyPolicy]: {
    title: `Privacy Policy | ${legalName}`,
    description:
      "How Advaita Hygiene Solutions collects, uses, stores, and protects business data: cookies, consent, retention, your rights, and privacy contact details.",
    path: paths.privacyPolicy,
  },
  [paths.termsAndConditions]: {
    title: `Terms and Conditions | ${legalName}`,
    description:
      "B2B terms for wholesale orders: quotations, payment, delivery, cancellation, warranty, liability, returns, and jurisdiction for Advaita Hygiene Solutions.",
    path: paths.termsAndConditions,
  },
  [paths.about]: {
    title: `About Us | ${legalName}`,
    description:
      "IndiaMART-style company profile: incorporation 7 Feb 2026, CEO P Rajashekar Reddy, directors, GSTIN, B2B wholesale model, warehouse dispatch, products, payment and shipment modes.",
    path: paths.about,
  },
  [paths.contact]: {
    title: `Reach us | ${legalName}`,
    description:
      "Contact Advaita Hygiene Solutions for wholesale enquiries, bulk pricing, product availability, and business support in Bengaluru and across India.",
    path: paths.contact,
  },
  [paths.products]: {
    title: `Wholesale Hygiene Products Catalogue | ${legalName}`,
    description: strings.productsPage.metaDescription,
    path: paths.products,
  },
  [paths.bioMedicalWasteBin]: {
    title: `Bio Medical Waste Bin | ${legalName}`,
    description:
      "Wholesale bio medical waste bins for hospitals, clinics, and labs. Foot-pedal, color-coded, BMW Rules compliant. Yellow, red, and blue lids. Bengaluru dispatch.",
    path: paths.bioMedicalWasteBin,
  },
  [paths.bioMedicalWasteSolutions]: {
    title: `Bio Medical Waste Solutions | ${legalName}`,
    description:
      "Bio medical waste solutions — color-coded waste bins, foot-pedal biohazard containers, and hospital-grade disposal units. Wholesale pricing from Bengaluru.",
    path: paths.bioMedicalWasteSolutions,
  },
};

export function getRouteSeo(pathname: string): RouteSeo {
  const normalized = pathname.replace(/\/$/, "") || paths.home;

  if (routeSeo[normalized]) {
    return routeSeo[normalized];
  }

  const productMatch = normalized.match(/^\/product\/([^/]+)$/);
  if (productMatch) {
    return (
      getProductSeo(productMatch[1]) ?? {
        title: siteMeta.title,
        description: siteMeta.description,
        path: normalized,
      }
    );
  }

  const categoryMatch = normalized.match(/^\/category\/([^/]+)$/);
  if (categoryMatch) {
    return (
      getCategorySeo(categoryMatch[1]) ?? {
        title: siteMeta.title,
        description: siteMeta.description,
        path: normalized,
      }
    );
  }

  return {
    title: siteMeta.title,
    description: siteMeta.description,
    path: normalized,
  };
}
