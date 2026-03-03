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

  const inputClass = "w-full px-3 py-2 border border-dark-border rounded-lg text-sm bg-dark-surface text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/40"

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Novo Contrato</h2>
        <p className="text-slate-500 text-sm mt-1">Monte o orcamento do evento</p>
      </div>

      {/* Dados do Cliente */}
      <section className="bg-dark-card rounded-xl border border-dark-border p-6 mb-6">
        <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <Users size={18} className="text-gold" />
          Dados do Evento
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Nome do Cliente</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Ex: Gabriel Soares"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Tipo do Evento</label>
            <select
              value={tipoEvento}
              onChange={(e) => setTipoEvento(e.target.value)}
              className={inputClass}
            >
              <option>Casamento</option>
              <option>Aniversario</option>
              <option>Aniversario 15 anos</option>
              <option>Formatura</option>
              <option>Bodas de Ouro</option>
              <option>Corporativo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Data do Evento</label>
            <input
              type="date"
              value={dataEvento}
              onChange={(e) => setDataEvento(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Numero de Convidados</label>
            <input
              type="number"
              min={10}
              max={500}
              value={convidados}
              onChange={(e) => setConvidados(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Customizacao do Pacote */}
      <section className="bg-dark-card rounded-xl border border-dark-border p-6 mb-6">
        <h3 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
          <Check size={18} className="text-gold" />
          Customizacao do Pacote
        </h3>
        <p className="text-xs text-slate-500 mb-4">Desmarque itens para remove-los do orcamento</p>

        <div className="space-y-3">
          {pacoteItens.map((item) => {
            const checked = itensSelecionados[item.id]
            return (
              <label
                key={item.id}
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                  checked
                    ? 'border-gold/30 bg-gold/5'
                    : 'border-dark-border bg-dark-surface/50 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleItem(item.id)}
                    className="w-4 h-4 rounded border-slate-600 accent-[#c9a84c]"
                  />
                  <div>
                    <p className={`text-sm font-medium ${checked ? 'text-slate-200' : 'text-slate-500 line-through'}`}>
                      {item.nome}
                    </p>
                    <p className="text-xs text-slate-500">{item.descricao}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${checked ? 'text-gold' : 'text-slate-600'}`}>
                  {formatCurrency(item.valor)}
                </span>
              </label>
            )
          })}
        </div>
      </section>

      {/* Resumo + Pagamento */}
      <section className="bg-dark-card rounded-xl border border-dark-border p-6 mb-6">
        <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <CreditCard size={18} className="text-gold" />
          Forma de Pagamento
        </h3>

        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-lg p-4 mb-6 border border-gold/20">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Valor Total do Evento</p>
            <p className="text-2xl font-bold text-gold">{formatCurrency(valorTotal)}</p>
          </div>
          <p className="text-xs text-slate-500 mt-1">{convidados} convidados x R$ 45,00 + itens selecionados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Valor do Sinal</label>
            <input
              type="number"
              min={0}
              value={valorSinal}
              onChange={(e) => setValorSinal(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Numero de Parcelas</label>
            <select
              value={parcelas}
              onChange={(e) => setParcelas(Number(e.target.value))}
              className={inputClass}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                <option key={n} value={n}>{n}x</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Sinal:</span>
            <span className="font-medium text-slate-300">{formatCurrency(valorSinal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-slate-500">Restante:</span>
            <span className="font-medium text-slate-300">{formatCurrency(Math.max(0, valorRestante))}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-dark-border">
            <span className="text-slate-500">Parcelas:</span>
            <span className="font-semibold text-gold">
              {parcelas}x de {formatCurrency(Math.max(0, valorParcela))}
            </span>
          </div>
        </div>
      </section>

      {/* Botao Gerar Contrato */}
      <button
        onClick={handleGerarContrato}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-dark font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-gold/20"
      >
        <FileCheck size={20} />
        Gerar Contrato (Simulacao)
      </button>

      {contratoGerado && (
        <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-medium text-center animate-pulse">
          Contrato gerado com sucesso! (Simulacao)
        </div>
      )}
    </div>
  )
}
