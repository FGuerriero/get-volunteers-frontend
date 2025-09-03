/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

"use client";

import { useState, useEffect } from "react";
import { authAPI, volunteersAPI } from "@/lib/api";
import { Volunteer, VolunteerCreate } from "@/types";

export default function ProfilePage() {
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await authAPI.getProfile();
        setVolunteer(profile);
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!volunteer) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const updateData: VolunteerCreate = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: (formData.get("password") as string) || "unchanged",
      phone: (formData.get("phone") as string) || undefined,
      about_me: (formData.get("about_me") as string) || undefined,
      skills: (formData.get("skills") as string) || undefined,
      volunteer_interests:
        (formData.get("volunteer_interests") as string) || undefined,
      location: (formData.get("location") as string) || undefined,
      availability: (formData.get("availability") as string) || undefined,
    };

    try {
      const updatedVolunteer = await volunteersAPI.update(
        volunteer.id,
        updateData
      );
      setVolunteer(updatedVolunteer);
      setSuccess(true);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        Loading profile...
      </div>
    );
  if (!volunteer)
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        Profile not found
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2E2E2E]">
            My Profile
          </h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#4ECDC4] text-white px-4 py-2 rounded-lg hover:bg-[#45b8b0] transition-colors font-bold text-sm"
            >
              Edit Profile
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4 text-sm">
            Profile updated successfully!
          </div>
        )}

        {!isEditing ? (
          // Read-only view
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Name
              </label>
              <p className="text-[#2E2E2E] text-sm sm:text-base">
                {volunteer.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Email
              </label>
              <p className="text-[#2E2E2E] text-sm sm:text-base">
                {volunteer.email}
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Phone
              </label>
              <p className="text-[#2E2E2E] text-sm sm:text-base">
                {volunteer.phone || "Not provided"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Location
              </label>
              <p className="text-[#2E2E2E] text-sm sm:text-base">
                {volunteer.location || "Not provided"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                About Me
              </label>
              <p className="text-[#2E2E2E] text-sm sm:text-base">
                {volunteer.about_me || "Not provided"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Skills
              </label>
              <p className="text-[#2E2E2E] text-sm sm:text-base">
                {volunteer.skills || "Not provided"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Volunteer Interests
              </label>
              <p className="text-[#2E2E2E] text-sm sm:text-base">
                {volunteer.volunteer_interests || "Not provided"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Availability
              </label>
              <p className="text-[#2E2E2E] text-sm sm:text-base">
                {volunteer.availability || "Not provided"}
              </p>
            </div>
          </div>
        ) : (
          // Edit form
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-6 sm:p-8 space-y-4"
          >
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                required
                defaultValue={volunteer.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                defaultValue={volunteer.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={volunteer.phone || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={volunteer.location || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                About Me
              </label>
              <textarea
                name="about_me"
                rows={3}
                defaultValue={volunteer.about_me || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Skills
              </label>
              <textarea
                name="skills"
                rows={3}
                defaultValue={volunteer.skills || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                placeholder="What skills do you have? (e.g., programming, teaching, cooking...)"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Volunteer Interests
              </label>
              <textarea
                name="volunteer_interests"
                rows={3}
                defaultValue={volunteer.volunteer_interests || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                placeholder="What causes or activities interest you?"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                Availability
              </label>
              <textarea
                name="availability"
                rows={2}
                defaultValue={volunteer.availability || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                placeholder="When are you available? (e.g., weekends, evenings...)"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[#4ECDC4] text-white py-2 px-4 rounded-md hover:bg-[#45b8b0] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] disabled:opacity-50 font-bold text-sm sm:text-base"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-[#FF6B6B] text-white rounded-md hover:bg-[#e55555] transition-colors font-bold text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
