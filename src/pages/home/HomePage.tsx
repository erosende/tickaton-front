import Header from '../../components/Header/Header'
import './HomePage.css'

function HomePage() {
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1>Benvido a Tickaton!</h1>
          <p>Has iniciado sesión correctamente.</p>
        </div>
      </div>
    </>
  )
}

export default HomePage
