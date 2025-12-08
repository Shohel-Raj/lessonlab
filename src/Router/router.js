import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
  },
]);

export default router;

// {
//     path: "/",
//     Component: Root,
//     children: [
//       { index: true, Component: Home },
//       { path: "about", Component: About },
//       {
//         path: "auth",
//         Component: AuthLayout,
//         children: [
//           { path: "login", Component: Login },
//           { path: "register", Component: Register },
//         ],
//       },