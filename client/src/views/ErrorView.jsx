const ErrorView = ({ title, message, buttonText, onClick }) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div
        id="alert-additional-content-2"
        className="p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft border border-danger-subtle"
        role="alert"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <InfoIcon />
            <span className="sr-only">Info</span>
            <h3 className="font-medium">{title}</h3>
          </div>
        </div>
        <div className="mt-2 mb-4">{message}</div>
        {buttonText && (
          <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center text-white bg-danger box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-xs px-3 py-1.5 focus:outline-none"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

const InfoIcon = () => {
  return (
    <svg
      className="w-4 h-4 shrink-0 me-2"
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
        d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default ErrorView;
