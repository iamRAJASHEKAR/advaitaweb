import { useState } from "react";
import "./Forms.css";
import { strings } from "../../comms/strings";
import { submitProjectInterest } from "../../lib/supabaseClient";
import { LegalIdentityNotice } from "../LegalIdentityNotice/LegalIdentityNotice";
import { FormLeadConsent } from "../FormLeadConsent/FormLeadConsent";

type FormProps = {
  onClose: () => void;
};

const normalizePhone = (value: string) => value.replace(/[()\s-]/g, "");
const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

export function CallbackForm({ onClose }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    const normalizedPhone = normalizePhone(phone);
    const preferredTime = String(formData.get("preferredTime") || "");
    const requirement = String(formData.get("message") || "");
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
        project_name: "Callback Request",
        message: [
          preferredTime ? `Preferred time: ${preferredTime}` : "",
          requirement ? `Requirement: ${requirement}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
        source_page: window.location.href,
      });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Unable to submit callback request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form form-success">
        <h3 className="form-success__title">Callback request received</h3>
        <p className="form-success__message">{strings.forms.callbackSuccess}</p>
        <div className="form-actions form-actions--center">
          <button type="button" className="btn btn--primary" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <LegalIdentityNotice variant="compact" />
      <div className="form-group">
        <label htmlFor="cb-name">{strings.forms.callback.name}</label>
        <input type="text" id="cb-name" name="name" required disabled={isSubmitting} />
      </div>
      <div className="form-group">
        <label htmlFor="cb-phone">{strings.forms.callback.phone}</label>
        <input type="tel" id="cb-phone" name="phone" required disabled={isSubmitting} />
      </div>
      <div className="form-group">
        <label htmlFor="cb-time">{strings.forms.callback.time}</label>
        <select id="cb-time" name="preferredTime" disabled={isSubmitting}>
          <option value="morning">{strings.forms.callback.options.morning}</option>
          <option value="afternoon">
            {strings.forms.callback.options.afternoon}
          </option>
          <option value="evening">{strings.forms.callback.options.evening}</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cb-message">{strings.forms.callback.message}</label>
        <textarea id="cb-message" name="message" rows={3} disabled={isSubmitting} />
      </div>
      <FormLeadConsent disabled={isSubmitting} />
      {error ? <p className="form-error">{error}</p> : null}
      <div className="form-actions">
        <button type="button" onClick={onClose} className="btn btn--outline" disabled={isSubmitting}>
          {strings.forms.callback.cancel}
        </button>
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : strings.forms.callback.submit}
        </button>
      </div>
    </form>
  );
}
