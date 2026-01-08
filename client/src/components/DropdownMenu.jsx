import { Link } from "react-router-dom";
import { offset } from "@floating-ui/react";
import { useDropdown } from "../hooks/useDropdown";
import Button from "./Button";
import FloatingPortal from "./FloatingPortal";

const DropdownMenu = ({ options = [] }) => {
  const { isOpen, getTriggerProps, getContentProps, close } =
    useDropdown(false);

  return (
    <FloatingPortal
      isOpen={isOpen}
      middleware={[offset(2)]}
      placement="bottom-end"
      getTriggerProps={getTriggerProps}
      getContentProps={getContentProps}
    >
      <Button
        variant="ghost"
        className="focus:ring-4 focus:ring-neutral-tertiary"
      >
        <span className="sr-only">Abrir menu</span>
        <MenuIcon />
      </Button>

      <div className="bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44 dark:divide-gray-600">
        <ul className="p-2 text-sm text-body font-medium" role="menu">
          {options.map((option, index) => (
            <li key={index} role="none">
              {option.href ? (
                <Link
                  role="menuitem"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded text-left"
                  to={option.href}
                  onClick={close}
                >
                  {option.label}
                </Link>
              ) : (
                <button
                  role="menuitem"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded text-left"
                  onClick={() => {
                    option.onClick?.(index);
                    close();
                  }}
                >
                  {option.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </FloatingPortal>
  );
};

const MenuIcon = () => {
  return (
    <svg
      className="w-6 h-6"
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
        strokeWidth="3"
        d="M6 12h.01m6 0h.01m5.99 0h.01"
      />
    </svg>
  );
};

export default DropdownMenu;
