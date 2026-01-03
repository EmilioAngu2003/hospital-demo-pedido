import Button from "./Button";

const Login = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = e.target.user.value;
    const password = e.target.password.value;

    if (user === "admin@hospital.com" && password === "admin123") {
      onLogin(true);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-8 max-w-5xl mx-auto">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Iniciar sesión
          </h1>
          <form
            class="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleSubmit}
          >
            <div class="mb-5">
              <label
                for="user"
                class="block mb-2.5 text-sm font-medium text-heading"
              >
                Usuario
              </label>
              <input
                type="text"
                id="user"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Usuario"
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="password"
                class="block mb-2.5 text-sm font-medium text-heading"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
