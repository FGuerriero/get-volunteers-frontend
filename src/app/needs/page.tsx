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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Volunteer Opportunities</h1>
        
        <div className="space-y-6">
          {needs.map((need) => (
            <div key={need.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {need.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  need.format === 'virtual' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {need.format}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{need.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {need.required_skills && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Required Skills:</p>
                    <p className="text-sm text-gray-600">{need.required_skills}</p>
                  </div>
                )}
                {need.required_tasks && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tasks:</p>
                    <p className="text-sm text-gray-600">{need.required_tasks}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Volunteers needed: {need.num_volunteers_needed}</span>
                <span>Contact: {need.contact_name}</span>
              </div>
              
              {need.location_details && (
                <p className="text-sm text-gray-600 mt-2">📍 {need.location_details}</p>
              )}
            </div>
          ))}
        </div>

        {needs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No volunteer opportunities found.</p>
          </div>
        )}
      </div>
    </div>
  );
}