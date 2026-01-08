import { useRef, useId } from "react";

const DatePicker = ({ label, ...props }) => {
  const id = useId();
  const dateInputRef = useRef(null);

  const handleIconClick = (e) => {
    e.stopPropagation();
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-heading md:inline-block me-4 md:mb-2.5 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative w-full md:max-w-56 md:inline-block">
        <div
          className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none border border-transparent z-10"
          onClick={handleIconClick}
        >
          <CalendarIcon />
        </div>
        <input
          id={id}
          ref={dateInputRef}
          type="date"
          {...props}
          className="datepicker-input block w-full p-2.5 ps-10 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 shadow-xs placeholder:text-body"
        />
      </div>
    </>
  );
};

const CalendarIcon = () => (
  <svg
    className="w-4 h-4 text-body"
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
      d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
    />
  </svg>
);

export default DatePicker;
