import "./IndustriesSection.css";
import type { Industry } from "../../comms/types";
import { strings } from "../../comms/strings";

type IndustriesSectionProps = {
  industries: Industry[];
};

export function IndustriesSection({ industries }: IndustriesSectionProps) {
  return (
    <section className="shell section section--alt">
      <div className="section__header">
        <div>
          <p className="eyebrow">{strings.industries.eyebrow}</p>
          <h2 className="section__title">{strings.industries.title}</h2>
          <p className="section__body">{strings.industries.body}</p>
        </div>
      </div>
      <div className="grid grid--industry">
        {industries.map((industry) => (
          <div key={industry.name} className="industry-badge">
            <span className="industry-icon">{industry.icon}</span>
            <p className="industry-name">{industry.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
