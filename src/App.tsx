import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams, useLocation, useMatch } from "react-router-dom";
import "./App.css";
import { catalogData, catalogUrl } from "./comms/comms";
import { strings } from "./comms/strings";
import type { Product } from "./comms/types";
import { Header } from "./components/Header/Header";
import { HeroSlider } from "./components/HeroSlider/HeroSlider";
import { SolutionsSection } from "./components/SolutionsSection/SolutionsSection";
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
                <SolutionsSection
                  categories={catalogData.categories}
                  products={catalogData.products}
                  onSelectProduct={handleProductClick}
                  onSeeAll={handleSeeAllProducts}
                  onGetQuote={() => setShowQuoteModal(true)}
                />
                <TrustSection metrics={catalogData.trustMetrics} />
                <WhyChooseSection differentiators={catalogData.differentiators} />
                <IndustriesSection industries={catalogData.industries} />

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
    </div>
  );
}

export default App;
