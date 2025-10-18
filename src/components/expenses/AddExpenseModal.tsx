import { useState, useEffect } from 'react'
import type { PersonResponse, ExpenseCategoryResponse } from '@/types/api'
import './AddExpenseModal.css'

interface AddExpenseModalProps {
  show: boolean
  persons: PersonResponse[]
  categories: ExpenseCategoryResponse[]
  onClose: () => void
  onSave: (expenseData: {
    personId: number
    expenseCategoryId: number
    description: string
    amount: number
    payerPercentage: number
    expenseDate: string
  }) => void
}

function AddExpenseModal({
  show,
  persons,
  categories,
  onClose,
  onSave
}: AddExpenseModalProps) {
  const [formData, setFormData] = useState({
    personId: persons.length > 0 ? persons[0].id : 0,
    expenseCategoryId: categories.length > 0 ? categories[0].id : 0,
    description: '',
    amount: 0,
    payerPercentage: 100,
    expenseDate: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    if (show) {
      // Reset form when modal opens
      setFormData({
        personId: persons.length > 0 ? persons[0].id : 0,
        expenseCategoryId: categories.length > 0 ? categories[0].id : 0,
        description: '',
        amount: 0,
        payerPercentage: 100,
        expenseDate: new Date().toISOString().split('T')[0]
      })
    }
  }, [show, persons, categories])

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(formData)
  }

  if (!show) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content add-expense-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Novo gasto</h3>
        <div className="expense-form">
          <div className="form-row">
            <div className="form-field">
              <label>Persoa</label>
              <select
                value={formData.personId}
                onChange={(e) => handleChange('personId', Number(e.target.value))}
              >
                {persons.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label>Categoría</label>
              <select
                value={formData.expenseCategoryId}
                onChange={(e) => handleChange('expenseCategoryId', Number(e.target.value))}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-field">
            <label>Descrición</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descrición do gasto"
            />
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Importe (€)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange('amount', Number(e.target.value))}
                min="0"
                step="1"
              />
            </div>
            <div className="form-field">
              <label>% Pagador</label>
              <input
                type="number"
                value={formData.payerPercentage}
                onChange={(e) => handleChange('payerPercentage', Number(e.target.value))}
                min="0"
                max="100"
              />
            </div>
          </div>
          <div className="form-field">
            <label>Data</label>
            <input
              type="date"
              value={formData.expenseDate}
              onChange={(e) => handleChange('expenseDate', e.target.value)}
            />
          </div>
        </div>
        <div className="modal-actions">
          <button className="modal-cancel-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="modal-save-button" onClick={handleSave}>
            Crear gasto
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddExpenseModal
