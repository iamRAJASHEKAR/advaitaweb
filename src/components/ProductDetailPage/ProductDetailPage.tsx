import { useEffect, useState } from "react";
import "./ProductDetailPage.css";
import type { Product } from "../../comms/types";
import { strings } from "../../comms/strings";

type ProductDetailPageProps = {
  product: Product;
  onBack: () => void;
  onGetQuote: () => void;
  onSelectProduct: (id: string) => void;
  relatedProducts: Product[];
};

export function ProductDetailPage({
  product,
  onBack,
  onGetQuote,
  onSelectProduct,
  relatedProducts,
}: ProductDetailPageProps) {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const whatsappMessage = `Hi, I need pricing for ${product.name}.`;
  const whatsappUrl = `https://wa.me/${strings.header.phone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    setMainImage(product.images[0]);
  }, [product]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product.id]);

  return (
    <section className="shell product-detail">
      <button type="button" onClick={onBack} className="product-detail__back">
        {strings.productDetail.back}
      </button>

      <div className="product-detail-main" role="region" aria-label="Product details">
        <div className="product-layout" key={product.id}>
          <div className="product-gallery">
            <div className="main-image">
              <img src={mainImage} alt={product.name} />
            </div>
            <div className="thumbnail-strip">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumbnail ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
            </div>

            <div className="product-actions-top" aria-label="Product enquiry actions">
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
              <button onClick={onGetQuote} className="btn btn--primary">
                {strings.productDetail.quoteCta}
              </button>
            </div>

            <div className="price-section">
              <span className="price">
                ₹ {product.price.toLocaleString()} {strings.productCard.priceSuffix}
              </span>

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
            </div>

            {product.minimumOrder && (
              <p className="minimum-order">
                {strings.productDetail.minOrderLabel} {product.minimumOrder}{" "}
                {strings.productDetail.minOrderUnit}
              </p>
            )}

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

            <div className="cta-section">
              <button onClick={onGetQuote} className="btn btn--primary btn--lg">
                {strings.productDetail.interestedCta}
              </button>
            </div>
          </div>
        </div>

        <div className="related-section">
          <h2>{strings.productDetail.browseMore}</h2>
          <div className="grid grid--3">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="card product-card-mini"
                onClick={() => onSelectProduct(item.id)}
              >
                <img src={item.images[0]} alt={item.name} />
                <h4>{item.name}</h4>
                <p className="price-mini">
                  ₹ {item.price.toLocaleString()} {strings.productCard.priceSuffix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
