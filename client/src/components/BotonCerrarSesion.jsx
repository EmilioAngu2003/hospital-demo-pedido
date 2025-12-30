import React from "react";

const BotonCerrarSesion = ({ setUsuario }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUsuario(null);
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed bottom-4 right-4 flex items-center backdrop-blur-2xl gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-full border border-red-300 transition-all duration-200 shadow-sm text-sm font-medium"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      Cambiar Usuario / Servicio
    </button>
  );
};

export default BotonCerrarSesion;
