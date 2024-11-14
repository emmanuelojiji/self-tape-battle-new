import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <h1>Loading..</h1>;

  return user ? children : <Navigate to="/signup" />;
};

export default ProtectedRoute;
