/** Canonical public URLs (Google Ads / search audit). */
export const paths = {
  home: "/",
  about: "/about",
  contact: "/contact",
  products: "/products",
  privacyPolicy: "/privacy-policy",
  termsAndConditions: "/terms-and-conditions",
  bioMedicalWasteBin: "/bio-medical-waste-bin.html",
  bioMedicalWasteSolutions: "/bio-medical-waste-solutions.html",
} as const;

const dedicatedProductPages: Record<string, string> = {
  "bio-medical-waste-bin": paths.bioMedicalWasteBin,
};

const dedicatedCategoryPages: Record<string, string> = {
  "bio-medical-waste-solutions": paths.bioMedicalWasteSolutions,
};

export function productPath(productId: string): string {
  return `/product/${productId}`;
}

export function categoryPath(categoryId: string): string {
  return `/category/${categoryId}`;
}

export function productUrl(productId: string): string {
  return dedicatedProductPages[productId] ?? productPath(productId);
}

export function categoryUrl(categoryId: string): string {
  return dedicatedCategoryPages[categoryId] ?? categoryPath(categoryId);
}

/** Category page with a specific product pre-selected in the master-detail view. */
export function categoryProductUrl(categoryId: string, productId: string): string {
  return `${categoryUrl(categoryId)}?product=${encodeURIComponent(productId)}`;
}
