import Header from '../../components/Header/Header'
import './ExpensesPage.css'

function ExpensesPage() {
  return (
    <>
      <Header />
      <div className="expenses-container">
        <div className="expenses-content">
          <h1>Gastos</h1>
          <p>Xestiona os teus gastos aquí.</p>
        </div>
      </div>
    </>
  )
}

export default ExpensesPage
