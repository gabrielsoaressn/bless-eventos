import {
  TrendingUp,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  BrainCircuit,
  Filter as FilterIcon,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { kpis, forecastData, funilVendas, adocaoServicos, insightIA } from '../data/mockData'

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function ForecastTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card border border-dark-border shadow-xl rounded-lg px-4 py-3">
        <p className="text-xs font-medium text-slate-400 mb-1">{label}</p>
        {payload.map((entry) => (
          <p key={entry.dataKey} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function FunnelTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card border border-dark-border shadow-xl rounded-lg px-4 py-3">
        <p className="text-xs text-slate-400">{payload[0].payload.etapa}</p>
        <p className="text-sm font-bold text-gold">{payload[0].value}</p>
      </div>
    )
  }
  return null
}

function AdoptionTooltip({ active, payload }) {
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
  const taxaConversao = ((funilVendas[2].valor / funilVendas[0].valor) * 100).toFixed(1)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Executivo</h2>
          <p className="text-slate-500 text-sm mt-1">Bless Eventos - Visao consolidada de performance</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-dark-card border border-dark-border rounded-lg px-3 py-2">
          <FilterIcon size={14} />
          Periodo: Mar 2026 - Ago 2026
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
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

        {/* Ocupacao */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-5 hover:border-gold/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Ocupacao Agenda 2026</p>
            <div className="bg-gold/10 p-1.5 rounded-lg">
              <CalendarCheck size={16} className="text-gold" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{kpis.ocupacao.valor}%</p>
          <div className="w-full bg-dark-border rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-gold to-gold-dark h-2 rounded-full transition-all"
              style={{ width: `${kpis.ocupacao.valor}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">{kpis.ocupacao.label}</p>
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
              -1.2%
            </span>
            <span className="inline-block px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold rounded-full uppercase tracking-wider">
              {kpis.inadimplencia.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Forecast Area Chart */}
        <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">Previsao de Recebiveis</h3>
              <p className="text-xs text-slate-500 mt-0.5">Projecao baseada em parcelas de contratos fechados</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gold">R$ 131.500</p>
              <p className="text-[10px] text-slate-500 uppercase">Total projetado 6m</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={{ stroke: '#2a2d3a' }} />
              <YAxis
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                axisLine={{ stroke: '#2a2d3a' }}
              />
              <Tooltip content={<ForecastTooltip />} />
              <Area
                type="monotone"
                dataKey="recebivel"
                name="Projetado"
                stroke="#c9a84c"
                strokeWidth={2}
                fill="url(#goldGradient)"
                dot={{ fill: '#c9a84c', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, stroke: '#c9a84c', strokeWidth: 2, fill: '#1a1d28' }}
              />
              <Area
                type="monotone"
                dataKey="realizado"
                name="Realizado"
                stroke="#34d399"
                strokeWidth={2}
                fill="url(#greenGradient)"
                dot={{ fill: '#34d399', strokeWidth: 0, r: 4 }}
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-3 px-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-gold rounded" />
              <span className="text-[11px] text-slate-500">Projetado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-emerald-400 rounded" />
              <span className="text-[11px] text-slate-500">Realizado</span>
            </div>
          </div>
        </div>

        {/* Funil de Vendas */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <h3 className="text-base font-semibold text-white mb-1">Funil de Vendas</h3>
          <p className="text-xs text-slate-500 mb-6">Conversao: Lead &rarr; Contrato</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={funilVendas} layout="vertical" barSize={28}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="etapa"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                width={130}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<FunnelTooltip />} />
              <Bar dataKey="valor" radius={[0, 6, 6, 0]}>
                {funilVendas.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 pt-4 border-t border-dark-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Taxa de Conversao</span>
              <span className="text-sm font-bold text-gold">{taxaConversao}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Orcamento &rarr; Contrato</span>
              <span className="text-sm font-bold text-white">
                {((funilVendas[2].valor / funilVendas[1].valor) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Adocao de Servicos */}
        <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">Adocao de Servicos Extras</h3>
              <p className="text-xs text-slate-500 mt-0.5">% de contratos que mantem cada servico</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={adocaoServicos} layout="vertical" barSize={20}>
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
              <Tooltip content={<AdoptionTooltip />} />
              <Bar dataKey="percentual" radius={[0, 6, 6, 0]}>
                {adocaoServicos.map((entry, i) => (
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
              <span className="text-[11px] text-slate-500">&ge; 70% adocao</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gold-dark rounded-sm" />
              <span className="text-[11px] text-slate-500">50-69%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm" />
              <span className="text-[11px] text-slate-500">&lt; 50% - atencao</span>
            </div>
          </div>
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

            <div className="space-y-3">
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
          </div>

          <div className="mt-4 pt-3 border-t border-dark-border">
            <p className="text-[10px] text-slate-600">{insightIA.baseAnalise}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
