/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div
        className="relative"
        style={{
          backgroundImage: "url(/hero_working_volunteers.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white opacity-60 rounded-lg"></div>
        <div className="relative max-w-3xl mx-auto">
          <Image
            src="/full_logo.png"
            alt="GetVolunteers Logo"
            width={700}
            height={50}
            className="w-full h-auto mb-6"
          />
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-10 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-teal-600 mb-4">Mission</h2>
          <p>
            To connect volunteers with meaningful opportunities where their
            skills and compassion can make a difference.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-teal-600 mb-4">Vision</h2>
          <p>
            A world where no need goes unmet, because every helping hand finds
            its purpose.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-teal-600 mb-4">Values</h2>
          <p>
            Empathy, collaboration, integrity, and hope guide everything we do.
          </p>
        </div>
      </section>

      {/* How You Can Help - Step by Step */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-teal-600 mb-10">
            How You Can Help
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <span className="text-4xl">📝</span>
              <h3 className="text-xl font-semibold mt-4 mb-2">
                1. Create Profile
              </h3>
              <p>
                Share your skills, passions, and availability to get started.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <span className="text-4xl">🤝</span>
              <h3 className="text-xl font-semibold mt-4 mb-2">
                2. Get Matched
              </h3>
              <p>
                Our AI powered engines matches you with opportunities that align
                with your abilities and interests.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <span className="text-4xl">❤️</span>
              <h3 className="text-xl font-semibold mt-4 mb-2">
                3. Make Impact
              </h3>
              <p>
                You will receive an e-mail notification with details about the
                match, then you just need to contact and join a cause and start
                creating positive change in people’s lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Matching System */}
      <section className="max-w-6xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-teal-600 mb-6">
          Our Matching System
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-8">
          Volunteers and Needs registered on our platform are stored in a
          database. Using AI, we connect them based on descriptions, skills, and
          interests. The more detailed your profile or need description is, the
          more accurate the match will be.
        </p>
        <Image
          src="/matching_engine.png" // you can create a custom illustration or diagram
          alt="Matching system illustration"
          width={600}
          height={400}
          className="mx-auto rounded-xl shadow-lg"
        />
      </section>
    </main>
  );
}
