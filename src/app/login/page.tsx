"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { setAuth } from "@/lib/auth";
import toast from "react-hot-toast";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post("/auth/login", data);

      if (response.data.success) {
        setAuth(response.data.data);
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* <p className="text-center mt-6 text-gray-600">
          Default credentials: admin@portfolio.com / admin123
        </p> */}
      </div>
    </div>
  );
}
