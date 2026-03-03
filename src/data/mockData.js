export const contratos = [
  {
    id: 1,
    cliente: 'Gabriel Soares',
    data: '05/12/2026',
    convidados: 120,
    valor: 13000,
    status: 'Sinal Pago, Parcelas Pendentes',
    tipo: 'Casamento',
  },
  {
    id: 2,
    cliente: 'Mariana Costa',
    data: '18/10/2026',
    convidados: 80,
    valor: 9500,
    status: 'Contrato Fechado',
    tipo: 'Aniversário 15 anos',
  },
  {
    id: 3,
    cliente: 'Ricardo Mendes',
    data: '22/11/2026',
    convidados: 200,
    valor: 22000,
    status: 'Sinal Pago, Parcelas Pendentes',
    tipo: 'Casamento',
  },
  {
    id: 4,
    cliente: 'Fernanda Oliveira',
    data: '14/09/2026',
    convidados: 60,
    valor: 7200,
    status: 'Quitado',
    tipo: 'Bodas de Ouro',
  },
  {
    id: 5,
    cliente: 'Lucas Almeida',
    data: '30/08/2026',
    convidados: 150,
    valor: 16500,
    status: 'Sinal Pendente',
    tipo: 'Formatura',
  },
  {
    id: 6,
    cliente: 'Juliana Ferreira',
    data: '07/03/2027',
    convidados: 100,
    valor: 11800,
    status: 'Contrato Fechado',
    tipo: 'Casamento',
  },
  {
    id: 7,
    cliente: 'André Santos',
    data: '25/07/2026',
    convidados: 45,
    valor: 5400,
    status: 'Quitado',
    tipo: 'Aniversário',
  },
  {
    id: 8,
    cliente: 'Patrícia Lima',
    data: '12/01/2027',
    convidados: 180,
    valor: 19800,
    status: 'Sinal Pago, Parcelas Pendentes',
    tipo: 'Casamento',
  },
]

export const forecastData = [
  { mes: 'Mar/26', recebivel: 28500, realizado: 26200 },
  { mes: 'Abr/26', recebivel: 15200, realizado: null },
  { mes: 'Mai/26', recebivel: 12800, realizado: null },
  { mes: 'Jun/26', recebivel: 19400, realizado: null },
  { mes: 'Jul/26', recebivel: 31000, realizado: null },
  { mes: 'Ago/26', recebivel: 24600, realizado: null },
]

export const funilVendas = [
  { etapa: 'Leads Recebidos', valor: 120, fill: '#c9a84c' },
  { etapa: 'Orçamentos Emitidos', valor: 45, fill: '#a8872e' },
  { etapa: 'Contratos Fechados', valor: 18, fill: '#8b6f1e' },
]

export const adocaoServicos = [
  { servico: 'Estrutura Completa', percentual: 100 },
  { servico: 'Buffet', percentual: 94 },
  { servico: 'Bolo Fake', percentual: 85 },
  { servico: 'Bolo de Corte', percentual: 72 },
  { servico: 'Barman', percentual: 40 },
  { servico: 'DJ', percentual: 30 },
]

export const pacoteItens = [
  { id: 'estrutura', nome: 'Estrutura Completa', valor: 3500, descricao: 'Tendas, mesas, cadeiras, iluminação' },
  { id: 'buffet', nome: 'Buffet', valor: 4500, descricao: 'Entrada, prato principal, sobremesa' },
  { id: 'dj', nome: 'DJ', valor: 1800, descricao: 'DJ profissional + equipamento de som' },
  { id: 'barman', nome: 'Barman', valor: 1200, descricao: 'Open bar com barman profissional' },
  { id: 'bolo_corte', nome: 'Bolo de Corte', valor: 800, descricao: 'Bolo artesanal para cerimônia' },
  { id: 'bolo_fake', nome: 'Bolo Fake', valor: 600, descricao: 'Bolo cenográfico decorativo' },
]

export const kpis = {
  ticketMedio: { valor: 14250, delta: '+8%', periodo: 'vs último trimestre' },
  ocupacao: { valor: 68, label: 'da agenda 2026 preenchida' },
  inadimplencia: { valor: 4.2, status: 'Controlado' },
}

export const insightIA = {
  titulo: 'Insight Operacional',
  mensagem: 'Notamos que 70% dos contratos recentes excluíram o serviço de DJ. Sugerimos criar um pacote \'Smart\' sem DJ e Barman embutidos, oferecendo-os como upsell para melhorar a taxa de conversão.',
  confianca: 87,
  baseAnalise: '42 contratos analisados nos últimos 90 dias',
}
