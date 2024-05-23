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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [{ path: "profile", element: <Profile /> }],
      },
      { path: "", element: <HomePage /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "cart", element: <CartPage /> },
      { path: "create", element: <ProductCreate /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "products/:id/update",
        element: <ProductUpdate />,
      },
      {
        path: "checkout/:id",
        element: <CheckoutPage />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
