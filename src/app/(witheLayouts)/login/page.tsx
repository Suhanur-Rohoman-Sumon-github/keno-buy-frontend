// "use client";

// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const LoginPage = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm();
//   const loginMutation = useUserLoginMutations();

//   const onSubmit = async (data: { email: string; password: string }) => {
//     loginMutation.mutate(data);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-100 to-teal-300">
//       <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="you@example.com"
//               {...register("email", { required: "Email is required" })}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               {...register("password", { required: "Password is required" })}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             className="w-full"
//             disabled={isSubmitting || loginMutation.isPending}
//           >
//             {isSubmitting || loginMutation.isPending
//               ? "Logging in..."
//               : "Login"}
//           </Button>
//         </form>

//         {/* Optional: Link to register */}
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <a
//             href="/register"
//             className="text-teal-600 hover:underline font-medium"
//           >
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
