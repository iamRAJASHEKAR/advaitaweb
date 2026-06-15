import { useMemo, useState } from "react";
import { strings } from "../../comms/strings";
import type { Product } from "../../comms/types";
import { submitProjectInterest } from "../../lib/supabaseClient";
import "./LeadCapture.css";
import { LegalIdentityNotice } from "../LegalIdentityNotice/LegalIdentityNotice";
import { FormLeadConsent } from "../FormLeadConsent/FormLeadConsent";

type LeadCaptureFormProps = {
  variant?: "section" | "mini" | "homepage";
  product?: Product;
};

const rapidSubmitKey = "advaita_last_lead_submit";
const rapidSubmitWindowMs = 30000;
const trustSignals = ["Bulk Orders", "GST Billing Available", "PAN India Delivery", "Commercial Supply"];

const normalizePhone = (value: string) => value.replace(/[()\s-]/g, "");
const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

const buildWhatsAppUrl = (message: string) => {
  const phone = strings.header.phone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export function LeadCaptureForm({ variant = "section", product }: LeadCaptureFormProps) {
  const isHomepage = variant === "homepage";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const defaultRequirement = product ? `Need best price for ${product.name}` : "";
  const title = variant === "mini" ? "Get Dealer Pricing" : "Need Bulk Pricing?";
  const subtitle =
    variant === "mini"
      ? "Share your requirement and our sales team will respond with bulk pricing."
      : "Talk to sales for commercial supply, dealer pricing, and bulk order support.";

  const whatsappMessage = useMemo(
    () =>
      product
        ? `Hi, I need pricing for ${product.name}.`
        : "Hi, I need pricing for hygiene products.",
    [product],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const lastSubmittedAt = Number(localStorage.getItem(rapidSubmitKey) || 0);
    if (Date.now() - lastSubmittedAt < rapidSubmitWindowMs) {
      setError("Please wait a few seconds before submitting again.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const spamField = String(formData.get("website") || "");
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const normalizedPhone = normalizePhone(phone);
    const company = String(formData.get("company") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const requirement = String(formData.get("requirement") || "").trim();
    const consent = formData.get("consent");

    if (spamField) {
      setError("Unable to submit this request.");
      return;
    }

    if (!phoneRegex.test(normalizedPhone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!consent) {
      setError(strings.forms.consentRequired);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitProjectInterest({
        name,
        phone: normalizedPhone,
        company,
        city,
        project_name: product?.name || "Bulk Hygiene Products",
        project_id: product?.id || "",
        message: requirement,
        source_page: window.location.href,
      });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      localStorage.setItem(rapidSubmitKey, String(Date.now()));
      setSubmitted(true);
      window.open(buildWhatsAppUrl(whatsappMessage), "_blank", "noopener,noreferrer");
      event.currentTarget.reset();
    } catch {
      setError("Unable to submit your request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`lead-card lead-card--${variant}`}>
      {!isHomepage ? (
        <>
          <div className="lead-card__header">
            <p className="eyebrow">Talk to Sales</p>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <div className="lead-trust" aria-label="Business trust signals">
            {trustSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
          <LegalIdentityNotice variant="compact" />
        </>
      ) : (
        <p className="lead-card__form-label">Request a quote</p>
      )}

      <form className="lead-form" onSubmit={handleSubmit}>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="lead-form__trap" />
        <label>
          <span>Name *</span>
          <input name="name" type="text" autoComplete="name" required disabled={isSubmitting} />
        </label>
        <label>
          <span>Mobile Number *</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            required
            disabled={isSubmitting}
          />
        </label>
        <label>
          <span>Company Name *</span>
          <input name="company" type="text" autoComplete="organization" required disabled={isSubmitting} />
        </label>
        <label>
          <span>City</span>
          <input name="city" type="text" autoComplete="address-level2" disabled={isSubmitting} />
        </label>
        <label>
          <span>Requirement / Product Needed *</span>
          <textarea
            name="requirement"
            rows={variant === "mini" ? 3 : 4}
            placeholder="Need 25 pedal bins for office"
            defaultValue={defaultRequirement}
            required
            disabled={isSubmitting}
          />
        </label>
        <FormLeadConsent disabled={isSubmitting} />
        {error ? <p className="lead-form__error">{error}</p> : null}
        {submitted ? <p className="lead-form__success">Request received. WhatsApp is opening with your inquiry.</p> : null}
        <button type="submit" className="btn btn--primary btn--lg lead-form__submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Get Best Price"}
        </button>
      </form>
    </div>
  );
}

export function MobileStickyActions() {
  return (
    <div className="mobile-sticky-actions" aria-label="Quick contact actions">
      <a className="mobile-sticky-actions__call" href={`tel:${strings.header.phone}`}>
        Call Now
      </a>
      <a
        className="mobile-sticky-actions__price"
        href="#bulk-pricing"
        onClick={(event) => {
          const target = document.getElementById("bulk-pricing");
          if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
      >
        Get Best Price
      </a>
      <a
        className="mobile-sticky-actions__whatsapp"
        href={buildWhatsAppUrl("Hi, I need pricing for hygiene products.")}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </div>
  );
}
