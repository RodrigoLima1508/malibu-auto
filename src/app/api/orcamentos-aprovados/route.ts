import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const statusPagamento = searchParams.get("statusPagamento");

    const where: any = {
      status: "APROVADO",
      valorTotal: { not: null },
    };

    if (statusPagamento) {
      where.statusPagamento = statusPagamento;
    }

    const orcamentos: any[] = await prisma.orcamento.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const stats = {
      totalAguardando: 0,
      totalPago: 0,
      totalNegado: 0,
    };

    orcamentos.forEach((o) => {
      const valor = o.valorTotal || 0;
      if (o.statusPagamento === "AGUARDANDO_APROVACAO") {
        stats.totalAguardando += valor;
      } else if (o.statusPagamento === "PAGO") {
        stats.totalPago += valor;
      }
    });

    return NextResponse.json({
      orcamentos,
      stats,
    });
  } catch (error) {
    console.error("Error fetching orçamentos approved:", error);
    return NextResponse.json(
      { error: "Erro ao buscar orçamentos" },
      { status: 500 }
    );
  }
}
