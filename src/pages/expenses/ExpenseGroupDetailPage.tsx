import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import Header from '../../components/header/Header'
import ExpensesTable from '../../components/expenses/ExpensesTable'
import AddExpenseModal from '../../components/expenses/AddExpenseModal'
import type { ExpenseGroupResponse, ExpenseResponse, PersonResponse, ExpenseCategoryResponse } from '@/types/api'
import { expenseGroupsApi } from '@/lib/api/expense-groups'
import { expensesApi } from '@/lib/api/expenses'
import { personsApi } from '@/lib/api/persons'
import { expenseCategoriesApi } from '@/lib/api/expense-categories'
import toast from 'react-hot-toast'
import './ExpenseGroupDetailPage.css'

function ExpenseGroupDetailPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const expenseGroup = location.state?.expenseGroup as ExpenseGroupResponse | undefined
  const [showPopover, setShowPopover] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: expenseGroup?.name || '',
    description: expenseGroup?.description || '',
    startDate: expenseGroup?.startDate || '',
    endDate: expenseGroup?.endDate || ''
  })

  // Delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Expenses state
  const [expenses, setExpenses] = useState<ExpenseResponse[]>([])
  const [loadingExpenses, setLoadingExpenses] = useState(false)

  // Persons state
  const [persons, setPersons] = useState<PersonResponse[]>([])
  const [loadingPersons, setLoadingPersons] = useState(false)

  // Categories state
  const [categories, setCategories] = useState<ExpenseCategoryResponse[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)

  // Expense editing state
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null)
  const [editingExpenseData, setEditingExpenseData] = useState<{
    personId: number
    expenseCategoryId: number
  } | null>(null)

  // Add expense state
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)

  useEffect(() => {
    // If no expense group data is provided, redirect back to expenses
    if (!expenseGroup) {
      navigate('/expenses', { replace: true })
    }
  }, [expenseGroup, navigate])

  useEffect(() => {
    // Fetch persons
    const fetchPersons = async () => {
      setLoadingPersons(true)
      try {
        const data = await personsApi.getAll()
        setPersons(data)
      } catch (error) {
        toast.error('Error ao cargar as persoas')
        console.error('Error fetching persons:', error)
      } finally {
        setLoadingPersons(false)
      }
    }

    fetchPersons()
  }, [])

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      setLoadingCategories(true)
      try {
        const data = await expenseCategoriesApi.getAll()
        setCategories(data)
      } catch (error) {
        toast.error('Error ao cargar as categorías')
        console.error('Error fetching categories:', error)
      } finally {
        setLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    // Fetch expenses for this expense group
    const fetchExpenses = async () => {
      if (!expenseGroup) return

      setLoadingExpenses(true)
      try {
        const data = await expensesApi.getAllByGroup(expenseGroup.id)
        setExpenses(data)
      } catch (error) {
        toast.error('Error ao cargar os gastos')
        console.error('Error fetching expenses:', error)
      } finally {
        setLoadingExpenses(false)
      }
    }

    fetchExpenses()
  }, [expenseGroup])

  useEffect(() => {
    // Close popover when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (descriptionRef.current && !descriptionRef.current.contains(event.target as Node)) {
        setShowPopover(false)
      }
    }

    if (showPopover) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showPopover])

  const handleEditClick = () => {
    setIsEditing(true)
    setFormData({
      name: expenseGroup?.name || '',
      description: expenseGroup?.description || '',
      startDate: expenseGroup?.startDate || '',
      endDate: expenseGroup?.endDate || ''
    })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setFormData({
      name: expenseGroup?.name || '',
      description: expenseGroup?.description || '',
      startDate: expenseGroup?.startDate || '',
      endDate: expenseGroup?.endDate || ''
    })
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveEdit = async () => {
    if (!expenseGroup) return

    try {
      const updatedGroup = await expenseGroupsApi.update(expenseGroup.id, {
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate
      })

      // Update the expense group data in location state
      navigate(`/expenses/${expenseGroup.id}`, {
        state: { expenseGroup: updatedGroup },
        replace: true
      })

      setIsEditing(false)
      toast.success('Grupo de gastos actualizado correctamente')
    } catch (error) {
      toast.error('Error ao actualizar o grupo de gastos')
      console.error('Error updating expense group:', error)
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
  }

  const handleConfirmDelete = async () => {
    if (!expenseGroup) return

    try {
      await expenseGroupsApi.delete(expenseGroup.id)
      toast.success('Grupo de gastos eliminado correctamente')
      navigate('/expenses', { replace: true })
    } catch (error) {
      toast.error('Error ao eliminar o grupo de gastos')
      console.error('Error deleting expense group:', error)
      setShowDeleteModal(false)
    }
  }

  const handleEditExpense = (expense: ExpenseResponse) => {
    setEditingExpenseId(expense.id)
    setEditingExpenseData({
      personId: expense.personId,
      expenseCategoryId: expense.expenseCategoryId
    })
  }

  const handleCancelExpenseEdit = () => {
    setEditingExpenseId(null)
    setEditingExpenseData(null)
  }

  const handleSaveExpenseEdit = async (expenseId: number) => {
    if (!editingExpenseData || !expenseGroup) return

    try {
      const expenseToUpdate = expenses.find(e => e.id === expenseId)
      if (!expenseToUpdate) return

      await expensesApi.update(expenseId, {
        expenseGroupId: expenseGroup.id,
        personId: editingExpenseData.personId,
        expenseCategoryId: editingExpenseData.expenseCategoryId,
        description: expenseToUpdate.description,
        amount: expenseToUpdate.amount,
        payerPercentage: expenseToUpdate.payerPercentage,
        expenseDate: expenseToUpdate.expenseDate
      })

      toast.success('Gasto actualizado correctamente')
      // Refresh expenses list
      const data = await expensesApi.getAllByGroup(expenseGroup.id)
      setExpenses(data)
      setEditingExpenseId(null)
      setEditingExpenseData(null)
    } catch (error) {
      toast.error('Error ao actualizar o gasto')
      console.error('Error updating expense:', error)
    }
  }

  const handleExpenseFieldChange = (field: 'personId' | 'expenseCategoryId', value: number) => {
    setEditingExpenseData(prev => prev ? { ...prev, [field]: value } : null)
  }

  const handleDeleteExpense = async (expenseId: number) => {
    try {
      await expensesApi.delete(expenseId)
      toast.success('Gasto eliminado correctamente')
      // Refresh expenses list
      if (expenseGroup) {
        const data = await expensesApi.getAllByGroup(expenseGroup.id)
        setExpenses(data)
      }
    } catch (error) {
      toast.error('Error ao eliminar o gasto')
      console.error('Error deleting expense:', error)
    }
  }

  const handleAddExpenseClick = () => {
    setShowAddExpenseModal(true)
  }

  const handleCloseAddExpenseModal = () => {
    setShowAddExpenseModal(false)
  }

  const handleSaveNewExpense = async (expenseData: {
    personId: number
    expenseCategoryId: number
    description: string
    amount: number
    payerPercentage: number
    expenseDate: string
  }) => {
    if (!expenseGroup) return

    // Validate required fields
    if (!expenseData.description.trim()) {
      toast.error('A descrición é obrigatoria')
      return
    }
    if (expenseData.amount <= 0) {
      toast.error('O importe debe ser maior que 0')
      return
    }
    if (expenseData.personId === 0) {
      toast.error('Debes seleccionar unha persoa')
      return
    }
    if (expenseData.expenseCategoryId === 0) {
      toast.error('Debes seleccionar unha categoría')
      return
    }

    try {
      await expensesApi.create({
        expenseGroupId: expenseGroup.id,
        ...expenseData
      })

      toast.success('Gasto creado correctamente')
      // Refresh expenses list
      const data = await expensesApi.getAllByGroup(expenseGroup.id)
      setExpenses(data)
      setShowAddExpenseModal(false)
    } catch (error) {
      toast.error('Error ao crear o gasto')
      console.error('Error creating expense:', error)
    }
  }

  if (!expenseGroup) {
    return null
  }

  return (
    <>
      <Header />
      <div className="expense-group-detail-container">
        <div className="detail-header">
          <button className="back-button" onClick={() => navigate('/expenses')}>
            ← Volver
          </button>
          <div className="header-controls">
            {!isEditing ? (
              <>
                <button className="edit-button" onClick={handleEditClick}>
                  Editar
                </button>
                <button className="delete-button" onClick={handleDeleteClick}>
                  Eliminar
                </button>
              </>
            ) : (
              <>
                <button className="cancel-button" onClick={handleCancelEdit}>
                  Cancelar
                </button>
                <button className="save-button" onClick={handleSaveEdit}>
                  Gardar
                </button>
              </>
            )}
          </div>
        </div>
        <div className="detail-content">
          <div className="info-section">
            {!isEditing ? (
              <h2>{expenseGroup.name}</h2>
            ) : (
              <input
                type="text"
                className="edit-title-input"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Nome do grupo"
              />
            )}
            <div className="info-grid">
              <div className="info-item description-item">
                <label>Descrición:</label>
                {!isEditing ? (
                  <div className="description-wrapper" ref={descriptionRef}>
                    <p
                      className="description-text"
                      onClick={() => setShowPopover(!showPopover)}
                      title="Fai clic para ver o texto completo"
                    >
                      {expenseGroup.description}
                    </p>
                    {showPopover && (
                      <div className="description-popover">
                        <p>{expenseGroup.description}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <textarea
                    className="edit-description-input"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descrición do grupo"
                    rows={3}
                  />
                )}
              </div>
              <div className="info-item">
                <label>Data de inicio:</label>
                {!isEditing ? (
                  <p>{new Date(expenseGroup.startDate).toLocaleDateString('gl-ES')}</p>
                ) : (
                  <input
                    type="date"
                    className="edit-date-input"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                )}
              </div>
              <div className="info-item">
                <label>Data de fin:</label>
                {!isEditing ? (
                  <p>{new Date(expenseGroup.endDate).toLocaleDateString('gl-ES')}</p>
                ) : (
                  <input
                    type="date"
                    className="edit-date-input"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Expenses Table Section */}
          <div className="expenses-table-section">
            <div className="expenses-section-header">
              <h3>Gastos</h3>
              <button className="add-expense-button" onClick={handleAddExpenseClick}>
                + Novo gasto
              </button>
            </div>
            <ExpensesTable
              expenses={expenses}
              persons={persons}
              categories={categories}
              loading={loadingExpenses || loadingPersons || loadingCategories}
              onEditExpense={handleEditExpense}
              onDeleteExpense={handleDeleteExpense}
              editingExpenseId={editingExpenseId}
              editingExpenseData={editingExpenseData}
              onCancelEdit={handleCancelExpenseEdit}
              onSaveEdit={handleSaveExpenseEdit}
              onFieldChange={handleExpenseFieldChange}
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={handleCancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar eliminación</h3>
            <p>Estás seguro de que queres eliminar o grupo de gastos <strong>"{expenseGroup.name}"</strong>?</p>
            <p className="modal-warning">Esta acción non se pode desfacer.</p>
            <div className="modal-actions">
              <button className="modal-cancel-button" onClick={handleCancelDelete}>
                Cancelar
              </button>
              <button className="modal-delete-button" onClick={handleConfirmDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      <AddExpenseModal
        show={showAddExpenseModal}
        persons={persons}
        categories={categories}
        onClose={handleCloseAddExpenseModal}
        onSave={handleSaveNewExpense}
      />
    </>
  )
}

export default ExpenseGroupDetailPage
