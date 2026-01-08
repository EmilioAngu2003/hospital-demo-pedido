import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Button from "../components/Button";
import Alert from "../components/Alert";

const LoginView = ({ onLogin }) => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = e.target.user.value;
    const password = e.target.password.value;

    try {
      await login(user, password);
      onLogin(true);
      navigate("/admin");
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-8 max-w-5xl mx-auto">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Iniciar sesión
          </h1>
          {error && (
            <Alert
              message={
                error === "Error en la petición"
                  ? "Credenciales incorrectas"
                  : error
              }
              onClose={clearError}
            />
          )}
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleSubmit}
          >
            <div className="mb-5">
              <label
                htmlFor="user"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Usuario
              </label>
              <input
                type="text"
                id="user"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Usuario"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
