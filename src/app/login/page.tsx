"use client";
import Button from "@/components/util/button";
import Input from "@/components/util/input";
import React, { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import AuthBusiness from "@/business/authBusiness";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const authBusiness = new AuthBusiness();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  async function signInWithEmail() {
    try {
      const data = await authBusiness.signInWithPassword(email, password);

      if (data?.error) {
        console.log(data.error);
        throw data.error.message;
      }
      if (data?.data) {
        router.push("/");
      }
    } catch (error) {
      if (typeof error === "string") {
        setErrorMessage(error as string);
      }
      console.error(error);
    }
  }

  return (
    <div className="w-screen h-screen">
      <div className="flex">
        <div className="bg-gray-200 w-2/4"></div>
        <div className=" w-full h-screen flex ">
          <div className="flex flex-col w-full">
            <div className="text-end text-sm p-6">
              <span className="">Not registered? </span>
              <span className="underline cursor-pointer text-pink-600 font-semibold hover:text-pink-300">
                Create on account
              </span>
            </div>
            <form
              action="#"
              method="post"
              className="flex flex-col justify-center items-center h-full"
            >
              <div className="flex flex-col w-80">
                <div className="text-gray-500">Welcome back! 👋</div>
                <div className="font-semibold text-xl">
                  Login to your account
                </div>
                <div className="py-8">
                  {errorMessage && (
                    <div className="py-3 px-2 bg-red-200 text-red-900 rounded mb-2">
                      {errorMessage}
                    </div>
                  )}
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Please enter you email"
                    type="email"
                    className=" mb-4"
                    value={email ?? ""}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    className="mb-4"
                    value={password ?? ""}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    text="Sign In"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(email);
                      console.log(password);
                      signInWithEmail();
                    }}
                  />
                  <div className="py-4 text-sm underline text-pink-600">
                    Forget Password?
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
