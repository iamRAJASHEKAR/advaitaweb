import "./ProductGrid.css";
import type { Product } from "../../comms/types";
import { strings } from "../../comms/strings";

/** Abbreviate material for compact display (e.g. "Stainless Steel" → "SS", "ABS" → "ABS"). */
function compactMaterial(m: string): string {
  const s = m.trim();
  if (s.toUpperCase().startsWith("STAINLESS")) return "SS";
  if (s.toUpperCase().startsWith("ABS")) return "ABS";
  if (s.includes("BKC") || s.includes("QAC")) return "BKC";
  if (s.toLowerCase().includes("surfactant")) return "Surf.";
  if (s.toUpperCase().startsWith("IPA")) return "IPA";
  if (s.toLowerCase().startsWith("paper")) return "Paper";
  if (s.toLowerCase().includes("contract")) return "Contract";
  if (s.toUpperCase().startsWith("HDPE")) return "HDPE";
  const first = s.split(/[\s+]+/)[0];
  return first.length > 4 ? `${first.slice(0, 4)}.` : first;
}

/** Shorten structure for compact display (e.g. "Wall Mount, Auto Sensor" → "Auto"). */
function compactStructure(s: string): string {
  const t = s.trim().toLowerCase();
  if (t.includes("auto") || t.includes("sensor")) return "Auto";
  if (t.includes("manual") || (t.includes("wall") && t.includes("mount") && !t.includes("auto"))) return "Manual";
  if (t.includes("pedal") || t.includes("foot")) return "Pedal";
  if (t.includes("round") && t.includes("open")) return "Round Open";
  if (t.includes("hdpe")) return "HDPE";
  if (t.includes("subscription")) return "Sub.";
  if (t.includes("quarterly")) return "Quarterly";
  const first = s.trim().split(/[,\s]+/)[0];
  return first.length > 8 ? `${first.slice(0, 7)}.` : first;
}

type ProductGridProps = {
  products: Product[];
  onSelect: (id: string) => void;
  onSeeAll: () => void;
  onGetQuote: () => void;
};

export function ProductGrid({
  products,
  onSelect,
  onSeeAll,
  onGetQuote,
}: ProductGridProps) {
  const visibleProducts = products.slice(0, 9);

  return (
    <div className="products-grid">
      {visibleProducts.map((product) => (
        <article
          key={product.id}
          className="product-card-h"
          onClick={() => onSelect(product.id)}
        >
          <div className="product-card__image">
            <img src={product.images[0]} alt={product.name} />
          </div>
          <div className="product-card__body">
            <p className="product-card__name">{product.name}</p>
            <p className="product-card__price">
              ₹ {product.price.toLocaleString()} {strings.productCard.priceSuffix}
            </p>
            <p className="product-card__meta product-card__meta--compact">
              {compactMaterial(product.material)}.{compactStructure(product.structure)}
            </p>
            <p className="product-card__meta product-card__meta--sizes">
              {product.sizes?.length
                ? product.sizes.join(" / ")
                : product.size}
            </p>
            <button
              type="button"
              className="product-card__more"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product.id);
              }}
            >
              {strings.productCard.moreCta}
            </button>
            <div className="product-card__actions">
              <a
                href={`tel:${strings.productCard.callNumber}`}
                className="btn btn--ghost btn--sm product-card__call-btn"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${strings.productCard.detailsCta} ${strings.productCard.callNumber}`}
              >
                <svg className="product-card__call-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {strings.productCard.detailsCta}
              </a>
              <button
                className="btn btn--primary btn--sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onGetQuote();
                }}
              >
                {strings.productCard.quoteCta}
              </button>
            </div>
          </div>
        </article>
      ))}
      <button className="product-card-h product-card--cta" onClick={onSeeAll}>
        <div className="product-card__image product-card__image--cta">
          <span className="product-card__cta-icon">→</span>
        </div>
        <div className="product-card__body">
          <p className="product-card__name">{strings.productCard.seeAllTitle}</p>
          <p className="product-card__meta">
            {strings.productCard.seeAllSubtitle}
          </p>
        </div>
      </button>
    </div>
  );
}
