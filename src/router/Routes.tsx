import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RequireAuth from "./RequireAuth";
import HomePage from "../pages/HomePage";

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
//       { path: "catalog", element: <Catalog /> },
//       { path: "catalog/:id", element: <ProductDetail /> },
//       { path: "about", element: <AboutPage /> },
//       { path: "contact", element: <ContactPage /> },
//       { path: "server-error", element: <ServerError /> },
//       { path: "not-found", element: <NotFound /> },
//       { path: "basket", element: <BasketPage /> },
//       { path: "login", element: <Login /> },
//       { path: "register", element: <Register /> },
//       { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
]);
