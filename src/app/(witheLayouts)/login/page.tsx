/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CircleDollarSignIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { useUserLoginMutations } from "@/hooks/auth.hook";


export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: handleUserLogin } = useUserLoginMutations();
  const onSubmit = (data: any) => {
    handleUserLogin(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6   ">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>
        <div className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 rounded-full bg-indigo-400 opacity-20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md z-10 text-white">
        <Card className=" bg-[#04091d] border border-white/20 backdrop-blur-md   overflow-hidden">
          <CardHeader className="space-y-1 text-center text-white">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" rounded-lg  w-full"
            >
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="email">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your mail"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4 relative">
                <label className="block text-white mb-2" htmlFor="password">
                  Password
                </label>
                <Input
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full  border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-12 text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message as string}
                  </p>
                )}
              </div>
              <div className="mb-4 flex items-center justify-between">
                <label className="flex items-center text-white space-x-2">
                  <Input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded"
                    {...register("rememberMe")}
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-white hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="button-primary w-full flex items-center"
              >
                Login <CircleDollarSignIcon className="font-bold text-xl" />
              </button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-sm text-center text-white">
              Dont have an account?{" "}
              <Link href="/signup" className="text-[#8433ca] hover:underline">
                Sign up now
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
