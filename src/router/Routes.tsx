import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RequireAuth from "./RequireAuth";
import HomePage from "../pages/HomePage";

import BasketPage from "../pages/BasketPage";
import Profile from "../pages/Profile";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/LoginPage";
import Register from "../pages/Register";
import ProductCreate from "../pages/ProductCreate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
            // { path: "checkout", element: <Profile /> },
            // { path: "orders", element: <BasketPage /> },
        ],
      },
      { path: "home", element: <HomePage /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "profile", element: <Profile /> },
      { path: "basket", element: <BasketPage /> },
      { path: "create", element: <ProductCreate /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      //       { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
