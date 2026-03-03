import { useState, useMemo } from 'react'
import { Check, Users, CreditCard, FileCheck, Percent, DollarSign, Crown } from 'lucide-react'
import { pacoteItens } from '../data/mockData'

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function today() {
  return new Date().toLocaleDateString('pt-BR')
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
  const [desconto, setDesconto] = useState(0)
  const [descontoTipo, setDescontoTipo] = useState('percentual')
  const [contratoGerado, setContratoGerado] = useState(false)

  const valorBruto = useMemo(() => {
    const custoPorConvidado = 45
    const baseConvidados = convidados * custoPorConvidado
    const custoItens = pacoteItens.reduce((total, item) => {
      return total + (itensSelecionados[item.id] ? item.valor : 0)
    }, 0)
    return baseConvidados + custoItens
  }, [convidados, itensSelecionados])

  const valorDesconto = useMemo(() => {
    if (descontoTipo === 'percentual') {
      return valorBruto * (desconto / 100)
    }
    return desconto
  }, [valorBruto, desconto, descontoTipo])

  const valorTotal = Math.max(0, valorBruto - valorDesconto)
  const valorRestante = Math.max(0, valorTotal - valorSinal)
  const valorParcela = parcelas > 0 ? valorRestante / parcelas : 0

  const itensInclusos = pacoteItens.filter((item) => itensSelecionados[item.id])
  const itensExcluidos = pacoteItens.filter((item) => !itensSelecionados[item.id])

  function toggleItem(id) {
    setItensSelecionados((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function handleGerarContrato() {
    setContratoGerado(true)
    setTimeout(() => setContratoGerado(false), 4000)
  }

  const inputClass = "w-full px-3 py-2 border border-dark-border rounded-lg text-sm bg-dark-surface text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/40"

  function formatDataEvento() {
    if (!dataEvento) return '___/___/______'
    const [y, m, d] = dataEvento.split('-')
    return `${d}/${m}/${y}`
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* COLUNA ESQUERDA - Formulario */}
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-white">Novo Contrato</h2>
          <p className="text-slate-500 text-sm mt-1">Monte o orcamento e visualize o contrato em tempo real</p>
        </div>

        {/* Dados do Evento */}
        <section className="bg-dark-card rounded-xl border border-dark-border p-5">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Users size={16} className="text-gold" />
            Dados do Evento
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Cliente</label>
              <input
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                placeholder="Nome completo"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Tipo</label>
              <select value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)} className={inputClass}>
                <option>Casamento</option>
                <option>Aniversario</option>
                <option>Aniversario 15 anos</option>
                <option>Formatura</option>
                <option>Bodas de Ouro</option>
                <option>Corporativo</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Data do Evento</label>
              <input type="date" value={dataEvento} onChange={(e) => setDataEvento(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Convidados</label>
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

        {/* Servicos */}
        <section className="bg-dark-card rounded-xl border border-dark-border p-5">
          <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
            <Check size={16} className="text-gold" />
            Servicos Adquiridos
          </h3>
          <p className="text-[11px] text-slate-500 mb-3">Desmarque para remover do orcamento</p>

          <div className="space-y-2">
            {pacoteItens.map((item) => {
              const checked = itensSelecionados[item.id]
              return (
                <label
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    checked ? 'border-gold/30 bg-gold/5' : 'border-dark-border bg-dark-surface/50 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleItem(item.id)}
                      className="w-3.5 h-3.5 rounded accent-[#c9a84c]"
                    />
                    <div>
                      <p className={`text-sm font-medium ${checked ? 'text-slate-200' : 'text-slate-500 line-through'}`}>
                        {item.nome}
                      </p>
                      <p className="text-[11px] text-slate-500">{item.descricao}</p>
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

        {/* Financeiro */}
        <section className="bg-dark-card rounded-xl border border-dark-border p-5">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <CreditCard size={16} className="text-gold" />
            Financeiro
          </h3>

          {/* Valor Bruto */}
          <div className="bg-dark-surface rounded-lg p-3 mb-4 border border-dark-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Valor bruto</span>
              <span className="text-sm font-medium text-slate-300">{formatCurrency(valorBruto)}</span>
            </div>
          </div>

          {/* Desconto */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-500 mb-1">Desconto</label>
            <div className="flex gap-2">
              <div className="flex rounded-lg border border-dark-border overflow-hidden">
                <button
                  onClick={() => setDescontoTipo('percentual')}
                  className={`px-3 py-2 text-xs font-medium transition-colors ${
                    descontoTipo === 'percentual'
                      ? 'bg-gold/20 text-gold'
                      : 'bg-dark-surface text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Percent size={14} />
                </button>
                <button
                  onClick={() => setDescontoTipo('fixo')}
                  className={`px-3 py-2 text-xs font-medium transition-colors ${
                    descontoTipo === 'fixo'
                      ? 'bg-gold/20 text-gold'
                      : 'bg-dark-surface text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <DollarSign size={14} />
                </button>
              </div>
              <input
                type="number"
                min={0}
                value={desconto}
                onChange={(e) => setDesconto(Number(e.target.value))}
                placeholder={descontoTipo === 'percentual' ? 'Ex: 10' : 'Ex: 1500'}
                className={`${inputClass} flex-1`}
              />
            </div>
            {valorDesconto > 0 && (
              <p className="text-[11px] text-emerald-400 mt-1">
                Desconto de {formatCurrency(valorDesconto)} aplicado
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Valor do Sinal</label>
              <input
                type="number"
                min={0}
                value={valorSinal}
                onChange={(e) => setValorSinal(Number(e.target.value))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Parcelas</label>
              <select value={parcelas} onChange={(e) => setParcelas(Number(e.target.value))} className={inputClass}>
                {Array.from({ length: 18 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}x</option>
                ))}
              </select>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-lg p-4 border border-gold/20 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Valor total</span>
              <span className="font-bold text-gold text-lg">{formatCurrency(valorTotal)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Sinal</span>
              <span className="text-slate-300">{formatCurrency(valorSinal)}</span>
            </div>
            <div className="flex justify-between text-xs pt-1 border-t border-gold/10">
              <span className="text-slate-500">Restante</span>
              <span className="text-gold font-semibold">
                {parcelas}x de {formatCurrency(Math.max(0, valorParcela))}
              </span>
            </div>
          </div>
        </section>

        <button
          onClick={handleGerarContrato}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-dark font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-gold/20"
        >
          <FileCheck size={20} />
          Gerar Contrato (Simulacao)
        </button>

        {contratoGerado && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-medium text-center animate-pulse">
            Contrato gerado com sucesso! (Simulacao)
          </div>
        )}
      </div>

      {/* COLUNA DIREITA - Preview do Contrato */}
      <div className="xl:sticky xl:top-8 xl:self-start">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-medium">Previa do Contrato</p>
        <div className="bg-white rounded-xl shadow-2xl shadow-black/40 p-10 text-slate-800 min-h-[700px] border border-slate-200">
          {/* Header do contrato */}
          <div className="text-center mb-8 pb-6 border-b-2 border-gold">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown size={24} className="text-gold" />
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">BLESS EVENTOS</h3>
            </div>
            <p className="text-[11px] text-slate-400 uppercase tracking-[0.2em]">Contrato de Prestacao de Servicos</p>
          </div>

          {/* Corpo */}
          <div className="space-y-5 text-[13px] leading-relaxed text-slate-700">
            <p>
              Pelo presente instrumento particular, a empresa <strong className="text-slate-900">BLESS EVENTOS LTDA</strong>,
              doravante denominada <strong>CONTRATADA</strong>, e o(a) Sr(a).{' '}
              <strong className="text-slate-900 underline decoration-gold/40 decoration-2 underline-offset-2">
                {cliente || '________________________'}
              </strong>
              , doravante denominado(a) <strong>CONTRATANTE</strong>, celebram o presente contrato.
            </p>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Dados do Evento</p>
              <div className="grid grid-cols-2 gap-y-1.5 text-sm">
                <span className="text-slate-500">Tipo:</span>
                <span className="font-medium text-slate-800">{tipoEvento}</span>
                <span className="text-slate-500">Data:</span>
                <span className="font-medium text-slate-800">{formatDataEvento()}</span>
                <span className="text-slate-500">Convidados:</span>
                <span className="font-medium text-slate-800">{convidados} pessoas</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Clausula 1 - Valor</p>
              <p>
                O valor total dos servicos prestados sera de{' '}
                <strong className="text-slate-900">{formatCurrency(valorTotal)}</strong>
                {valorDesconto > 0 && (
                  <span className="text-emerald-600">
                    {' '}(aplicado desconto de {descontoTipo === 'percentual' ? `${desconto}%` : formatCurrency(desconto)}
                    {' '}- economia de {formatCurrency(valorDesconto)})
                  </span>
                )}.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Clausula 2 - Pagamento</p>
              <p>
                O pagamento sera realizado com um sinal de{' '}
                <strong className="text-slate-900">{formatCurrency(valorSinal)}</strong> e o
                restante dividido em <strong className="text-slate-900">{parcelas} parcela{parcelas > 1 ? 's' : ''}</strong> de{' '}
                <strong className="text-slate-900">{formatCurrency(Math.max(0, valorParcela))}</strong>.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Clausula 3 - Servicos</p>

              {itensInclusos.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-slate-500 mb-1.5">Servicos inclusos:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {itensInclusos.map((item) => (
                      <span key={item.id} className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-md border border-emerald-200">
                        {item.nome}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {itensExcluidos.length > 0 && (
                <div>
                  <p className="text-xs text-slate-500 mb-1.5">Servicos nao inclusos:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {itensExcluidos.map((item) => (
                      <span key={item.id} className="inline-block px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-md border border-red-200 line-through">
                        {item.nome}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Clausula 4 - Disposicoes</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                O presente contrato e regido pelas leis vigentes no territorio nacional. Qualquer alteracao
                devera ser formalizada por aditivo contratual assinado por ambas as partes.
              </p>
            </div>

            {/* Assinaturas */}
            <div className="pt-8 mt-6 grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="border-t border-slate-300 pt-2">
                  <p className="text-xs text-slate-500">CONTRATADA</p>
                  <p className="text-xs font-medium text-slate-700">Bless Eventos Ltda</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-slate-300 pt-2">
                  <p className="text-xs text-slate-500">CONTRATANTE</p>
                  <p className="text-xs font-medium text-slate-700">{cliente || '________________________'}</p>
                </div>
              </div>
            </div>

            <p className="text-center text-[10px] text-slate-400 mt-4">
              Documento gerado em {today()} &middot; Bless Eventos
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
