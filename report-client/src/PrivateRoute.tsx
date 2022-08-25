import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./app/hooks";

export default function PrivateRoutes() {
  const { auth } = useAppSelector((state) => state.user);
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
