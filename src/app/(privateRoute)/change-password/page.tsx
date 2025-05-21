import React from "react";
import ChangePassword from "./components/ChangePassword";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Change Password",
};

const ChangePasswordPage = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || null;
  return <ChangePassword userId={userId} />;
};

export default ChangePasswordPage;
