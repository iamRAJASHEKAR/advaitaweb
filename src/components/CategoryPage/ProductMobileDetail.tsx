import { useEffect, useState } from "react";
import type { Product } from "../../comms/types";
import { strings } from "../../comms/strings";
import { getProductSpecs } from "../../comms/productSpecs";
import "./ProductMobileDetail.css";

type ProductMobileDetailProps = {
  product: Product;
  onClose: () => void;
  onGetQuote: () => void;
};

export function ProductMobileDetail({
  product,
  onClose,
  onGetQuote,
}: ProductMobileDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const specs = getProductSpecs(product);
  useEffect(() => {
    setActiveImageIndex(0);
  }, [product.id]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="product-mobile-detail" role="dialog" aria-modal="true" aria-label={product.name}>
      <button
        type="button"
        className="product-mobile-detail__close"
        onClick={onClose}
        aria-label={strings.categoryPage.closeDetails}
      >
        ×
      </button>

      <div className="product-mobile-detail__scroll">
        <div className="product-mobile-detail__gallery">
          <img
            src={product.images[activeImageIndex]}
            alt={product.name}
            className="product-mobile-detail__image"
          />
          {product.images.length > 1 && (
            <div className="product-mobile-detail__dots" aria-hidden>
              {product.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`product-mobile-detail__dot${index === activeImageIndex ? " product-mobile-detail__dot--active" : ""}`}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-mobile-detail__content">
          <h2 className="product-mobile-detail__title">{product.name}</h2>
          <p className="product-mobile-detail__price">
            ₹ {product.price.toLocaleString()}{" "}
            {product.priceUnit ?? strings.productCard.priceSuffix}
          </p>

          <ul className="product-mobile-detail__specs">
            {specs.map((spec) => (
              <li key={spec.label}>
                <span className="product-mobile-detail__spec-label">{spec.label}:</span>{" "}
                <span className="product-mobile-detail__spec-value">{spec.value}</span>
              </li>
            ))}
          </ul>

          <p className="product-mobile-detail__description">{product.description}</p>

          {product.features.length > 0 && (
            <div className="product-mobile-detail__features">
              <h3>{strings.productDetail.featuresTitle}</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="product-mobile-detail__footer">
        <button
          type="button"
          className="btn btn--primary product-mobile-detail__action"
          onClick={onGetQuote}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          {strings.categoryPage.getBestPrice}
        </button>
        <a
          href={`tel:${strings.header.phone}`}
          className="btn btn--primary product-mobile-detail__action"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {strings.categoryPage.callNow}
        </a>
      </div>
    </div>
  );
}
