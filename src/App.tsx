import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams, useLocation, useMatch } from "react-router-dom";
import "./App.css";
import { catalogData, catalogUrl } from "./comms/comms";
import { strings } from "./comms/strings";
import type { Product } from "./comms/types";
import { Header } from "./components/Header/Header";
import { HeroSlider } from "./components/HeroSlider/HeroSlider";
import { CategoryGridSection } from "./components/CategoryGridSection/CategoryGridSection";
import { CategoryPage } from "./components/CategoryPage/CategoryPage";
import { WhyChooseSection } from "./components/WhyChooseSection/WhyChooseSection";
import { IndustriesSection } from "./components/IndustriesSection/IndustriesSection";
import { ProcessSection } from "./components/ProcessSection/ProcessSection";
import { ClosingCtaSection } from "./components/ClosingCtaSection/ClosingCtaSection";
import { TrustSection } from "./components/TrustSection/TrustSection";
import { ProductDetailPage } from "./components/ProductDetailPage/ProductDetailPage";
import { ComingSoonPage } from "./components/ComingSoonPage/ComingSoonPage";
import { Modal } from "./components/Modal/Modal";
import { QuoteForm } from "./components/Forms/QuoteForm";
import { CallbackForm } from "./components/Forms/CallbackForm";

type ProductPageProps = {
  onGetQuote: () => void;
  onRequestCallback: () => void;
};

function ProductPage({ onGetQuote, onRequestCallback }: ProductPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id
    ? catalogData.products.find((p) => p.id === id) ?? null
    : null;

  useEffect(() => {
    if (!id || !product) {
      navigate("/", { replace: true });
    }
  }, [id, product, navigate]);

  if (!id || !product) {
    return null;
  }

  const relatedProducts = catalogData.products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const handleSelectProduct = (productId: string) => {
    navigate(`/product/${productId}`, { replace: true });
    window.scrollTo(0, 0);
  };

  return (
    <ProductDetailPage
      key={product.id}
      product={product}
      categories={catalogData.categories}
      allProducts={catalogData.products}
      onBack={() => navigate("/")}
      onGetQuote={onGetQuote}
      onRequestCallback={onRequestCallback}
      onSelectProduct={handleSelectProduct}
      relatedProducts={relatedProducts}
    />
  );
}

function App() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const productMatch = useMatch("/product/:id");
  const productId = productMatch?.params?.id ?? null;
  const isProductPage = location.pathname.startsWith("/product/");
  const isComingSoonPage = location.pathname === "/coming-soon";

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  const handleSeeAllProducts = () => {
    window.open(catalogUrl, "_blank", "noopener,noreferrer");
  };

  const handleNavToSection = (sectionId: string) => {
    navigate("/");
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <div className={`page${isProductPage ? " page--product-detail" : ""}`}>
      {!isComingSoonPage && (
        <Header
          onHome={() => navigate("/")}
          onCatalog={handleSeeAllProducts}
          onNavToSection={handleNavToSection}
          products={catalogData.products}
          onSelectProduct={handleProductClick}
          productDetailMenu={
            isProductPage && productId
              ? {
                categories: catalogData.categories,
                allProducts: catalogData.products,
                currentProductId: productId,
                onSelectProduct: handleProductClick,
              }
              : null
          }
        />
      )}

      <main className={isComingSoonPage ? "main--coming-soon" : ""}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSlider
                  slides={catalogData.heroSlides}
                  onPrimaryCta={() => setShowQuoteModal(true)}
                />
                <IndustriesSection industries={catalogData.industries} />
                <CategoryGridSection
                  categories={catalogData.categories}
                  onSelectCategory={(categoryId) => {
                    navigate(`/category/${categoryId}`);
                    window.scrollTo(0, 0);
                  }}
                />
                <TrustSection metrics={catalogData.trustMetrics} />
                <WhyChooseSection differentiators={catalogData.differentiators} />
                <ProcessSection steps={catalogData.processSteps} />
                <ClosingCtaSection onPrimaryCta={() => setShowQuoteModal(true)} />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductPage
                onGetQuote={() => setShowQuoteModal(true)}
                onRequestCallback={() => setShowCallbackModal(true)}
              />
            }
          />
          <Route
            path="/category/:id"
            element={
              <CategoryPage
                categories={catalogData.categories}
                products={catalogData.products}
                onSelectProduct={handleProductClick}
                onSeeAll={handleSeeAllProducts}
                onGetQuote={() => setShowQuoteModal(true)}
              />
            }
          />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
        </Routes>
      </main>

      {showQuoteModal && (
        <Modal
          onClose={() => setShowQuoteModal(false)}
          title={strings.modals.quoteTitle}
          hideHeader
        >
          <QuoteForm onClose={() => setShowQuoteModal(false)} />
        </Modal>
      )}

      {showCallbackModal && (
        <Modal
          onClose={() => setShowCallbackModal(false)}
          title={strings.modals.callbackTitle}
        >
          <CallbackForm onClose={() => setShowCallbackModal(false)} />
        </Modal>
      )}

      {!isComingSoonPage && (
        <a
          href={`https://wa.me/91${strings.header.phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-fab"
          aria-label={strings.closing.whatsappCta}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      )}
    </div>
  );
}

export default App;
