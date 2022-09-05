import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import EditarPersona from './vistas/EditarPersona'
import ListadoPersonas from './vistas/ListadoPersonas'
import NuevaPersona from './vistas/NuevaPersona'
import VerPersona from './vistas/VerPersona'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout/>}>
          <Route index element={<ListadoPersonas/>} />
          <Route path="nuevaPersona" element={<NuevaPersona/>} />
          <Route path="editar/:id" element={<EditarPersona/>} />
          <Route path=":id" element={<VerPersona/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App