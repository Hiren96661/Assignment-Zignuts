"use client";

import Link from "next/link";
import "./Navbar.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { PAGE_URL } from "@/utils/helper";

const Navbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    toast.success('Logout Successfully.')
    document.cookie = "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push(PAGE_URL.LOGIN);
  };
  return (
    <nav className={"navbar"}>
      <div className={"logo"}>My App</div>
      <div className={"links"}>
        <Link href={PAGE_URL.EDIT_PROFILE} className={"link"}>
          Edit Profile
        </Link>
        <Link href={PAGE_URL.CHANGE_PASSWORD} className={"link"}>
          Change Password
        </Link>
        <Link href={PAGE_URL.PRODUCTS} className={"link"}>
          Product List
        </Link>
        <Link href={PAGE_URL.LOGIN} className={"link"} onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
