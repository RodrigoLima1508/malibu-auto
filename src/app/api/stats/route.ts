import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const [
      totalOrcamentos,
      orcamentosPendentes,
      orcamentosEmAnalise,
      servicos,
    ] = await Promise.all([
      prisma.orcamento.count(),
      prisma.orcamento.count({ where: { status: "PENDENTE" } }),
      prisma.orcamento.count({ where: { status: "EM_ANALISE" } }),
      prisma.servicoRealizado.findMany({
        orderBy: { data: "desc" },
        take: 7,
      }),
    ]);

    const totalEntradas = servicos
      .filter((s) => s.tipo === "ENTRADA")
      .reduce((acc, s) => acc + s.valor, 0);

    const totalSaidas = servicos
      .filter((s) => s.tipo === "SAIDA")
      .reduce((acc, s) => acc + s.valor, 0);

    const recentOrcamentos = await prisma.orcamento.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const servicosPorDia = await prisma.$queryRaw`
      SELECT DATE(data) as date, 
             SUM(CASE WHEN tipo = 'ENTRADA' THEN valor ELSE 0 END) as entradas,
             SUM(CASE WHEN tipo = 'SAIDA' THEN valor ELSE 0 END) as saidas
      FROM ServicoRealizado
      WHERE data >= DATE('now', '-7 days')
      GROUP BY DATE(data)
      ORDER BY date ASC
    `;

    return NextResponse.json({
      stats: {
        totalOrcamentos,
        orcamentosPendentes,
        orcamentosEmAnalise,
        totalEntradas,
        totalSaidas,
        saldo: totalEntradas - totalSaidas,
      },
      recentOrcamentos,
      chartData: servicosPorDia,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Erro ao buscar estatísticas" },
      { status: 500 }
    );
  }
}
