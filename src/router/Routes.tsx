import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RequireAuth from "./RequireAuth";
import HomePage from "../pages/HomePage";
import ProductDetails from "../pages/ProductDetails";
import BasketPage from "../pages/BasketPage";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
        //   { path: "checkout", element: <CheckoutPage /> },
        //   { path: "orders", element: <Orders /> },
        ],
      },
      { path: "", element: <HomePage /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "profile", element: <Profile /> },
      { path: "basket", element: <BasketPage /> },
//       { path: "login", element: <Login /> },
//       { path: "register", element: <Register /> },
//       { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
