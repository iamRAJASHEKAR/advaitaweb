import { useState } from "react";
import "./App.css";

export type ProductCategory = {
  id: string;
  name: string;
  tagline: string;
  items: string[];
  lead: string;
  availability: string;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  images: string[];
  capacity: string;
  material: string;
  color: string;
  structure: string;
  usage: string;
  size: string;
  grade?: string;
  finish?: string;
  description: string;
  features: string[];
  minimumOrder?: number;
};

const products: Product[] = [
  {
    id: "60l-ss-dustbin",
    name: "60L Stainless Steel Dust Bin",
    categoryId: "dustbins",
    price: 2600,
    images: [
      "https://via.placeholder.com/600x600/0b1020/eab308?text=60L+Dustbin+Front",
      "https://via.placeholder.com/600x600/0b1020/eab308?text=60L+Dustbin+Side",
      "https://via.placeholder.com/600x600/0b1020/eab308?text=60L+Dustbin+Top",
    ],
    capacity: "60 Liters",
    material: "Stainless Steel",
    color: "Silver / Matte Black",
    structure: "Round Open Top",
    usage: "Outdoor, Office, Industrial",
    size: '14" x 28"',
    grade: "SS 304",
    finish: "Polished / Matte",
    description:
      "Premium 60-liter stainless steel dustbin designed for high-traffic commercial spaces. Built with corrosion-resistant SS 304 grade steel for long-lasting durability. Ideal for offices, hospitals, manufacturing facilities, and outdoor installations. Features a smooth polished finish that's easy to clean and maintain.",
    features: [
      "Corrosion-resistant SS 304 grade construction",
      "Scratch-proof rubber ring at the bottom",
      "Easy-clean polished surface",
      "Weather-resistant for outdoor use",
      "Sturdy round design for stability",
      "Suitable for high-traffic areas",
    ],
    minimumOrder: 2,
  },
  {
    id: "pedal-dustbin-25l",
    name: "Stainless Steel Pedal Waste Bin 25L",
    categoryId: "dustbins",
    price: 780,
    images: [
      "https://via.placeholder.com/600x600/0b1020/eab308?text=Pedal+Bin+25L",
      "https://via.placeholder.com/600x600/0b1020/eab308?text=Pedal+Mechanism",
    ],
    capacity: "25 Liters",
    material: "Stainless Steel",
    color: "Silver",
    structure: "Foot Pedal with Lid",
    usage: "Office, Hospital, Residential",
    size: '12" x 18"',
    grade: "SS 202",
    finish: "Polished",
    description:
      "Hygienic foot-pedal operated dustbin with smooth operation and durable construction. Perfect for environments requiring hands-free waste disposal. Features a tight-fitting lid to contain odors and maintain cleanliness.",
    features: [
      "Hands-free foot pedal operation",
      "Tight-fitting lid for odor control",
      "SS 202 grade construction",
      "Polished stainless steel finish",
      "Non-slip rubber base",
      "Easy to clean and maintain",
    ],
    minimumOrder: 10,
  },
];

const categories: ProductCategory[] = [
  {
    id: "washroom",
    name: "Washroom Hygiene",
    tagline: "Professional-grade dispensers & consumables for daily operations",
    items: [
      "Tissue dispensers (C-fold, M-fold, JRT)",
      "Soap & sanitizer dispensers (auto & manual)",
      "Hand dryers (jet, compact, HEPA)",
      "Air freshener systems",
    ],
    lead: "Lead time: 3-5 days standard orders",
    availability: "Certified for high-traffic facilities",
  },
  {
    id: "waste",
    name: "Waste Management",
    tagline: "Durable, hygienic waste disposal solutions",
    items: [
      "Stainless steel dustbins & pedal bins",
      "Touchless sensor bins",
      "Bio-waste containers",
      "Housekeeping trolleys & carts",
    ],
    lead: "Lead time: 5-7 days for bulk orders",
    availability: "SS 304/316 grade construction",
  },
  {
    id: "chemicals",
    name: "Cleaning & Chemicals",
    tagline: "Hospital-grade disinfectants & eco-friendly solutions",
    items: [
      "Disinfectants (ISO & FSSAI approved)",
      "Eco-friendly cleaning solutions",
      "Floor care products",
      "Surface sanitizers",
    ],
    lead: "Lead time: 2-3 days stock availability",
    availability: "Bulk orders: custom packaging available",
  },
  {
    id: "amc",
    name: "Refills & AMC",
    tagline: "Subscription-based consumables & maintenance contracts",
    items: [
      "Automatic monthly refill plans",
      "Annual Maintenance Contracts",
      "Consumable supply planning",
      "Installation & staff training",
    ],
    lead: "Lead time: Continuous on-demand delivery",
    availability: "Flexible contracts: 6-36 months",
  },
];

