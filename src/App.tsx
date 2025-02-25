import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
      }}
    ></ConfigProvider>
  );
};
export default App;
