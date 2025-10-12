// Generated TypeScript types from OpenAPI specification

export interface ExpenseRequest {
  expenseGroupId: number;
  personId: number;
  expenseCategoryId: number;
  description: string;
  amount: number;
  payerPercentage: number;
  expenseDate: string;
}

export interface ExpenseResponse {
  id: number;
  expenseGroupId: number;
  personId: number;
  expenseCategoryId: number;
  description: string;
  amount: number;
  payerPercentage: number;
  expenseDate: string;
}

export interface ExpenseGroupRequest {
  id?: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface ExpenseGroupResponse {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface PersonResponse {
  id: number;
  name: string;
}

export interface ExpenseCategoryResponse {
  id: number;
  name: string;
}

export interface SortObject {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface PageableObject {
  offset: number;
  sort: SortObject;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PageExpenseGroupResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: ExpenseGroupResponse[];
  number: number;
  sort: SortObject;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: PageableObject;
  empty: boolean;
}

export interface ExpenseGroupFilters {
  name?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}
