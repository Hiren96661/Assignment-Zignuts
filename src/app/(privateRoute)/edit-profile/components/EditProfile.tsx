"use client";

import { useEffect, useState } from "react";
import UserForm from "@/components/UserForm/UserForm";
import type { InferType } from "yup";
import { toast } from "react-toastify";
import { EditProfileSchema } from "./edit-profile.schema";

type FormData = InferType<typeof EditProfileSchema>;

interface IProps {
  userId: string | null;
}

const EditProfile = ({ userId }: IProps) => {
  const [defaultValues, setDefaultValues] = useState<
    Partial<FormData & { confirmPassword: string }>
  >({});

  useEffect(() => {
    if (!userId) return;
    const getUserData = localStorage.getItem("usersData");
    const parsedData = getUserData ? JSON.parse(getUserData) : [];
    const user = parsedData.find(
      (user: { id: string }) => String(user.id) === userId
    );
    if (user) {
      setDefaultValues({ ...user, confirmPassword: user.password });
    }
  }, [userId]);

  const handleUpdate = (updatedData: FormData) => {
    try {
      const getUserData = localStorage.getItem("usersData");
      const parsedData = getUserData ? JSON.parse(getUserData) : [];

      // Check for duplicate email used by a different user
      const isEmailTaken = parsedData.some(
        (user: { id: string; email: string }) =>
          user.email === updatedData.email && String(user.id) !== userId
      );

      if (isEmailTaken) {
        toast.error("Email ID already in use by another user.");
        return;
      }

      const updatedUsers = parsedData.map((user: { id: string }) =>
        String(user.id) === userId ? { ...user, ...updatedData } : user
      );

      localStorage.setItem("usersData", JSON.stringify(updatedUsers));
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <UserForm
      onSubmit={handleUpdate}
      buttonLabel="Update Profile"
      defaultValues={defaultValues}
    />
  );
};

export default EditProfile;
