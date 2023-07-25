import Router from "./router";
import { BrowserRouter } from "react-router-dom";
// import { ConfigProvider } from 'antd';
import UserProvider from "./context/UsersContext";
import "./App.css";
import "antd/dist/antd.less";

// import hy from "antd/lib/locale/hy_AM";
// import en from "antd/lib/locale/en_US";

// const antdLocales = { hy, en };
// const locale = JSON.parse(localStorage.getItem("locale") || '"en"');

function App() {
  return (
    
    <UserProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </UserProvider>
    
  );
}

export default App;
