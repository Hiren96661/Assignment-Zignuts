import React from "react";
import EditProfile from "./components/EditProfile";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit Profile",
};

const EditProfilePage = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || null;
  return <EditProfile userId={userId} />;
};

export default EditProfilePage;
