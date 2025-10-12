import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authService } from '../../lib/supabase'
import './Header.css'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await authService.signOut()
      toast.success('Sesión cerrada correctamente')
      navigate('/login')
    } catch (error) {
      toast.error('Error al cerrar sesión')
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-left">
          <button
            className={`header-button ${location.pathname === '/home' ? 'active' : ''}`}
            onClick={() => navigate('/home')}
          >
            Home
          </button>
          <button
            className={`header-button ${location.pathname === '/expenses' ? 'active' : ''}`}
            onClick={() => navigate('/expenses')}
          >
            Gastos
          </button>
        </div>
        <div className="header-right">
          <button className="header-button logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
