import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
    ],
  },
  {
    path: "auth", // parent path
    children: [
      { path: "login", Component: Login }, // becomes /auth/login
      { path: "register", Component: Register }, // becomes /auth/register
    ],
  },
]);

export default router;
