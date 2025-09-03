/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

"use client";

import { useState, useEffect } from "react";
import { needsAPI } from "@/lib/api";
import { Need, NeedCreate } from "@/types";

export default function MyNeedsPage() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNeed, setEditingNeed] = useState<Need | null>(null);

  useEffect(() => {
    fetchMyNeeds();
  }, []);

  const fetchMyNeeds = async () => {
    try {
      const myNeeds = await needsAPI.getAll();
      setNeeds(myNeeds);
    } catch (err) {
      setError("Failed to load needs");
    } finally {
      setLoading(false);
    }
  };

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

    try {
      if (editingNeed) {
        await needsAPI.update(editingNeed.id, needData);
      } else {
        await needsAPI.create(needData);
      }
      setIsCreating(false);
      setEditingNeed(null);
      fetchMyNeeds();
    } catch (err) {
      setError("Failed to save need");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this need?")) {
      try {
        await needsAPI.delete(id);
        fetchMyNeeds();
      } catch (err) {
        setError("Failed to delete need");
      }
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2E2E2E]">
            My Needs
          </h1>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-[#4ECDC4] text-white px-4 py-2 rounded-lg hover:bg-[#45b8b0] transition-colors font-bold text-sm"
          >
            Create Need
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {(isCreating || editingNeed) && (
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-6">
            <h2 className="text-xl font-bold text-[#2E2E2E] mb-4">
              {editingNeed ? "Edit Need" : "Create New Need"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={editingNeed?.title || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={editingNeed?.description || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                    Required Tasks
                  </label>
                  <textarea
                    name="required_tasks"
                    rows={2}
                    defaultValue={editingNeed?.required_tasks || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                    Required Skills
                  </label>
                  <textarea
                    name="required_skills"
                    rows={2}
                    defaultValue={editingNeed?.required_skills || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                    Volunteers Needed *
                  </label>
                  <input
                    type="number"
                    name="num_volunteers_needed"
                    required
                    min="1"
                    defaultValue={editingNeed?.num_volunteers_needed || 1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                    Format *
                  </label>
                  <select
                    name="format"
                    required
                    defaultValue={editingNeed?.format || "in-person"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                  >
                    <option value="in-person">In-Person</option>
                    <option value="virtual">Virtual</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                  Location Details
                </label>
                <input
                  type="text"
                  name="location_details"
                  defaultValue={editingNeed?.location_details || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    required
                    defaultValue={editingNeed?.contact_name || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    name="contact_email"
                    required
                    defaultValue={editingNeed?.contact_email || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2E2E2E] mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="contact_phone"
                    defaultValue={editingNeed?.contact_phone || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-sm text-[#2E2E2E]"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#4ECDC4] text-white py-2 px-4 rounded-md hover:bg-[#45b8b0] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] font-bold text-sm sm:text-base"
                >
                  {editingNeed ? "Update Need" : "Create Need"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingNeed(null);
                  }}
                  className="px-4 py-2 bg-[#FF6B6B] text-white rounded-md hover:bg-[#e55555] transition-colors font-bold text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4 sm:space-y-6">
          {needs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#2E2E2E] opacity-70">
                No needs found. Create your first need!
              </p>
            </div>
          ) : (
            needs.map((need) => (
              <div
                key={need.id}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#2E2E2E]">
                    {need.title}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingNeed(need)}
                      className="text-[#4ECDC4] hover:text-[#45b8b0] text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(need.id)}
                      className="text-[#FF6B6B] hover:text-[#e55555] text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-[#2E2E2E] opacity-80 mb-3">
                  {need.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-[#FF6B6B]">
                      Volunteers needed:
                    </span>{" "}
                    {need.num_volunteers_needed}
                  </div>
                  <div>
                    <span className="font-medium text-[#FF6B6B]">Format:</span>{" "}
                    {need.format}
                  </div>
                  <div>
                    <span className="font-medium text-[#FF6B6B]">Contact:</span>{" "}
                    {need.contact_name}
                  </div>
                  {need.location_details && (
                    <div>
                      <span className="font-medium text-[#FF6B6B]">
                        Location:
                      </span>{" "}
                      {need.location_details}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
