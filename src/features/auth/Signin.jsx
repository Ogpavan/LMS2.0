import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-[0_4px_15px_rgba(0,0,0,0.06)] space-y-6">
        {/* Heading */}
        <div>
          <h1>Sign In</h1>
          <p>Enter your credentials to continue</p>
        </div>

        {/* Error Box */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-3 py-2 rounded-lg text-xs">
            {error}
          </div>
        )}

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" c className="h-10" />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password">Password</label>
            <a className="text-blue-500 hover:underline text-sm" href="#">
              Forgot?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="h-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button variant="default">Sign In</Button>

        {/* Footer */}
        <p className="text-center">
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
