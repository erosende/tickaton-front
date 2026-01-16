
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import GruposView from './views/GruposView'
import DetalleGrupoView from './views/DetalleGrupoView'

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<GruposView />} />
          <Route path='/grupo/:idGrupo' element={<DetalleGrupoView />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
