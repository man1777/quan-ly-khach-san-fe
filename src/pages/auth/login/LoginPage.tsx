import { Button, Input } from "antd";
import { InputField } from "../../../components";
import { useState } from "react";
const LoginPage = () => {
    let [userName, setUserName ] = useState('username')
  return (
    <>
      <div>
        <h1>Login Page</h1>
        <Input ></Input>
        <Button>SIGN IN</Button>
      </div>
    </>
  );
};
type formLogin= {
     username:'',
     password:'',
     isRemember:false
}
export default LoginPage;