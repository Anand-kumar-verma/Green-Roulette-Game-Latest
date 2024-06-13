import CryptoJS from "crypto-js";
import { Navigate, Route, Routes } from "react-router-dom";
import "../src/index.css";
import "./App.css";
import "./assets/styles/main.css";
import ForgetPassword from "./pages/auth/login/ForgetPassword";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import { routes } from "./routes";
import { MypromotionDataFn } from "./services/apicalling";
import { useQuery } from "react-query";

const App = () => {
  const isAuthenticated =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null; // Check if the user is authenticated
  useQuery(["promotion_data"], () => isAuthenticated && MypromotionDataFn(), {
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/*" element={<Navigate to={"/"} replace />} />
      <Route path="/register" element={<Register />} />
      {isAuthenticated ? (
        routes?.map((route, index) => {
          return (
            <Route key={index} path={route?.path} element={route?.component} />
          );
        })
      ) : (
        <Route path="/" element=<Login /> />
      )}
    </Routes>
  );
};

export default App;
