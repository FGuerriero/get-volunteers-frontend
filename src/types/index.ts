/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

export interface VolunteerBase {
  name: string;
  email: string;
  phone?: string;
  about_me?: string;
  skills?: string;
  volunteer_interests?: string;
  location?: string;
  availability?: string;
}

export interface VolunteerCreate extends VolunteerBase {
  password: string;
}

export interface Volunteer extends VolunteerBase {
  id: number;
  is_active: boolean;
  is_manager: boolean;
}

export interface NeedBase {
  title: string;
  description: string;
  required_tasks?: string;
  required_skills?: string;
  num_volunteers_needed: number;
  format: "in-person" | "virtual";
  location_details?: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
}

export type NeedCreate = NeedBase;

export interface Need extends NeedBase {
  id: number;
  owner_id: number;
  owner: Volunteer;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface LoginForm {
  username: string;
  password: string;
}