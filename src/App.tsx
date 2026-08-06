import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import "./App.css";
import { catalogData, catalogUrl } from "./comms/comms";
import { strings } from "./comms/strings";
import type { Product } from "./comms/types";
import { Header } from "./components/Header/Header";
import { HeroSlider } from "./components/HeroSlider/HeroSlider";
import { CategoryGridSection } from "./components/CategoryGridSection/CategoryGridSection";
import { CategoryPage } from "./components/CategoryPage/CategoryPage";
import { ProductsPage } from "./components/ProductsPage/ProductsPage";
import { IndustriesSection } from "./components/IndustriesSection/IndustriesSection";
import { ProductDetailPage } from "./components/ProductDetailPage/ProductDetailPage";
import { ComingSoonPage } from "./components/ComingSoonPage/ComingSoonPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage/PrivacyPolicyPage";
import { AboutUsPage } from "./components/AboutUsPage/AboutUsPage";
import { ContactPage } from "./components/ContactPage/ContactPage";
import { TermsOfServicePage } from "./components/TermsOfServicePage/TermsOfServicePage";
import { Footer } from "./components/Footer/Footer";
import { BottomNav } from "./components/BottomNav/BottomNav";
import { ProcessSection } from "./components/ProcessSection/ProcessSection";
import { WhyChooseSection } from "./components/WhyChooseSection/WhyChooseSection";
import { TrustSection } from "./components/TrustSection/TrustSection";
import { Modal } from "./components/Modal/Modal";
import { QuoteForm } from "./components/Forms/QuoteForm";
import { paths, categoryUrl, categoryProductUrl } from "./routes/paths";
import { getRouteSeo } from "./seo/pageSeo";
import { usePageSeo } from "./seo/usePageSeo";

type ProductPageProps = {
  onGetQuote: () => void;
  productId?: string;
};

function ProductPage({ onGetQuote, productId: fixedProductId }: ProductPageProps) {
  const { id: paramId } = useParams<{ id: string }>();
  const id = fixedProductId ?? paramId;
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
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  const handleSelectProduct = (productId: string) => {
    navigate(categoryProductUrl(product.categoryId, productId), { replace: true });
    window.scrollTo(0, 0);
  };

  return (
    <ProductDetailPage
      key={product.id}
      product={product}
      onBack={() => {
        navigate(categoryUrl(product.categoryId));
        window.scrollTo(0, 0);
      }}
      onGetQuote={onGetQuote}
      onSelectProduct={handleSelectProduct}
      relatedProducts={relatedProducts}
    />
  );
}

function App() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isProductPage =
    location.pathname.startsWith("/product/") ||
    location.pathname === paths.bioMedicalWasteBin;
  const isComingSoonPage = location.pathname === "/coming-soon";
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pageSeo = getRouteSeo(location.pathname);

  usePageSeo(pageSeo);

  const scrollToTop = () => window.scrollTo(0, 0);

  useEffect(() => {
    const onScroll = () => {
      // Show only after user has meaningfully scrolled down.
      setShowScrollTop(window.scrollY > 600);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Hide on route change so it doesn't flash after navigation.
    setShowScrollTop(false);
  }, [location.pathname]);

  const goTo = (path: string) => {
    navigate(path);
    scrollToTop();
  };

  const handleProductClick = (productId: string) => {
    const product = catalogData.products.find((p) => p.id === productId);
    if (!product) return;
    navigate(categoryProductUrl(product.categoryId, productId));
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
    <div
      className={`page${isProductPage ? " page--product-detail" : ""}${!isComingSoonPage ? " page--with-bottom-nav" : ""}`}
    >
      {!isComingSoonPage && (
        <Header
          onHome={() => goTo("/")}
          onContactUs={() => goTo("/contact")}
          onNavToSection={handleNavToSection}
          products={catalogData.products}
          onSelectProduct={handleProductClick}
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
                    navigate(categoryUrl(categoryId));
                    window.scrollTo(0, 0);
                  }}
                />
                <WhyChooseSection differentiators={catalogData.differentiators} />
                <TrustSection metrics={catalogData.trustMetrics} />
                <ProcessSection steps={catalogData.processSteps} />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductPage onGetQuote={() => setShowQuoteModal(true)} />
            }
          />
          <Route
            path={paths.bioMedicalWasteBin}
            element={
              <ProductPage
                productId="bio-medical-waste-bin"
                onGetQuote={() => setShowQuoteModal(true)}
              />
            }
          />
          <Route
            path={paths.bioMedicalWasteSolutions}
            element={
              <CategoryPage
                categoryId="bio-medical-waste-solutions"
                categories={catalogData.categories}
                products={catalogData.products}
                onGetQuote={() => setShowQuoteModal(true)}
              />
            }
          />
          <Route
            path="/category/:id"
            element={
              <CategoryPage
                categories={catalogData.categories}
                products={catalogData.products}
                onGetQuote={() => setShowQuoteModal(true)}
              />
            }
          />
          <Route
            path={paths.products}
            element={
              <ProductsPage
                categories={catalogData.categories}
                products={catalogData.products}
                onSelectProduct={handleProductClick}
                onSelectCategory={(categoryId) => {
                  navigate(categoryUrl(categoryId));
                  window.scrollTo(0, 0);
                }}
              />
            }
          />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path={paths.privacyPolicy} element={<PrivacyPolicyPage />} />
          <Route path="/privacypolicy" element={<Navigate to={paths.privacyPolicy} replace />} />
          <Route path={paths.termsAndConditions} element={<TermsOfServicePage />} />
          <Route path="/terms" element={<Navigate to={paths.termsAndConditions} replace />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
        </Routes>
      </main>

      {!isComingSoonPage && (
        <Footer
          onHome={() => goTo("/")}
          onCatalog={handleSeeAllProducts}
          onProducts={() => goTo(paths.products)}
        />
      )}

      {!isComingSoonPage && (
        <BottomNav
          onHome={() => goTo("/")}
          onAbout={() => goTo(paths.about)}
          onPrivacy={() => goTo(paths.privacyPolicy)}
          onTerms={() => goTo(paths.termsAndConditions)}
          onProducts={() => goTo(paths.products)}
          onContact={() => goTo(paths.contact)}
        />
      )}

      {showQuoteModal && (
        <Modal
          onClose={() => setShowQuoteModal(false)}
          title={strings.modals.quoteTitle}
          hideHeader
        >
          <QuoteForm onClose={() => setShowQuoteModal(false)} />
        </Modal>
      )}

      {!isComingSoonPage && (
        <>
          <a
            href={`https://wa.me/${strings.header.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-fab"
            aria-label={strings.closing.whatsappCta}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>

          {showScrollTop && (
            <button
              type="button"
              className="scroll-top-fab"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              title="Scroll to top"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="m5 15 7-7 7 7" />
              </svg>
              <span className="scroll-top-fab__label">Top</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
