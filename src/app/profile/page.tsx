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
      <div className="page-container flex items-center justify-center">
        Loading profile...
      </div>
    );
  if (!volunteer)
    return (
      <div className="page-container flex items-center justify-center">
        Profile not found
      </div>
    );

  return (
    <div className="page-container">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="page-title">
            My Profile
          </h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary text-sm"
            >
              Edit Profile
            </button>
          )}
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            Profile updated successfully!
          </div>
        )}

        {!isEditing ? (
          // Read-only view
          <div className="card space-y-4 sm:p-8">
            <div>
              <label className="label-text">
                Name
              </label>
              <p className="text-[var(--color-charcoal)] text-sm sm:text-base">
                {volunteer.name}
              </p>
            </div>
            <div>
              <label className="label-text">
                Email
              </label>
              <p className="text-[var(--color-charcoal)] text-sm sm:text-base">
                {volunteer.email}
              </p>
            </div>
            <div>
              <label className="label-text">
                Phone
              </label>
              <p className="text-[var(--color-charcoal)] text-sm sm:text-base">
                {volunteer.phone || "Not provided"}
              </p>
            </div>
            <div>
              <label className="label-text">
                Location
              </label>
              <p className="text-[var(--color-charcoal)] text-sm sm:text-base">
                {volunteer.location || "Not provided"}
              </p>
            </div>
            <div>
              <label className="label-text">
                About Me
              </label>
              <p className="text-[var(--color-charcoal)] text-sm sm:text-base">
                {volunteer.about_me || "Not provided"}
              </p>
            </div>
            <div>
              <label className="label-text">
                Skills
              </label>
              <p className="text-[var(--color-charcoal)] text-sm sm:text-base">
                {volunteer.skills || "Not provided"}
              </p>
            </div>
            <div>
              <label className="label-text">
                Volunteer Interests
              </label>
              <p className="text-[var(--color-charcoal)] text-sm sm:text-base">
                {volunteer.volunteer_interests || "Not provided"}
              </p>
            </div>
            <div>
              <label className="label-text">
                Availability
              </label>
              <p className="text-[var(--color-charcoal)] text-sm sm:text-base">
                {volunteer.availability || "Not provided"}
              </p>
            </div>
          </div>
        ) : (
          // Edit form
          <form
            onSubmit={handleSubmit}
            className="card space-y-4 sm:p-8"
          >
            <div>
              <label className="label-text">
                Name *
              </label>
              <input
                type="text"
                name="name"
                required
                defaultValue={volunteer.name}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                defaultValue={volunteer.email}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={volunteer.phone || ""}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">
                Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={volunteer.location || ""}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">
                About Me
              </label>
              <textarea
                name="about_me"
                rows={3}
                defaultValue={volunteer.about_me || ""}
                className="input-field"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div>
              <label className="label-text">
                Skills
              </label>
              <textarea
                name="skills"
                rows={3}
                defaultValue={volunteer.skills || ""}
                className="input-field"
                placeholder="What skills do you have? (e.g., programming, teaching, cooking...)"
              />
            </div>
            <div>
              <label className="label-text">
                Volunteer Interests
              </label>
              <textarea
                name="volunteer_interests"
                rows={3}
                defaultValue={volunteer.volunteer_interests || ""}
                className="input-field"
                placeholder="What causes or activities interest you?"
              />
            </div>
            <div>
              <label className="label-text">
                Availability
              </label>
              <textarea
                name="availability"
                rows={2}
                defaultValue={volunteer.availability || ""}
                className="input-field"
                placeholder="When are you available? (e.g., weekends, evenings...)"
              />
            </div>
            <div>
              <label className="label-text">
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                name="password"
                className="input-field"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary flex-1 focus:ring-2 focus:ring-[var(--color-soft-blue)] disabled:opacity-50 text-sm sm:text-base"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn-secondary text-sm sm:text-base"
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