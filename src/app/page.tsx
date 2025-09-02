/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            getVolunteers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting volunteers with meaningful opportunities to make a difference in their communities.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Find Volunteer Opportunities
            </h2>
            <p className="text-gray-600 mb-6">
              Browse available volunteer needs and find opportunities that match your skills and interests.
            </p>
            <Link 
              href="/needs"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Opportunities
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Post a Need
            </h2>
            <p className="text-gray-600 mb-6">
              Have a project or cause that needs volunteers? Create a posting to find the help you need.
            </p>
            <Link 
              href="/auth"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/volunteers"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Volunteers →
          </Link>
        </div>
      </div>
    </div>
  );
}