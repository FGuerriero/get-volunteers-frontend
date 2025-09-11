/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    // Check if user is logged in by checking for token
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    setIsLoggedIn(!!token);
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsManager(user.is_manager || false);
      } catch (err) {
        console.error(`Manager access required: ${err}`);
        setIsManager(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsManager(false);
    window.location.href = "/";
  };

  return (
    <header className="bg-[var(--color-soft-blue)] shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-4 sm:px-24 lg:px-24">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/favicon.png"
              alt="getVolunteers"
              width={32}
              height={32}
              className="sm:hidden"
            />
            <Image
              src="/black_and_white_logo_without_slogan.png"
              alt="getVolunteers"
              width={150}
              height={32}
              className="hidden sm:block"
            />
          </Link>

          {/* Desktop Navigation - Centered when logged in */}
          {isLoggedIn && (
            <nav className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
              {isManager && (
                <Link href="/volunteers" className="nav-link">
                  Volunteers
                </Link>
              )}
              <Link href="/my-needs" className="nav-link">
                My Needs
              </Link>
            </nav>
          )}

          {/* Right side - Profile or Sign In */}
          <div className="hidden md:flex items-center flex-shrink-0">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/profile"
                  className="p-2 text-white hover:text-[var(--color-coral)] transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-[var(--color-coral)] transition-colors text-base text-shadow-md"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/auth" className="btn-primary">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[var(--color-coral)] transition-colors flex-shrink-0"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              {isLoggedIn && (
                <>
                  {isManager && (
                    <Link
                      href="/volunteers"
                      className="nav-link py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Volunteers
                    </Link>
                  )}
                  <Link
                    href="/my-needs"
                    className="nav-link py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Needs
                  </Link>
                  <Link
                    href="/profile"
                    className="nav-link py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="btn-secondary text-left"
                  >
                    Sign Out
                  </button>
                </>
              )}
              {!isLoggedIn && (
                <Link
                  href="/auth"
                  className="btn-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
