"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import Link from "next/link";

const Login = () => {

  const handleLogin = async () => {
    
  }

  const handleGoogleLogin = async () => {
    
  }

  const handleGithubLogin = async () => {

  }

  return (
    <div className="mt-26 my-16 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-gray-300 rounded-2xl p-8 shadow-lg">
        
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 mt-2">
            Welcome back! Please login to your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <FieldGroup className="space-y-5">
            
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
              />

              <FieldDescription>
                Enter your registered email address.
              </FieldDescription>
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </Field>

            Forgot Password
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
          </FieldGroup>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-[1px] bg-gray-300 w-full"></div>
          <p className="text-sm text-gray-500">OR</p>
          <div className="h-[1px] bg-gray-300 w-full"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          
          {/* Google */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center gap-2 cursor-pointer"
          >
            <FaGoogle />
            Login with Google
          </Button>

          {/* Github */}
          <Button
            onClick={handleGithubLogin}
            variant="outline"
            className="w-full flex items-center gap-2 cursor-pointer"
          >
            <FaGithub />
            Login with Github
          </Button>
        </div>

        {/* Register Redirect */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-500 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;