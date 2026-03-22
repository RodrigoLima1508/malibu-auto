import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

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
    const { veiculo, ano, servico, descricao, valor, tipo, categoria, data } = body;

    const servicoRealizado = await prisma.servicoRealizado.update({
      where: { id: params.id },
      data: {
        veiculo,
        ano: ano ? parseInt(ano) : null,
        servico,
        descricao,
        valor: parseFloat(valor),
        tipo,
        categoria,
        data: data ? new Date(data) : undefined,
      },
    });

    return NextResponse.json(servicoRealizado);
  } catch (error) {
    console.error("Error updating servico:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar serviço" },
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

    await prisma.servicoRealizado.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting servico:", error);
    return NextResponse.json(
      { error: "Erro ao deletar serviço" },
      { status: 500 }
    );
  }
}
