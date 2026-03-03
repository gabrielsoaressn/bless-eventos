import { Search, Filter } from 'lucide-react'
import { contratos } from '../data/mockData'

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function StatusBadge({ status }) {
  const styles = {
    'Quitado': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Contrato Fechado': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Sinal Pago, Parcelas Pendentes': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Sinal Pendente': 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
      {status}
    </span>
  )
}

export default function Contratos() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Contratos</h2>
          <p className="text-slate-500 text-sm mt-1">{contratos.length} contratos cadastrados</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="pl-9 pr-4 py-2 border border-dark-border rounded-lg text-sm bg-dark-card text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/40 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-dark-border rounded-lg text-sm text-slate-400 bg-dark-card hover:bg-dark-surface hover:border-gold/20 transition-colors">
            <Filter size={16} />
            Filtrar
          </button>
        </div>
      </div>

      <div className="bg-dark-card rounded-xl border border-dark-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border bg-dark-surface/50">
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
              <tr key={c.id} className="border-b border-dark-border/50 hover:bg-dark-surface/30 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-200">{c.cliente}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-400">{c.tipo}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-400">{c.data}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <p className="text-sm text-slate-400">{c.convidados}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-sm font-medium text-gold">{formatCurrency(c.valor)}</p>
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
