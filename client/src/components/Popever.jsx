import { useState } from "react";

const Popever = ({ comment }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="text-sm text-body flex items-center hover:text-heading"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        Observacion
        <InfoIcon />
        <span className="sr-only">Mostrar observacion</span>
      </button>
      <div
        className={`absolute z-10 p-3 text-sm text-body transition-opacity duration-300 bg-neutral-primary-soft border border-default rounded-base shadow-xs 
        ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        {comment ? (
          <div>
            <h3 className="font-semibold text-heading mb-2">Observacion</h3>
            <p>{comment}</p>
          </div>
        ) : (
          <div>
            <p>No hay observacion</p>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoIcon = () => {
  return (
    <svg
      className="w-4 h-4 ms-2"
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
        d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default Popever;
