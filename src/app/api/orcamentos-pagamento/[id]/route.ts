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
    const { statusPagamento, observacoesFinanceiro } = body;

    const orcamentoAtual = await (prisma.orcamento as any).findUnique({
      where: { id: params.id },
    });

    if (!orcamentoAtual) {
      return NextResponse.json(
        { error: "Orçamento não encontrado" },
        { status: 404 }
      );
    }

    const updateData: any = {};
    if (statusPagamento) {
      updateData.statusPagamento = statusPagamento;
      if (statusPagamento === "PAGO") {
        updateData.dataPagamento = new Date();
        
        if (orcamentoAtual.statusPagamento !== "PAGO" && orcamentoAtual.valorTotal) {
          const itens = orcamentoAtual.itens ? JSON.parse(orcamentoAtual.itens) : [];
          let descricaoCompleta = `${orcamentoAtual.servico}`;
          
          if (itens.length > 0) {
            descricaoCompleta += "\n\nItens:\n";
            itens.forEach((item: any, index: number) => {
              descricaoCompleta += `${index + 1}. ${item.descricao} (${item.quantidade}x) - R$ ${item.subtotal.toFixed(2)}\n`;
            });
          }
          
          descricaoCompleta += `\nCliente: ${orcamentoAtual.nome}`;
          if (orcamentoAtual.email) {
            descricaoCompleta += `\nEmail: ${orcamentoAtual.email}`;
          }
          descricaoCompleta += `\nOrçamento ID: #${orcamentoAtual.id.slice(-6).toUpperCase()}`;

          await (prisma.servicoRealizado as any).create({
            data: {
              veiculo: orcamentoAtual.veiculo,
              ano: orcamentoAtual.ano,
              servico: orcamentoAtual.servico,
              descricao: descricaoCompleta,
              valor: orcamentoAtual.valorTotal,
              tipo: "ENTRADA",
              categoria: "Serviço",
              data: new Date(),
            },
          });
        }
      }
    }
    if (observacoesFinanceiro !== undefined) {
      updateData.observacoesFinanceiro = observacoesFinanceiro;
    }

    const orcamento = await (prisma.orcamento as any).update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(orcamento);
  } catch (error) {
    console.error("Error updating orçamento payment:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar orçamento" },
      { status: 500 }
    );
  }
}
