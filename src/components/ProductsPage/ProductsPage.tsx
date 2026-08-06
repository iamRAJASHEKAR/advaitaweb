import "./ProductsPage.css";
import type { Product, ProductCategory } from "../../comms/types";
import { strings } from "../../comms/strings";
import { useProductsJsonLd } from "../../seo/useProductsJsonLd";

const categoryIcons: Record<string, string> = {
  washroom: "🚰",
  waste: "♻️",
  chemicals: "🧪",
  outdoor: "🛒",
  "feminine-hygiene": "🌸",
  "pvc-curtains": "🚪",
  "bio-medical-waste-solutions": "🏥",
};

type ProductsPageProps = {
  categories: ProductCategory[];
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onSelectCategory: (categoryId: string) => void;
};

export function ProductsPage({
  categories,
  products,
  onSelectProduct,
  onSelectCategory,
}: ProductsPageProps) {
  useProductsJsonLd();

  return (
    <section className="shell section products-page" aria-labelledby="products-page-title">
      <header className="products-page__header">
        <p className="eyebrow">{strings.productsPage.eyebrow}</p>
        <h1 id="products-page-title" className="products-page__title">
          {strings.productsPage.title}
        </h1>
        <p className="products-page__body">{strings.productsPage.body}</p>
      </header>

      <div className="products-page__sections">
        {categories.map((category) => {
          const categoryProducts = products.filter(
            (product) => product.categoryId === category.id,
          );

          if (categoryProducts.length === 0) return null;

          return (
            <section
              key={category.id}
              className="products-page__category"
              aria-labelledby={`products-cat-${category.id}`}
            >
              <div className="products-page__category-head">
                <h2
                  id={`products-cat-${category.id}`}
                  className="products-page__category-title"
                >
                  <button
                    type="button"
                    className="products-page__category-title-btn"
                    onClick={() => onSelectCategory(category.id)}
                  >
                    <span className="products-page__category-icon" aria-hidden>
                      {categoryIcons[category.id] ?? "📦"}
                    </span>
                    <span className="products-page__category-name">{category.name}</span>
                  </button>
                </h2>
                <button
                  type="button"
                  className="products-page__view-all"
                  onClick={() => onSelectCategory(category.id)}
                  aria-label={`${strings.productsPage.viewAllLabel} ${category.name}`}
                >
                  {strings.productsPage.viewAll}
                </button>
              </div>

              {category.tagline ? (
                <p className="products-page__category-tagline">{category.tagline}</p>
              ) : null}

              <div className="products-page__rail" role="list">
                {categoryProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    className="products-page__card"
                    role="listitem"
                    onClick={() => onSelectProduct(product.id)}
                  >
                    <span className="products-page__card-image">
                      <img
                        src={product.thumb ?? product.images[0]}
                        alt={`${product.name} — wholesale hygiene product`}
                      />
                    </span>
                    <span className="products-page__card-body">
                      <h3 className="products-page__card-name">{product.name}</h3>
                      <span className="products-page__card-price">
                        ₹ {product.price.toLocaleString()}{" "}
                        {product.priceUnit ?? strings.productCard.priceSuffix}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
