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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Volunteers</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {volunteers.map((volunteer) => (
            <div key={volunteer.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {volunteer.name}
              </h3>
              <p className="text-gray-600 mb-2">{volunteer.email}</p>
              {volunteer.location && (
                <p className="text-gray-600 mb-2">📍 {volunteer.location}</p>
              )}
              {volunteer.skills && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700">Skills:</p>
                  <p className="text-sm text-gray-600">{volunteer.skills}</p>
                </div>
              )}
              {volunteer.about_me && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700">About:</p>
                  <p className="text-sm text-gray-600">{volunteer.about_me}</p>
                </div>
              )}
              {volunteer.availability && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Availability:</p>
                  <p className="text-sm text-gray-600">{volunteer.availability}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {volunteers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No volunteers found.</p>
          </div>
        )}
      </div>
    </div>
  );
}