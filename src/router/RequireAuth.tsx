import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/configureStore";
import { toast } from "react-toastify";

export default function RequireAuth() {
  const user = useAppSelector((state) => state.user.user);
  const location = useLocation();

  if (!user) {
    toast.error("You have to login first !!!");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
