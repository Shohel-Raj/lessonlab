import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiBook,
  FiSettings,
  FiStar,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../Context/useAuth";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";
import { FaArrowAltCircleDown, FaArrowLeft, FaPlus } from "react-icons/fa";
import { UserUtils } from "../Utils/UserUtils";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const { loading, user } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null);
  const sidebarVariants = {
    open: { width: "260px" },
    closed: { width: "70px" },
  };

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

  if (loading) {
    return <LoaderSpainer />;
  }

  return (
    <div className="min-h-screen flex bg-base-200 transition-all duration-300">
      {/* SIDEBAR */}
      <motion.aside
        variants={sidebarVariants}
        animate={open ? "open" : "closed"}
        className="bg-base-100 shadow-md border-r border-base-300 relative"
      >
        <div className="py-6 px-2">
          <div className="text-xl font-bold mb-6 flex flex-col gap-1">
            {/* Toggle Button */}
            <button
              onClick={() => setOpen(!open)}
              className="absolute  top-5 bg-primary text-white p-2 rounded-full shadow cursor-pointer"
            >
              {open ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
            <h1 className="ml-10">{open ? "lessonLab" : "LL"}</h1>
          </div>

          {/* MENU LINKS */}
          <nav className="flex flex-col gap-3 mt-6">
            <SidebarLink
              to="/dashboard"
              icon={<FiHome />}
              open={open}
              label="Home"
            />
            <SidebarLink
              to="/dashboard/profile"
              icon={<FiUser />}
              open={open}
              label="My Profile"
            />
            <SidebarLink
              to="/dashboard/add-lesson"
              icon={<FaPlus />}
              open={open}
              label="Add Lesson"
            />
            <SidebarLink
              to="/dashboard/my-lessons"
              icon={<FiBook />}
              open={open}
              label="My Lessons"
            />
            <SidebarLink
              to="/dashboard/favorites"
              icon={<FiStar />}
              open={open}
              label="Saved Lessons"
            />
            <SidebarLink
              to="/dashboard/settings"
              icon={<FiSettings />}
              open={open}
              label="Settings"
            />

            {/* Admin-specific links */}
            {loggedUser?.role === "admin" && (
              <>
               
                <SidebarLink
                  to="/dashboard/admin/manage-users"
                  icon={<FiUser />}
                  open={open}
                  label="Manage Users"
                />
                <SidebarLink
                  to="/dashboard/admin/manage-lessons"
                  icon={<FiBook />}
                  open={open}
                  label="Manage Lessons"
                />
                <SidebarLink
                  to="/dashboard/admin/reported-lessons"
                  icon={<FiStar />}
                  open={open}
                  label="Reported Lessons"
                />
              </>
            )}

             <div className="border-t border-base-300 mt-8"></div>{" "}
                {/* separator */}
                <SidebarLink
                  to="/"
                  icon={<FaArrowLeft />}
                  open={open}
                  label="Go Home"
                />
          </nav>
        </div>
      </motion.aside>

      {/* RIGHT MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOP NAV */}
        <div className="navbar bg-base-100 shadow-sm px-6">
          <div className="flex-1">
            <p className="text-lg font-semibold">Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="avatar">
              <div className="w-10 rounded-full border">
                <img src={user?.photoURL} alt="user" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

/***************************
 *  SIDEBAR LINK COMPONENT
 ***************************/
const SidebarLink = ({ to, icon, label, open }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition 
       ${
         isActive
           ? "bg-primary/20 text-primary font-semibold"
           : "hover:bg-base-300"
       }`
    }
  >
    <span className="text-xl">{icon}</span>

    <AnimatePresence>
      {open && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </NavLink>
);

/***************************
 *  THEME TOGGLE
 ***************************/
const ThemeToggle = () => {
  const changeTheme = () => {
    const html = document.documentElement;
    const isDark = html.getAttribute("data-theme") === "dark";
    html.setAttribute("data-theme", isDark ? "light" : "dark");
    localStorage.setItem("theme", isDark ? "light" : "dark");
  };

  return (
    <button onClick={changeTheme} className="btn btn-sm btn-primary">
      Toggle Theme
    </button>
  );
};
