import { useState } from "react";
import "./Forms.css";
import { strings } from "../../comms/strings";

type FormProps = {
  onClose: () => void;
};

export function QuoteForm({ onClose }: FormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
        <input type="text" id="quote-name" name="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="quote-phone">{strings.forms.quote.phone}</label>
        <input type="tel" id="quote-phone" name="phone" required />
      </div>
      <div className="form-group">
        <label htmlFor="quote-message">{strings.forms.quote.message}</label>
        <textarea id="quote-message" name="message" rows={4} />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn--primary">
          {strings.forms.quote.submit}
        </button>
      </div>
    </form>
  );
}
