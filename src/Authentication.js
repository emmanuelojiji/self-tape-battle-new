import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

const Authentication = ({ element }) => {
  const { user, loading, isOnboardingComplete } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;

  if (isOnboardingComplete) {
    return user ? element : <Navigate to="/signup" />;
  }

  if (!isOnboardingComplete) {
    return <Navigate to="/onboarding" />;
  }
};

export default Authentication;

/* User logged in + not onboarded -> redirect to onboarding
  User logged in + onboarded -> redirect to battles
  user not logged in -> redirect to signup
*/
