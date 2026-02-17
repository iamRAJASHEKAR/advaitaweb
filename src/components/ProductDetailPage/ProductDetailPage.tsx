import { useEffect, useState, useRef, useMemo } from "react";
import "./ProductDetailPage.css";
import type { Product, ProductCategory } from "../../comms/types";
import { strings } from "../../comms/strings";

type ProductDetailPageProps = {
  product: Product;
  categories: ProductCategory[];
  allProducts: Product[];
  onBack: () => void;
  onGetQuote: () => void;
  onRequestCallback: () => void;
  onSelectProduct: (id: string) => void;
  relatedProducts: Product[];
};

export function ProductDetailPage({
  product,
  categories,
  allProducts,
  onBack,
  onGetQuote,
  onRequestCallback,
  onSelectProduct,
  relatedProducts,
}: ProductDetailPageProps) {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set([product.categoryId]),
  );

  const productsByCategory = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const cat of categories) {
      map.set(
        cat.id,
        allProducts.filter((p) => p.categoryId === cat.id),
      );
    }
    return map;
  }, [categories, allProducts]);

  useEffect(() => {
    setMainImage(product.images[0]);
  }, [product]);

  useEffect(() => {
    mainScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [product.id]);

  useEffect(() => {
    setExpandedCategories((prev) => new Set(prev).add(product.categoryId));
  }, [product.categoryId]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  const renderProductNav = (onSelect: (id: string) => void) => (
    <>
      <h2 className="product-sidebar__title">
        {strings.productDetail.allProductsTitle}
      </h2>
      <nav className="product-sidebar__nav" aria-label="Products by category">
        {categories.map((category) => {
          const products = productsByCategory.get(category.id) ?? [];
          const isExpanded = expandedCategories.has(category.id);
          return (
            <div key={category.id} className="product-sidebar__category">
              <button
                type="button"
                className="product-sidebar__category-btn"
                onClick={() => toggleCategory(category.id)}
                aria-expanded={isExpanded}
                aria-label={
                  isExpanded
                    ? strings.productDetail.menuCollapse
                    : strings.productDetail.menuExpand
                }
              >
                <span className="product-sidebar__category-name">
                  {category.name}
                </span>
                <span
                  className={`product-sidebar__arrow ${isExpanded ? "product-sidebar__arrow--up" : "product-sidebar__arrow--down"}`}
                  aria-hidden
                >
                  {isExpanded ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 9l4-4 4 4" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3l4 4 4-4" />
                    </svg>
                  )}
                </span>
              </button>
              {isExpanded && (
                <ul className="product-sidebar__list">
                  {products.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        className={`product-sidebar__item ${p.id === product.id ? "product-sidebar__item--active" : ""}`}
                        onClick={() => onSelect(p.id)}
                      >
                        {p.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );

  return (
    <section className="shell product-detail">
      <button onClick={onBack} className="btn btn--ghost back-btn">
        {strings.productDetail.back}
      </button>

      <div className="product-detail-split">
        <aside className="product-sidebar">
          {renderProductNav(onSelectProduct)}
        </aside>

        <div
          ref={mainScrollRef}
          className="product-detail-main"
          role="region"
          aria-label="Product details"
        >
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
            <div className="product-actions-top">
              <button onClick={onGetQuote} className="btn btn--primary">
                {strings.productDetail.quoteCta}
              </button>
              <button onClick={onRequestCallback} className="btn btn--outline">
                {strings.productDetail.callbackCta}
              </button>
            </div>
          </div>

          <div className="price-section">
            <span className="price">
              ₹ {product.price.toLocaleString()} {strings.productCard.priceSuffix}
            </span>
            <span className="pill pill--active">
              {strings.productDetail.pricePill}
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
      </div>
    </section>
  );
}
