import { strings } from "../comms/strings";
import { paths } from "../routes/paths";
import { siteMeta } from "./siteMeta";

export type RouteSeo = {
  title: string;
  description: string;
  path: string;
};

const legalName = strings.company.legalName;

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
};

export function getRouteSeo(pathname: string): RouteSeo {
  const normalized = pathname.replace(/\/$/, "") || paths.home;
  return (
    routeSeo[normalized] ?? {
      title: siteMeta.title,
      description: siteMeta.description,
      path: normalized,
    }
  );
}
