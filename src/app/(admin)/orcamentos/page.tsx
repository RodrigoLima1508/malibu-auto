"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  MessageSquare,
  ChevronDown,
  Image,
  Phone,
  Mail,
  Car,
  Calendar,
  X,
  Loader2,
  Plus,
  Send,
  Check,
  DollarSign,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import Card from "@/components/ui/Card";
import { formatDate, formatDateTime } from "@/lib/utils";
import { Orcamento, Status, ItemOrcamento } from "@/types";

const statusOptions = [
  { value: "", label: "Todos os status" },
  { value: "PENDENTE", label: "Pendente" },
  { value: "EM_ANALISE", label: "Em Análise" },
  { value: "APROVADO", label: "Aprovado" },
  { value: "FINALIZADO", label: "Finalizado" },
  { value: "CANCELADO", label: "Cancelado" },
];

const statusUpdateOptions = [
  { value: "PENDENTE", label: "Pendente" },
  { value: "EM_ANALISE", label: "Em Análise" },
  { value: "APROVADO", label: "Aprovado" },
  { value: "FINALIZADO", label: "Finalizado" },
  { value: "CANCELADO", label: "Cancelado" },
];

interface ItemOrcamentoUI {
  id: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  subtotal: number;
}

export default function OrcamentosPage() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrcamento, setSelectedOrcamento] = useState<Orcamento | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isObservacaoModalOpen, setIsObservacaoModalOpen] = useState(false);
  const [isAprovacaoModalOpen, setIsAprovacaoModalOpen] = useState(false);
  const [observacaoText, setObservacaoText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [itensOrcamento, setItensOrcamento] = useState<ItemOrcamentoUI[]>([]);
  const [isSending, setIsSending] = useState(false);

  const fetchOrcamentos = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);

      const response = await fetch(`/api/orcamentos?${params}`);
      const data = await response.json();
      setOrcamentos(data.orcamentos);
    } catch (error) {
      console.error("Error fetching orçamentos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchOrcamentos();
  }, [fetchOrcamentos]);

  const filteredOrcamentos = orcamentos.filter((orcamento) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      orcamento.nome.toLowerCase().includes(searchLower) ||
      orcamento.veiculo.toLowerCase().includes(searchLower) ||
      orcamento.servico.toLowerCase().includes(searchLower) ||
      orcamento.telefone.includes(searchTerm)
    );
  });

  const handleView = (orcamento: Orcamento) => {
    setSelectedOrcamento(orcamento);
    setIsModalOpen(true);
  };

  const handleOpenAprovacao = (orcamento: Orcamento) => {
    setSelectedOrcamento(orcamento);
    const existingItens = orcamento.itens ? orcamento.itens : [];
    if (existingItens.length > 0) {
      setItensOrcamento(existingItens);
    } else {
      setItensOrcamento([{ id: "1", descricao: "", quantidade: 1, valorUnitario: 0, subtotal: 0 }]);
    }
    setIsAprovacaoModalOpen(true);
  };

  const handleAddItem = () => {
    setItensOrcamento([
      ...itensOrcamento,
      { id: Date.now().toString(), descricao: "", quantidade: 1, valorUnitario: 0, subtotal: 0 },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (itensOrcamento.length > 1) {
      setItensOrcamento(itensOrcamento.filter((item) => item.id !== id));
    }
  };

  const handleUpdateItem = (id: string, field: keyof ItemOrcamentoUI, value: string | number) => {
    setItensOrcamento(
      itensOrcamento.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          updated.subtotal = updated.quantidade * updated.valorUnitario;
          return updated;
        }
        return item;
      })
    );
  };

  const valorTotal = itensOrcamento.reduce((sum, item) => sum + item.subtotal, 0);

  const handleSalvarOrcamento = async () => {
    if (!selectedOrcamento) return;
    if (itensOrcamento.some((item) => !item.descricao.trim())) {
      alert("Preencha a descrição de todos os itens");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/orcamentos/${selectedOrcamento.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          valorTotal,
          itens: itensOrcamento,
          status: "APROVADO",
          dataAprovacao: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        await fetchOrcamentos();
        const updated = await response.json();
        setSelectedOrcamento({ ...selectedOrcamento, ...updated });
        setIsAprovacaoModalOpen(false);
      }
    } catch (error) {
      console.error("Error saving orçamento:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEnviarAoCliente = async () => {
    if (!selectedOrcamento) return;

    setIsSending(true);
    try {
      const response = await fetch(`/api/orcamentos/${selectedOrcamento.id}/enviar`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        window.open(data.whatsappUrl, "_blank");
        await fetchOrcamentos();
      }
    } catch (error) {
      console.error("Error sending orçamento:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedOrcamento) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/orcamentos/${selectedOrcamento.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        await fetchOrcamentos();
        const updated = await response.json();
        setSelectedOrcamento({ ...selectedOrcamento, ...updated });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddObservacao = async () => {
    if (!selectedOrcamento || !observacaoText.trim()) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/orcamentos/${selectedOrcamento.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: observacaoText }),
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedOrcamento({
          ...selectedOrcamento,
          observacoes: [data, ...(selectedOrcamento.observacoes || [])],
        });
        setObservacaoText("");
        setIsObservacaoModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding observacao:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este orçamento?")) return;

    try {
      const response = await fetch(`/api/orcamentos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchOrcamentos();
        if (selectedOrcamento?.id === id) {
          setSelectedOrcamento(null);
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error("Error deleting orçamento:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-background-card animate-pulse rounded" />
        <div className="h-16 bg-background-card animate-pulse rounded-xl" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 bg-background-card animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Orçamentos</h1>
        <p className="text-gray-400 mt-1">
          Gerencie todos os pedidos de orçamento
        </p>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, veículo, serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-background border border-border text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
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
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                  Data
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrcamentos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    Nenhum orçamento encontrado
                  </td>
                </tr>
              ) : (
                filteredOrcamentos.map((orcamento) => (
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
                      <p className="text-white">
                        {orcamento.veiculo}
                        {orcamento.ano && (
                          <span className="text-gray-400"> ({orcamento.ano})</span>
                        )}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white">{orcamento.servico}</span>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={orcamento.status} />
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-400 text-sm">
                        {formatDate(orcamento.createdAt)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        {orcamento.status === "PENDENTE" || orcamento.status === "EM_ANALISE" ? (
                          <button
                            onClick={() => handleOpenAprovacao(orcamento)}
                            className="p-2 rounded-lg hover:bg-green-500/10 text-gray-400 hover:text-green-400 transition-colors"
                            title="Aprovar Orçamento"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                        ) : orcamento.status === "APROVADO" && !orcamento.enviadoAoCliente ? (
                          <button
                            onClick={() => {
                              setSelectedOrcamento(orcamento);
                              handleEnviarAoCliente();
                            }}
                            className="p-2 rounded-lg hover:bg-green-500/10 text-gray-400 hover:text-green-400 transition-colors"
                            title="Enviar ao Cliente"
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        ) : orcamento.enviadoAoCliente ? (
                          <span className="p-2 text-green-400" title="Enviado ao Cliente">
                            <Check className="w-5 h-5" />
                          </span>
                        ) : null}
                        <button
                          onClick={() => handleView(orcamento)}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          title="Visualizar"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOrcamento(orcamento);
                            setIsObservacaoModalOpen(true);
                          }}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          title="Adicionar observação"
                        >
                          <MessageSquare className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(orcamento.id)}
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
          Mostrando {filteredOrcamentos.length} de {orcamentos.length} orçamentos
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detalhes do Orçamento"
        size="lg"
      >
        {selectedOrcamento && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <StatusBadge status={selectedOrcamento.status} />
              <span className="text-sm text-gray-400">
                {formatDateTime(selectedOrcamento.createdAt)}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-gray-400 mb-1">Nome</p>
                <p className="font-medium text-white">{selectedOrcamento.nome}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-gray-400 mb-1">Telefone</p>
                <p className="font-medium text-white flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {selectedOrcamento.telefone}
                </p>
              </div>
              {selectedOrcamento.whatsapp && (
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm text-gray-400 mb-1">WhatsApp</p>
                  <p className="font-medium text-white">{selectedOrcamento.whatsapp}</p>
                </div>
              )}
              {selectedOrcamento.email && (
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm text-gray-400 mb-1">E-mail</p>
                  <p className="font-medium text-white flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {selectedOrcamento.email}
                  </p>
                </div>
              )}
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-gray-400 mb-1">Veículo</p>
                <p className="font-medium text-white flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  {selectedOrcamento.veiculo}
                  {selectedOrcamento.ano && ` (${selectedOrcamento.ano})`}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-gray-400 mb-1">Serviço</p>
                <p className="font-medium text-white">{selectedOrcamento.servico}</p>
              </div>
            </div>

            {selectedOrcamento.descricao && (
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-gray-400 mb-2">Descrição</p>
                <p className="text-white">{selectedOrcamento.descricao}</p>
              </div>
            )}

            {(() => {
              const imagens = selectedOrcamento.imagens 
                ? JSON.parse(selectedOrcamento.imagens) 
                : [];
              return imagens.length > 0 ? (
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm text-gray-400 mb-3">
                    <Image className="w-4 h-4 inline mr-1" />
                    Fotos Anexadas ({imagens.length})
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {imagens.map((img: string, index: number) => (
                      <a
                        key={index}
                        href={img}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={img}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Alterar Status
              </label>
              <select
                value={selectedOrcamento.status}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                disabled={isUpdating}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              >
                {statusUpdateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {isUpdating && (
                <div className="mt-2 flex items-center gap-2 text-primary text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Atualizando...
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-300">
                  Observações ({selectedOrcamento.observacoes?.length || 0})
                </label>
                <Button
                  size="sm"
                  onClick={() => setIsObservacaoModalOpen(true)}
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto">
                {selectedOrcamento.observacoes?.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">
                    Nenhuma observação ainda
                  </p>
                ) : (
                  selectedOrcamento.observacoes?.map((obs) => (
                    <div
                      key={obs.id}
                      className="p-3 rounded-lg bg-white/5 border border-border"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-primary">
                          {obs.createdBy}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDateTime(obs.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{obs.texto}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isObservacaoModalOpen}
        onClose={() => setIsObservacaoModalOpen(false)}
        title="Adicionar Observação"
        size="md"
      >
        <div className="space-y-4">
          <Textarea
            label="Observação"
            placeholder="Digite sua observação..."
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
            <Button
              onClick={handleAddObservacao}
              disabled={!observacaoText.trim() || isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isAprovacaoModalOpen}
        onClose={() => setIsAprovacaoModalOpen(false)}
        title="Aprovar Orçamento"
        size="lg"
      >
        {selectedOrcamento && (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-sm text-gray-400 mb-1">Cliente</p>
              <p className="font-medium text-white">{selectedOrcamento.nome}</p>
              <p className="text-sm text-gray-400">
                {selectedOrcamento.veiculo}
                {selectedOrcamento.ano && ` (${selectedOrcamento.ano})`} - {selectedOrcamento.servico}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-300">
                  Itens do Orçamento
                </label>
                <Button size="sm" variant="ghost" onClick={handleAddItem}>
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Item
                </Button>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {itensOrcamento.map((item, index) => (
                  <div key={item.id} className="p-4 rounded-lg bg-white/5 border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-400">Item {index + 1}</span>
                      {itensOrcamento.length > 1 && (
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-6">
                        <input
                          type="text"
                          placeholder="Descrição do item/peça/serviço"
                          value={item.descricao}
                          onChange={(e) => handleUpdateItem(item.id, "descricao", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-background border border-border text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          placeholder="Qtd"
                          value={item.quantidade}
                          onChange={(e) => handleUpdateItem(item.id, "quantidade", parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-lg bg-background border border-border text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-center"
                        />
                      </div>
                      <div className="col-span-4">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">R$</span>
                          <input
                            type="number"
                            placeholder="Valor unitário"
                            value={item.valorUnitario || ""}
                            onChange={(e) => handleUpdateItem(item.id, "valorUnitario", parseFloat(e.target.value) || 0)}
                            className="w-full pl-8 pr-3 py-2 rounded-lg bg-background border border-border text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-right text-sm">
                      <span className="text-gray-400">Subtotal: </span>
                      <span className="font-medium text-white">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.subtotal)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span className="font-medium text-white">Valor Total:</span>
                </div>
                <span className="text-2xl font-bold text-green-400">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(valorTotal)}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setIsAprovacaoModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSalvarOrcamento}
                disabled={isUpdating || itensOrcamento.some((item) => !item.descricao.trim())}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Aprovar Orçamento
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isObservacaoModalOpen}
        onClose={() => setIsObservacaoModalOpen(false)}
        title="Adicionar Observação"
        size="md"
      >
        <div className="space-y-4">
          <Textarea
            label="Observação"
            placeholder="Digite sua observação..."
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
            <Button
              onClick={handleAddObservacao}
              disabled={!observacaoText.trim() || isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
