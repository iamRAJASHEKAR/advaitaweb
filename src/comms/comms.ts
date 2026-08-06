import heroImage from "../assets/hygienehome.svg";
import housekeepingImage from "../assets/housekeeping.svg";
import cataloguePdf from "../assets/catalogue.pdf";
import catalogJson from "./catalog.json";
import type {
  Differentiator,
  HeroSlide,
  Industry,
  ProcessStep,
  Product,
  ProductCategory,
  TrustMetric,
} from "./types";
import { assets } from "../assets/assets";

const productImages = import.meta.glob("../assets/product-*.svg", {
  eager: true,
  as: "url",
});

const getProductImage = (id: string) => {
  const key = `../assets/product-${id}.svg`;
  const image = productImages[key];
  if (typeof image === "string") {
    return image;
  }
  return heroImage;
};

const heroImages: Record<string, string> = {
  hero: heroImage,
  housekeeping: housekeepingImage,
};

type CatalogJson = {
  heroSlides: { id: string; imageKey: string; title: string; subtitle: string }[];
  trustMetrics: TrustMetric[];
  differentiators: Differentiator[];
  industries: Industry[];
  processSteps: ProcessStep[];
  categories: ProductCategory[];
  products: Omit<Product, "images" | "thumb">[];
};

const catalog = catalogJson as CatalogJson;

export const catalogData = {
  heroSlides: catalog.heroSlides.map(
    (slide): HeroSlide => ({
      id: slide.id,
      image: heroImages[slide.imageKey] ?? heroImage,
      title: slide.title,
      subtitle: slide.subtitle,
    }),
  ),
  trustMetrics: catalog.trustMetrics,
  differentiators: catalog.differentiators,
  industries: catalog.industries,
  processSteps: catalog.processSteps,
  categories: catalog.categories,
  products: catalog.products.map(
    (product): Product => ({
      ...product,
      images: product.imagename
        ? assets[product.imagename]
        : [getProductImage(product.id)],
      thumb: product.thumbname
        ? assets[product.thumbname][0]
        : undefined,
    }),
  ),
};

export const catalogUrl = cataloguePdf;
