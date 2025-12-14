import React, { useEffect, useState } from "react";
import { UserUtils } from "../../Utils/UserUtils";
import { useAuth } from "../../Context/useAuth";
import DashoardHomeUser from "./user/DashoardHomeUser";
import AdminDAshboardHome from "./AdminDAshboardHome";
import { toast } from "react-toastify";
import LoaderSpainer from "../../Components/Loader/LoaderSpainer";

const DashboardHome = () => {
  const { user } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;
      try {
        setLoader(true);
        const token = await user.getIdToken(); // get Firebase token
        const data = await UserUtils.getCurrentUser(token); // fetch user from backend
        setLoggedUser(data);
        setLoader(false)
      } catch (err) {
        toast.error("Error fetching logged user");
        setLoader(false)
      }
    };

    fetchUser();
  }, [user]);

  if (loader) {
    return <LoaderSpainer/>
  }
  return (
    <div>
      {loggedUser?.role === "user" ? (
        <DashoardHomeUser />
      ) : (
        <AdminDAshboardHome />
      )}
    </div>
  );
};

export default DashboardHome;
