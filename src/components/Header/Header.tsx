import { useState, useMemo, useEffect, useRef } from "react";
import "./Header.css";
import logo from "../../assets/advaitnewlogo.png";
import { strings } from "../../comms/strings";
import type { Product, ProductCategory } from "../../comms/types";

export type ProductDetailMenuConfig = {
  categories: ProductCategory[];
  allProducts: Product[];
  currentProductId: string;
  onSelectProduct: (id: string) => void;
};

type HeaderProps = {
  onHome: () => void;
  onCatalog: () => void;
  onNavToSection: (sectionId: string) => void;
  products: Product[];
  onSelectProduct: (id: string) => void;
  /** When set, hamburger opens product-by-category menu (detail page). Otherwise opens main nav (Products, About, Catalogue). */
  productDetailMenu?: ProductDetailMenuConfig | null;
};

export function Header({
  onHome,
  onCatalog,
  onNavToSection,
  products,
  onSelectProduct,
  productDetailMenu = null,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (productDetailMenu?.currentProductId && productDetailMenu?.allProducts) {
      const product = productDetailMenu.allProducts.find((p) => p.id === productDetailMenu.currentProductId);
      if (product?.categoryId) {
        setExpandedCategories(new Set([product.categoryId]));
      }
    }
  }, [productDetailMenu?.currentProductId, productDetailMenu?.allProducts]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchPanelRef.current &&
        !searchPanelRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => document.removeEventListener("click", handleClickOutside, true);
  }, [searchOpen]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryId.toLowerCase().includes(q),
    );
  }, [products, searchQuery]);

  const productsByCategory = useMemo(() => {
    if (!productDetailMenu) return new Map<string, Product[]>();
    const map = new Map<string, Product[]>();
    for (const cat of productDetailMenu.categories) {
      map.set(
        cat.id,
        productDetailMenu.allProducts.filter((p) => p.categoryId === cat.id),
      );
    }
    return map;
  }, [productDetailMenu?.categories, productDetailMenu?.allProducts]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  const closeMenu = () => setMobileMenuOpen(false);
  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleNavProducts = () => {
    closeMenu();
    onNavToSection("solutions");
  };

  const handleNavAboutUs = () => {
    closeMenu();
    onNavToSection("why-ahs");
  };

  const handleNavCatalog = () => {
    closeMenu();
    onCatalog();
  };

  const handleSelectProduct = (id: string) => {
    onSelectProduct(id);
    closeSearch();
  };

  const handleSelectProductFromDrawer = (id: string) => {
    productDetailMenu?.onSelectProduct(id);
    closeMenu();
  };

  return (
    <header className="shell header">
      <div className="header__top">
        <button
          type="button"
          className="header__hamburger"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label={mobileMenuOpen ? strings.header.closeMenuAria : strings.header.menuAria}
          aria-expanded={mobileMenuOpen}
        >
          <span className="header__hamburger-bar" />
          <span className="header__hamburger-bar" />
          <span className="header__hamburger-bar" />
        </button>

        <div className="brand" onClick={onHome} style={{ cursor: "pointer" }}>
          <div className="brand__mark">
            <img src={logo} alt={strings.brand.logoAlt} className="brand__logo" />
          </div>
          <div>
            <h1 className="brand__title">{strings.brand.name}</h1>
            <div className="brand__subtitle-wrap">
              <p className="brand__subtitle brand__subtitle--line1">{strings.brand.subtitleLine1}</p>
              <p className="brand__subtitle brand__subtitle--line2">{strings.brand.subtitleLine2}</p>
            </div>
          </div>
        </div>

        <div className="header__meta">
          <div className="header__location" aria-label="Location">
            <svg className="header__location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{strings.header.location}</span>
          </div>
          <div className="header__trust" aria-hidden>
            <svg className="header__trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Trusted</span>
          </div>
          <div className="header__contact-card">
            <a href={`tel:${strings.header.phone}`} className="header__phone">
              <svg className="header__phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{strings.header.phone}</span>
            </a>
            <div className="header__response-row">
              <span className="header__response-value">{strings.header.responseTime} {strings.header.responseTimeLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="header__nav-row">
        <nav className="nav">
          <a href="#solutions">{strings.nav.products}</a>
          <a href="#why-ahs">{strings.nav.why}</a>
          <a href="#process">{strings.nav.process}</a>
        </nav>
        <div className="header__nav-actions">
          <button type="button" className="btn btn--outline btn--sm" onClick={onCatalog}>
            {strings.nav.catalog}
          </button>
          <div className="header__search">
            <button
              type="button"
              className="header__search-toggle"
              onClick={() => setSearchOpen((o) => !o)}
              aria-label={strings.header.searchAria}
              aria-expanded={searchOpen}
            >
              <svg className="header__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="header__search-full" ref={searchPanelRef}>
          <div className="header__search-full-inner">
            <input
              type="search"
              className="header__search-input"
              placeholder={strings.header.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              aria-label={strings.header.searchAria}
            />
            <button
              type="button"
              className="header__search-close"
              onClick={closeSearch}
              aria-label={strings.header.closeMenuAria}
            >
              ×
            </button>
            <div className="header__search-results">
              {searchQuery.trim().length < 2 ? (
                <p className="header__search-hint">Type to search products</p>
              ) : searchResults.length === 0 ? (
                <p className="header__search-hint">{strings.header.noResults}</p>
              ) : (
                <ul className="header__search-list">
                  {searchResults.slice(0, 8).map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        className="header__search-item"
                        onClick={() => handleSelectProduct(p.id)}
                      >
                        {p.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <>
          <div
            className="header__backdrop"
            onClick={closeMenu}
            aria-hidden="true"
          />
          {productDetailMenu ? (
            <div className="header__drawer header__drawer--product" aria-label="Products by category">
              <div className="header__drawer-product-header">
                <span className="header__drawer-product-title">{strings.productDetail.allProductsTitle}</span>
                <button
                  type="button"
                  className="header__drawer-close"
                  onClick={closeMenu}
                  aria-label={strings.header.closeMenuAria}
                >
                  ×
                </button>
              </div>
              <div className="header__drawer-product-content">
                <nav className="product-sidebar__nav" aria-label="Products by category">
                  {productDetailMenu.categories.map((category) => {
                    const categoryProducts = productsByCategory.get(category.id) ?? [];
                    const isExpanded = expandedCategories.has(category.id);
                    return (
                      <div key={category.id} className="product-sidebar__category">
                        <button
                          type="button"
                          className="product-sidebar__category-btn"
                          onClick={() => toggleCategory(category.id)}
                          aria-expanded={isExpanded}
                          aria-label={isExpanded ? strings.productDetail.menuCollapse : strings.productDetail.menuExpand}
                        >
                          <span className="product-sidebar__category-name">{category.name}</span>
                          <span className={`product-sidebar__arrow ${isExpanded ? "product-sidebar__arrow--up" : "product-sidebar__arrow--down"}`} aria-hidden>
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
                            {categoryProducts.map((p) => (
                              <li key={p.id}>
                                <button
                                  type="button"
                                  className={`product-sidebar__item ${p.id === productDetailMenu.currentProductId ? "product-sidebar__item--active" : ""}`}
                                  onClick={() => handleSelectProductFromDrawer(p.id)}
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
              </div>
            </div>
          ) : (
            <nav className="header__drawer" aria-label="Mobile menu">
              <button type="button" className="header__drawer-item" onClick={handleNavProducts}>
                {strings.nav.products}
              </button>
              <button type="button" className="header__drawer-item" onClick={handleNavAboutUs}>
                {strings.nav.aboutUs}
              </button>
              <button type="button" className="header__drawer-item" onClick={handleNavCatalog}>
                {strings.nav.catalogue}
              </button>
            </nav>
          )}
        </>
      )}
    </header>
  );
}
