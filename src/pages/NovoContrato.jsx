import { useState, useMemo } from 'react'
import { Check, Users, CreditCard, Mail, Percent, DollarSign, Crown, Send, CheckCircle2 } from 'lucide-react'
import { pacoteItens } from '../data/mockData'

function fmt(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function today() {
  return new Date().toLocaleDateString('pt-BR')
}

export default function NovoContrato() {
  const [convidados, setConvidados] = useState(120)
  const [cliente, setCliente] = useState('')
  const [email, setEmail] = useState('')
  const [dataEvento, setDataEvento] = useState('')
  const [tipoEvento, setTipoEvento] = useState('Casamento')
  const [itensSelecionados, setItensSelecionados] = useState(
    pacoteItens.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
  )
  const [valorSinal, setValorSinal] = useState(2000)
  const [parcelas, setParcelas] = useState(9)
  const [desconto, setDesconto] = useState(0)
  const [descontoTipo, setDescontoTipo] = useState('percentual')
  const [toast, setToast] = useState(false)

  const valorBruto = useMemo(() => {
    const custoPorConvidado = 45
    const baseConvidados = convidados * custoPorConvidado
    const custoItens = pacoteItens.reduce((total, item) => {
      return total + (itensSelecionados[item.id] ? item.valor : 0)
    }, 0)
    return baseConvidados + custoItens
  }, [convidados, itensSelecionados])

  const valorDesconto = useMemo(() => {
    if (descontoTipo === 'percentual') return valorBruto * (desconto / 100)
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

  function handleEnviar() {
    setToast(true)
    setTimeout(() => setToast(false), 5000)
  }

  function formatDataEvento() {
    if (!dataEvento) return '___/___/______'
    const [y, m, d] = dataEvento.split('-')
    return `${d}/${m}/${y}`
  }

  const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/50"

  return (
    <div className="relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-white border border-emerald-200 shadow-xl rounded-xl p-4 flex items-start gap-3 max-w-sm animate-[slideIn_0.3s_ease-out]">
          <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Contrato enviado com sucesso!</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Enviado para <strong>{email || 'email do cliente'}</strong>.
              <br />Status: <span className="text-amber-600 font-medium">Aguardando Assinatura</span>
            </p>
          </div>
          <button onClick={() => setToast(false)} className="text-gray-300 hover:text-gray-500 text-lg leading-none">&times;</button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* COLUNA ESQUERDA */}
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Novo Contrato</h2>
            <p className="text-gray-500 text-sm mt-1">Preencha os dados e visualize o contrato em tempo real</p>
          </div>

          {/* Dados do Evento */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users size={16} style={{ color: '#D4AF37' }} />
              Dados do Evento
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  placeholder="Nome completo"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Email do Cliente <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                    className={`${inputClass} pl-9`}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Tipo de Evento</label>
                <select value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)} className={inputClass}>
                  <option>Casamento</option>
                  <option>15 Anos</option>
                  <option>Formatura</option>
                  <option>Corporativo</option>
                  <option>Bodas de Ouro</option>
                  <option>Aniversario</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Data do Evento</label>
                <input type="date" value={dataEvento} onChange={(e) => setDataEvento(e.target.value)} className={inputClass} />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Numero de Convidados</label>
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
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
              <Check size={16} style={{ color: '#D4AF37' }} />
              Servicos Adquiridos
            </h3>
            <p className="text-[11px] text-gray-400 mb-3">Desmarque para remover do orcamento</p>

            <div className="space-y-2">
              {pacoteItens.map((item) => {
                const checked = itensSelecionados[item.id]
                return (
                  <label
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      checked ? 'border-gold/30 bg-amber-50/40' : 'border-gray-100 bg-gray-50/50 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleItem(item.id)}
                        className="w-3.5 h-3.5 rounded accent-[#D4AF37]"
                      />
                      <div>
                        <p className={`text-sm font-medium ${checked ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                          {item.nome}
                        </p>
                        <p className="text-[11px] text-gray-400">{item.descricao}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${checked ? 'text-gold-dark' : 'text-gray-300'}`}>
                      {fmt(item.valor)}
                    </span>
                  </label>
                )
              })}
            </div>
          </section>

          {/* Financeiro */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard size={16} style={{ color: '#D4AF37' }} />
              Financeiro
            </h3>

            <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Valor bruto</span>
                <span className="text-sm font-medium text-gray-600">{fmt(valorBruto)}</span>
              </div>
            </div>

            {/* Desconto */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 mb-1">Desconto</label>
              <div className="flex gap-2">
                <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setDescontoTipo('percentual')}
                    className={`px-3 py-2 text-xs font-medium transition-colors ${
                      descontoTipo === 'percentual'
                        ? 'bg-gold/15 text-gold-dark'
                        : 'bg-white text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Percent size={14} />
                  </button>
                  <button
                    onClick={() => setDescontoTipo('fixo')}
                    className={`px-3 py-2 text-xs font-medium transition-colors ${
                      descontoTipo === 'fixo'
                        ? 'bg-gold/15 text-gold-dark'
                        : 'bg-white text-gray-400 hover:text-gray-600'
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
                <p className="text-[11px] text-emerald-600 mt-1">
                  Desconto de {fmt(valorDesconto)} aplicado
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Valor do Sinal</label>
                <input
                  type="number"
                  min={0}
                  value={valorSinal}
                  onChange={(e) => setValorSinal(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Parcelas</label>
                <select value={parcelas} onChange={(e) => setParcelas(Number(e.target.value))} className={inputClass}>
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}x</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resumo */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Valor total</span>
                <span className="font-bold text-lg" style={{ color: '#B8960C' }}>{fmt(valorTotal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Sinal</span>
                <span className="text-gray-600">{fmt(valorSinal)}</span>
              </div>
              <div className="flex justify-between text-xs pt-1 border-t border-amber-100">
                <span className="text-gray-400">Restante</span>
                <span className="font-semibold" style={{ color: '#D4AF37' }}>
                  {parcelas}x de {fmt(Math.max(0, valorParcela))}
                </span>
              </div>
            </div>
          </section>

          <button
            onClick={handleEnviar}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-amber-200/50 text-sm"
          >
            <Send size={18} />
            Salvar e Enviar Contrato por Email
          </button>
        </div>

        {/* COLUNA DIREITA - Preview */}
        <div className="xl:sticky xl:top-8 xl:self-start">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-medium">Previa do Contrato</p>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-10 text-gray-800 min-h-[700px]">
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: '#D4AF37' }}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown size={24} style={{ color: '#D4AF37' }} />
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">BLESS EVENTOS</h3>
              </div>
              <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em]">Contrato de Prestacao de Servicos</p>
            </div>

            <div className="space-y-5 text-[13px] leading-relaxed text-gray-600">
              <p>
                Pelo presente instrumento particular, a empresa <strong className="text-gray-900">BLESS EVENTOS LTDA</strong>,
                doravante denominada <strong>CONTRATADA</strong>, e o(a) Sr(a).{' '}
                <strong className="text-gray-900 underline decoration-gold/40 decoration-2 underline-offset-2">
                  {cliente || '________________________'}
                </strong>
                , doravante denominado(a) <strong>CONTRATANTE</strong>, celebram o presente contrato.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Dados do Evento</p>
                <div className="grid grid-cols-2 gap-y-1.5 text-sm">
                  <span className="text-gray-400">Tipo:</span>
                  <span className="font-medium text-gray-800">{tipoEvento}</span>
                  <span className="text-gray-400">Data:</span>
                  <span className="font-medium text-gray-800">{formatDataEvento()}</span>
                  <span className="text-gray-400">Convidados:</span>
                  <span className="font-medium text-gray-800">{convidados} pessoas</span>
                  <span className="text-gray-400">Email:</span>
                  <span className="font-medium text-gray-800">{email || '---'}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Clausula 1 - Valor</p>
                <p>
                  O valor total dos servicos prestados sera de{' '}
                  <strong className="text-gray-900">{fmt(valorTotal)}</strong>
                  {valorDesconto > 0 && (
                    <span className="text-emerald-600">
                      {' '}(aplicado desconto de {descontoTipo === 'percentual' ? `${desconto}%` : fmt(desconto)}
                      {' '}- economia de {fmt(valorDesconto)})
                    </span>
                  )}.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Clausula 2 - Pagamento</p>
                <p>
                  O pagamento sera realizado com um sinal de{' '}
                  <strong className="text-gray-900">{fmt(valorSinal)}</strong> e o restante dividido em{' '}
                  <strong className="text-gray-900">{parcelas} parcela{parcelas > 1 ? 's' : ''}</strong> de{' '}
                  <strong className="text-gray-900">{fmt(Math.max(0, valorParcela))}</strong>.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Clausula 3 - Servicos</p>

                {itensInclusos.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-400 mb-1.5">Servicos inclusos:</p>
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
                    <p className="text-xs text-gray-400 mb-1.5">Servicos nao inclusos:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {itensExcluidos.map((item) => (
                        <span key={item.id} className="inline-block px-2 py-0.5 bg-red-50 text-red-500 text-xs rounded-md border border-red-200 line-through">
                          {item.nome}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Clausula 4 - Disposicoes</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  O presente contrato e regido pelas leis vigentes no territorio nacional. Qualquer alteracao
                  devera ser formalizada por aditivo contratual assinado por ambas as partes.
                </p>
              </div>

              {/* Assinaturas */}
              <div className="pt-8 mt-6 grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="border-t border-gray-300 pt-2">
                    <p className="text-xs text-gray-400">CONTRATADA</p>
                    <p className="text-xs font-medium text-gray-600">Bless Eventos Ltda</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="border-t border-gray-300 pt-2">
                    <p className="text-xs text-gray-400">CONTRATANTE</p>
                    <p className="text-xs font-medium text-gray-600">{cliente || '________________________'}</p>
                  </div>
                </div>
              </div>

              <p className="text-center text-[10px] text-gray-300 mt-4">
                Documento gerado em {today()} &middot; Bless Eventos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
