export type Status = "PENDENTE" | "EM_ANALISE" | "APROVADO" | "FINALIZADO" | "CANCELADO";
export type StatusPagamento = "AGUARDANDO_APROVACAO" | "PAGO" | "NEGADO";
export type TipoTransacao = "ENTRADA" | "SAIDA";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface ItemOrcamento {
  id: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  subtotal: number;
}

export interface Orcamento {
  id: string;
  nome: string;
  telefone: string;
  whatsapp?: string;
  email?: string;
  veiculo: string;
  ano?: number;
  servico: string;
  descricao?: string;
  imagens?: string;
  valorTotal?: number;
  itens?: ItemOrcamento[];
  status: Status;
  statusPagamento: StatusPagamento;
  observacoesFinanceiro?: string;
  dataAprovacao?: Date;
  dataPagamento?: Date;
  enviadoAoCliente: boolean;
  createdAt: Date;
  updatedAt: Date;
  observacoes?: Observacao[];
}

export interface Observacao {
  id: string;
  orcamentoId: string;
  texto: string;
  createdBy: string;
  createdAt: Date;
}

export interface ServicoRealizado {
  id: string;
  veiculo: string;
  ano?: number;
  servico: string;
  descricao?: string;
  valor: number;
  tipo: TipoTransacao;
  categoria: string;
  data: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalOrcamentos: number;
  orcamentosPendentes: number;
  orcamentosEmAnalise: number;
  totalEntradas: number;
  totalSaidas: number;
  saldo: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}
