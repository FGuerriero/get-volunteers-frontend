/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

'use client';

import { useState, useEffect } from 'react';
import { volunteersAPI } from '@/lib/api';
import { Volunteer } from '@/types';

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const data = await volunteersAPI.getAll();
        setVolunteers(data);
      } catch (err) {
        setError('Failed to fetch volunteers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading volunteers...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2E2E2E] mb-6 sm:mb-8">Volunteers</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {volunteers.map((volunteer) => (
            <div key={volunteer.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-[#2E2E2E] mb-2">
                {volunteer.name}
              </h3>
              <p className="text-sm sm:text-base text-[#2E2E2E] opacity-70 mb-2 break-words">{volunteer.email}</p>
              {volunteer.location && (
                <p className="text-sm sm:text-base text-[#2E2E2E] opacity-70 mb-2">📍 {volunteer.location}</p>
              )}
              {volunteer.skills && (
                <div className="mb-3">
                  <p className="text-xs sm:text-sm font-medium text-[#FF6B6B]">Skills:</p>
                  <p className="text-xs sm:text-sm text-[#2E2E2E] opacity-80">{volunteer.skills}</p>
                </div>
              )}
              {volunteer.about_me && (
                <div className="mb-3">
                  <p className="text-xs sm:text-sm font-medium text-[#FF6B6B]">About:</p>
                  <p className="text-xs sm:text-sm text-[#2E2E2E] opacity-80">{volunteer.about_me}</p>
                </div>
              )}
              {volunteer.availability && (
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#FF6B6B]">Availability:</p>
                  <p className="text-xs sm:text-sm text-[#2E2E2E] opacity-80">{volunteer.availability}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {volunteers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#2E2E2E] opacity-70">No volunteers found.</p>
          </div>
        )}
      </div>
    </div>
  );
}