import { useState } from "react";
import "./Forms.css";
import { strings } from "../../comms/strings";
import { submitProjectInterest } from "../../lib/supabaseClient";
import { FormLeadConsent } from "../FormLeadConsent/FormLeadConsent";

type FormProps = {
  onClose: () => void;
};

const normalizePhone = (value: string) => value.replace(/[()\s-]/g, "");
const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

export function QuoteForm({ onClose }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const normalizedPhone = normalizePhone(phone);
    const message = String(formData.get("message") || "").trim();
    const consent = formData.get("consent");

    if (!consent) {
      setError(strings.forms.consentRequired);
      setIsSubmitting(false);
      return;
    }

    if (!phoneRegex.test(normalizedPhone)) {
      setError("Enter a valid 10-digit mobile number.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitProjectInterest({
        name,
        phone: normalizedPhone,
        project_name: "Quote Request",
        message: message || undefined,
        source_page: window.location.href,
      });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Unable to submit quote request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form form-success">
        <h3 className="form-success__title">{strings.forms.quote.successTitle}</h3>
        <p className="form-success__message">{strings.forms.quoteSuccess}</p>
        <div className="form-actions form-actions--center">
          <button type="button" className="btn btn--primary" onClick={onClose}>
            {strings.forms.quote.ok}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="quote-name">{strings.forms.quote.name}</label>
        <input type="text" id="quote-name" name="name" required disabled={isSubmitting} />
      </div>
      <div className="form-group">
        <label htmlFor="quote-phone">{strings.forms.quote.phone}</label>
        <input type="tel" id="quote-phone" name="phone" required disabled={isSubmitting} />
      </div>
      <div className="form-group">
        <label htmlFor="quote-message">{strings.forms.quote.message}</label>
        <textarea id="quote-message" name="message" rows={4} disabled={isSubmitting} />
      </div>
      <FormLeadConsent disabled={isSubmitting} />
      {error ? <p className="form-error">{error}</p> : null}
      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : strings.forms.quote.submit}
        </button>
      </div>
    </form>
  );
}
