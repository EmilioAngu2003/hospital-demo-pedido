import { useState } from "react";

const DateRangePicker = ({ onChange, initialStart, initialEnd }) => {
  const [range, setRange] = useState({
    start: initialStart,
    end: initialEnd,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const nextRange = {
      ...range,
      [name]: value,
    };
    setRange(nextRange);
    if (onChange) {
      onChange(nextRange.start, nextRange.end);
    }
  };

  return (
    <div className="flex items-center font-normal">
      <span className="mr-4">Desde</span>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <CalendarIcon />
        </div>
        <input
          id="datepicker-range-start"
          name="start"
          type="date"
          value={range.start}
          onChange={handleChange}
          className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 shadow-xs placeholder:text-body"
        />
      </div>
      <span className="mx-4 text-body">hasta</span>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <CalendarIcon />
        </div>
        <input
          id="datepicker-range-end"
          name="end"
          type="date"
          value={range.end}
          min={range.start}
          onChange={handleChange}
          className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3  shadow-xs placeholder:text-body"
        />
      </div>
    </div>
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

export default DateRangePicker;
