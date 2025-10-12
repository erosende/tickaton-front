'use client';

import { useState, useEffect } from 'react';
import { expenseGroupsApi } from '@/lib/api';
import type { ExpenseGroupResponse, ExpenseGroupRequest } from '@/types/api';
import ExpenseGroupCard from '@/components/expense-groups/ExpenseGroupCard';
import ExpenseGroupForm from '@/components/expense-groups/ExpenseGroupForm';

export default function ExpenseGroupsPage() {
  const [groups, setGroups] = useState<ExpenseGroupResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await expenseGroupsApi.getAll();
      setGroups(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load expense groups');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: ExpenseGroupRequest) => {
    try {
      await expenseGroupsApi.create(data);
      setShowForm(false);
      await loadGroups();
    } catch (err: any) {
      alert(err.message || 'Failed to create expense group');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this expense group?')) {
      return;
    }

    try {
      await expenseGroupsApi.delete(id);
      await loadGroups();
    } catch (err: any) {
      alert(err.message || 'Failed to delete expense group');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Expense Groups</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {showForm ? 'Cancel' : 'New Group'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Expense Group</h2>
          <ExpenseGroupForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {groups.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">No expense groups yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Create Your First Group
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <ExpenseGroupCard
              key={group.id}
              group={group}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
