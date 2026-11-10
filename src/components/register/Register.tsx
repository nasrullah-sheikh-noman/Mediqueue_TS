"use client";

import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import { MdEmail, MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

const validPassword = (
  password: string,
  confirmPassword: string,
): string | null => {
  if (password.length < 8) {
    return "Password must be at least 8 charecters.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least on uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least on lowercase letter.";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain at least on number.";
  }

  if (!/[!@#$%^&*(),./<>?;:'"|{}=+\-\\`_\[\]~]/.test(password)) {
    return "Password must contain at least on special charecter.";
  }

  if (password !== confirmPassword) {
    return "Password do not match.";
  }
  return null;
};

const Register = () => {
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    // console.log("user data", user);
    let photoUrl = "";
    const password = user.password as string;
    const confirmPassword = user.confirmPassword as string;

    const passwordError = validPassword(password, confirmPassword);
    if (passwordError) {
      return toast.error(passwordError);
    }

    try {
      // console.log("Step 1: Uploading image");
      const imageData = new FormData();
      imageData.append("image", user.photo);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        imageData
      );
      photoUrl = res.data.data.url;
      // console.log("Step 2: Image uploaded", photoUrl);
      
    } catch(error) {
      console.log("error", error);
      return toast.error("Image uploded failed!");
    } 

    try {
      const result = await authClient.signUp.email({
        email: user.email as string,
        password: user.password as string,
        name: user.name as string,
        image: photoUrl as string,
        callbackURL: "/login",
      });
      if (result.error) {
        toast.error("Registration failed!");
        console.log("register error", result.error);
      } else {
        toast.success("Registration Successful.");
        console.log("register data", result.data);
      }
    } catch (err) {
      toast.error("Registration failed!");
      console.log("register error", err);
    }

  };

  const handleGithubRegister = () => {};

  const handleGoogleRegister = () => {};

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden  px-4 py-16">
      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/80 bg-white/90 p-7 shadow-xl shadow-cyan-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/10 sm:p-9">
        {/* Heading */}
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Join MediQueue and manage your appointments easily.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister}>
          <FieldGroup className="space-y-5">
            {/* Full Name */}
            <Field className="gap-2">
              <FieldLabel
                htmlFor="name"
                className="font-semibold text-slate-700"
              >
                Full Name
              </FieldLabel>

              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 transition-all focus-visible:border-cyan-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-500/20"
                  required
                />
              </div>
            </Field>

            {/* Upload Photo */}
            <Field className="gap-2">
              <FieldLabel
                htmlFor="photo"
                className="font-semibold text-slate-700"
              >
                Profile Picture
              </FieldLabel>

              <Input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                required
                className="h-12 cursor-pointer rounded-xl border-slate-200 bg-slate-50 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-cyan-50 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-cyan-700 "
              />

              <FieldDescription className="text-xs text-slate-400">
                Upload a profile picture (JPG, PNG).
              </FieldDescription>
            </Field>

            {/* Email */}
            <Field className="gap-2">
              <FieldLabel
                htmlFor="email"
                className="font-semibold text-slate-700"
              >
                Email Address
              </FieldLabel>

              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 transition-all focus-visible:border-cyan-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-500/20"
                  required
                />
              </div>
            </Field>

            {/* Password */}
            <Field className="gap-2">
              <FieldLabel
                htmlFor="password"
                className="font-semibold text-slate-700"
              >
                Password
              </FieldLabel>

              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 transition-all focus-visible:border-cyan-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-500/20"
                  minLength={8}
                  required
                />
              </div>

              <FieldDescription className="text-xs text-slate-400">
                password must contain at least 8 characters, one uppercase, one
                lowercase, one number & one special charecter.
              </FieldDescription>
            </Field>

            {/* Confirm Password */}
            <Field className="gap-2">
              <FieldLabel
                htmlFor="confirmPassword"
                className="font-semibold text-slate-700"
              >
                Confirm Password
              </FieldLabel>

              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 transition-all focus-visible:border-cyan-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-500/20"
                  minLength={8}
                  required
                />
              </div>
            </Field>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 cursor-pointer accent-cyan-600"
              />

              <label
                htmlFor="terms"
                className="text-sm leading-5 text-slate-500"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-cyan-600 transition-colors hover:text-cyan-800 hover:underline"
                >
                  Terms & Conditions
                </Link>
              </label>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              className="h-12 w-full cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-500 text-base font-bold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] hover:from-cyan-600 hover:to-cyan-600 hover:shadow-xl active:scale-[0.98]"
            >
              Create Account
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

        {/* Social Register */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            onClick={handleGoogleRegister}
            variant="outline"
            className="h-12 cursor-pointer rounded-xl border-slate-200 bg-white font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50 hover:shadow-md"
          >
            <FcGoogle className="mr-2" />
            Google
          </Button>

          <Button
            type="button"
            onClick={handleGithubRegister}
            variant="outline"
            className="h-12 cursor-pointer rounded-xl border-slate-200 bg-white font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:bg-slate-100 hover:shadow-md"
          >
            <FaGithub className="mr-2" />
            Github
          </Button>
        </div>

        {/* Login Redirect */}
        <div className="mt-8 border-t border-slate-100 pt-6 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-cyan-600 transition-colors hover:text-cyan-800 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
