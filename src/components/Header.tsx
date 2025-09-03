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

  useEffect(() => {
    // Check if user is logged in by checking for token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/favicon.png"
              alt="getVolunteers"
              width={32}
              height={32}
              className="sm:hidden"
            />
            <Image
              src="/Full_Logo.png"
              alt="getVolunteers"
              width={150}
              height={32}
              className="hidden sm:block"
            />
          </Link>

          {/* Desktop Navigation - Centered when logged in */}
          {isLoggedIn && (
            <nav className="hidden md:flex items-center space-x-6 flex-1 justify-center">
              <Link
                href="/volunteers"
                className="text-[#2E2E2E] hover:text-[#FF6B6B] transition-colors"
              >
                Volunteers
              </Link>
              <Link
                href="/needs"
                className="text-[#2E2E2E] hover:text-[#FF6B6B] transition-colors"
              >
                Opportunities
              </Link>
            </nav>
          )}

          {/* Right side - Profile or Sign In */}
          <div className="hidden md:flex items-center ml-auto">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="p-2 text-[#2E2E2E] hover:text-[#FF6B6B] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-[#2E2E2E] hover:text-[#FF6B6B] transition-colors text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-[#4ECDC4] text-white px-4 py-2 rounded-lg hover:bg-[#45b8b0] transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#2E2E2E] hover:text-[#FF6B6B] transition-colors"
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
                  <Link
                    href="/volunteers"
                    className="text-[#2E2E2E] hover:text-[#FF6B6B] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Volunteers
                  </Link>
                  <Link
                    href="/needs"
                    className="text-[#2E2E2E] hover:text-[#FF6B6B] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Opportunities
                  </Link>
                  <Link
                    href="/profile"
                    className="text-[#2E2E2E] hover:text-[#FF6B6B] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#e55555] transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </>
              )}
              {!isLoggedIn && (
                <Link
                  href="/auth"
                  className="bg-[#4ECDC4] text-white px-4 py-2 rounded-lg hover:bg-[#45b8b0] transition-colors text-center"
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
