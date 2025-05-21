import React from "react";
import SignUp from "./components/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account to access exclusive features.",
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
