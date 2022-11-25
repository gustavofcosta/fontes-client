import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/app.Context";

interface ChildrenProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ChildrenProps): any => {
  const { user } = useGlobalContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
