import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface formLogin {
  username: string;
  password: string;
  remember: boolean;
}

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const notiSuccess = () => {
    notification.success({
      message: "Đăng nhập thành công",
      placement: "top",
      showProgress: true,
    });
  };

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  const signInApi = baseUrl + "/Auth/signin";

  const onFinish = (values: formLogin) => {
    setErrorMessage("");
    setIsLoading(true);
    const params = {
      email: values.username,
      password: values.password,
    };
    axios
      .post(signInApi, params)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("tk", res.data.token.accessToken);
          localStorage.setItem("role", res.data.user.roles[0].name);
          setTimeout(() => {
            notiSuccess();
          }, 200);
          navigate("/");
          return;
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderErrorMessage = () => {
    if (errorMessage.length > 0)
      return <i className="text-red-600 mt-5">{errorMessage}</i>;
  };
  return (
    <>
      <div className="relative" style={{ minHeight: "700px" }}>
        <h1 className="mb-5">Login Page</h1>

        <Form<formLogin>
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="abc@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="mb-3">{renderErrorMessage()}</div>
          {/* <div className="flex justify-between">
            <div className="unable-align-center">
              <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me?</Checkbox>
              </Form.Item>
            </div>
            <div>
              <a href="#" className="text-blue-500">
                Forgot password?
              </a>
            </div>
          </div> */}
          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full"
              style={{
                minHeight: "50px",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
              loading={isLoading}
              variant="outlined"
              color="primary"
            >
              SIGN IN
            </Button>
          </Form.Item>
        </Form>
        {/* <Divider>OR</Divider>
        <div className="flex flex-col items-center w-full ">
          <button className="w-full font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
            <div className="bg-white rounded-full">
              <svg className="w-4" viewBox="0 0 533.5 544.3">
                <path
                  d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                  fill="#4285f4"
                />
                <path
                  d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                  fill="#34a853"
                />
                <path
                  d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                  fill="#fbbc04"
                />
                <path
                  d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                  fill="#ea4335"
                />
              </svg>
            </div>
            <span className="ml-4">Sign In with Google</span>
          </button>
        </div> */}

        <div className="absolute bottom-0 left-0 text-center w-full ">
          <a
            href="#"
            className="text-blue-500"
            onClick={() => navigate("/auth/signup")}
          >
            Don't have an account? Let's create one!
          </a>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
