import { Search, Filter } from 'lucide-react'
import { contratos } from '../data/mockData'

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function StatusBadge({ status }) {
  const styles = {
    'Quitado': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Em dia': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Atrasado': 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
      {status}
    </span>
  )
}

function ParcelasBar({ pagas, total }) {
  const pct = total > 0 ? (pagas / total) * 100 : 0
  const restantes = total - pagas

  return (
    <div className="flex items-center gap-3 min-w-[160px]">
      <div className="flex-1">
        <div className="w-full bg-dark-border rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all ${pct === 100 ? 'bg-emerald-400' : 'bg-gold'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <span className="text-xs text-slate-400 whitespace-nowrap font-medium">
        <span className="text-slate-200">{pagas}</span>/{total}
        {restantes > 0 && (
          <span className="text-slate-500 ml-1">({restantes} restante{restantes > 1 ? 's' : ''})</span>
        )}
      </span>
    </div>
  )
}

export default function Contratos() {
  const totalRecebiveis = contratos.reduce((sum, c) => {
    const restantes = c.parcelasTotal - c.parcelasPagas
    const valorParcela = c.parcelasTotal > 0 ? c.valor / c.parcelasTotal : 0
    return sum + (restantes * valorParcela)
  }, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Contratos</h2>
          <p className="text-slate-500 text-sm mt-1">
            {contratos.length} contratos &middot; Recebiveis pendentes: <span className="text-gold font-semibold">{formatCurrency(totalRecebiveis)}</span>
          </p>
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
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data do Evento</th>
              <th className="text-right px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor Total</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Parcelas</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {contratos.map((c) => (
              <tr key={c.id} className="border-b border-dark-border/50 hover:bg-dark-surface/30 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-200">{c.cliente}</p>
                  <p className="text-xs text-slate-500">{c.tipo}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-400">{c.data}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-sm font-medium text-gold">{formatCurrency(c.valor)}</p>
                </td>
                <td className="px-6 py-4">
                  <ParcelasBar pagas={c.parcelasPagas} total={c.parcelasTotal} />
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
