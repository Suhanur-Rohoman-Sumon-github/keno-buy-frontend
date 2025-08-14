"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useUserRegistrationsMutation } from "@/hooks/auth.hook";

// Schema
const signupSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" }),
    telegram: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: handleUserRegistration } = useUserRegistrationsMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      telegram: "",
      terms: false,
    },
  });

  const onSubmit = (data: SignupValues) => {
   
    router.push(`/AccountStatus?email=${data.email}`);
    handleUserRegistration(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 right-20 w-80 h-80 rounded-full bg-indigo-400 opacity-20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <Card className="bg-[#04091d] border border-white/20 backdrop-blur-md shadow-xl overflow-hidden">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              Create your account
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-lg w-full space-y-4"
            >
              {/* Name */}
              <div>
                <label className="block text-white mb-2">username</label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  {...register("username")}
                  className="text-white"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-white mb-2">
                  Teligram username
                </label>
                <Input
                  type="text"
                  placeholder="Enter your teligram username"
                  {...register("telegram")}
                  className="text-white"
                />
                {errors.telegram && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.telegram.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-white mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="text-white"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-white mb-2">Password</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-9 text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-white mb-2">
                  Confirm Password
                </label>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  {...register("confirmPassword")}
                  className="text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-9 text-white"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms")}
                  className="w-4 h-4 text-white"
                />
                <label htmlFor="terms" className="text-white text-sm">
                  I agree to the{" "}
                  <span className="text-[#8433ca] underline cursor-pointer">
                    terms and conditions
                  </span>
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.terms.message}
                </p>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full button-primary">
                Register
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col">
            <p className="text-sm text-center text-white">
              Already have an account?{" "}
              <Link href={"/login"} className="text-[#8433ca] hover:underline">
                Login here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
