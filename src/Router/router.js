import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import PricingUpgradePage from "../Pages/PricingUpgradePage";
import PublicLessons from "../Pages/PublicLessons";
import LifeLessonDetailsPage from "../Pages/LifeLessonDetailsPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Profile from "../Pages/Profile";
import AddLesson from "../Pages/Dashboard/AddLesson";
import MyLessons from "../Pages/Dashboard/user/MyLesson";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "auth/login", Component: Login },
      { path: "auth/register", Component: Register },
      {
        path: "/upgrade-plan",
        Component: PricingUpgradePage,
      },
      {
        path: "/lisson/:id",
        Component: LifeLessonDetailsPage,
      },
      {
        path: "/lessons",
        Component: PublicLessons,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      {
        path:"profile", Component: Profile
      },
      {
        path:"add-lesson", Component: AddLesson
      },
      {
        path:"my-lessons", Component: MyLessons
      }

    ],
  },
]);

export default router;
