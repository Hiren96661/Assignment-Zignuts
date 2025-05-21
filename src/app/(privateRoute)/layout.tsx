import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode } from "react";
import "./layout.css"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="wrapper">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
