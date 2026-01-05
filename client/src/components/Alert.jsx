const Alert = ({ message, onClose }) => {
  return (
    <div className="flex sm:items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft">
      <div className="text-sm">{message}</div>
      <button
        type="button"
        onClick={onClose}
        className="ms-auto -mx-1.5 -my-1.5 bg-danger-soft text-fg-danger-strong rounded focus:ring-2 focus:ring-danger-medium p-1.5 hover:bg-danger-medium inline-flex items-center justify-center h-8 w-8 shrink-0"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <CloseIcon />
      </button>
    </div>
  );
};

const CloseIcon = () => {
  return (
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18 17.94 6M18 18 6.06 6"
      />
    </svg>
  );
};

export default Alert;
