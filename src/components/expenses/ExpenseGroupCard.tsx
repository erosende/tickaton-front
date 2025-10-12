import './ExpenseGroupCard.css'
import type { ExpenseGroupResponse } from '@/types/api'

interface ExpenseGroupCardProps {
  expenseGroup: ExpenseGroupResponse
  onClick?: () => void
}

function ExpenseGroupCard({ expenseGroup, onClick }: ExpenseGroupCardProps) {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('gl-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div className="expense-group-card" onClick={onClick}>
      <div className="card-header">
        <h3 className="card-title">{expenseGroup.name}</h3>
      </div>

      <div className="card-footer">
        <div className="date-range">
          <div className="date-item">
            <span className="date-label">Inicio:</span>
            <span className="date-value">{formatDate(expenseGroup.startDate)}</span>
          </div>
          <div className="date-separator">-</div>
          <div className="date-item">
            <span className="date-label">Fin:</span>
            <span className="date-value">{formatDate(expenseGroup.endDate)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseGroupCard
