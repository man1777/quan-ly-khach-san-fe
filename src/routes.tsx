import { createBrowserRouter } from "react-router-dom";
import { AdminLayout, ClientLayout, AuthLayout } from "./layout";
import { admin, client, auth } from "./pages";
import GalleryPage from "./pages/client/Gallery/GalleryPage";
import BookingTypeRoom from "./pages/client/ViewBookingTypeRoom/BookingTypeRoom";
import RoomDetail from "./pages/client/ViewRoomDetail/RoomDetail";
import QLKH from "./pages/admin/QLKH/QLKH";
import QLLP from "./pages/admin/roomtype/romtype";

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
      { path: "/booking", element: <BookingTypeRoom /> },
      { path: "/room-detail", element: <RoomDetail /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <ManagementRooms /> },
      { path: "/admin/dashboard", element: <DashboardPage /> },
      { path: "/admin/QLKH", element: <QLKH /> },
      { path: "/admin/QLLP", element: <QLLP /> },
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
