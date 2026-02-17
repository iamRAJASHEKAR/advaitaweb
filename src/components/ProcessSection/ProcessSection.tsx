import "./ProcessSection.css";
import type { ProcessStep } from "../../comms/types";
import { strings } from "../../comms/strings";

type ProcessSectionProps = {
  steps: ProcessStep[];
};

export function ProcessSection({ steps }: ProcessSectionProps) {
  return (
    <section id="process" className="shell section">
      <div className="section__header">
        <div>
          <p className="eyebrow">{strings.process.eyebrow}</p>
          <h2 className="section__title">{strings.process.title}</h2>
        </div>
      </div>
      <div className="process-flow">
        {steps.map((step) => (
          <div key={step.step} className="process-step">
            <div className="step-number">{step.step}</div>
            <h4 className="step-title">{step.title}</h4>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
