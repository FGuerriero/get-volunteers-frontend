/*
 * Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * Created Date: Fri Sep 05 2025
 * SPDX-License-Identifier: MIT
 */

import { Volunteer, VolunteerCreate } from "@/types";

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: VolunteerCreate) => Promise<void>;
  volunteer?: Volunteer | null;
  isLoading?: boolean;
}

export default function VolunteerModal({
  isOpen,
  onClose,
  onSubmit,
  volunteer,
  isLoading,
}: VolunteerModalProps) {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const volunteerData: VolunteerCreate = {
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

    await onSubmit(volunteerData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[var(--color-charcoal)]">
              {volunteer ? "Edit Volunteer" : "Create New Volunteer"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-text">Name *</label>
              <input
                type="text"
                name="name"
                required
                defaultValue={volunteer?.name || ""}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">Email *</label>
              <input
                type="email"
                name="email"
                required
                defaultValue={volunteer?.email || ""}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">
                {volunteer
                  ? "New Password (leave blank to keep current)"
                  : "Password *"}
              </label>
              <input
                type="password"
                name="password"
                required={!volunteer}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">Phone</label>
              <input
                type="tel"
                name="phone"
                defaultValue={volunteer?.phone || ""}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">Location</label>
              <input
                type="text"
                name="location"
                defaultValue={volunteer?.location || ""}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">About Me</label>
              <textarea
                name="about_me"
                rows={3}
                defaultValue={volunteer?.about_me || ""}
                className="input-field"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div>
              <label className="label-text">Skills</label>
              <textarea
                name="skills"
                rows={3}
                defaultValue={volunteer?.skills || ""}
                className="input-field"
                placeholder="What skills do you have? (e.g., programming, teaching, cooking...)"
              />
            </div>
            <div>
              <label className="label-text">Volunteer Interests</label>
              <textarea
                name="volunteer_interests"
                rows={3}
                defaultValue={volunteer?.volunteer_interests || ""}
                className="input-field"
                placeholder="What causes or activities interest you?"
              />
            </div>
            <div>
              <label className="label-text">Availability</label>
              <textarea
                name="availability"
                rows={2}
                defaultValue={volunteer?.availability || ""}
                className="input-field"
                placeholder="When are you available? (e.g., weekends, evenings...)"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {isLoading
                  ? "Saving..."
                  : volunteer
                  ? "Update Volunteer"
                  : "Create Volunteer"}
              </button>
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
