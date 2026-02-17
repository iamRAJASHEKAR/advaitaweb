import "./Modal.css";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  /** When true, hide the header (title and close button). */
  hideHeader?: boolean;
};

export function Modal({ children, onClose, title, hideHeader = false }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {!hideHeader && (
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
