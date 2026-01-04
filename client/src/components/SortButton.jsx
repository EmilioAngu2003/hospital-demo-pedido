import Button from "./Button";

const SortButton = ({ label, sortKey, config, onSort }) => {
  const isSelected = config.key === sortKey;
  return (
    <div className="flex items-center">
      {label}
      <Button variant="ghost" type="button" onClick={() => onSort(sortKey)}>
        <svg
          className={`w-4 h-4 ms-1 ${
            isSelected ? "text-brand" : "text-body-subtle opacity-30"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={config.direction === "desc" ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
          />
        </svg>
      </Button>
    </div>
  );
};

export default SortButton;
