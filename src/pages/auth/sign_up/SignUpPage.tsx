import { Button, Form, Input } from "antd";
import axios from "axios";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface formSignup {
  username: string;
  password: string;
  remember: boolean;
}

const SignUpPage: FC = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const baseUrl = import.meta.env.VITE_API_URL;

  const signUpApi = baseUrl + "/Auth/signup";

  const onFinish = (values: formSignup) => {
    setErrorMessage("");
    setIsLoading(true);
    const params = {
      email: values.username,
      password: values.password,
    };
    axios
      .post(signUpApi, params)
      .then((res) => {
        if (res.status === 200) {
          navigate("/auth");
          return;
        }
        console.log("daa", res);
      })
      .catch((err) => {
        console.log("err", err);
        setErrorMessage(err.response.data.errors.Email[0]);
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
        <h1 className="mb-5">Sign Up Page</h1>

        <Form<formSignup>
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
              SIGN UP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SignUpPage;
