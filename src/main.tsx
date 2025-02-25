import "@ant-design/v5-patch-for-react-19";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes.tsx";
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
