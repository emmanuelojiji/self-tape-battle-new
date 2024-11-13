import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { auth } from "./firebase";
import { UserContext } from "./contexts/UserContext";

const Authentication = ({ element }) => {
  const { user } = useContext(UserContext);
  return <>{user ? element : <Navigate to="/" />}</>;
};

export default Authentication;
