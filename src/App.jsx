import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Contratos from './pages/Contratos'
import NovoContrato from './pages/NovoContrato'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="/novo-contrato" element={<NovoContrato />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
