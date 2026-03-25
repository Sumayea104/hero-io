import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from '../pages/Home';
import AllApps from '../pages/AllApps';
import MyInstallation from "../pages/MyInstallation";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/apps",
        element: <AllApps/>,
      },
      {
        path: "/installation",
        element: <MyInstallation />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      }
    ],
  
  },
]);

export default router;