import DashboardPage from "./admin/dashboard/DashboardPage";
import LoginPage from "./auth/login/LoginPage";
import RememberPasswordPage from "./auth/remember_password/RememberPasswordPage";
import SignupPage from "./auth/sign_up/SignUpPage";
import HomePage from "./client/home/HomePage";

const admin = {
  DashboardPage,
};

const client = {
  HomePage,
};
const auth = {
  LoginPage,
  RememberPasswordPage,
  SignupPage
};
export { admin, client,auth };
