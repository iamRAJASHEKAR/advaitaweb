import "./CategoryGridSection.css";
import type { ProductCategory } from "../../comms/types";
import { strings } from "../../comms/strings";

import washingmanageImg from "../../assets/washingmanage.png";
import wastemanageImg from "../../assets/wastemanage.png";
import chemicalmanageImg from "../../assets/chemicalmanage.png";
import outdoormanageImg from "../../assets/outdoormanage.png";

const categoryImages: Record<string, string> = {
  washroom: washingmanageImg,
  waste: wastemanageImg,
  chemicals: chemicalmanageImg,
  outdoor: outdoormanageImg,
};

export type CategoryGridSectionProps = {
  categories: ProductCategory[];
  onSelectCategory: (categoryId: string) => void;
};

export function CategoryGridSection({
  categories,
  onSelectCategory,
}: CategoryGridSectionProps) {
  return (
    <section id="solutions" className="shell section category-grid-section">
      <div className="section__header">
        <div>
          <p className="eyebrow">{strings.solutions.eyebrow}</p>
          <h2 className="section__title">{strings.solutions.title}</h2>
          <p className="section__body">{strings.solutions.body}</p>
        </div>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            className="category-grid-card"
            onClick={() => onSelectCategory(category.id)}
          >
            <div className="category-grid-card__image-wrap">
              <img
                src={categoryImages[category.id]}
                alt=""
                className="category-grid-card__img"
              />
            </div>
            <div className="category-grid-card__content">
              <h3 className="category-grid-card__title">{category.name}</h3>
              <p className="category-grid-card__tagline">{category.tagline}</p>
              <span className="category-grid-card__cta">View products →</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
