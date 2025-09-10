/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

"use client";

import { useState, useEffect } from "react";
import { needsAPI } from "@/lib/api";
import { Need, NeedCreate } from "@/types";
import NeedModal from "@/components/NeedModal";

export default function MyNeedsPage() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNeed, setEditingNeed] = useState<Need | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMyNeeds();
  }, []);

  const fetchMyNeeds = async () => {
    try {
      const myNeeds = await needsAPI.getAll();
      setNeeds(myNeeds);
    } catch (err) {
      console.error(`Error on fetching Needs: ${err}`);
      setError("Failed to load needs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (needData: NeedCreate) => {
    setIsSubmitting(true);
    try {
      if (editingNeed) {
        await needsAPI.update(editingNeed.id, needData);
      } else {
        await needsAPI.create(needData);
      }
      setIsModalOpen(false);
      setEditingNeed(null);
      fetchMyNeeds();
    } catch (err) {
      console.error(`Error on submitting Need: ${err}`);
      setError("Failed to save need");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this need?")) {
      try {
        await needsAPI.delete(id);
        fetchMyNeeds();
      } catch (err) {
        console.error(`Error on deleting Needs: ${err}`);
        setError("Failed to delete need");
      }
    }
  };

  const openCreateModal = () => {
    setEditingNeed(null);
    setIsModalOpen(true);
  };

  const openEditModal = (need: Need) => {
    setEditingNeed(need);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNeed(null);
  };

  if (loading)
    return (
      <div className="page-container flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="page-container">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="page-title">My Needs</h1>
          <button onClick={openCreateModal} className="btn-primary text-sm">
            Create Need
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="space-y-4 sm:space-y-6">
          {needs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[var(--color-charcoal)] opacity-70">
                No needs found. Create your first need!
              </p>
            </div>
          ) : (
            needs.map((need) => (
              <div key={need.id} className="card">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-charcoal)]">
                    {need.title}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(need)}
                      className="bg-[var(--color-soft-blue)] text-white px-3 py-1 rounded-md shadow-sm hover:bg-[#45b8b0] hover:shadow-md transition-all text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(need.id)}
                      className="bg-[var(--color-coral)] text-white px-3 py-1 rounded-md shadow-sm hover:bg-[#e55555] hover:shadow-md transition-all text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-[var(--color-charcoal)] opacity-80 mb-3">
                  {need.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-[var(--color-coral)]">
                      Volunteers needed:
                    </span>{" "}
                    {need.num_volunteers_needed}
                  </div>
                  <div>
                    <span className="font-medium text-[var(--color-coral)]">
                      Format:
                    </span>{" "}
                    {need.format}
                  </div>
                  <div>
                    <span className="font-medium text-[var(--color-coral)]">
                      Contact:
                    </span>{" "}
                    {need.contact_name}
                  </div>
                  {need.location_details && (
                    <div>
                      <span className="font-medium text-[var(--color-coral)]">
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

      <NeedModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        need={editingNeed}
        isLoading={isSubmitting}
      />
    </div>
  );
}
