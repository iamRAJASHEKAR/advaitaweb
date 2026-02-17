import "./Forms.css";
import { strings } from "../../comms/strings";

type FormProps = {
  onClose: () => void;
};

export function CallbackForm({ onClose }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(strings.forms.callbackSuccess);
    onClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cb-name">{strings.forms.callback.name}</label>
        <input type="text" id="cb-name" required />
      </div>
      <div className="form-group">
        <label htmlFor="cb-phone">{strings.forms.callback.phone}</label>
        <input type="tel" id="cb-phone" required />
      </div>
      <div className="form-group">
        <label htmlFor="cb-time">{strings.forms.callback.time}</label>
        <select id="cb-time">
          <option value="morning">{strings.forms.callback.options.morning}</option>
          <option value="afternoon">
            {strings.forms.callback.options.afternoon}
          </option>
          <option value="evening">{strings.forms.callback.options.evening}</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cb-message">{strings.forms.callback.message}</label>
        <textarea id="cb-message" rows={3} />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onClose} className="btn btn--outline">
          {strings.forms.callback.cancel}
        </button>
        <button type="submit" className="btn btn--primary">
          {strings.forms.callback.submit}
        </button>
      </div>
    </form>
  );
}
