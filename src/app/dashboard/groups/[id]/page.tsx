'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { expensesApi, expenseGroupsApi, personsApi, expenseCategoriesApi } from '@/lib/api';
import type {
  ExpenseResponse,
  ExpenseRequest,
  ExpenseGroupResponse,
  PersonResponse,
  ExpenseCategoryResponse,
} from '@/types/api';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import ExpenseList from '@/components/expenses/ExpenseList';
import ExpenseSummary from '@/components/expenses/ExpenseSummary';
import Link from 'next/link';

export default function ExpenseGroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = parseInt(params.id as string);

  const [group, setGroup] = useState<ExpenseGroupResponse | null>(null);
  const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
  const [persons, setPersons] = useState<PersonResponse[]>([]);
  const [categories, setCategories] = useState<ExpenseCategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadData();
  }, [groupId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [groupsData, expensesData, personsData, categoriesData] = await Promise.all([
        expenseGroupsApi.getAll(),
        expensesApi.getAllByGroup(groupId),
        personsApi.getAll(),
        expenseCategoriesApi.getAll(),
      ]);

      const foundGroup = groupsData.find((g) => g.id === groupId);
      if (!foundGroup) {
        setError('Expense group not found');
        return;
      }

      setGroup(foundGroup);
      setExpenses(expensesData);
      setPersons(personsData);
      setCategories(categoriesData);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: ExpenseRequest) => {
    try {
      await expensesApi.create(data);
      setShowForm(false);
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to create expense');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      await expensesApi.delete(id);
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete expense');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="space-y-4">
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error || 'Group not found'}
        </div>
        <Link
          href="/dashboard/groups"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Back to Groups
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/groups"
            className="text-blue-600 hover:underline text-sm mb-2 inline-block"
          >
            ← Back to Groups
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
          <p className="text-gray-600 mt-1">{group.description}</p>
          <div className="flex items-center text-sm text-gray-500 space-x-4 mt-2">
            <span>
              <span className="font-medium">Start:</span> {group.startDate}
            </span>
            <span>
              <span className="font-medium">End:</span> {group.endDate}
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Expense'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
          <ExpenseForm
            expenseGroupId={groupId}
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {expenses.length > 0 && (
        <ExpenseSummary expenses={expenses} persons={persons} />
      )}

      <ExpenseList
        expenses={expenses}
        persons={persons}
        categories={categories}
        onDelete={handleDelete}
      />
    </div>
  );
}
