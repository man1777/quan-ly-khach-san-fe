import { ConfigProvider } from "antd";

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
