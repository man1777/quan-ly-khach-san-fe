import { Outlet } from "react-router-dom";
import "../styles/LayoutAuthorizationStyle.css";
const LayoutAuthorization = () => {
  return (
    <>
      <div className="h-screen w-screen bg-cover bg-center bg-no-repeat flex justify-center items-center background-img">
        <div className="container-form">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default LayoutAuthorization;
