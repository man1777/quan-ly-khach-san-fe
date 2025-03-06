import { createBrowserRouter } from "react-router-dom";
import { AdminLayout, ClientLayout, AuthLayout } from "./layout";
import { admin, client, auth } from "./pages";
import GalleryPage from "./pages/client/Gallery/GalleryPage";

const { DashboardPage, ManagementRooms } = admin;
const { HomePage } = client;
const { LoginPage, SignupPage } = auth;

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/gallery", element: <GalleryPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <ManagementRooms /> },
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
