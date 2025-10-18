import type { ExpenseResponse, PersonResponse, ExpenseCategoryResponse } from '@/types/api'
import './ExpensesTable.css'

interface ExpensesTableProps {
  expenses: ExpenseResponse[]
  persons: PersonResponse[]
  categories: ExpenseCategoryResponse[]
  loading: boolean
  onEditExpense?: (expense: ExpenseResponse) => void
  onDeleteExpense?: (expenseId: number) => void
  editingExpenseId?: number | null
  editingExpenseData?: {
    personId: number
    expenseCategoryId: number
  } | null
  onCancelEdit?: () => void
  onSaveEdit?: (expenseId: number) => void
  onFieldChange?: (field: 'personId' | 'expenseCategoryId', value: number) => void
}

function ExpensesTable({
  expenses,
  persons,
  categories,
  loading,
  onEditExpense,
  onDeleteExpense,
  editingExpenseId,
  editingExpenseData,
  onCancelEdit,
  onSaveEdit,
  onFieldChange
}: ExpensesTableProps) {
  const getPersonName = (personId: number): string => {
    const person = persons.find(p => p.id === personId)
    return person ? person.name : `ID: ${personId}`
  }

  const getCategoryName = (categoryId: number): string => {
    const category = categories.find(c => c.id === categoryId)
    return category ? category.name : `ID: ${categoryId}`
  }

  if (loading) {
    return <p className="loading-text">Cargando gastos...</p>
  }

  if (expenses.length === 0) {
    return <p className="empty-text">Non hai gastos neste grupo.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="expenses-table">
        <thead>
          <tr>
            <th>Persoa</th>
            <th>Categoría</th>
            <th>Descrición</th>
            <th>Importe</th>
            <th>% Pagador</th>
            <th>Data</th>
            <th className="actions-header"></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const isEditing = editingExpenseId === expense.id
            return (
              <tr key={expense.id}>
                <td>
                  {isEditing && editingExpenseData && onFieldChange ? (
                    <select
                      className="edit-select"
                      value={editingExpenseData.personId}
                      onChange={(e) => onFieldChange('personId', Number(e.target.value))}
                    >
                      {persons.map((person) => (
                        <option key={person.id} value={person.id}>
                          {person.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    getPersonName(expense.personId)
                  )}
                </td>
                <td>
                  {isEditing && editingExpenseData && onFieldChange ? (
                    <select
                      className="edit-select"
                      value={editingExpenseData.expenseCategoryId}
                      onChange={(e) => onFieldChange('expenseCategoryId', Number(e.target.value))}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    getCategoryName(expense.expenseCategoryId)
                  )}
                </td>
                <td>{expense.description}</td>
                <td>{expense.amount.toFixed(2)} €</td>
                <td>{expense.payerPercentage}%</td>
                <td>{new Date(expense.expenseDate).toLocaleDateString('gl-ES')}</td>
                <td className="actions-cell">
                  {isEditing ? (
                    <>
                      {onCancelEdit && (
                        <button
                          className="action-button cancel-edit-action"
                          onClick={onCancelEdit}
                          title="Cancelar"
                          aria-label="Cancelar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      )}
                      {onSaveEdit && (
                        <button
                          className="action-button save-edit-action"
                          onClick={() => onSaveEdit(expense.id)}
                          title="Gardar"
                          aria-label="Gardar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {onEditExpense && (
                        <button
                          className="action-button edit-action"
                          onClick={() => onEditExpense(expense)}
                          title="Editar gasto"
                          aria-label="Editar gasto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                      )}
                      {onDeleteExpense && (
                        <button
                          className="action-button delete-action"
                          onClick={() => onDeleteExpense(expense.id)}
                          title="Eliminar gasto"
                          aria-label="Eliminar gasto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ExpensesTable
