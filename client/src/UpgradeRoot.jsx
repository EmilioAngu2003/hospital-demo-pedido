import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useInitialData } from "./hooks/useInitialData";

import HomeView from "./views/HomeView";
import AllView from "./views/AllView";
import OrderView from "./views/OrderView";
import AdminView from "./views/AdminView";
import LoadingView from "./views/LoadingView";
import ErrorView from "./views/ErrorView";
import LoginView from "./views/LoginView";

const UpgradeRoot = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { templates, statuses, shifts, services, loading, error } =
    useInitialData();

  useEffect(() => {
    const authenticate = () => {
      const token = localStorage.getItem("token");
      if (token) setIsAuthenticated(true);
    };

    authenticate();
  }, []);

  if (loading) return <LoadingView />;
  if (error)
    return (
      <ErrorView title={"No se pudo cargar las constantes"} message={error} />
    );

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route
            path="/"
            element={<HomeView templates={templates} shifts={shifts} />}
          />
          <Route
            path="/all"
            element={
              <AllView
                templates={templates}
                shifts={shifts}
                statuses={statuses}
                services={services}
              />
            }
          />
          <Route path="/order/:id" element={<OrderView />} />
          <Route
            path="/admin/*"
            element={
              isAuthenticated ? (
                <AdminRoutes />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/login"
            element={<LoginView onLogin={setIsAuthenticated} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

const AdminRoutes = () => {
  return (
    <AdminView>
      <Routes>
        <Route path="orders" element={<h1>Orders List</h1>} />
        <Route path="order/:id" element={<h1>Order Detail</h1>} />
        <Route path="order/edit/:id" element={<h1>Edit Order</h1>} />
        <Route path="history" element={<h1>History</h1>} />
        <Route path="templates" element={<h1>Templates</h1>} />
      </Routes>
    </AdminView>
  );
};

export default UpgradeRoot;
