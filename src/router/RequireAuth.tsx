import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/configureStore";

export default function RequireAuth() {
  const user = useAppSelector((state) => state.user.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
