import {
  DollarSign,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  BrainCircuit,
  Sparkles,
  Filter as FilterIcon,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { kpis, forecastData, servicosAdquiridos, insightIA } from '../data/mockData'

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function ChartTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card border border-dark-border shadow-xl rounded-lg px-4 py-3">
        <p className="text-xs font-medium text-slate-400 mb-1">{label}</p>
        <p className="text-sm font-bold text-gold">{formatCurrency(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

function ServiceTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card border border-dark-border shadow-xl rounded-lg px-4 py-3">
        <p className="text-xs text-slate-400">{payload[0].payload.servico}</p>
        <p className="text-sm font-bold text-gold">{payload[0].value}% dos contratos</p>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Executivo</h2>
          <p className="text-slate-500 text-sm mt-1">Bless Eventos - Controle financeiro e operacional</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-dark-card border border-dark-border rounded-lg px-3 py-2">
          <FilterIcon size={14} />
          Periodo: Mar 2026 - Ago 2026
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Faturamento */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-gold/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Faturamento Esperado</p>
            <div className="bg-gold/10 p-1.5 rounded-lg">
              <DollarSign size={16} className="text-gold" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(kpis.faturamentoMes.valor)}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-400">
              <ArrowUpRight size={14} />
              {kpis.faturamentoMes.delta}
            </span>
            <span className="text-xs text-slate-500">{kpis.faturamentoMes.periodo}</span>
          </div>
        </div>

        {/* Ticket Medio */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-gold/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Ticket Medio</p>
            <div className="bg-gold/10 p-1.5 rounded-lg">
              <TrendingUp size={16} className="text-gold" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(kpis.ticketMedio.valor)}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-400">
              <ArrowUpRight size={14} />
              {kpis.ticketMedio.delta}
            </span>
            <span className="text-xs text-slate-500">{kpis.ticketMedio.periodo}</span>
          </div>
        </div>

        {/* Inadimplencia */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-gold/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Inadimplencia</p>
            <div className="bg-emerald-500/10 p-1.5 rounded-lg">
              <ShieldCheck size={16} className="text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{kpis.inadimplencia.valor}%</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-400">
              <ArrowDownRight size={14} />
              {kpis.inadimplencia.delta}
            </span>
            <span className="inline-block px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold rounded-full uppercase tracking-wider">
              {kpis.inadimplencia.status}
            </span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Previsao de Recebiveis */}
        <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">Previsao de Recebiveis</h3>
              <p className="text-xs text-slate-500 mt-0.5">Valor a receber baseado em parcelas de contratos fechados</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gold">R$ 131.500</p>
              <p className="text-[10px] text-slate-500 uppercase">Total projetado 6m</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={forecastData} barSize={36}>
              <defs>
                <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c9a84c" stopOpacity={1} />
                  <stop offset="100%" stopColor="#8b6f1e" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={{ stroke: '#2a2d3a' }} />
              <YAxis
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                axisLine={{ stroke: '#2a2d3a' }}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="valor" fill="url(#barGold)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Insights IA */}
        <div className="bg-gradient-to-br from-dark-card to-dark-surface border border-gold/20 rounded-xl p-6 flex flex-col">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="bg-gradient-to-br from-gold to-gold-dark p-2 rounded-lg">
              <BrainCircuit size={18} className="text-dark" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Insights da IA</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Analise Preditiva</p>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Sparkles size={14} className="text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-400 mb-1">{insightIA.titulo}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{insightIA.mensagem}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-slate-500">Confianca da analise</span>
                <span className="text-xs font-bold text-gold">{insightIA.confianca}%</span>
              </div>
              <div className="w-full bg-dark-border rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-gold to-gold-dark h-1.5 rounded-full"
                  style={{ width: `${insightIA.confianca}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] px-2 py-1 bg-gold/10 text-gold rounded-full font-medium">
                <ArrowUpRight size={10} />
                Acao recomendada
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dark-border">
            <p className="text-[10px] text-slate-600">{insightIA.baseAnalise}</p>
          </div>
        </div>
      </div>

      {/* Servicos Adquiridos */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-white">Servicos Adquiridos</h3>
          <p className="text-xs text-slate-500 mt-0.5">Frequencia dos itens nos contratos fechados</p>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={servicosAdquiridos} layout="vertical" barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 100]}
              axisLine={{ stroke: '#2a2d3a' }}
            />
            <YAxis
              type="category"
              dataKey="servico"
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              width={140}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ServiceTooltip />} />
            <Bar dataKey="percentual" radius={[0, 6, 6, 0]}>
              {servicosAdquiridos.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.percentual >= 70 ? '#c9a84c' : entry.percentual >= 50 ? '#a8872e' : '#ef4444'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-5 mt-3 px-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gold rounded-sm" />
            <span className="text-[11px] text-slate-500">&ge; 70%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gold-dark rounded-sm" />
            <span className="text-[11px] text-slate-500">50-69%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm" />
            <span className="text-[11px] text-slate-500">&lt; 50%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
