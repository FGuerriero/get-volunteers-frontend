/*
 * # Copyright (c) 2025 Fernando Guerriero Cardoso da Silva.
 * # Created Date: Tue Sep 02 2025
 * # SPDX-License-Identifier: MIT
 */

import axios from 'axios';
import { Volunteer, VolunteerCreate, Need, NeedCreate, Token, LoginForm } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: VolunteerCreate): Promise<Volunteer> =>
    api.post('/register', data).then(res => res.data),
  
  login: (data: LoginForm): Promise<Token> =>
    api.post('/login', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(res => res.data),
  
  getProfile: (): Promise<Volunteer> =>
    api.get('/volunteers/me/').then(res => res.data),
};

// Volunteers API
export const volunteersAPI = {
  create: (data: VolunteerCreate): Promise<Volunteer> =>
    api.post('/volunteers', data).then(res => res.data),
  
  getAll: (skip = 0, limit = 100): Promise<Volunteer[]> =>
    api.get(`/volunteers?skip=${skip}&limit=${limit}`).then(res => res.data),
  
  getById: (id: number): Promise<Volunteer> =>
    api.get(`/volunteers/${id}`).then(res => res.data),
  
  update: (id: number, data: VolunteerCreate): Promise<Volunteer> =>
    api.put(`/volunteers/${id}`, data).then(res => res.data),
  
  delete: (id: number): Promise<void> =>
    api.delete(`/volunteers/${id}`).then(res => res.data),
};

// Needs API
export const needsAPI = {
  create: (data: NeedCreate): Promise<Need> =>
    api.post('/needs', data).then(res => res.data),
  
  getAll: (skip = 0, limit = 100): Promise<Need[]> =>
    api.get(`/needs?skip=${skip}&limit=${limit}`).then(res => res.data),
  
  getById: (id: number): Promise<Need> =>
    api.get(`/needs/${id}`).then(res => res.data),
  
  update: (id: number, data: NeedCreate): Promise<Need> =>
    api.put(`/needs/${id}`, data).then(res => res.data),
  
  delete: (id: number): Promise<void> =>
    api.delete(`/needs/${id}`).then(res => res.data),
};