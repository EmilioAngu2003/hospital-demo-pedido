import { useId } from "react";

const QuantityCounter = ({ value, onChange, ...rest }) => {
  const uniqueId = useId();

  const handleChange = (e) => {
    const val = e.target.value === "" ? 0 : parseInt(e.target.value);
    onChange(val);
  };

  const increment = () => onChange(Number(value || 0) + 1);
  const decrement = () => onChange(Number(value || 0) - 1);

  return (
    <>
      <label htmlFor={uniqueId} className="sr-only">
        Elegir Cantidad
      </label>

      <div className="relative flex items-center">
        <button
          type="button"
          onClick={decrement}
          className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6 transition-colors"
        >
          <svg
            className="w-3 h-3 text-heading"
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
              d="M5 12h14"
            />
          </svg>
        </button>

        <input
          id={uniqueId}
          type="number"
          className="quantity-counter shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 text-center w-10"
          onChange={handleChange}
          value={value}
          {...rest}
        />

        <button
          type="button"
          onClick={increment}
          className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6 transition-colors"
        >
          <svg
            className="w-3 h-3 text-heading"
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
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default QuantityCounter;
