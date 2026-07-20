import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CategoryPage.css";
import type { Product, ProductCategory } from "../../comms/types";
import { ProductGrid } from "../ProductGrid/ProductGrid";

const categoryIcons: Record<string, string> = {
  washroom: "🚰",
  waste: "♻️",
  chemicals: "🧪",
  outdoor: "🛒",
  "feminine-hygiene": "🌸",
  "pvc-curtains": "🚪",
};

type CategoryPageProps = {
  categories: ProductCategory[];
  products: Product[];
  onSelectProduct: (id: string) => void;
  onSeeAll: () => void;
  onGetQuote: () => void;
};

export function CategoryPage({
  categories,
  products,
  onSelectProduct,
  onSeeAll,
  onGetQuote,
}: CategoryPageProps) {
  const { id: categoryId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const category = categoryId
    ? categories.find((c) => c.id === categoryId) ?? null
    : null;
  const categoryProducts = category
    ? products.filter((p) => p.categoryId === category.id)
    : [];

  useEffect(() => {
    if (!categoryId || !category) {
      navigate("/", { replace: true });
    }
  }, [categoryId, category, navigate]);

  if (!category) {
    return null;
  }

  return (
    <section className="shell section category-page">
      <button
        type="button"
        className="category-page__back"
        onClick={() => navigate("/")}
      >
        ← Back to categories
      </button>

      <article className="category-block category-page__block">
        <div className="category-info">
          <div className="category-header">
            <span className="service-icon" aria-hidden>
              {categoryIcons[category.id] ?? "📦"}
            </span>
            <div>
              <h1 className="category-page__title">{category.name}</h1>
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
    </section>
  );
}
