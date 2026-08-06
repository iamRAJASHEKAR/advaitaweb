import { useEffect } from "react";
import "./ProductDetailPage.css";
import type { Product } from "../../comms/types";
import { strings } from "../../comms/strings";
import { ProductDetailsPanel } from "../ProductDetailsPanel/ProductDetailsPanel";

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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product.id]);

  return (
    <section className="shell product-detail">
      <button type="button" onClick={onBack} className="product-detail__back">
        {strings.productDetail.back}
      </button>

      <div className="product-detail-main" role="region" aria-label="Product details">
        <ProductDetailsPanel product={product} onGetQuote={onGetQuote} />

        {relatedProducts.length > 0 && (
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
        )}
      </div>
    </section>
  );
}
