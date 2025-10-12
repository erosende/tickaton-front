import apiClient from './client';
import type { ExpenseCategoryResponse } from '@/types/api';

export const expenseCategoriesApi = {
  async getAll(): Promise<ExpenseCategoryResponse[]> {
    const { data } = await apiClient.get<ExpenseCategoryResponse[]>('/expense-categories');
    return data;
  },
};
