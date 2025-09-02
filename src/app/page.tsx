/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2E2E2E] mb-3 sm:mb-4">
            Welcome to getVolunteers
          </h1>
          <p className="text-lg sm:text-xl text-[#2E2E2E] opacity-80 max-w-2xl mx-auto px-2">
            Connecting volunteers with meaningful opportunities to make a difference in their communities.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#2E2E2E] mb-3 sm:mb-4">
              Find Volunteer Opportunities
            </h2>
            <p className="text-[#2E2E2E] opacity-70 mb-4 sm:mb-6 text-sm sm:text-base">
              Browse available volunteer needs and find opportunities that match your skills and interests.
            </p>
            <Link 
              href="/needs"
              className="inline-block w-full sm:w-auto text-center bg-[#4ECDC4] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#45b8b0] transition-colors text-sm sm:text-base font-medium"
            >
              Browse Opportunities
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#2E2E2E] mb-3 sm:mb-4">
              Post a Need
            </h2>
            <p className="text-[#2E2E2E] opacity-70 mb-4 sm:mb-6 text-sm sm:text-base">
              Have a project or cause that needs volunteers? Create a posting to find the help you need.
            </p>
            <Link 
              href="/auth"
              className="inline-block w-full sm:w-auto text-center bg-[#FF6B6B] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#e55555] transition-colors text-sm sm:text-base font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Link 
            href="/volunteers"
            className="text-[#FF6B6B] hover:text-[#e55555] font-medium text-sm sm:text-base transition-colors"
          >
            View All Volunteers →
          </Link>
        </div>
      </div>
    </div>
  );
}