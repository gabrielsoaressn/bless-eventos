import {
  DollarSign,
  TrendingUp,
  Ticket,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  BrainCircuit,
  Sparkles,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts'
import {
  kpis,
  fluxoCaixaData,
  performanceTipoData,
  servicosAdquiridos,
  insightIA,
} from '../data/mockData'

function fmt(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function TipFluxo({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg px-4 py-3 border border-gray-100">
        <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
        {payload.map((e) => (
          <p key={e.dataKey} className="text-sm font-semibold" style={{ color: e.color }}>
            {e.name}: {fmt(e.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function TipPerformance({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg px-4 py-3 border border-gray-100">
        <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
        {payload.map((e) => (
          <p key={e.dataKey} className="text-sm font-semibold" style={{ color: e.color }}>
            {e.name}: {e.dataKey === 'faturamento' ? fmt(e.value) : e.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

function TipServico({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg px-4 py-3 border border-gray-100">
        <p className="text-xs text-gray-500">{payload[0].payload.servico}</p>
        <p className="text-sm font-bold" style={{ color: '#D4AF37' }}>{payload[0].value}% dos contratos</p>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard BI</h2>
        <p className="text-gray-500 text-sm mt-1">Visao executiva - Bless Eventos</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {/* Faturamento */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Faturamento Esperado</p>
            <div className="bg-emerald-50 p-1.5 rounded-lg">
              <DollarSign size={16} className="text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{fmt(kpis.faturamentoMes.valor)}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
              <ArrowUpRight size={14} />
              {kpis.faturamentoMes.delta}
            </span>
            <span className="text-xs text-gray-400">{kpis.faturamentoMes.periodo}</span>
          </div>
        </div>

        {/* Ticket Medio */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ticket Medio</p>
            <div className="bg-blue-50 p-1.5 rounded-lg">
              <TrendingUp size={16} className="text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{fmt(kpis.ticketMedio.valor)}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
              <ArrowUpRight size={14} />
              {kpis.ticketMedio.delta}
            </span>
            <span className="text-xs text-gray-400">{kpis.ticketMedio.periodo}</span>
          </div>
        </div>

        {/* Receita Extras */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Receita de Extras</p>
            <div className="bg-amber-50 p-1.5 rounded-lg">
              <Ticket size={16} className="text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{fmt(kpis.receitaExtras.valor)}</p>
          <p className="text-xs text-gray-400 mt-2">
            {kpis.receitaExtras.senhasExtras} senhas (R$ {kpis.receitaExtras.precoPorSenha}/un) + {kpis.receitaExtras.horasExcedentes}h excedentes
          </p>
        </div>

        {/* Inadimplencia */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Inadimplencia</p>
            <div className="bg-emerald-50 p-1.5 rounded-lg">
              <ShieldCheck size={16} className="text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800">{kpis.inadimplencia.valor}%</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
              <ArrowDownRight size={14} />
              {kpis.inadimplencia.delta}
            </span>
            <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-full uppercase">
              {kpis.inadimplencia.status}
            </span>
          </div>
        </div>
      </div>

      {/* Fluxo de Caixa + IA Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-1">Fluxo de Caixa e Previsao</h3>
          <p className="text-xs text-gray-400 mb-6">Realizado (6 meses) + Forecast de recebiveis</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={fluxoCaixaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={{ stroke: '#e5e7eb' }} />
              <YAxis
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip content={<TipFluxo />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, color: '#6b7280' }}
              />
              <Line
                type="monotone"
                dataKey="realizado"
                name="Realizado"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ fill: '#10b981', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="previsao"
                name="Previsao"
                stroke="#D4AF37"
                strokeWidth={2.5}
                strokeDasharray="6 3"
                dot={{ fill: '#D4AF37', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, stroke: '#D4AF37', strokeWidth: 2, fill: '#fff' }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insights IA */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="bg-gradient-to-br from-gold to-gold-dark p-2 rounded-lg">
              <BrainCircuit size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">Insights da IA</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Analise Automatizada</p>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <Sparkles size={14} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-700 mb-1">{insightIA.titulo}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{insightIA.mensagem}</p>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-gray-400">Confianca</span>
                <span className="text-xs font-bold text-gold-dark">{insightIA.confianca}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-gold to-gold-dark h-1.5 rounded-full"
                  style={{ width: `${insightIA.confianca}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <p className="text-[10px] text-gray-400">{insightIA.baseAnalise}</p>
          </div>
        </div>
      </div>

      {/* Performance por Tipo + Servicos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Performance por Tipo de Evento */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-1">Performance por Tipo de Evento</h3>
          <p className="text-xs text-gray-400 mb-6">Volume de eventos vs. faturamento total</p>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={performanceTipoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="tipo" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={{ stroke: '#e5e7eb' }} />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={{ stroke: '#e5e7eb' }}
                label={{ value: 'Eventos', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#9ca3af' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                axisLine={{ stroke: '#e5e7eb' }}
                label={{ value: 'Faturamento', angle: 90, position: 'insideRight', fontSize: 10, fill: '#9ca3af' }}
              />
              <Tooltip content={<TipPerformance />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, color: '#6b7280' }}
              />
              <Bar yAxisId="left" dataKey="eventos" name="Eventos" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
              <Bar yAxisId="right" dataKey="faturamento" name="Faturamento" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={32} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Servicos Adquiridos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-1">Servicos Adquiridos</h3>
          <p className="text-xs text-gray-400 mb-6">Frequencia nos contratos fechados</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={servicosAdquiridos} layout="vertical" barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickFormatter={(v) => `${v}%`}
                domain={[0, 100]}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                type="category"
                dataKey="servico"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                width={130}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<TipServico />} />
              <Bar dataKey="percentual" radius={[0, 6, 6, 0]}>
                {servicosAdquiridos.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.percentual >= 70 ? '#D4AF37' : entry.percentual >= 50 ? '#B8960C' : '#ef4444'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#D4AF37' }} />
              <span className="text-[11px] text-gray-400">&ge; 70%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#B8960C' }} />
              <span className="text-[11px] text-gray-400">50-69%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm" />
              <span className="text-[11px] text-gray-400">&lt; 50%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
