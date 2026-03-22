import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDENTE: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    EM_ANALISE: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    APROVADO: "bg-green-500/20 text-green-400 border-green-500/30",
    FINALIZADO: "bg-primary/20 text-primary border-primary/30",
    CANCELADO: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return colors[status] || colors.PENDENTE;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDENTE: "Pendente",
    EM_ANALISE: "Em Análise",
    APROVADO: "Aprovado",
    FINALIZADO: "Finalizado",
    CANCELADO: "Cancelado",
  };
  return labels[status] || status;
}
