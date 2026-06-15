import { strings } from "../../comms/strings";
import "./GetDirectionsLink.css";

type GetDirectionsLinkProps = {
  variant?: "footer" | "page";
  className?: string;
};

export function GetDirectionsLink({ variant = "page", className = "" }: GetDirectionsLinkProps) {
  return (
    <a
      href={strings.header.mapsUrl}
      className={`get-directions-link get-directions-link--${variant} ${className}`.trim()}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        className="get-directions-link__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      {strings.header.getDirections}
    </a>
  );
}
