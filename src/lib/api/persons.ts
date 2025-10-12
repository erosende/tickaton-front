import apiClient from './client';
import type { PersonResponse } from '@/types/api';

export const personsApi = {
  async getAll(): Promise<PersonResponse[]> {
    const { data } = await apiClient.get<PersonResponse[]>('/persons');
    return data;
  },
};
