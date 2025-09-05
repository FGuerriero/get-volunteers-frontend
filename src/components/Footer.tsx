/*
 * Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * Created Date: Wed Sep 05 2025
 * SPDX-License-Identifier: MIT
 */

export default function Footer() {
  return (
    <footer className="bg-[var(--color-soft-blue)] text-white py-6 text-center">
      <p>
        &copy; {new Date().getFullYear()} GetVolunteers. All rights reserved.
      </p>
    </footer>
  );
}
