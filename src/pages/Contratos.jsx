import { Search, Filter } from 'lucide-react'
import { contratos } from '../data/mockData'

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function StatusBadge({ status }) {
  const styles = {
    'Quitado': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Contrato Fechado': 'bg-blue-50 text-blue-700 border-blue-200',
    'Sinal Pago, Parcelas Pendentes': 'bg-amber-50 text-amber-700 border-amber-200',
    'Sinal Pendente': 'bg-red-50 text-red-700 border-red-200',
  }

  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
      {status}
    </span>
  )
}

export default function Contratos() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Contratos</h2>
          <p className="text-slate-500 text-sm mt-1">{contratos.length} contratos cadastrados</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            Filtrar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cliente</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tipo</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data</th>
              <th className="text-center px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Convidados</th>
              <th className="text-right px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {contratos.map((c) => (
              <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-800">{c.cliente}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-500">{c.tipo}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-500">{c.data}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <p className="text-sm text-slate-500">{c.convidados}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-sm font-medium text-slate-800">{formatCurrency(c.valor)}</p>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={c.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
