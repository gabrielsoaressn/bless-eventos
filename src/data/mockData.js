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
  { mes: 'Mar/26', valor: 28500 },
  { mes: 'Abr/26', valor: 15200 },
  { mes: 'Mai/26', valor: 12800 },
  { mes: 'Jun/26', valor: 19400 },
  { mes: 'Jul/26', valor: 31000 },
  { mes: 'Ago/26', valor: 24600 },
]

export const pacoteItens = [
  { id: 'estrutura', nome: 'Estrutura Completa', valor: 3500, descricao: 'Tendas, mesas, cadeiras, iluminação' },
  { id: 'buffet', nome: 'Buffet', valor: 4500, descricao: 'Entrada, prato principal, sobremesa' },
  { id: 'dj', nome: 'DJ', valor: 1800, descricao: 'DJ profissional + equipamento de som' },
  { id: 'barman', nome: 'Barman', valor: 1200, descricao: 'Open bar com barman profissional' },
  { id: 'bolo_corte', nome: 'Bolo de Corte', valor: 800, descricao: 'Bolo artesanal para cerimônia' },
  { id: 'bolo_fake', nome: 'Bolo Fake', valor: 600, descricao: 'Bolo cenográfico decorativo' },
]

export const dashboardCards = {
  receitaMes: 105200,
  inadimplencia: 8.3,
  ticketMedio: 13150,
}

export const insightIA = "Insight: 40% dos contratos recentes removeram os itens 'DJ' e 'Barman'. Considere criar um pacote base mais enxuto para aumentar a margem."
