"use client";
import AuthBusiness from "@/business/authBusiness";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const authBusiness = new AuthBusiness();
  const router = useRouter();

  async function getuser() {
    const user = await authBusiness.getUser();
    console.log(user);
    // if (!user?.data?.user) {
    //   router.push("/login");
    // }
  }

  useEffect(() => {
    getuser();
  }, []);

  return <>{children}</>;
};

export default Auth;
