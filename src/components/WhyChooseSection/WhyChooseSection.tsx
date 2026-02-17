import "./WhyChooseSection.css";
import type { Differentiator } from "../../comms/types";
import { strings } from "../../comms/strings";

type WhyChooseSectionProps = {
  differentiators: Differentiator[];
};

export function WhyChooseSection({ differentiators }: WhyChooseSectionProps) {
  return (
    <section className="shell section">
      <div className="section__header">
        <div>
          <p className="eyebrow">{strings.why.eyebrow}</p>
          <h2 className="section__title">{strings.why.title}</h2>
        </div>
      </div>
      <div className="grid grid--3">
        {differentiators.map((diff, idx) => (
          <div key={idx} className="card card--differentiator">
            <div className="diff-icon">{diff.icon}</div>
            <h4 className="diff-title">{diff.title}</h4>
            <p className="diff-description">{diff.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
