"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Edit,
  Trash2,
  Download,
  Loader2,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Modal from "@/components/ui/Modal";
import Card from "@/components/ui/Card";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import { ServicoRealizado, TipoTransacao, Orcamento, StatusPagamento } from "@/types";

const tipoOptions = [
  { value: "ENTRADA", label: "Entrada" },
  { value: "SAIDA", label: "Saída" },
];

const categoriaOptions = [
  { value: "Serviço", label: "Serviço" },
  { value: "Peça", label: "Peça" },
  { value: "Despesa Operacional", label: "Despesa Operacional" },
  { value: "Salário", label: "Salário" },
  { value: "Aluguel", label: "Aluguel" },
  { value: "Fornecedor", label: "Fornecedor" },
  { value: "Impostos", label: "Impostos" },
  { value: "Outros", label: "Outros" },
];

const statusPagamentoOptions = [
  { value: "AGUARDANDO_APROVACAO", label: "Aguardando Aprovação", color: "bg-yellow-500/20 text-yellow-400" },
  { value: "PAGO", label: "Pago", color: "bg-green-500/20 text-green-400" },
  { value: "NEGADO", label: "Negado", color: "bg-red-500/20 text-red-400" },
];

interface FormData {
  veiculo: string;
  ano: string;
  servico: string;
  descricao: string;
  valor: string;
  tipo: TipoTransacao;
  categoria: string;
  data: string;
}

const initialFormData: FormData = {
  veiculo: "",
  ano: "",
  servico: "",
  descricao: "",
  valor: "",
  tipo: "ENTRADA",
  categoria: "Serviço",
  data: new Date().toISOString().split("T")[0],
};

