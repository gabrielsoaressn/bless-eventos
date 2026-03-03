import { DollarSign, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { dashboardCards, forecastData, insightIA } from '../data/mockData'

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const cards = [
  {
    title: 'Receita Esperada no Mês',
    value: formatCurrency(dashboardCards.receitaMes),
    icon: DollarSign,
    color: 'bg-emerald-500',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
  },
  {
    title: 'Inadimplência',
    value: `${dashboardCards.inadimplencia}%`,
    icon: AlertTriangle,
    color: 'bg-amber-500',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-700',
  },
  {
    title: 'Ticket Médio',
    value: formatCurrency(dashboardCards.ticketMedio),
    icon: TrendingUp,
    color: 'bg-blue-500',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
]

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg px-4 py-3 border border-slate-100">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-sm text-primary font-semibold">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        <p className="text-slate-500 text-sm mt-1">Visão geral do negócio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <div className={`${card.bgLight} p-2 rounded-lg`}>
                <card.icon size={20} className={card.textColor} />
              </div>
            </div>
            <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Recebíveis - Forecast</h3>
          <p className="text-sm text-slate-400 mb-6">Próximos 6 meses</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={forecastData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 13, fill: '#64748b' }} />
              <YAxis
                tick={{ fontSize: 13, fill: '#64748b' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="valor" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-sm border border-indigo-100 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-primary p-2 rounded-lg">
              <Sparkles size={20} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Insights da IA</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed flex-1">{insightIA}</p>
          <div className="mt-4 pt-4 border-t border-indigo-100">
            <p className="text-xs text-slate-400">Gerado automaticamente com base nos últimos 30 contratos</p>
          </div>
        </div>
      </div>
    </div>
  )
}
