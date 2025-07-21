import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <HomePage />,
      },
    ],
  },
]);

export { router };
