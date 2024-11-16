import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading, isOnboardingComplete } = useContext(UserContext);

  if (loading) return <h1>Loading..</h1>;

  if (user && isOnboardingComplete) return children;

  if (user && !isOnboardingComplete) return <Navigate to="/onboarding" />;

  return <Navigate to="/signup" />;
};


export default ProtectedRoute;
