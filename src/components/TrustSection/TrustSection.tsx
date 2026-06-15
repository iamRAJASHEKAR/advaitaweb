import "./TrustSection.css";
import { strings } from "../../comms/strings";
import type { TrustMetric } from "../../comms/types";

type TrustSectionProps = {
  metrics: TrustMetric[];
};

export function TrustSection({ metrics }: TrustSectionProps) {
  return (
    <section className="shell trust-section" aria-label={strings.trust.label}>
      <div className="trust-grid">
        {metrics.map((metric, idx) => (
          <div key={idx} className="trust-item">
            <p className="trust-value">{metric.value}</p>
            <p className="trust-label">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
