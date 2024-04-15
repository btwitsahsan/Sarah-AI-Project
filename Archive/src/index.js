import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import ChatPage from "./pages/ChatPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" exact element={<App />} />
      <Route path="/chat/:chatId" element={<ChatPage />} />
    </Routes>
  </BrowserRouter>
);
