import { useState } from "react";

const DropdownMenu = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    option.onClick();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="text-heading bg-neutral-primary box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm p-2 focus:outline-none"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon />
      </button>
      {isOpen && (
        <div className="z-10 absolute right-0 mt-2 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44 dark:divide-gray-600">
          <ul className="p-2 text-sm text-body font-medium">
            {options.map((option) => (
              <li key={option}>
                <a
                  href="#"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded text-left"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
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
