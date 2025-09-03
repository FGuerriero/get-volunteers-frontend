/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4ECDC4] to-[#FF6B6B] text-white py-12 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">
            Connecting Volunteers with Needs, Powered by AI
          </h1>
          <p className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
            At GetVolunteers, we believe every skill, passion, and good intention can create real impact. Our mission is to bridge the gap between those who want to help and those who need support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth"
              className="bg-white text-[#4ECDC4] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Become a Volunteer
            </Link>
            <Link 
              href="/auth"
              className="bg-[#FF6B6B] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#e55555] transition-colors text-sm sm:text-base border-2 border-white"
            >
              Post a Need
            </Link>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-[#FF6B6B] mb-4">Mission</h3>
              <p className="text-[#2E2E2E] opacity-80 text-sm sm:text-base">
                To connect volunteers and communities through meaningful opportunities, making it simple for anyone to make a difference.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-[#4ECDC4] mb-4">Vision</h3>
              <p className="text-[#2E2E2E] opacity-80 text-sm sm:text-base">
                A world where every act of kindness finds its way to those who need it most.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-[#FF6B6B] mb-4">Values</h3>
              <div className="text-[#2E2E2E] opacity-80 text-sm sm:text-base space-y-2">
                <p><strong>Empathy:</strong> We care deeply about people and communities.</p>
                <p><strong>Transparency:</strong> We build trust through honesty and clarity.</p>
                <p><strong>Impact:</strong> Every action matters, small or big.</p>
                <p><strong>Innovation:</strong> We use technology to amplify human kindness.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#2E2E2E] mb-8 sm:mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-[#4ECDC4] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h4 className="text-lg font-semibold text-[#2E2E2E] mb-2">Join Us</h4>
              <p className="text-[#2E2E2E] opacity-70 text-sm">Create your profile as a Volunteer or register a Need.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#FF6B6B] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h4 className="text-lg font-semibold text-[#2E2E2E] mb-2">Describe Clearly</h4>
              <p className="text-[#2E2E2E] opacity-70 text-sm">Share your skills and availability, or describe your activity and goals.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#4ECDC4] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h4 className="text-lg font-semibold text-[#2E2E2E] mb-2">AI Matching</h4>
              <p className="text-[#2E2E2E] opacity-70 text-sm">Our smart engine connects Volunteers and Needs by analyzing skills and interests.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#FF6B6B] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h4 className="text-lg font-semibold text-[#2E2E2E] mb-2">Connect & Act</h4>
              <p className="text-[#2E2E2E] opacity-70 text-sm">Get matched, connect directly, and start making an impact together.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-[#4ECDC4] font-medium text-sm sm:text-base">
              💡 Tip: The better the descriptions, the stronger the match!
            </p>
          </div>
        </div>
      </section>

      {/* AI Matching Engine */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2E2E2E] mb-4">
              💡 AI that amplifies human kindness
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="bg-[#4ECDC4] bg-opacity-10 p-4 sm:p-6 rounded-lg">
                  <h4 className="font-semibold text-[#4ECDC4] mb-2">Volunteers</h4>
                  <p className="text-[#2E2E2E] opacity-70 text-sm">Skills, passions & availability stored securely</p>
                </div>
                <div className="flex justify-center">
                  <div className="text-2xl sm:text-3xl">→ 🤖 →</div>
                </div>
                <div className="bg-[#FF6B6B] bg-opacity-10 p-4 sm:p-6 rounded-lg">
                  <h4 className="font-semibold text-[#FF6B6B] mb-2">Needs</h4>
                  <p className="text-[#2E2E2E] opacity-70 text-sm">Activities, goals & requirements analyzed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 sm:p-8 shadow-md">
            <h3 className="text-xl sm:text-2xl font-bold text-[#2E2E2E] mb-6 text-center">
              Why Descriptions Matter
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h4 className="font-semibold text-[#4ECDC4] mb-3">Volunteers:</h4>
                <p className="text-[#2E2E2E] opacity-80 text-sm sm:text-base">
                  Tell us about your strengths, what excites you, and your availability.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-[#FF6B6B] mb-3">Needs:</h4>
                <p className="text-[#2E2E2E] opacity-80 text-sm sm:text-base">
                  Clearly describe the activity, who it helps, and what skills are needed.
                </p>
              </div>
            </div>
            <p className="text-center text-[#2E2E2E] font-medium mt-6 text-sm sm:text-base">
              The clearer you are, the better our AI can match you for maximum impact!
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Together, we can transform willingness into impact.
          </h2>
          <p className="text-lg sm:text-xl opacity-90 mb-8 sm:mb-10">
            Join today and be part of the movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth"
              className="bg-white text-[#4ECDC4] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Become a Volunteer
            </Link>
            <Link 
              href="/auth"
              className="bg-transparent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors text-sm sm:text-base border-2 border-white"
            >
              Post a Need
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}