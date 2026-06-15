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
  onContactUs: () => void;
  onNavToSection: (sectionId: string) => void;
  products: Product[];
  onSelectProduct: (id: string) => void;
  /** When set, hamburger opens product-by-category menu (detail page). Otherwise opens main nav. */
  productDetailMenu?: ProductDetailMenuConfig | null;
};

export function Header({
  onHome,
  onContactUs,
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

  const handleNavContactUs = () => {
    closeMenu();
    onContactUs();
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
      <div className="header__utility" aria-label="Contact">
        <a className="header__utility-link" href={`tel:${strings.header.phone}`}>
          {strings.header.phoneDisplay}
        </a>
        <a className="header__utility-link" href={`mailto:${strings.header.mail}`}>
          {strings.header.mail}
        </a>
      </div>

      <div className="header__main-row">
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
          <div className="brand__text">
            <h1 className="brand__title">{strings.brand.name}</h1>
            <div className="brand__subtitle-wrap">
              <p className="brand__subtitle brand__subtitle--line1">{strings.brand.subtitleLine1}</p>
              <p className="brand__subtitle brand__subtitle--line2">{strings.brand.subtitleLine2}</p>
            </div>
          </div>
        </div>

        <nav className="nav header__nav-inline" aria-label="Main navigation">
          <button type="button" className="nav__link-btn" onClick={handleNavProducts}>
            {strings.nav.products}
          </button>
          <button type="button" className="nav__link-btn" onClick={() => onNavToSection("why-ahs")}>
            {strings.nav.why}
          </button>
          <button type="button" className="nav__link-btn" onClick={() => onNavToSection("process")}>
            {strings.nav.process}
          </button>
          <button type="button" className="nav__link-btn" onClick={handleNavContactUs}>
            {strings.nav.contactUs}
          </button>
        </nav>

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
              <button
                type="button"
                className="header__drawer-item"
                onClick={() => {
                  closeMenu();
                  onNavToSection("why-ahs");
                }}
              >
                {strings.nav.why}
              </button>
              <button
                type="button"
                className="header__drawer-item"
                onClick={() => {
                  closeMenu();
                  onNavToSection("process");
                }}
              >
                {strings.nav.process}
              </button>
              <button type="button" className="header__drawer-item" onClick={handleNavContactUs}>
                {strings.nav.contactUs}
              </button>
            </nav>
          )}
        </>
      )}
    </header>
  );
}
