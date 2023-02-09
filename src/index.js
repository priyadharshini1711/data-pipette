import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/login/login";

import Register from "./login/register";
import Dashboard from "./admin/AdminDashboard";
import './index.css';
import reportWebVitals from './reportWebVitals';
import UploadFile from "./admin/UploadFile";
import UploadFileUser from "./user/UploadFile";
import UserDetail from "./user/UserDetail";
import EditUserDetail from "./user/EditUserDetails";
import UserDashboard from "./user/UserDashboard";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/upload-file" element={<UploadFile />} />
        <Route path="/user/user-details" element={<UserDetail />} />
        <Route path="/user/edit-user" element={<EditUserDetail />} />
        <Route path="/user/upload-file" element={<UploadFileUser />} />
        <Route path="/user/user" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
