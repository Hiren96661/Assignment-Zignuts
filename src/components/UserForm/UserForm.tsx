"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import type * as yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./UserForm.css";
import { UserFormSchema } from "./UserForm.schema";

type FormData = yup.InferType<typeof UserFormSchema>;

interface UserFormProps {
  defaultValues?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  buttonLabel?: string;
}

const UserForm: React.FC<UserFormProps> = ({
  defaultValues,
  onSubmit,
  buttonLabel = "Submit",
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    resolver: yupResolver(UserFormSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <div className={"container"}>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className={"form"} noValidate>
        <h2 className={"title"}>{buttonLabel}</h2>

        {/* First Name */}
        <div className={"inputGroup"}>
          <label className={"label"}>First Name</label>
          <input type="text" {...register("firstName")} className={"input"} />
          {errors.firstName && (
            <p className={"error"}>{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className={"inputGroup"}>
          <label className={"label"}>Last Name</label>
          <input type="text" {...register("lastName")} className={"input"} />
          {errors.lastName && (
            <p className={"error"}>{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className={"inputGroup"}>
          <label className={"label"}>Email</label>
          <input type="email" {...register("email")} className={"input"} />
          {errors.email && <p className={"error"}>{errors.email.message}</p>}
        </div>

        {/* Mobile Number */}
        <div className={"inputGroup"}>
          <label className={"label"}>Mobile Number</label>
          <input type="tel" {...register("mobileNumber")} className={"input"} />
          {errors.mobileNumber && (
            <p className={"error"}>{errors.mobileNumber.message}</p>
          )}
        </div>

        {!defaultValues && (
          <>
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

            {/* Confirm Password */}
            <div className={"inputGroup"}>
              <label className={"label"}>Confirm Password</label>
              <div className="inputWithIcon">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="input"
                />
                <span
                  className="iconToggle"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {!showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>
          </>
        )}

        <button type="submit" className={"button"}>
          {buttonLabel}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
