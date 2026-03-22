import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const orcamento = await prisma.orcamento.findUnique({
      where: { id: params.id },
      include: {
        observacoes: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!orcamento) {
      return NextResponse.json(
        { error: "Orçamento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(orcamento);
  } catch (error) {
    console.error("Error fetching orçamento:", error);
    return NextResponse.json(
      { error: "Erro ao buscar orçamento" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { status, texto, valorTotal, itens, dataAprovacao, enviadoAoCliente } = body;

    if (texto) {
      const observacao = await prisma.observacao.create({
        data: {
          orcamentoId: params.id,
          texto,
          createdBy: (session.user as any).name,
        },
      });

      return NextResponse.json(observacao);
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (valorTotal !== undefined) updateData.valorTotal = valorTotal;
    if (itens !== undefined) updateData.itens = JSON.stringify(itens);
    if (dataAprovacao) updateData.dataAprovacao = new Date(dataAprovacao);
    if (enviadoAoCliente !== undefined) updateData.enviadoAoCliente = enviadoAoCliente;

    const orcamento = await prisma.orcamento.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(orcamento);
  } catch (error) {
    console.error("Error updating orçamento:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar orçamento" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    await prisma.orcamento.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting orçamento:", error);
    return NextResponse.json(
      { error: "Erro ao deletar orçamento" },
      { status: 500 }
    );
  }
}
