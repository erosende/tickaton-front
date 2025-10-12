import apiClient from './client';
import type { ExpenseRequest, ExpenseResponse } from '@/types/api';

export const expensesApi = {
  async getAllByGroup(expenseGroupId: number): Promise<ExpenseResponse[]> {
    const { data } = await apiClient.get<ExpenseResponse[]>('/expenses', {
      params: { expenseGroupId },
    });
    return data;
  },

  async create(expense: ExpenseRequest): Promise<number> {
    const { data } = await apiClient.post<number>('/expenses', expense);
    return data;
  },

  async update(id: number, expense: ExpenseRequest): Promise<ExpenseResponse> {
    const { data } = await apiClient.put<ExpenseResponse>(`/expenses/${id}`, expense);
    return data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/expenses/${id}`);
  },
};
