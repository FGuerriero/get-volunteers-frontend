/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

'use client';

import { useState, useEffect } from 'react';
import { needsAPI } from '@/lib/api';
import { Need } from '@/types';

export default function NeedsPage() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const data = await needsAPI.getAll();
        setNeeds(data);
      } catch (err) {
        setError('Failed to fetch needs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNeeds();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading opportunities...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2E2E2E] mb-6 sm:mb-8">Volunteer Opportunities</h1>
        
        <div className="space-y-4 sm:space-y-6">
          {needs.map((need) => (
            <div key={need.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-[#2E2E2E] mb-2 sm:mb-0 pr-0 sm:pr-4">
                  {need.title}
                </h3>
                <span className={`self-start px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-white ${
                  need.format === 'virtual' 
                    ? 'bg-[#4ECDC4]' 
                    : 'bg-[#FF6B6B]'
                }`}>
                  {need.format}
                </span>
              </div>
              
              <p className="text-sm sm:text-base text-[#2E2E2E] opacity-80 mb-3 sm:mb-4">{need.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                {need.required_skills && (
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-[#FF6B6B]">Required Skills:</p>
                    <p className="text-xs sm:text-sm text-[#2E2E2E] opacity-80">{need.required_skills}</p>
                  </div>
                )}
                {need.required_tasks && (
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-[#FF6B6B]">Tasks:</p>
                    <p className="text-xs sm:text-sm text-[#2E2E2E] opacity-80">{need.required_tasks}</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm text-[#2E2E2E] opacity-70 space-y-1 sm:space-y-0">
                <span>Volunteers needed: {need.num_volunteers_needed}</span>
                <span className="break-words">Contact: {need.contact_name}</span>
              </div>
              
              {need.location_details && (
                <p className="text-xs sm:text-sm text-[#2E2E2E] opacity-70 mt-2">📍 {need.location_details}</p>
              )}
            </div>
          ))}
        </div>

        {needs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#2E2E2E] opacity-70">No volunteer opportunities found.</p>
          </div>
        )}
      </div>
    </div>
  );
}