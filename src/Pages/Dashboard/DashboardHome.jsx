import React, { useEffect, useState } from "react";
import { UserUtils } from "../../Utils/UserUtils";
import { useAuth } from "../../Context/useAuth";
import DashoardHomeUser from "./user/DashoardHomeUser";

const DashboardHome = () => {
  const { user } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken(); // get Firebase token
        const data = await UserUtils.getCurrentUser(token); // fetch user from backend
        setLoggedUser(data);
      } catch (err) {
        console.error("Error fetching logged user:", err);
      }
    };

    fetchUser();
  }, [user]);

  return (
    <div>
      {loggedUser?.role === "user"  ? (
        <DashoardHomeUser/>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default DashboardHome;
