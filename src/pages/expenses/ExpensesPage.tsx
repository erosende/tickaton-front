import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import DatePicker from '../../components/inputs/date-picker/DatePicker'
import './ExpensesPage.css'
import TextInput from '../../components/inputs/text-input/TextInput'
import NumericInput from '../../components/inputs/numeric-input/NumericInput'
import ExpenseGroupCard from '../../components/expenses/ExpenseGroupCard'
import { expenseGroupsApi } from '@/lib/api/expense-groups'
import type { PageExpenseGroupResponse, ExpenseGroupFilters } from '@/types/api'
import toast from 'react-hot-toast'

function ExpensesPage() {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [amountFilter, setAmountFilter] = useState<number>(0)

  const [expenseGroupsData, setExpenseGroupsData] = useState<PageExpenseGroupResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(0)

  const fetchExpenseGroups = async (page: number = 0) => {
    setLoading(true)
    try {
      const filters: ExpenseGroupFilters = {
        page,
        size: 10,
        sortBy: 'start_date',
        sortDirection: 'DESC',
      }

      if (searchTerm) {
        filters.name = searchTerm
      }
      if (startDate) {
        filters.dateFrom = startDate
      }
      if (endDate) {
        filters.dateTo = endDate
      }

      const data = await expenseGroupsApi.getPaginated(filters)
      setExpenseGroupsData(data)
      setCurrentPage(page)
    } catch (error) {
      toast.error('Error ao cargar os grupos de gastos')
      console.error('Error fetching expense groups:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenseGroups(0)
  }, [])

  const handleFilter = () => {
    fetchExpenseGroups(0)
  }

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      fetchExpenseGroups(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (expenseGroupsData && !expenseGroupsData.last) {
      fetchExpenseGroups(currentPage + 1)
    }
  }

  const handleCardClick = (id: number) => {
    const expenseGroup = expenseGroupsData?.content.find(group => group.id === id)
    if (expenseGroup) {
      navigate(`/expenses/${id}`, { state: { expenseGroup } })
    }
  }

  return (
    <>
      <Header />
      <div className="expenses-container">
        {/* Section 1: Filters */}
        <div className="filters-container">
          <div className="filters-content">
            <TextInput
              value={searchTerm}
              onChange={setSearchTerm}
              label="Palabra clave"
              placeholder="Buscar por descripción ou categoría"
            />
            <NumericInput
              value={amountFilter}
              onChange={setAmountFilter}
              label="Cantidad mínima"
              placeholder="0.00"
              min={0}
            />
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              label="Data de inicio"
              placeholder="Selecciona a data"
            />
            <DatePicker
              value={endDate}
              onChange={setEndDate}
              label="Data de fin"
              placeholder="Selecciona a data"
            />
            <button className="filter-button" onClick={handleFilter}>
              Aplicar filtros
            </button>
          </div>
        </div>

        {/* Section 2: Expense Cards List */}
        <div className="expenses-list-container">
          <div className="expenses-list-content">
            <div className="list-header">
              <h2>Grupos de gastos</h2>
            </div>
            
            {loading ? (
              <p className="loading-text">Cargando...</p>
            ) : expenseGroupsData && expenseGroupsData.content.length > 0 ? (
              <div className="expense-cards-grid">
                {expenseGroupsData.content.map((group) => (
                  <ExpenseGroupCard
                    key={group.id}
                    expenseGroup={group}
                    onClick={() => handleCardClick(group.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="empty-text">Non hai grupos de gastos para mostrar.</p>
            )}
          </div>
        </div>

        {/* Section 3: Pagination Controls */}
        <div className="pagination-container">
          <div className="pagination-content">
            <button
              className="pagination-button"
              onClick={handlePreviousPage}
              disabled={currentPage === 0 || loading}
            >
              Anterior
            </button>
            <span className="pagination-info">
              Páxina {currentPage + 1} de {expenseGroupsData?.totalPages || 1}
            </span>
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={expenseGroupsData?.last || loading}
            >
              Seguinte
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExpensesPage
