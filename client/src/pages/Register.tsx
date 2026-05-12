import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlineMail, HiOutlineKey } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { registerSchema } from "../schemas/auth.schema";
import { useAuth } from "../contexts/AuthContext";
import { useSnackbar } from "../contexts/SnackbarContext";

export default function Register() {
  const auth = useAuth();
  const { success, error } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      tos: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      await auth.register(data.fullName, data.email, data.password);
      navigate("/dashboard");
      success("Account created successfully");
    } catch (err: any) {
      error(err.response?.data?.message || "Failed to create account");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111827] p-4 font-sans">
      <div className="w-full max-w-[400px] rounded-lg bg-[#1e2532] p-8 shadow-2xl">
        <div className="mb-6">
          <h1 className="mb-1 text-2xl font-semibold text-white">
            Create Account
          </h1>
          <p className="text-sm text-gray-400">Let's get you started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="mb-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <HiOutlineUser className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Enter your full name"
                {...register("fullName")}
                className={`block w-full rounded-md border-none bg-[#151b26] py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all focus:ring-1 ${
                  errors.fullName
                    ? "focus:ring-red-500"
                    : "focus:ring-indigo-500/50"
                }`}
              />
            </div>
            <div className="h-6 pt-1">
              {errors.fullName && (
                <p className="text-[11px] text-red-400">
                  {errors.fullName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col mt-1">
            <label className="mb-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Email address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <HiOutlineMail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                {...register("email")}
                className={`block w-full rounded-md border-none bg-[#151b26] py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all focus:ring-1 ${
                  errors.email
                    ? "focus:ring-red-500"
                    : "focus:ring-indigo-500/50"
                }`}
              />
            </div>
            <div className="h-6 pt-1">
              {errors.email && (
                <p className="text-[11px] text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col mt-1">
            <label className="mb-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <HiOutlineKey className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className={`block w-full rounded-md border-none bg-[#151b26] py-3 pl-11 pr-11 text-sm text-white placeholder-gray-600 outline-none transition-all focus:ring-1 ${
                  errors.password
                    ? "focus:ring-red-500"
                    : "focus:ring-indigo-500/50"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 hover:text-white"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={18} />
                ) : (
                  <AiOutlineEye size={18} />
                )}
              </button>
            </div>
            <div className="h-6 pt-1">
              {errors.password && (
                <p className="text-[11px] text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-1">
            <label className="flex items-center cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  {...register("tos")}
                  className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-600 bg-[#151b26] transition-all checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none"
                />
                <svg
                  className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-2 text-xs text-gray-400 group-hover:text-gray-300">
                I accept the{" "}
                <a href="#" className="text-indigo-400 hover:underline">
                  Terms of Service
                </a>
              </span>
            </label>
            <div className="h-5 pt-1">
              {errors.tos && (
                <p className="text-[11px] text-red-400">{errors.tos.message}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="cursor-pointer flex items-center gap-2 rounded-full bg-[#4f46e5] px-7 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#4338ca] active:scale-95"
            >
              Register <span className="text-lg">→</span>
            </button>
          </div>

          <div className="mt-8 text-xs text-gray-500">
            Already have an account?{" "}
            <Link to="/" className="text-indigo-400 hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
