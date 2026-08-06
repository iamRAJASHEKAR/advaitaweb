import { useEffect } from "react";
import { catalogData } from "../comms/comms";
import { strings } from "../comms/strings";
import { categoryUrl, paths, productUrl } from "../routes/paths";
import { siteUrl } from "./siteMeta";

const SCRIPT_ID = "products-page-jsonld";

export function useProductsJsonLd() {
  useEffect(() => {
    const categoryItems = catalogData.categories
      .map((category, index) => {
        const productCount = catalogData.products.filter(
          (product) => product.categoryId === category.id,
        ).length;
        if (productCount === 0) return null;

        return {
          "@type": "ListItem",
          position: index + 1,
          name: category.name,
          url: `${siteUrl}${categoryUrl(category.id)}`,
          description: category.tagline,
        };
      })
      .filter(Boolean);

    const featuredProducts = catalogData.products.slice(0, 12).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${siteUrl}${productUrl(product.id)}`,
    }));

    const payload = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${siteUrl}${paths.products}#webpage`,
          url: `${siteUrl}${paths.products}`,
          name: strings.productsPage.title,
          description: strings.productsPage.metaDescription,
          isPartOf: { "@id": `${siteUrl}/#website` },
          about: { "@id": `${siteUrl}/#organization` },
          mainEntity: {
            "@type": "ItemList",
            name: "Wholesale hygiene product categories",
            numberOfItems: categoryItems.length,
            itemListElement: categoryItems,
          },
        },
        {
          "@type": "ItemList",
          "@id": `${siteUrl}${paths.products}#featured-products`,
          name: "Featured wholesale hygiene products",
          numberOfItems: featuredProducts.length,
          itemListElement: featuredProducts,
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${siteUrl}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Products",
              item: `${siteUrl}${paths.products}`,
            },
          ],
        },
      ],
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
