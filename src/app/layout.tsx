/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "getVolunteers - Connect with Volunteer Opportunities",
  description: "Connecting volunteers with meaningful opportunities to make a difference in their communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-gray-900">
                getVolunteers
              </Link>
              <div className="flex space-x-6">
                <Link href="/volunteers" className="text-gray-600 hover:text-gray-900">
                  Volunteers
                </Link>
                <Link href="/needs" className="text-gray-600 hover:text-gray-900">
                  Opportunities
                </Link>
                <Link href="/auth" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}