import "./TrustSection.css";
import type { TrustMetric } from "../../comms/types";

type TrustSectionProps = {
  metrics: TrustMetric[];
};

export function TrustSection({ metrics }: TrustSectionProps) {
  return (
    <section id="why-ahs" className="shell trust-section">
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
