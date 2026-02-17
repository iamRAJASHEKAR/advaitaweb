import "./SolutionsSection.css";
import type { Product, ProductCategory } from "../../comms/types";
import { strings } from "../../comms/strings";
import { ProductGrid } from "../ProductGrid/ProductGrid";

type SolutionsSectionProps = {
  categories: ProductCategory[];
  products: Product[];
  onSelectProduct: (id: string) => void;
  onSeeAll: () => void;
  onGetQuote: () => void;
};

const categoryIcons: Record<string, string> = {
  washroom: "🚰",
  waste: "♻️",
  chemicals: "🧪",
};

export function SolutionsSection({
  categories,
  products,
  onSelectProduct,
  onSeeAll,
  onGetQuote,
}: SolutionsSectionProps) {
  return (
    <section id="solutions" className="shell section solutions-stack">
      <div className="section__header">
        <div>
          <p className="eyebrow">{strings.solutions.eyebrow}</p>
          <h2 className="section__title">{strings.solutions.title}</h2>
          <p className="section__body">{strings.solutions.body}</p>
        </div>
      </div>

      <div className="solutions-list">
        {categories.map((category) => {
          const categoryProducts = products.filter(
            (product) => product.categoryId === category.id,
          );

          return (
            <article key={category.id} className="category-block">
              <div className="category-info">
                <div className="category-header">
                  <span className="service-icon" aria-hidden>
                    {categoryIcons[category.id]}
                  </span>
                  <div>
                    <h3 className="card__title">{category.name}</h3>
                    <p className="card__subtitle">{category.tagline}</p>
                  </div>
                </div>
                <ul className="list list--bullets">
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <ProductGrid
                products={categoryProducts}
                onSelect={onSelectProduct}
                onSeeAll={onSeeAll}
                onGetQuote={onGetQuote}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
