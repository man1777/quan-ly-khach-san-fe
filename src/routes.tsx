import { createBrowserRouter } from "react-router-dom";
import { AdminLayout, ClientLayout } from "./layout";
import { admin, client } from "./pages";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const { DashboardPage } = admin;
const { HomePage } = client;

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/test", element: <SignupPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/admin/dashboard", element: <DashboardPage /> },
    ],
  },
]);

export default router;
