import React from "react";
import { Navigate,  useLocation } from "react-router";
import { useAuth } from "../Context/useAuth";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";


const ProtectedRouts = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation(); // current attempted route

  if (loading) {
    return <LoaderSpainer />; 
  }

  if (!user) {
    // redirect to login and store the original destination in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRouts;
