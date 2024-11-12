import { Navigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "./firebase";

const Authentication = ({element}) => {
  return <>{auth.currentUser ? element : <Navigate to="/" />}</>;
};

export default Authentication;