export default function ContabilidadePage() {
  const [servicos, setServicos] = useState<ServicoRealizado[]>([]);
  const [orcamentosAprovados, setOrcamentosAprovados] = useState<Orcamento[]>([]);
  const [stats, setStats] = useState({
    totalEntradas: 0,
    totalSaidas: 0,
    saldo: 0,
    totalRegistros: 0,
  });
  const [orcamentoStats, setOrcamentoStats] = useState({
    totalAguardando: 0,
    totalPago: 0,
    totalNegado: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isObservacaoModalOpen, setIsObservacaoModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [filtros, setFiltros] = useState({
    tipo: "",
    categoria: "",
    startDate: "",
    endDate: "",
  });
  const [orcamentoFiltro, setOrcamentoFiltro] = useState("");
  const [selectedOrcamento, setSelectedOrcamento] = useState<Orcamento | null>(null);
  const [observacaoText, setObservacaoText] = useState("");

  const fetchServicos = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filtros.tipo) params.append("tipo", filtros.tipo);
      if (filtros.categoria) params.append("categoria", filtros.categoria);
      if (filtros.startDate) params.append("startDate", filtros.startDate);
      if (filtros.endDate) params.append("endDate", filtros.endDate);

      const response = await fetch(`/api/servicos?${params}`);
      const data = await response.json();
      setServicos(data.servicos);
      setStats(data.stats);
    } catch (error) {
      console.error("Error fetching servicos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filtros]);

  const fetchOrcamentosAprovados = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (orcamentoFiltro) params.append("statusPagamento", orcamentoFiltro);

      const response = await fetch(`/api/orcamentos-aprovados?${params}`);
      const data = await response.json();
      setOrcamentosAprovados(data.orcamentos);
      setOrcamentoStats(data.stats);
    } catch (error) {
      console.error("Error fetching orçamentos:", error);
    }
  }, [orcamentoFiltro]);

  useEffect(() => {
    fetchServicos();
    fetchOrcamentosAprovados();
  }, [fetchServicos, fetchOrcamentosAprovados]);

  const handleOpenModal = (servico?: ServicoRealizado) => {
    if (servico) {
      setEditingId(servico.id);
      setFormData({
        veiculo: servico.veiculo,
        ano: servico.ano?.toString() || "",
        servico: servico.servico,
        descricao: servico.descricao || "",
        valor: servico.valor.toString(),
        tipo: servico.tipo as TipoTransacao,
        categoria: servico.categoria,
        data: new Date(servico.data).toISOString().split("T")[0],
      });
    } else {
      setEditingId(null);
      setFormData(initialFormData);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingId ? `/api/servicos/${editingId}` : "/api/servicos";
      const method = editingId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchServicos();
        setIsModalOpen(false);
        setFormData(initialFormData);
        setEditingId(null);
      }
    } catch (error) {
      console.error("Error saving servico:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este registro?")) return;

    try {
      const response = await fetch(`/api/servicos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchServicos();
      }
    } catch (error) {
      console.error("Error deleting servico:", error);
    }
  };

  const handleUpdateStatusPagamento = async (id: string, statusPagamento: StatusPagamento) => {
    try {
      const response = await fetch(`/api/orcamentos-pagamento/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statusPagamento }),
      });

      if (response.ok) {
        await fetchOrcamentosAprovados();
      }
    } catch (error) {
      console.error("Error updating status pagamento:", error);
    }
  };

  const handleOpenObservacao = (orcamento: Orcamento) => {
    setSelectedOrcamento(orcamento);
    setObservacaoText(orcamento.observacoesFinanceiro || "");
    setIsObservacaoModalOpen(true);
  };

  const handleSaveObservacao = async () => {
    if (!selectedOrcamento) return;

    try {
      const response = await fetch(`/api/orcamentos-pagamento/${selectedOrcamento.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ observacoesFinanceiro: observacaoText }),
      });

      if (response.ok) {
        await fetchOrcamentosAprovados();
        setIsObservacaoModalOpen(false);
      }
    } catch (error) {
      console.error("Error saving observacao:", error);
    }
  };

  const getStatusBadge = (status: StatusPagamento) => {
    const option = statusPagamentoOptions.find((o) => o.value === status);
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${option?.color}`}>
        {option?.label}
      </span>
    );
  };

  const exportToCSV = () => {
    const headers = ["Data", "Veículo", "Ano", "Serviço", "Categoria", "Tipo", "Valor"];
    const rows = servicos.map((s) => [
      formatDate(s.data),
      s.veiculo,
      s.ano || "",
      s.servico,
      s.categoria,
      s.tipo === "ENTRADA" ? "Entrada" : "Saída",
      s.valor.toFixed(2),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(";")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `malibu_financeiro_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-background-card animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-background-card animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Contabilidade</h1>
          <p className="text-gray-400 mt-1">Controle financeiro da empresa</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
          <Button onClick={() => handleOpenModal()}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Registro
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total de Entradas</p>
                <p className="text-2xl font-bold text-green-400 mt-1">
                  {formatCurrency(stats.totalEntradas)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-green-500/20">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total de Saídas</p>
                <p className="text-2xl font-bold text-red-400 mt-1">
                  {formatCurrency(stats.totalSaidas)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-red-500/20">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className={`bg-gradient-to-br ${
            stats.saldo >= 0 
              ? "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20" 
              : "from-red-500/10 to-red-600/5 border-red-500/20"
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Saldo</p>
                <p className={`text-2xl font-bold mt-1 ${
                  stats.saldo >= 0 ? "text-emerald-400" : "text-red-400"
                }`}>
                  {formatCurrency(stats.saldo)}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${
                stats.saldo >= 0 ? "bg-emerald-500/20" : "bg-red-500/20"
              }`}>
                <DollarSign className={`w-6 h-6 ${stats.saldo >= 0 ? "text-emerald-400" : "text-red-400"}`} />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total de Registros</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats.totalRegistros}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-primary/20">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <Card>
        <div className="flex items-center gap-4 mb-4">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-white">Orçamentos Aprovados</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-400">Aguardando</span>
            </div>
            <p className="text-xl font-bold text-yellow-400">
              {formatCurrency(orcamentoStats.totalAguardando)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">Pago</span>
            </div>
            <p className="text-xl font-bold text-green-400">
              {formatCurrency(orcamentoStats.totalPago)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-gray-400">Negado</span>
            </div>
            <p className="text-xl font-bold text-red-400">
              {formatCurrency(orcamentoStats.totalNegado)}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            value={orcamentoFiltro}
            onChange={(e) => setOrcamentoFiltro(e.target.value)}
            className="px-4 py-3 rounded-lg bg-background border border-border text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Todos os status</option>
            <option value="AGUARDANDO_APROVACAO">Aguardando Aprovação</option>
            <option value="PAGO">Pago</option>
            <option value="NEGADO">Negado</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Cliente
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Veículo
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Serviço
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Status Pgto
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                  Valor
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {orcamentosAprovados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">
                    Nenhum orçamento aprovado encontrado
                  </td>
                </tr>
              ) : (
                orcamentosAprovados.map((orcamento) => (
                  <tr
                    key={orcamento.id}
                    className="border-b border-border/50 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-white">{orcamento.nome}</p>
                        <p className="text-sm text-gray-400">{orcamento.telefone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-white">{orcamento.veiculo}</p>
                        {orcamento.ano && (
                          <p className="text-sm text-gray-400">{orcamento.ano}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-white">{orcamento.servico}</p>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(orcamento.statusPagamento)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-mono font-bold text-green-400">
                        {formatCurrency(orcamento.valorTotal || 0)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={orcamento.statusPagamento}
                          onChange={(e) => handleUpdateStatusPagamento(orcamento.id, e.target.value as StatusPagamento)}
                          className="px-2 py-1 rounded bg-background border border-border text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          {statusPagamentoOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleOpenObservacao(orcamento)}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          title="Observações"
                        >
                          <MessageSquare className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4 mb-4">
          <DollarSign className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-white">Registros Financeiros</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-40">
            <select
              value={filtros.tipo}
              onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Todos os tipos</option>
              <option value="ENTRADA">Entrada</option>
              <option value="SAIDA">Saída</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <select
              value={filtros.categoria}
              onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Todas as categorias</option>
              {categoriaOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <input
            type="date"
            value={filtros.startDate}
            onChange={(e) => setFiltros({ ...filtros, startDate: e.target.value })}
            className="px-4 py-3 rounded-lg bg-background border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="date"
            value={filtros.endDate}
            onChange={(e) => setFiltros({ ...filtros, endDate: e.target.value })}
            className="px-4 py-3 rounded-lg bg-background border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Data
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Veículo
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Serviço
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Categoria
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Tipo
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                  Valor
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {servicos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    Nenhum registro encontrado
                  </td>
                </tr>
              ) : (
                servicos.map((servico) => (
                  <tr
                    key={servico.id}
                    className="border-b border-border/50 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="text-gray-300">
                        {formatDate(servico.data)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-white">{servico.veiculo}</p>
                        {servico.ano && (
                          <p className="text-sm text-gray-400">{servico.ano}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-white">{servico.servico}</p>
                      {servico.descricao && (
                        <p className="text-sm text-gray-400 truncate max-w-[200px]">
                          {servico.descricao}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-sm">
                        {servico.categoria}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          servico.tipo === "ENTRADA"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {servico.tipo === "ENTRADA" ? "Entrada" : "Saída"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`font-mono font-bold ${
                          servico.tipo === "ENTRADA"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {servico.tipo === "ENTRADA" ? "+" : "-"}
                        {formatCurrency(servico.valor)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(servico)}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(servico.id)}
                          className="p-2 rounded-lg hover:bg-error/10 text-gray-400 hover:text-error transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          Mostrando {servicos.length} registros
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Registro" : "Novo Registro"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Select
              label="Tipo"
              value={formData.tipo}
              onChange={(value) =>
                setFormData({ ...formData, tipo: value as TipoTransacao })
              }
              options={tipoOptions}
            />
            <Input
              label="Data"
              type="date"
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Veículo / Descrição"
              placeholder="Ex: Honda Civic ou Despesa mensal"
              value={formData.veiculo}
              onChange={(e) => setFormData({ ...formData, veiculo: e.target.value })}
              required
            />
            <Input
              label="Ano"
              type="number"
              placeholder="2024"
              value={formData.ano}
              onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Serviço / Item"
              placeholder="Ex: Pintura completa"
              value={formData.servico}
              onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
              required
            />
            <Select
              label="Categoria"
              value={formData.categoria}
              onChange={(value) => setFormData({ ...formData, categoria: value })}
              options={categoriaOptions}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Valor (R$)"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
              required
            />
          </div>

          <Textarea
            label="Descrição (opcional)"
            placeholder="Detalhes adicionais..."
            rows={3}
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isObservacaoModalOpen}
        onClose={() => setIsObservacaoModalOpen(false)}
        title="Observações do Orçamento"
        size="md"
      >
        <div className="space-y-4">
          {selectedOrcamento && (
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-sm text-gray-400 mb-1">Cliente</p>
              <p className="font-medium text-white">{selectedOrcamento.nome}</p>
              <p className="text-sm text-gray-400 mt-2">
                {selectedOrcamento.veiculo} - {selectedOrcamento.servico}
              </p>
              <p className="text-lg font-bold text-green-400 mt-2">
                {formatCurrency(selectedOrcamento.valorTotal || 0)}
              </p>
            </div>
          )}
          <Textarea
            label="Observações"
            placeholder="Adicione observações sobre o pagamento..."
            rows={4}
            value={observacaoText}
            onChange={(e) => setObservacaoText(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setIsObservacaoModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveObservacao}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
