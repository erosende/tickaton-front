import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authService } from '../../lib/supabase'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!email || !password) {
      toast.error('Por favor, completa todos os campos')
      return
    }

    if (!email.includes('@')) {
      toast.error('Por favor, introduce un correo electrónico válido')
      return
    }

    setIsLoading(true)

    try {
      const data = await authService.signIn({ email, password })

      if (data.user) {
        toast.success('Inicio de sesión exitoso!')
        navigate('/home')
      }
    } catch (err: any) {
      const errorMessage = err?.message || 'Error inesperado. Inténtao de novo.'
      toast.error(errorMessage)
      setError(errorMessage)
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgetPassword = () => {
    toast.success('Pois no olvidaras')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Inicio de sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" >Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Mételle ahí o correo alatrónico"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contrasinal</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Aquí vai o contrasinal"
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="login-footer">
          <a onClick={handleForgetPassword}>Olvidaches o contrasinal?</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
