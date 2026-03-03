import { useState, useMemo } from 'react'
import { Check, Users, CreditCard, FileCheck } from 'lucide-react'
import { pacoteItens } from '../data/mockData'

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function NovoContrato() {
  const [convidados, setConvidados] = useState(120)
  const [cliente, setCliente] = useState('')
  const [dataEvento, setDataEvento] = useState('')
  const [tipoEvento, setTipoEvento] = useState('Casamento')
  const [itensSelecionados, setItensSelecionados] = useState(
    pacoteItens.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
  )
  const [valorSinal, setValorSinal] = useState(2000)
  const [parcelas, setParcelas] = useState(9)
  const [contratoGerado, setContratoGerado] = useState(false)

  const valorTotal = useMemo(() => {
    const custoPorConvidado = 45
    const baseConvidados = convidados * custoPorConvidado
    const custoItens = pacoteItens.reduce((total, item) => {
      return total + (itensSelecionados[item.id] ? item.valor : 0)
    }, 0)
    return baseConvidados + custoItens
  }, [convidados, itensSelecionados])

  const valorRestante = valorTotal - valorSinal
  const valorParcela = parcelas > 0 ? valorRestante / parcelas : 0

  function toggleItem(id) {
    setItensSelecionados((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function handleGerarContrato() {
    setContratoGerado(true)
    setTimeout(() => setContratoGerado(false), 4000)
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Novo Contrato</h2>
        <p className="text-slate-500 text-sm mt-1">Monte o orçamento do evento</p>
      </div>

      {/* Dados do Cliente */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Users size={18} className="text-primary" />
          Dados do Evento
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Nome do Cliente</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Ex: Gabriel Soares"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Tipo do Evento</label>
            <select
              value={tipoEvento}
              onChange={(e) => setTipoEvento(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            >
              <option>Casamento</option>
              <option>Aniversário</option>
              <option>Aniversário 15 anos</option>
              <option>Formatura</option>
              <option>Bodas de Ouro</option>
              <option>Corporativo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Data do Evento</label>
            <input
              type="date"
              value={dataEvento}
              onChange={(e) => setDataEvento(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Número de Convidados</label>
            <input
              type="number"
              min={10}
              max={500}
              value={convidados}
              onChange={(e) => setConvidados(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </section>

      {/* Customização do Pacote */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <h3 className="text-base font-semibold text-slate-800 mb-1 flex items-center gap-2">
          <Check size={18} className="text-primary" />
          Customização do Pacote
        </h3>
        <p className="text-xs text-slate-400 mb-4">Desmarque itens para removê-los do orçamento</p>

        <div className="space-y-3">
          {pacoteItens.map((item) => {
            const checked = itensSelecionados[item.id]
            return (
              <label
                key={item.id}
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                  checked
                    ? 'border-primary/30 bg-indigo-50/50'
                    : 'border-slate-200 bg-slate-50/50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleItem(item.id)}
                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-[#6366f1]"
                  />
                  <div>
                    <p className={`text-sm font-medium ${checked ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                      {item.nome}
                    </p>
                    <p className="text-xs text-slate-400">{item.descricao}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${checked ? 'text-primary' : 'text-slate-400'}`}>
                  {formatCurrency(item.valor)}
                </span>
              </label>
            )
          })}
        </div>
      </section>

      {/* Resumo + Pagamento */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <CreditCard size={18} className="text-primary" />
          Forma de Pagamento
        </h3>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6 border border-indigo-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">Valor Total do Evento</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(valorTotal)}</p>
          </div>
          <p className="text-xs text-slate-400 mt-1">{convidados} convidados x R$ 45,00 + itens selecionados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Valor do Sinal</label>
            <input
              type="number"
              min={0}
              value={valorSinal}
              onChange={(e) => setValorSinal(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Número de Parcelas</label>
            <select
              value={parcelas}
              onChange={(e) => setParcelas(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                <option key={n} value={n}>{n}x</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Sinal:</span>
            <span className="font-medium text-slate-700">{formatCurrency(valorSinal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-slate-500">Restante:</span>
            <span className="font-medium text-slate-700">{formatCurrency(Math.max(0, valorRestante))}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-slate-200">
            <span className="text-slate-500">Parcelas:</span>
            <span className="font-semibold text-primary">
              {parcelas}x de {formatCurrency(Math.max(0, valorParcela))}
            </span>
          </div>
        </div>
      </section>

      {/* Botão Gerar Contrato */}
      <button
        onClick={handleGerarContrato}
        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 px-6 rounded-xl transition-colors shadow-lg shadow-primary/25"
      >
        <FileCheck size={20} />
        Gerar Contrato (Simulação)
      </button>

      {contratoGerado && (
        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium text-center animate-pulse">
          Contrato gerado com sucesso! (Simulação)
        </div>
      )}
    </div>
  )
}
