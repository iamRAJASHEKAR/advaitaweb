import type { Product } from "../../comms/types";
import { strings } from "../../comms/strings";
import { getProductSpecs } from "../../comms/productSpecs";
import "./ProductMobileCard.css";

const PREVIEW_SPEC_COUNT = 5;

type ProductMobileCardProps = {
  product: Product;
  onViewDetails: () => void;
  onGetQuote: () => void;
};

export function ProductMobileCard({
  product,
  onViewDetails,
  onGetQuote,
}: ProductMobileCardProps) {
  const previewSpecs = getProductSpecs(product).slice(0, PREVIEW_SPEC_COUNT);

  const stop = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <article
      className="product-mobile-card"
      onClick={onViewDetails}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onViewDetails();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
    >
      <header className="product-mobile-card__header">
        <h2 className="product-mobile-card__title">{product.name}</h2>
        <p className="product-mobile-card__price">
          ₹ {product.price.toLocaleString()}{" "}
          {product.priceUnit ?? strings.productCard.priceSuffix}
        </p>
      </header>

      <div className="product-mobile-card__body">
        <div className="product-mobile-card__image">
          <img src={product.thumb ?? product.images[0]} alt={product.name} />
        </div>

        <dl className="product-mobile-card__specs">
          {previewSpecs.map((spec) => (
            <div key={spec.label} className="product-mobile-card__spec-row">
              <dt>{spec.label}:</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <button
        type="button"
        className="product-mobile-card__more"
        onClick={(event) => {
          stop(event);
          onViewDetails();
        }}
      >
        {strings.categoryPage.viewMore}
      </button>

      <div className="product-mobile-card__actions">
        <button
          type="button"
          className="btn btn--primary product-mobile-card__action"
          onClick={(event) => {
            stop(event);
            onGetQuote();
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          {strings.categoryPage.getBestPrice}
        </button>
        <a
          href={`tel:${strings.header.phone}`}
          className="btn btn--primary product-mobile-card__action"
          onClick={stop}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {strings.categoryPage.callNow}
        </a>
      </div>
    </article>
  );
}
