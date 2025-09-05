/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

"use client";

import { useState, useEffect } from "react";
import { volunteersAPI } from "@/lib/api";
import { Volunteer } from "@/types";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    // Check if user is manager
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsManager(user.is_manager || false);
        if (user.is_manager) {
          fetchVolunteers();
        } else {
          setError("Manager access required");
          setLoading(false);
        }
      } catch (e) {
        setError("Manager access required");
        setLoading(false);
      }
    } else {
      setError("Manager access required");
      setLoading(false);
    }
  }, []);

  const fetchVolunteers = async () => {
    try {
      const data = await volunteersAPI.getAll();
      setVolunteers(data);
    } catch (err) {
      setError("Failed to fetch volunteers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this volunteer?")) {
      try {
        await volunteersAPI.delete(id);
        fetchVolunteers();
      } catch (err) {
        setError("Failed to delete volunteer");
      }
    }
  };

  if (loading)
    return <div className="p-8 text-center">Loading volunteers...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="page-container">
      <div className="container mx-auto px-18">
        <h1 className="page-title mb-6 sm:mb-8">Volunteers</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {volunteers.map((volunteer) => (
            <div
              key={volunteer.id}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-charcoal)]">
                  {volunteer.name}
                </h3>
                <div className="flex gap-2 items-center">
                  {volunteer.is_manager && (
                    <span className="btn-primary px-2 py-1 text-xs">
                      Manager
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(volunteer.id)}
                    className="text-[var(--color-coral)] hover:text-[#e55555] text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm sm:text-base text-[var(--color-charcoal)] opacity-70 mb-2 break-words">
                {volunteer.email}
              </p>
              {volunteer.location && (
                <p className="text-sm sm:text-base text-[var(--color-charcoal)] opacity-70 mb-2">
                  📍 {volunteer.location}
                </p>
              )}
              {volunteer.skills && (
                <div className="mb-3">
                  <p className="text-xs sm:text-sm font-medium text-[var(--color-coral)]">
                    Skills:
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--color-charcoal)] opacity-80">
                    {volunteer.skills}
                  </p>
                </div>
              )}
              {volunteer.about_me && (
                <div className="mb-3">
                  <p className="text-xs sm:text-sm font-medium text-[var(--color-coral)]">
                    About:
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--color-charcoal)] opacity-80">
                    {volunteer.about_me}
                  </p>
                </div>
              )}
              {volunteer.availability && (
                <div className="mb-3">
                  <p className="text-xs sm:text-sm font-medium text-[var(--color-coral)]">
                    Availability:
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--color-charcoal)] opacity-80">
                    {volunteer.availability}
                  </p>
                </div>
              )}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-[var(--color-charcoal)] opacity-60">
                  Status: {volunteer.is_active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {volunteers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--color-charcoal)] opacity-70">
              No volunteers found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
