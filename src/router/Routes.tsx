import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RequireAuth from "./RequireAuth";
import HomePage from "../pages/HomePage";
import Profile from "../pages/Profile";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import ProductCreate from "../pages/ProductCreate";
import CartPage from "../pages/CartPage";
import ProductUpdate from "../pages/ProductUpdate";
import NotFound from "../components/notFound/NotFound";
import CheckoutPage from "../pages/CheckoutPage";
import OrderHistory from "../pages/OrderHistoryPage";
import EditProfile from "../components/profile/EditProfile";

import AdminUserPage from "../pages/AdminUserPage";
import AdminProductPage from "../pages/AdminProductPage";
import AdminOrderPage from "../pages/AdminOrderPage";
import SuccessPage from "../pages/SuccessPage";
import CancelledPage from "../pages/CancelledPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "admin/users", element: <AdminUserPage /> },
          { path: "user/:id", element: <EditProfile /> },
          { path: "admin/products", element: <AdminProductPage /> },
          { path: "admin/orders", element: <AdminOrderPage /> },
          { path: "create", element: <ProductCreate /> },
          { path: "cart", element: <CartPage /> },
          { path: "products/:id/update", element: <ProductUpdate /> },
          { path: "checkout/:id", element: <CheckoutPage /> },
          { path: "order/history/:status", element: <OrderHistory /> },
        ],
      },
      { path: "", element: <HomePage /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "cancelled", element: <CancelledPage /> },
      { path: "success", element: <SuccessPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
