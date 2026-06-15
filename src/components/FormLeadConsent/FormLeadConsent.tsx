import { Link } from "react-router-dom";
import { strings } from "../../comms/strings";
import { paths } from "../../routes/paths";
import "../Forms/Forms.css";
import "./FormLeadConsent.css";

type FormLeadConsentProps = {
  disabled?: boolean;
};

export function FormLeadConsent({ disabled = false }: FormLeadConsentProps) {
  return (
    <label className="form-consent">
      <input type="checkbox" name="consent" value="yes" required disabled={disabled} />
      <span className="form-consent__text">
        {strings.forms.consentLabel}{" "}
        <strong>{strings.company.legalName}</strong>{" "}
        {strings.forms.consentLabelAfterCompany}{" "}
        <Link to={paths.privacyPolicy} target="_blank" rel="noopener noreferrer">
          {strings.forms.consentPrivacyLink}
        </Link>{" "}
        and{" "}
        <Link to={paths.termsAndConditions} target="_blank" rel="noopener noreferrer">
          {strings.forms.consentTermsLink}
        </Link>
        .
      </span>
    </label>
  );
}
