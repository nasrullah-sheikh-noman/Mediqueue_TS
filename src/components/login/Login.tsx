"use client";

import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const Login = () => {
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    // console.log("login user :", user);

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email as string,
        password: user.password as string,
      });
      if (!data) {
        toast.error(error.message ?? "Login failed!");
        // console.log("Login error: ", error);
      } else {
        toast.success("Login Successfull.");
        router.push("/");
        // console.log("Login data", data);
      }
    } catch (err: unknown) {
      // console.log("Login error 2", err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Login failed!");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (!data) {
        toast.error(error.message ?? "Google Signin failed!");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Google Signin failed!");
    }
  };

  const handleGithubLogin = async () => {};

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden  px-4 py-16 ">
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-cyan-200/50 bg-white/90 p-7 shadow-xl shadow-cyan-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/10 sm:p-9 ">
        <div className="mb-7 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Welcome Back!
          </h1>

          <p className="mt-2 text-center text-sm text-slate-500">
            Login to continue your MediQueue journey.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <FieldGroup className="space-y-5">
            {/* Email */}
            <Field className="gap-2">
              <FieldLabel
                htmlFor="email"
                className="font-semibold text-slate-700"
              >
                Email Address
              </FieldLabel>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 transition-all focus-visible:border-cyan-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-500/20"
              />

              <FieldDescription className="text-xs text-slate-400">
                Enter your registered email address.
              </FieldDescription>
            </Field>

            {/* Password */}
            <Field className="gap-2">
              <FieldLabel
                htmlFor="password"
                className="font-semibold text-slate-700"
              >
                Password
              </FieldLabel>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="h-12 rounded-xl border-slate-200 bg-slate-50 px-4 transition-all focus-visible:border-cyan-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-500/20"
              />
            </Field>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-cyan-600 transition-colors hover:text-cyan-800 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="h-12 w-full cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-500 text-base font-bold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] hover:from-cyan-600 hover:to-cyan-600 hover:shadow-xl active:scale-[0.98]"
            >
              Login to Account
            </Button>
          </FieldGroup>
        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-semibold tracking-widest text-slate-400">
            OR CONTINUE WITH
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="outline"
            className="h-12 cursor-pointer rounded-xl border-slate-200 bg-white font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50 hover:shadow-md"
          >
            <FcGoogle className="mr-2 text-lg" />
            Google
          </Button>

          <Button
            type="button"
            onClick={handleGithubLogin}
            variant="outline"
            className="h-12 cursor-pointer rounded-xl border-slate-200 bg-white font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:bg-slate-100 hover:shadow-md"
          >
            <FaGithub className="mr-2 text-lg" />
            Github
          </Button>
        </div>

        {/* Register Redirect */}
        <div className="mt-8 border-t border-slate-100 pt-6 text-center">
          <p className="text-sm text-slate-500">
            Don&apos;t have an account?
            <Link
              href="/register"
              className="ml-1 font-bold text-cyan-600 transition-colors hover:text-cyan-800 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
