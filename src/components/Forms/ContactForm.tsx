import { useState } from "react";
import "./Forms.css";
import { strings } from "../../comms/strings";
import { submitProjectInterest } from "../../lib/supabaseClient";
import { FormLeadConsent } from "../FormLeadConsent/FormLeadConsent";

const normalizePhone = (value: string) => value.replace(/[()\s-]/g, "");
const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const consent = formData.get("consent");
    const normalizedPhone = normalizePhone(phone);

    if (!consent) {
      setError(strings.forms.consentRequired);
      setIsSubmitting(false);
      return;
    }

    if (!phoneRegex.test(normalizedPhone)) {
      setError(strings.forms.contact.phoneInvalid);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitProjectInterest({
        name,
        phone: normalizedPhone,
        email: email || undefined,
        project_name: "Contact Us Enquiry",
        message: message || undefined,
        source_page: window.location.href,
      });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError(strings.forms.contact.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form form--embedded form-success">
        <h3 className="form-success__title">{strings.forms.contact.successTitle}</h3>
        <p className="form-success__message">{strings.forms.contact.success}</p>
        <div className="form-actions form-actions--center">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setSubmitted(false)}
          >
            {strings.forms.contact.ok}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="form form--embedded" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <input
          type="text"
          id="contact-name"
          name="name"
          placeholder=" "
          required
          disabled={isSubmitting}
          autoComplete="name"
        />
        <label htmlFor="contact-name">{strings.forms.contact.name}</label>
      </div>

      <div className="form-field">
        <input
          type="tel"
          id="contact-phone"
          name="phone"
          placeholder=" "
          required
          disabled={isSubmitting}
          autoComplete="tel"
        />
        <label htmlFor="contact-phone">{strings.forms.contact.phone}</label>
      </div>

      <div className="form-field">
        <input
          type="email"
          id="contact-email"
          name="email"
          placeholder=" "
          disabled={isSubmitting}
          autoComplete="email"
        />
        <label htmlFor="contact-email">{strings.forms.contact.email}</label>
      </div>

      <div className="form-field form-field--textarea">
        <textarea
          id="contact-message"
          name="message"
          placeholder=" "
          rows={4}
          disabled={isSubmitting}
        />
        <label htmlFor="contact-message">{strings.forms.contact.message}</label>
      </div>

      <FormLeadConsent disabled={isSubmitting} />
      {error ? <p className="form-error">{error}</p> : null}

      <div className="form-actions form-actions--start">
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? strings.forms.contact.submitting : strings.forms.contact.submit}
        </button>
      </div>
    </form>
  );
}