const trustMetrics = [
  { value: "15+", label: "Years serving enterprise clients" },
  { value: "500+", label: "Trusted across Fortune 500 & mid-market" },
  { value: "24/7", label: "Logistics & support coverage" },
];

const differentiators = [
  {
    title: "On-Time Delivery",
    description: "Metro: 12-hour delivery. Pan-India: 2-5 days guaranteed.",
    icon: "📦",
  },
  {
    title: "Standardized Quality",
    description: "ISO-certified manufacturing with regular compliance audits.",
    icon: "✓",
  },
  {
    title: "Hassle-Free Setup",
    description: "Site planning, installation, training—all included.",
    icon: "🛠",
  },
  {
    title: "Dedicated Account Support",
    description: "Single contact for all needs. 24/7 WhatsApp support.",
    icon: "💬",
  },
  {
    title: "Transparent Pricing",
    description:
      "No middlemen. Direct manufacturer pricing with bulk discounts.",
    icon: "💰",
  },
  {
    title: "Compliance Ready",
    description: "ISO 9001, ISO 14001 certified. Audit reports included.",
    icon: "📋",
  },
];

const industries = [
  { name: "Corporate Offices", icon: "🏢" },
  { name: "Hospitals & Clinics", icon: "🏥" },
  { name: "Hotels & Hospitality", icon: "🏨" },
  { name: "Educational Institutions", icon: "🎓" },
  { name: "Manufacturing & Factories", icon: "🏭" },
  { name: "Retail Chains", icon: "🛍" },
  { name: "Government Facilities", icon: "🏛" },
  { name: "Data Centers", icon: "🖥" },
];

const processSteps = [
  {
    step: 1,
    title: "Free Facility Audit",
    description: "We assess your space and hygiene needs. No obligation.",
  },
  {
    step: 2,
    title: "Customized Quote",
    description: "Products, quantities, delivery plan & maintenance schedule.",
  },
  {
    step: 3,
    title: "Seamless Deployment",
    description: "Installation, training, and real-time tracking dashboard.",
  },
  {
    step: 4,
    title: "Ongoing Support",
    description: "Monthly reviews, proactive restocking, performance reports.",
  },
];

