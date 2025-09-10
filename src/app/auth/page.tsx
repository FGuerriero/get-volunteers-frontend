/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

"use client";

import { useState } from "react";
import { authAPI } from "@/lib/api";
import { LoginForm, VolunteerCreate } from "@/types";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const loginData: LoginForm = {
      username: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const token = await authAPI.login(loginData);
      localStorage.setItem("token", token.access_token);

      // Get user profile and store it
      try {
        const profile = await authAPI.getProfile();
        localStorage.setItem("user", JSON.stringify(profile));
      } catch (profileErr) {
        console.error("Failed to fetch profile:", profileErr);
      }

      window.location.href = "/";
    } catch (err) {
      console.error(`Error on loggin in: ${err}`);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const registerData: VolunteerCreate = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      phone: (formData.get("phone") as string) || undefined,
    };

    try {
      await authAPI.register(registerData);
      setIsLogin(true);
      setError(null);
    } catch (err) {
      console.error(`Error on registering in: ${err}`);
      setError("Registration failed. Email might already be registered.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-[var(--color-charcoal)] mb-6 sm:mb-8">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>

        {error && <div className="error-message">{error}</div>}

        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          className="space-y-4"
        >
          {!isLogin && (
            <>
              <div>
                <label className="label-text">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">Phone (optional)</label>
                <input type="tel" name="phone" className="input-field" />
              </div>
            </>
          )}

          <div>
            <label className="label-text">Email</label>
            <input type="email" name="email" required className="input-field" />
          </div>

          <div>
            <label className="label-text">Password</label>
            <input
              type="password"
              name="password"
              required
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full focus:ring-2 focus:ring-[var(--color-soft-blue)] disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-[var(--color-charcoal)] text-sm sm:text-base">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[var(--color-soft-blue)] hover:text-[#45b8b0] font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
