import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import "./CategoryPage.css";
import type { Product, ProductCategory } from "../../comms/types";
import { strings } from "../../comms/strings";
import { categoryProductUrl, categoryUrl } from "../../routes/paths";
import { ProductDetailsPanel } from "../ProductDetailsPanel/ProductDetailsPanel";
import { ProductMobileCard } from "./ProductMobileCard";
import { ProductMobileDetail } from "./ProductMobileDetail";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const categoryIcons: Record<string, string> = {
  washroom: "🚰",
  waste: "♻️",
  chemicals: "🧪",
  outdoor: "🛒",
  "feminine-hygiene": "🌸",
  "pvc-curtains": "🚪",
  "bio-medical-waste-solutions": "🏥",
};

const MOBILE_BREAKPOINT = "(max-width: 900px)";

type CategoryPageProps = {
  categories: ProductCategory[];
  products: Product[];
  onGetQuote: () => void;
  categoryId?: string;
};

function CategoryChevron({ expanded }: { expanded: boolean }) {
  return (
    <span
      className={`category-page__chevron${expanded ? " category-page__chevron--expanded" : ""}`}
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3l4 4 4-4" />
      </svg>
    </span>
  );
}

export function CategoryPage({
  categories,
  products,
  onGetQuote,
  categoryId: fixedCategoryId,
}: CategoryPageProps) {
  const { id: paramCategoryId } = useParams<{ id: string }>();
  const categoryId = fixedCategoryId ?? paramCategoryId;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  const category = categoryId
    ? categories.find((c) => c.id === categoryId) ?? null
    : null;

  const productsByCategory = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const cat of categories) {
      map.set(
        cat.id,
        products.filter((product) => product.categoryId === cat.id),
      );
    }
    return map;
  }, [categories, products]);

  const categoryProducts = category
    ? productsByCategory.get(category.id) ?? []
    : [];

  const productFromUrl = searchParams.get("product");
  const activeProductId =
    productFromUrl && categoryProducts.some((p) => p.id === productFromUrl)
      ? productFromUrl
      : null;

  const displayedProducts = useMemo(() => {
    if (!activeProductId) return categoryProducts;

    const selected = categoryProducts.find(
      (product) => product.id === activeProductId,
    );
    if (!selected) return categoryProducts;

    return [
      selected,
      ...categoryProducts.filter((product) => product.id !== activeProductId),
    ];
  }, [categoryProducts, activeProductId]);

  const displayedCategories = useMemo(() => {
    if (!categoryId) return categories;

    const active = categories.find((cat) => cat.id === categoryId);
    if (!active) return categories;

    return [
      active,
      ...categories.filter((cat) => cat.id !== categoryId),
    ];
  }, [categories, categoryId]);

  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
    categoryId ?? null,
  );
  const [mobileDetailProduct, setMobileDetailProduct] = useState<Product | null>(
    null,
  );
  const mobileDetailOpenRef = useRef(false);
  const navRef = useRef<HTMLElement>(null);
  const categoryPositionsRef = useRef(new Map<string, number>());

  const scrollContentToTop = useCallback(() => {
    requestAnimationFrame(() => {
      document
        .getElementById("category-page-content-top")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  useEffect(() => {
    if (!category || categoryProducts.length === 0 || isMobile) return;

    const hasValidProduct =
      productFromUrl &&
      categoryProducts.some((product) => product.id === productFromUrl);

    if (!hasValidProduct) {
      setSearchParams({ product: categoryProducts[0].id }, { replace: true });
    }
  }, [category, categoryProducts, productFromUrl, setSearchParams, isMobile]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const groups = nav.querySelectorAll<HTMLElement>("[data-category-id]");
    groups.forEach((element) => {
      const id = element.dataset.categoryId;
      if (!id) return;

      const nextTop = element.getBoundingClientRect().top;
      const previousTop = categoryPositionsRef.current.get(id);

      if (previousTop !== undefined) {
        const deltaY = previousTop - nextTop;
        if (Math.abs(deltaY) > 0.5) {
          element.animate(
            [
              { transform: `translateY(${deltaY}px)` },
              { transform: "translateY(0)" },
            ],
            {
              duration: 360,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
          );
        }
      }

      categoryPositionsRef.current.set(id, nextTop);
    });
  }, [displayedCategories]);

  useEffect(() => {
    if (!categoryId || !category) {
      navigate("/", { replace: true });
    }
  }, [categoryId, category, navigate]);

  useEffect(() => {
    if (categoryId) {
      setExpandedCategoryId(categoryId);
    }
  }, [categoryId]);

  useEffect(() => {
    if (isMobile) return;
    scrollContentToTop();
  }, [categoryId, isMobile, scrollContentToTop]);

  useEffect(() => {
    if (isMobile || !productFromUrl) return;

    const product =
      categoryProducts.find((item) => item.id === productFromUrl) ?? null;
    if (!product) return;

    const timer = window.setTimeout(() => scrollContentToTop(), 120);
    return () => window.clearTimeout(timer);
  }, [isMobile, productFromUrl, categoryProducts, scrollContentToTop]);

  useEffect(() => {
    mobileDetailOpenRef.current = false;
  }, [categoryId]);

  useEffect(() => {
    if (!isMobile) {
      setMobileDetailProduct(null);
      return;
    }

    if (!productFromUrl || !mobileDetailOpenRef.current) {
      setMobileDetailProduct(null);
      return;
    }

    const product =
      categoryProducts.find((item) => item.id === productFromUrl) ?? null;
    setMobileDetailProduct(product);
  }, [isMobile, productFromUrl, categoryProducts]);

  const handleCategoryRowClick = (targetCategoryId: string) => {
    const catProducts = productsByCategory.get(targetCategoryId) ?? [];
    const firstProductId = catProducts[0]?.id;
    const isSameCategory = targetCategoryId === categoryId;
    const isCurrentlyExpanded = expandedCategoryId === targetCategoryId;

    if (isSameCategory && isCurrentlyExpanded) {
      setExpandedCategoryId(null);
      return;
    }

    setExpandedCategoryId(targetCategoryId);

    if (!isSameCategory) {
      if (firstProductId) {
        navigate(categoryProductUrl(targetCategoryId, firstProductId));
      } else {
        navigate(categoryUrl(targetCategoryId));
      }
      return;
    }

    if (firstProductId) {
      setSearchParams({ product: firstProductId }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }

    scrollContentToTop();
  };

  const selectProduct = (targetCategoryId: string, productId: string) => {
    setExpandedCategoryId(targetCategoryId);

    if (targetCategoryId !== categoryId) {
      navigate(categoryProductUrl(targetCategoryId, productId));
      return;
    }

    setSearchParams({ product: productId }, { replace: true });

    if (isMobile) {
      const product = categoryProducts.find((item) => item.id === productId);
      if (product) {
        mobileDetailOpenRef.current = true;
        setMobileDetailProduct(product);
      }
    }
  };

  const openMobileDetail = (product: Product) => {
    mobileDetailOpenRef.current = true;
    setMobileDetailProduct(product);
    setSearchParams({ product: product.id }, { replace: true });
  };

  const closeMobileDetail = () => {
    mobileDetailOpenRef.current = false;
    setMobileDetailProduct(null);
    setSearchParams({}, { replace: true });
  };

  if (!category) {
    return null;
  }

  return (
    <section className="shell section category-page">
      <button
        type="button"
        className="category-page__back"
        onClick={() => navigate("/")}
      >
        ← Back to categories
      </button>

      <header
        id="category-page-content-top"
        className="category-page__header"
      >
        <span className="service-icon" aria-hidden>
          {categoryIcons[category.id] ?? "📦"}
        </span>
        <div>
          <h1 className="category-page__title">{category.name}</h1>
          <p className="category-page__tagline">{category.tagline}</p>
        </div>
      </header>

      <div className="category-page__desktop">
        <div className="category-page__split">
          <aside
            className="category-page__list"
            aria-label={strings.productDetail.allProductsTitle}
          >
            <p className="category-page__list-label">
              {strings.productDetail.allProductsTitle}
            </p>

            <nav ref={navRef} className="category-page__nav">
              {displayedCategories.map((cat) => {
                const catProducts = productsByCategory.get(cat.id) ?? [];
                const isExpanded = expandedCategoryId === cat.id;
                const isActiveCategory = cat.id === categoryId;

                return (
                  <div
                    key={cat.id}
                    data-category-id={cat.id}
                    className={`category-page__nav-group${isExpanded ? " category-page__nav-group--expanded" : ""}`}
                  >
                    <button
                      type="button"
                      className="category-page__nav-category-row"
                      onClick={() => handleCategoryRowClick(cat.id)}
                      aria-expanded={isExpanded}
                      aria-current={isActiveCategory ? "page" : undefined}
                    >
                      <span className="category-page__nav-icon" aria-hidden>
                        {categoryIcons[cat.id] ?? "📦"}
                      </span>
                      <span className="category-page__nav-category-name">
                        {cat.name}
                      </span>
                      <CategoryChevron expanded={isExpanded} />
                    </button>

                    {catProducts.length > 0 && (
                      <div className="category-page__nav-products-wrap">
                        <div className="category-page__nav-products-inner">
                          <ul className="category-page__nav-products">
                            {catProducts.map((product) => {
                              const isActiveProduct =
                                isActiveCategory && product.id === activeProductId;
                              return (
                                <li key={product.id}>
                                  <button
                                    type="button"
                                    className={`category-page__nav-product${isActiveProduct ? " category-page__nav-product--active" : ""}`}
                                    onClick={() => selectProduct(cat.id, product.id)}
                                    aria-current={isActiveProduct ? "true" : undefined}
                                  >
                                    {product.name}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>

          <div
            className="category-page__detail"
            role="region"
            aria-label={`${category.name} products`}
          >
            {displayedProducts.length > 0 ? (
              <div className="category-page__products-stack">
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    id={`product-${product.id}`}
                    className={`category-page__product-section${product.id === activeProductId ? " category-page__product-section--active" : ""}`}
                  >
                    <ProductDetailsPanel
                      product={product}
                      onGetQuote={onGetQuote}
                      titleAs="h2"
                      titleAboveImage
                      className="category-page__product-layout"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="category-page__empty">
                No products in this category yet.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="category-page__mobile">
        <div className="category-page__mobile-list">
          {categoryProducts.map((product) => (
            <ProductMobileCard
              key={product.id}
              product={product}
              onViewDetails={() => openMobileDetail(product)}
              onGetQuote={onGetQuote}
            />
          ))}
        </div>
      </div>

      {mobileDetailProduct && (
        <ProductMobileDetail
          product={mobileDetailProduct}
          onClose={closeMobileDetail}
          onGetQuote={onGetQuote}
        />
      )}
    </section>
  );
}
