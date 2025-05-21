"use client";

import UserForm from "@/components/UserForm/UserForm";
import type { InferType } from "yup";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import { PAGE_URL, SECRET_KEY } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { UserFormSchema } from "@/components/UserForm/UserForm.schema";

type FormData = InferType<typeof UserFormSchema>;

const SignUpPage = () => {
  const router = useRouter()
  const handleSignUp = (data: FormData) => {
    const { confirmPassword, ...restData } = data;
    const getUserData = localStorage.getItem("usersData");
    const parsedData = getUserData ? JSON.parse(getUserData) : [];

    if (parsedData?.some((item: FormData) => item?.email === restData?.email)) {
      toast.error("Email Already exist");
    } else {
      // Encrypt password before storing
      const encryptedPassword = CryptoJS.AES.encrypt(
        restData.password,
        SECRET_KEY
      ).toString();

      const updateData = {
        id: new Date().getTime(),
        ...restData,
        password: encryptedPassword,
      };
      const newData = [...parsedData, updateData];
      localStorage.setItem("usersData", JSON.stringify(newData));
      toast.success("User Registered Successfully!");
      router.push(PAGE_URL.LOGIN)
    }
  };

  return <UserForm onSubmit={handleSignUp} buttonLabel="Sign Up" />;
};

export default SignUpPage;
