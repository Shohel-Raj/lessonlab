import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import PricingUpgradePage from "../Pages/PricingUpgradePage";
import PublicLessons from "../Pages/PublicLessons";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "auth/login", Component: Login },
      { path: "auth/register", Component: Register },
      {
        path:"/upgrade-plan",
        Component:PricingUpgradePage
      },
      {
        path:"/lessons",
        Component:PublicLessons
      }
    ],
  },

]);

export default router;
