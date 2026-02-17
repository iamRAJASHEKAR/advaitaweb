import "./ClosingCtaSection.css";
import { strings } from "../../comms/strings";

type ClosingCtaSectionProps = {
  onPrimaryCta: () => void;
};

export function ClosingCtaSection({ onPrimaryCta }: ClosingCtaSectionProps) {
  return (
    <section className="shell section section--closing">
      <h2>{strings.closing.title}</h2>
      <p className="closing-subtext">{strings.closing.subtitle}</p>
      <div className="closing-cta">
        <button className="btn btn--primary btn--lg" onClick={onPrimaryCta}>
          {strings.closing.primaryCta}
        </button>
        <button className="btn btn--whatsapp btn--lg">
          {strings.closing.whatsappCta}
        </button>
      </div>
    </section>
  );
}
