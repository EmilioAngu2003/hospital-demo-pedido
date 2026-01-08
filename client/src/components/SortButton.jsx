import React from "react";
import Button from "./Button";

const SortButton = ({ label, onSort, direction, isSelected }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{label}</span>
      <Button variant="ghost" type="button" size="XS" onClick={onSort}>
        <SortIcon direction={direction} label={label} isSelected={isSelected} />
      </Button>
    </div>
  );
};

const SortIcon = ({ direction, label, isSelected }) => {
  if (!isSelected || !direction) {
    return (
      <Icon aria-label={`Ordenar por ${label}`} className="size-4 text-body">
        <DefaultIcon />
      </Icon>
    );
  }
  const directionText = direction === "asc" ? "ascendente" : "descendente";

  return (
    <Icon
      className="size-4 text-brand"
      aria-label={`Orden ${directionText} por ${label}`}
    >
      {direction === "asc" ? <AscIcon /> : <DescIcon />}
    </Icon>
  );
};

const Icon = ({ children, ...rest }) => {
  if (!children) return null;

  return React.cloneElement(children, {
    ...rest,
  });
};

const DefaultIcon = (props) => (
  <svg
    {...props}
    className={props.className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
    />
  </svg>
);

const AscIcon = (props) => (
  <svg
    {...props}
    className={props.className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 15l7-7 7 7"
    />
  </svg>
);

const DescIcon = (props) => (
  <svg
    {...props}
    className={props.className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export default SortButton;
