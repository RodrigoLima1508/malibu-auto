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
    const tipo = searchParams.get("tipo");
    const categoria = searchParams.get("categoria");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: any = {};
    
    if (tipo) where.tipo = tipo;
    if (categoria) where.categoria = categoria;
    if (startDate || endDate) {
      where.data = {};
      if (startDate) where.data.gte = new Date(startDate);
      if (endDate) where.data.lte = new Date(endDate);
    }

    const servicos = await prisma.servicoRealizado.findMany({
      where,
      orderBy: { data: "desc" },
    });

    const totalEntradas = servicos
      .filter((s) => s.tipo === "ENTRADA")
      .reduce((acc, s) => acc + s.valor, 0);

    const totalSaidas = servicos
      .filter((s) => s.tipo === "SAIDA")
      .reduce((acc, s) => acc + s.valor, 0);

    return NextResponse.json({
      servicos,
      stats: {
        totalEntradas,
        totalSaidas,
        saldo: totalEntradas - totalSaidas,
        totalRegistros: servicos.length,
      },
    });
  } catch (error) {
    console.error("Error fetching servicos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar serviços" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { veiculo, ano, servico, descricao, valor, tipo, categoria, data } = body;

    const servicoRealizado = await prisma.servicoRealizado.create({
      data: {
        veiculo,
        ano: ano ? parseInt(ano) : null,
        servico,
        descricao,
        valor: parseFloat(valor),
        tipo,
        categoria,
        data: data ? new Date(data) : new Date(),
      },
    });

    return NextResponse.json(servicoRealizado, { status: 201 });
  } catch (error) {
    console.error("Error creating servico:", error);
    return NextResponse.json(
      { error: "Erro ao criar serviço" },
      { status: 500 }
    );
  }
}
