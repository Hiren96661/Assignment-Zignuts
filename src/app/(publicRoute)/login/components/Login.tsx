"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { LoginSchema } from "./Login.schema";
import "./login.css";
import { useRouter } from "next/navigation";
import { decryptPassword, PAGE_URL } from "@/utils/helper";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

type FormData = yup.InferType<typeof LoginSchema>;

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(LoginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormData) => {
    const getUserData = localStorage.getItem("usersData");
    const parsedData = getUserData ? JSON.parse(getUserData) : [];

    const user = parsedData.find(
      (item: { email: string }) => item.email === data.email
    );

    if (!user) {
      toast.error("Email not found");
    } else {
      const decryptedPassword = decryptPassword(user.password);
      if (decryptedPassword !== data.password) {
        toast.error("Incorrect password");
      } else {
        toast.success("Login successful!");
        document.cookie = `userId=${user?.id}; path=/; max-age=${60 * 60 * 24}`;
        router.push(PAGE_URL.HOME);
      }
    }
  };

  return (
    <div className={"container"}>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className={"form"} noValidate>
        <h2 className={"title"}>Login</h2>

        {/* Email */}
        <div className={"inputGroup"}>
          <label className={"label"}>Email</label>
          <input type="email" {...register("email")} className={"input"} />
          {errors.email && <p className={"error"}>{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className={"inputGroup"}>
          <label className={"label"}>Password</label>
          <div className="inputWithIcon">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="input"
            />
            <span
              className="iconToggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <div className="buttonGroup">
          <button
            type="button"
            className={"button"}
            onClick={() => router.push(PAGE_URL.SIGNUP)}
          >
            Sign up
          </button>
          <button type="submit" className={"button"}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