function App() {
  const [currentView, setCurrentView] = useState<"home" | "product">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);

  const handleProductClick = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setCurrentView("product");
      window.scrollTo(0, 0);
    }
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedProduct(null);
  };

  return (
    <div className="page">
      <header className="shell header">
        <div
          className="brand"
          onClick={handleBackToHome}
          style={{ cursor: "pointer" }}
        >
          <div className="brand__mark">AH</div>
          <div>
            <p className="eyebrow">Advaita Hyginie</p>
            <h1 className="brand__title">B2B Hygiene Solutions</h1>
            <p className="brand__subtitle">
              Trusted partner for enterprise hygiene, supplies, and on-site
              uptime.
            </p>
          </div>
        </div>
        <nav className="nav">
          <a href="#solutions">Solutions</a>
          <a href="#catalogue">Catalogue</a>
          <a href="#support">Support</a>
        </nav>
        <div className="actions">
          <button className="btn btn--outline">Download catalogue</button>
          <button className="btn btn--primary">Talk to sales</button>
        </div>
      </header>

      <main>
        {currentView === "product" && selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={handleBackToHome}
            onGetQuote={() => setShowQuoteModal(true)}
            onRequestCallback={() => setShowCallbackModal(true)}
          />
        ) : (
          <>
            <section id="solutions" className="shell hero">
              <div>
                <p className="pill pill--active">
                  Black & Gold Enterprise Theme
                </p>
                <h2 className="hero__title">
                  Hygiene that keeps your facilities always-on.
                </h2>
                <p className="hero__body">
                  We design and supply end-to-end hygiene programs for offices,
                  hospitals, manufacturing floors, and hospitality chains. Every
                  rollout ships with installation readiness, refill planning,
                  and service SLAs.
                </p>
                <div className="hero__cta">
                  <button className="btn btn--primary">
                    View product lines
                  </button>
                  <button className="btn btn--ghost">Book a walkthrough</button>
                </div>
                <div className="stats">
                  <div className="stat">
                    <p className="stat__value">24/7</p>
                    <p className="stat__label">Facility uptime focus</p>
                  </div>
                  <div className="stat">
                    <p className="stat__value">220+</p>
                    <p className="stat__label">Enterprise clients serviced</p>
                  </div>
                  <div className="stat">
                    <p className="stat__value">12 hr</p>
                    <p className="stat__label">Metro replenishment SLA</p>
                  </div>
                </div>
              </div>
              <div className="hero__card card">
                <p className="eyebrow">Program Highlights</p>
                <ul className="list">
                  <li>
                    Standardized SKUs for dustbins, tissues, hand dryers,
                    dispensers
                  </li>
                  <li>Subscription-based refills and AMC for hardware</li>
                  <li>
                    Site-ready delivery: labeling, mounting hardware, and safety
                    sheets
                  </li>
                </ul>
                <div className="badge-grid">
                  <span className="pill pill--ghost">Bulk-ready</span>
                  <span className="pill pill--ghost">Hygiene audits</span>
                  <span className="pill pill--ghost">On-site training</span>
                  <span className="pill pill--ghost">PAN India</span>
                </div>
              </div>
            </section>

            <section id="catalogue" className="shell section">
              <div className="section__header">
                <div>
                  <p className="eyebrow">Catalogue</p>
                  <h3 className="section__title">
                    Core hygiene lines curated for B2B rollouts
                  </h3>
                  <p className="section__body">
                    Only the essentials: dustbins, tissues, hand dryers, and
                    dispensers optimized for durability and easy upkeep.
                  </p>
                </div>
                <div className="pill stack-note">
                  Always on-brand: black base with yellow accents.
                </div>
              </div>
              <div className="grid grid--2">
                {categories.map((category) => (
                  <article
                    key={category.id}
                    className="card card--category"
                    onClick={() =>
                      category.id === "dustbins" &&
                      handleProductClick(products[0].id)
                    }
                    style={
                      category.id === "dustbins" ? { cursor: "pointer" } : {}
                    }
                  >
                    <div className="card__header">
                      <div className="icon" aria-hidden>
                        <span>{category.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="card__title">{category.name}</h4>
                        <p className="card__subtitle">{category.tagline}</p>
                      </div>
                    </div>
                    <ul className="list list--bullets">
                      {category.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="meta">
                      <span className="pill pill--active">{category.lead}</span>
                      <span className="pill pill--ghost">
                        {category.availability}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="support" className="shell section section--cta">
              <div>
                <p className="eyebrow">Support & Service</p>
                <h3 className="section__title">
                  Need deployment-ready hygiene in 2 weeks?
                </h3>
                <p className="section__body">
                  Share your facility blueprint and we’ll map dustbins, hand
                  dryers, dispensers, and tissue placements with replenishment
                  plans.
                </p>
              </div>
              <div className="cta-actions">
                <button className="btn btn--primary">
                  Schedule a facility audit
                </button>
                <button className="btn btn--outline">
                  Get a tailored quote
                </button>
              </div>
            </section>
          </>
        )}
      </main>

      {showQuoteModal && (
        <Modal onClose={() => setShowQuoteModal(false)} title="Get Best Quote">
          <QuoteForm onClose={() => setShowQuoteModal(false)} />
        </Modal>
      )}

      {showCallbackModal && (
        <Modal
          onClose={() => setShowCallbackModal(false)}
          title="Request Callback"
        >
          <CallbackForm onClose={() => setShowCallbackModal(false)} />
        </Modal>
      )}
    </div>
  );
}

type ProductDetailPageProps = {
  product: Product;
  onBack: () => void;
  onGetQuote: () => void;
  onRequestCallback: () => void;
};

function ProductDetailPage({
  product,
  onBack,
  onGetQuote,
  onRequestCallback,
}: ProductDetailPageProps) {
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <section className="shell product-detail">
      <button onClick={onBack} className="btn btn--ghost back-btn">
        ← Back to Catalogue
      </button>

      <div className="product-layout">
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
                Get Best Quote
              </button>
              <button onClick={onRequestCallback} className="btn btn--outline">
                Request Callback
              </button>
            </div>
          </div>

          <div className="price-section">
            <span className="price">
              ₹ {product.price.toLocaleString()} / piece
            </span>
            <span className="pill pill--active">Get Latest Price</span>
          </div>

          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">Capacity</span>
              <span className="spec-value">{product.capacity}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Material</span>
              <span className="spec-value">{product.material}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Color</span>
              <span className="spec-value">{product.color}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Structure</span>
              <span className="spec-value">{product.structure}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Usage</span>
              <span className="spec-value">{product.usage}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Size</span>
              <span className="spec-value">{product.size}</span>
            </div>
            {product.grade && (
              <div className="spec-item">
                <span className="spec-label">Grade</span>
                <span className="spec-value">{product.grade}</span>
              </div>
            )}
            {product.finish && (
              <div className="spec-item">
                <span className="spec-label">Finish</span>
                <span className="spec-value">{product.finish}</span>
              </div>
            )}
          </div>

          {product.minimumOrder && (
            <p className="minimum-order">
              Minimum order quantity: {product.minimumOrder} Piece
            </p>
          )}

          <div className="product-description">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-features">
            <h3>Features</h3>
            <ul className="features-list">
              {product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="cta-section">
            <button onClick={onGetQuote} className="btn btn--primary btn--lg">
              Yes! I am interested
            </button>
          </div>
        </div>
      </div>

      <div className="related-section">
        <h2>Browse More Products</h2>
        <div className="grid grid--3">
          {products.slice(0, 3).map((p) => (
            <div key={p.id} className="card product-card-mini">
              <img src={p.images[0]} alt={p.name} />
              <h4>{p.name}</h4>
              <p className="price-mini">₹ {p.price.toLocaleString()} / piece</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
};

function Modal({ children, onClose, title }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

type FormProps = {
  onClose: () => void;
};

function QuoteForm({ onClose }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quote request submitted successfully! We'll get back to you soon.");
    onClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="company">Company Name *</label>
        <input type="text" id="company" required />
      </div>
      <div className="form-group">
        <label htmlFor="name">Contact Person *</label>
        <input type="text" id="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input type="email" id="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone *</label>
        <input type="tel" id="phone" required />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity Required</label>
        <input type="number" id="quantity" min="1" />
      </div>
      <div className="form-group">
        <label htmlFor="message">Additional Requirements</label>
        <textarea id="message" rows={4} />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onClose} className="btn btn--outline">
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          Submit Quote Request
        </button>
      </div>
    </form>
  );
}

function CallbackForm({ onClose }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Callback request received! Our team will contact you within 24 hours.",
    );
    onClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cb-name">Name *</label>
        <input type="text" id="cb-name" required />
      </div>
      <div className="form-group">
        <label htmlFor="cb-phone">Phone Number *</label>
        <input type="tel" id="cb-phone" required />
      </div>
      <div className="form-group">
        <label htmlFor="cb-time">Preferred Time</label>
        <select id="cb-time">
          <option value="morning">Morning (9 AM - 12 PM)</option>
          <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
          <option value="evening">Evening (4 PM - 7 PM)</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cb-message">Brief Requirement</label>
        <textarea id="cb-message" rows={3} />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onClose} className="btn btn--outline">
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          Request Callback
        </button>
      </div>
    </form>
  );
}

export default App;
