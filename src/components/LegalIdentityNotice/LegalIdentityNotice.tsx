import "./LegalIdentityNotice.css";
import { strings } from "../../comms/strings";

type LegalIdentityNoticeProps = {
  variant?: "footer" | "page" | "compact";
  className?: string;
};

export function LegalIdentityNotice({ variant = "footer", className = "" }: LegalIdentityNoticeProps) {
  const variantClass =
    variant === "page"
      ? " legal-identity-notice--on-light"
      : variant === "compact"
        ? " legal-identity-notice--compact"
        : "";

  return (
    <div
      className={`legal-identity-notice${variantClass} ${className}`.trim()}
      aria-label="Registered business identity"
    >
      <p className="legal-identity-notice__name">{strings.company.legalName}</p>
      <p className="legal-identity-notice__line">
        {strings.company.gstLabel} {strings.company.gstNumber}
      </p>
      <p className="legal-identity-notice__line">
        {strings.company.cinLabel} {strings.company.cinNumber}
      </p>
    </div>
  );
}
