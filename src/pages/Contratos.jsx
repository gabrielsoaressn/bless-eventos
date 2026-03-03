import { useState } from 'react'
import { Search, Filter, Upload, X, FileUp, CheckCircle2 } from 'lucide-react'
import { contratos as contratosIniciais } from '../data/mockData'

function fmt(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function StatusBadge({ status }) {
  const styles = {
    'Aguardando Assinatura': 'bg-amber-50 text-amber-700 border-amber-200',
    'Ativo': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Concluido': 'bg-blue-50 text-blue-700 border-blue-200',
  }

  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
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
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all ${pct === 100 ? 'bg-emerald-500' : 'bg-gold'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap font-medium">
        <span className="text-gray-700 font-semibold">{pagas}</span>/{total}
        {restantes > 0 && (
          <span className="text-gray-400 ml-1">({restantes} restante{restantes > 1 ? 's' : ''})</span>
        )}
      </span>
    </div>
  )
}

function UploadModal({ contrato, onClose }) {
  const [uploaded, setUploaded] = useState(false)

  function handleUpload() {
    setUploaded(true)
    setTimeout(onClose, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-800">Upload de Contrato Assinado</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {!uploaded ? (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Anexe o PDF do contrato assinado de <strong className="text-gray-700">{contrato.cliente}</strong> para ativar o contrato.
            </p>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gold/50 transition-colors cursor-pointer mb-4"
              onClick={handleUpload}
            >
              <FileUp size={36} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm font-medium text-gray-600">Clique para selecionar ou arraste o arquivo</p>
              <p className="text-xs text-gray-400 mt-1">PDF, JPG ou PNG - Maximo 10MB</p>
            </div>

            <button
              onClick={handleUpload}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-white font-semibold py-2.5 px-4 rounded-xl hover:shadow-lg transition-all text-sm"
            >
              <Upload size={16} />
              Enviar Arquivo
            </button>
          </>
        ) : (
          <div className="py-8 text-center">
            <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-3" />
            <p className="text-base font-semibold text-gray-800">Contrato ativado com sucesso!</p>
            <p className="text-sm text-gray-500 mt-1">Status atualizado para Ativo</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Contratos() {
  const [modalContrato, setModalContrato] = useState(null)

  const totalRecebiveis = contratosIniciais.reduce((sum, c) => {
    const restantes = c.parcelasTotal - c.parcelasPagas
    const valorParcela = c.parcelasTotal > 0 ? c.valor / c.parcelasTotal : 0
    return sum + (restantes * valorParcela)
  }, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestao de Contratos</h2>
          <p className="text-gray-500 text-sm mt-1">
            {contratosIniciais.length} contratos &middot; Recebiveis pendentes:{' '}
            <span className="font-semibold" style={{ color: '#D4AF37' }}>{fmt(totalRecebiveis)}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/50 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 bg-white hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            Filtrar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Cliente</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tipo</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Data</th>
              <th className="text-right px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Valor Total</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Parcelas</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="text-center px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Acao</th>
            </tr>
          </thead>
          <tbody>
            {contratosIniciais.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-800">{c.cliente}</p>
                  <p className="text-xs text-gray-400">{c.email}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">{c.tipo}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-500">{c.data}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-sm font-semibold" style={{ color: '#B8960C' }}>{fmt(c.valor)}</p>
                </td>
                <td className="px-6 py-4">
                  <ParcelasBar pagas={c.parcelasPagas} total={c.parcelasTotal} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-6 py-4 text-center">
                  {c.status === 'Aguardando Assinatura' ? (
                    <button
                      onClick={() => setModalContrato(c)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
                    >
                      <Upload size={14} />
                      Upload
                    </button>
                  ) : (
                    <span className="text-xs text-gray-300">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalContrato && (
        <UploadModal
          contrato={modalContrato}
          onClose={() => setModalContrato(null)}
        />
      )}
    </div>
  )
}
