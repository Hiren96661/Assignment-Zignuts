"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import type { InferType } from "yup";
import { useState } from "react";
import "../../../../components/UserForm/UserForm.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { decryptPassword, SECRET_KEY } from "@/utils/helper";
import { ChangePasswordSchema } from "./ChangePassword.schema";
import CryptoJS from "crypto-js";

type FormData = InferType<typeof ChangePasswordSchema>;

interface IProps {
  userId: string | null;
}

const ChangePassword = ({ userId }: IProps) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(ChangePasswordSchema),
  });

  const onSubmit = (data: FormData) => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    try {
      const getUserData = localStorage.getItem("usersData");
      const users = getUserData ? JSON.parse(getUserData) : [];

      // Find user by userId
      const user = users.find(
        (user: { id: string }) => String(user.id) === userId
      );

      if (!user) {
        toast.error("User not found");
        return;
      }

      const decryptedPassword = decryptPassword(user?.password);

      // Check if current password matches stored password
      if (decryptedPassword !== data.currentPassword) {
        toast.error("Current password is incorrect");
        return;
      }

      // Encrypt the new password before storing
      const encryptedNewPassword = CryptoJS.AES.encrypt(
        data.password,
        SECRET_KEY
      ).toString();

      // Update password
      const updatedUsers = users.map((user: { id: string }) =>
        String(user.id) === userId ? { ...user, password: encryptedNewPassword } : user
      );

      localStorage.setItem("usersData", JSON.stringify(updatedUsers));
      toast.success("Password updated successfully!");
      reset();
    } catch (error) {
      console.log({error})
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={"container"}>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className={"form"} noValidate>
        <h2 className={"title"}>Change Password</h2>

        {/* Current Password */}
        <div className={"inputGroup"}>
          <label className={"label"}>Current Password</label>
          <div className="inputWithIcon">
            <input
              type={showCurrent ? "text" : "password"}
              {...register("currentPassword")}
              className={"input"}
            />
            <span
              className="iconToggle"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {!showCurrent ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
          {errors.currentPassword && (
            <p className={"error"}>{errors.currentPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className={"inputGroup"}>
          <label className={"label"}>New Password</label>
          <div className="inputWithIcon">
            <input
              type={showNew ? "text" : "password"}
              {...register("password")}
              className={"input"}
            />
            <span className="iconToggle" onClick={() => setShowNew(!showNew)}>
              {!showNew ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
          {errors.password && (
            <p className={"error"}>{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className={"inputGroup"}>
          <label className={"label"}>Confirm Password</label>
          <div className="inputWithIcon">
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword")}
              className={"input"}
            />
            <span
              className="iconToggle"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {!showConfirm ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className={"error"}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className={"button"}>
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
