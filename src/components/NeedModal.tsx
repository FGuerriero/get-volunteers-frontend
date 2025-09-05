/*
 * Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * Created Date: Fri Sep 05 2025
 * SPDX-License-Identifier: MIT
 */

import { Need, NeedCreate } from "@/types";

interface NeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NeedCreate) => Promise<void>;
  need?: Need | null;
  isLoading?: boolean;
}

export default function NeedModal({
  isOpen,
  onClose,
  onSubmit,
  need,
  isLoading,
}: NeedModalProps) {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const needData: NeedCreate = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      required_tasks: (formData.get("required_tasks") as string) || undefined,
      required_skills: (formData.get("required_skills") as string) || undefined,
      num_volunteers_needed: parseInt(
        formData.get("num_volunteers_needed") as string
      ),
      format: formData.get("format") as "in-person" | "virtual",
      location_details:
        (formData.get("location_details") as string) || undefined,
      contact_name: formData.get("contact_name") as string,
      contact_email: formData.get("contact_email") as string,
      contact_phone: (formData.get("contact_phone") as string) || undefined,
    };

    await onSubmit(needData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[var(--color-charcoal)]">
              {need ? "Edit Need" : "Create New Need"}
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
              <label className="label-text">Title *</label>
              <input
                type="text"
                name="title"
                required
                defaultValue={need?.title || ""}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">Description *</label>
              <textarea
                name="description"
                required
                rows={3}
                defaultValue={need?.description || ""}
                className="input-field"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-text">Required Tasks</label>
                <textarea
                  name="required_tasks"
                  rows={2}
                  defaultValue={need?.required_tasks || ""}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">Required Skills</label>
                <textarea
                  name="required_skills"
                  rows={2}
                  defaultValue={need?.required_skills || ""}
                  className="input-field"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-text">Volunteers Needed *</label>
                <input
                  type="number"
                  name="num_volunteers_needed"
                  required
                  min="1"
                  defaultValue={need?.num_volunteers_needed || 1}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">Format *</label>
                <select
                  name="format"
                  required
                  defaultValue={need?.format || "in-person"}
                  className="input-field"
                >
                  <option value="in-person">In-Person</option>
                  <option value="virtual">Virtual</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label-text">Location Details</label>
              <input
                type="text"
                name="location_details"
                defaultValue={need?.location_details || ""}
                className="input-field"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="label-text">Contact Name *</label>
                <input
                  type="text"
                  name="contact_name"
                  required
                  defaultValue={need?.contact_name || ""}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">Contact Email *</label>
                <input
                  type="email"
                  name="contact_email"
                  required
                  defaultValue={need?.contact_email || ""}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label-text">Contact Phone</label>
                <input
                  type="tel"
                  name="contact_phone"
                  defaultValue={need?.contact_phone || ""}
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {isLoading ? "Saving..." : need ? "Update Need" : "Create Need"}
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
