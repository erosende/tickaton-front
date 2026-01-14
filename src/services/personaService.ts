import apiClient from './api';
import type { Persona } from '../interfaces/Persona';

/**
 * Servicio para gestionar personas
 */
export const personaService = {
  /**
   * Obtiene todas las personas
   */
  getAll: async (): Promise<Persona[]> => {
    const response = await apiClient.get<Persona[]>('/api/personas');
    return response.data;
  },
};
