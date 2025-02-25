import { createBrowserRouter } from "react-router-dom";
import { AdminLayout, ClientLayout, AuthLayout } from "./layout";
import { admin, client, auth } from "./pages";
import SignupPage from "./pages/auth/sign_up/SignUpPage";
import LoginPage from "./pages/auth/login/LoginPage";

const { DashboardPage } = admin;
const { HomePage } = client;
const {  } = auth;

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <HomePage /> },
      
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
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/auth/signup", element: <SignupPage /> },
    ],
  },
]);

export default router;
