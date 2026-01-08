import { usePopover } from "../hooks/usePopover";
import FloatingPortal from "./FloatingPortal";

const Popever = ({ comment }) => {
  const { isOpen, getTriggerProps, getContentProps } = usePopover();

  return (
    <FloatingPortal
      isOpen={isOpen}
      placement="bottom-end"
      getTriggerProps={getTriggerProps}
      getContentProps={getContentProps}
    >
      <button className="text-sm text-body flex items-center hover:text-heading h-10 w-auto">
        Observacion
        <InfoIcon />
      </button>
      <div className="md:w-xs p-3 text-sm text-body transition-opacity duration-300 bg-neutral-primary-soft border border-default rounded-base shadow-xs">
        <h3 className="font-semibold text-heading mb-2">Observacion</h3>
        <p>{comment || "No hay observación disponible."}</p>
      </div>
    </FloatingPortal>
  );
};

const InfoIcon = () => {
  return (
    <svg
      className="w-4 h-4 ms-2"
      aria-hidden="true"
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
