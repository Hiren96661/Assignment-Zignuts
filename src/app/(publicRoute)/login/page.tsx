import React from "react";
import Login from "./components/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login account to access exclusive features.",
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
