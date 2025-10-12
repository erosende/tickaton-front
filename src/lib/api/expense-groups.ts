import apiClient from './client';
import type {
  ExpenseGroupRequest,
  ExpenseGroupResponse,
  PageExpenseGroupResponse,
  ExpenseGroupFilters,
} from '@/types/api';

export const expenseGroupsApi = {

  async getPaginated(filters?: ExpenseGroupFilters): Promise<PageExpenseGroupResponse> {
    console.log('Fetching expense groups with filters:', filters);
    const { data } = await apiClient.get<PageExpenseGroupResponse>('/expense-groups/paginated', {
      params: filters,
    });
    return data;
  },

  async create(group: ExpenseGroupRequest): Promise<number> {
    const { data } = await apiClient.post<number>('/expense-groups', group);
    return data;
  },

  async update(id: number, group: ExpenseGroupRequest): Promise<ExpenseGroupResponse> {
    const { data } = await apiClient.put<ExpenseGroupResponse>(`/expense-groups/${id}`, group);
    return data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/expense-groups/${id}`);
  },
};
