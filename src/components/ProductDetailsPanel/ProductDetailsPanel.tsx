import { useEffect, useState } from "react";
import "../ProductDetailPage/ProductDetailPage.css";
import type { Product } from "../../comms/types";
import { strings } from "../../comms/strings";

type ProductDetailsPanelProps = {
  product: Product;
  onGetQuote: () => void;
  /** Use h1 on standalone product pages; h2 when embedded in a category page. */
  titleAs?: "h1" | "h2";
  /** Render title directly above the product image (category page layout). */
  titleAboveImage?: boolean;
  className?: string;
};

export function ProductDetailsPanel({
  product,
  onGetQuote,
  titleAs = "h1",
  titleAboveImage = false,
  className = "",
}: ProductDetailsPanelProps) {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const whatsappMessage = `Hi, I need pricing for ${product.name}.`;
  const whatsappUrl = `https://wa.me/${strings.header.phone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;
  const TitleTag = titleAs;

  useEffect(() => {
    setMainImage(product.images[0]);
  }, [product]);

  const actionButtons = (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--whatsapp"
      >
        Chat on WhatsApp
      </a>
      <a href={`tel:${strings.header.phone}`} className="btn btn--outline">
        {strings.productDetail.callCta}
      </a>
      <button type="button" onClick={onGetQuote} className="btn btn--primary">
        {strings.productDetail.quoteCta}
      </button>
    </>
  );

  return (
    <div
      className={`product-layout${titleAboveImage ? " product-layout--title-above-image" : ""} ${className}`.trim()}
      key={product.id}
    >
      {titleAboveImage ? (
        <div className="product-toolbar">
          <TitleTag className="product-title">{product.name}</TitleTag>
          <div className="product-actions-top" aria-label="Product enquiry actions">
            {actionButtons}
          </div>
        </div>
      ) : null}

      <div className="product-gallery">
        <div className="main-image">
          <img src={mainImage} alt={product.name} />
        </div>
        {product.images.length > 1 && (
          <div className="thumbnail-strip">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`${product.name} view ${idx + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="product-summary">
        {!titleAboveImage ? (
          <div className="product-header">
            <TitleTag className="product-title">{product.name}</TitleTag>
          </div>
        ) : null}

        {!titleAboveImage ? (
          <div className="product-actions-top" aria-label="Product enquiry actions">
            {actionButtons}
          </div>
        ) : null}

        <div className="price-section">
          <span className="price">
            ₹ {product.price.toLocaleString()}{" "}
            {product.priceUnit ?? strings.productCard.priceSuffix}
          </span>
          <button
            type="button"
            onClick={onGetQuote}
            className="pill pill--active price-section__cta"
          >
            {strings.productDetail.pricePill}
          </button>
        </div>

        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-label">
              {strings.productDetail.specLabels.capacity}
            </span>
            <span className="spec-value">{product.capacity}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">
              {strings.productDetail.specLabels.material}
            </span>
            <span className="spec-value">{product.material}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">
              {strings.productDetail.specLabels.color}
            </span>
            <span className="spec-value">{product.color}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">
              {strings.productDetail.specLabels.structure}
            </span>
            <span className="spec-value">{product.structure}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">
              {strings.productDetail.specLabels.usage}
            </span>
            <span className="spec-value">{product.usage}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">
              {strings.productDetail.specLabels.size}
            </span>
            <span className="spec-value">{product.size}</span>
          </div>
          {product.grade && (
            <div className="spec-item">
              <span className="spec-label">
                {strings.productDetail.specLabels.grade}
              </span>
              <span className="spec-value">{product.grade}</span>
            </div>
          )}
          {product.finish && (
            <div className="spec-item">
              <span className="spec-label">
                {strings.productDetail.specLabels.finish}
              </span>
              <span className="spec-value">{product.finish}</span>
            </div>
          )}
          {product.minimumOrder && (
            <div className="spec-item">
              <span className="spec-label">
                {strings.productDetail.specLabels.minOrder}
              </span>
              <span className="spec-value">
                {product.minimumOrder} {strings.productDetail.minOrderUnit}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="product-extra">
        <div className="product-description">
          <h3>{strings.productDetail.descriptionTitle}</h3>
          <p>{product.description}</p>
        </div>

        <div className="product-features">
          <h3>{strings.productDetail.featuresTitle}</h3>
          <ul className="features-list">
            {product.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
