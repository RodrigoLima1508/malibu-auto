"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Eye,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DashboardStats, Orcamento } from "@/types";

const statCards = [
  { key: "orcamentosPendentes", label: "Pendentes", icon: Clock, color: "from-amber-500", bgColor: "bg-amber-500/10" },
  { key: "orcamentosEmAnalise", label: "Em Análise", icon: Eye, color: "from-blue-500", bgColor: "bg-blue-500/10" },
  { key: "totalOrcamentos", label: "Total", icon: FileText, color: "from-red-500", bgColor: "bg-red-500/10" },
  { key: "totalEntradas", label: "Entradas", icon: TrendingUp, color: "from-emerald-500", bgColor: "bg-emerald-500/10", isCurrency: true },
  { key: "totalSaidas", label: "Saídas", icon: TrendingDown, color: "from-red-500", bgColor: "bg-red-500/10", isCurrency: true },
  { key: "saldo", label: "Saldo", icon: DollarSign, color: "from-purple-500", bgColor: "bg-purple-500/10", isCurrency: true },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrcamentos, setRecentOrcamentos] = useState<Orcamento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();
        setStats(data.stats);
        setRecentOrcamentos(data.recentOrcamentos);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-zinc-900 animate-pulse rounded-lg" />
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-zinc-900 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400 mt-1">Visão geral do sistema</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative p-5 rounded-2xl bg-zinc-900 border border-white/[0.06] overflow-hidden group hover:border-red-600/20 transition-all duration-300"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} to-transparent opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
            
            <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 text-${stat.color.split('-')[1]}-400`} />
            </div>
            
            <p className="text-sm text-zinc-400 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${
              stat.isCurrency 
                ? (stats?.[stat.key as keyof DashboardStats] as number) >= 0 
                  ? "text-emerald-400" 
                  : "text-red-400"
                : "text-white"
            }`}>
              {stat.isCurrency
                ? formatCurrency(stats?.[stat.key as keyof DashboardStats] as number || 0)
                : stats?.[stat.key as keyof DashboardStats] || 0}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-zinc-900 border border-white/[0.06]"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" />
              Orçamentos Recentes
            </h2>
            <Link
              href="/orcamentos"
              className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrcamentos.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                <p className="text-zinc-500">Nenhum orçamento ainda</p>
              </div>
            ) : (
              recentOrcamentos.map((orcamento) => (
                <Link
                  key={orcamento.id}
                  href={`/orcamentos?id=${orcamento.id}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-zinc-800 hover:bg-zinc-800/80 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{orcamento.nome}</p>
                    <p className="text-sm text-zinc-500 truncate">
                      {orcamento.veiculo} - {orcamento.servico}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <StatusBadge status={orcamento.status} />
                    <span className="text-xs text-zinc-500">{formatDate(orcamento.createdAt)}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-zinc-900 border border-white/[0.06]"
        >
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Ações Rápidas
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/orcamentos"
              className="p-6 rounded-xl bg-gradient-to-br from-red-600/10 to-red-600/5 border border-red-600/20 hover:border-red-600/40 transition-all group"
            >
              <FileText className="w-8 h-8 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-white">Orçamentos</p>
              <p className="text-sm text-zinc-500">Gerenciar pedidos</p>
            </Link>

            <Link
              href="/contabilidade"
              className="p-6 rounded-xl bg-gradient-to-br from-emerald-600/10 to-green-600/5 border border-emerald-600/20 hover:border-emerald-600/40 transition-all group"
            >
              <DollarSign className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-white">Contabilidade</p>
              <p className="text-sm text-zinc-500">Controle financeiro</p>
            </Link>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-zinc-800 border border-white/[0.06]">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="font-medium text-white">Dica do dia</span>
            </div>
            <p className="text-sm text-zinc-400">
              Mantenha seus orçamentos atualizados para melhorar o acompanhamento e a comunicação com os clientes.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
