import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(
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
    }) as any;

    if (!orcamento) {
      return NextResponse.json(
        { error: "Orçamento não encontrado" },
        { status: 404 }
      );
    }

    const itens = orcamento.itens ? JSON.parse(orcamento.itens) : [];
    const valorTotal = orcamento.valorTotal || 0;

    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    };

    let whatsappMessage = `Olá ${orcamento.nome}! 👋

Seu orçamento foi aprovado! 🎉

📋 *Orçamento #${orcamento.id.slice(-6).toUpperCase()}*

*Veículo:* ${orcamento.veiculo}${orcamento.ano ? ` (${orcamento.ano})` : ""}
*Serviço:* ${orcamento.servico}

━━━━━━━━━━━━━━━━━━━━━━━━

📦 *Itens do Orçamento:*

`;

    if (itens.length > 0) {
      itens.forEach((item: any, index: number) => {
        whatsappMessage += `${index + 1}. ${item.descricao}
   Qtd: ${item.quantidade} x ${formatCurrency(item.valorUnitario)}
   Subtotal: ${formatCurrency(item.subtotal)}

`;
      });
    }

    whatsappMessage += `━━━━━━━━━━━━━━━━━━━━━━━━

💰 *VALOR TOTAL: ${formatCurrency(valorTotal)}*

━━━━━━━━━━━━━━━━━━━━━━━━

Para confirmar o serviço, responda esta mensagem ou entre em contato conosco.

Att,
Equipe Malibu Automotiva`;

    const whatsappNumber = orcamento.whatsapp?.replace(/\D/g, "") || orcamento.telefone.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/55${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    await (prisma.orcamento as any).update({
      where: { id: params.id },
      data: { 
        enviadoAoCliente: true,
        status: "APROVADO",
        dataAprovacao: new Date()
      },
    });

    return NextResponse.json({
      success: true,
      whatsappUrl,
      message: whatsappMessage,
      emailHtml: generateEmailHtml(orcamento, itens, valorTotal),
    });
  } catch (error) {
    console.error("Error sending orçamento:", error);
    return NextResponse.json(
      { error: "Erro ao enviar orçamento" },
      { status: 500 }
    );
  }
}

function generateEmailHtml(orcamento: any, itens: any[], valorTotal: number) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const itensHtml = itens.length > 0 ? itens.map((item: any) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.descricao}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantidade}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(item.valorUnitario)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(item.subtotal)}</td>
    </tr>
  `).join("") : "";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #dc2626, #991b1b); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">Malibu Automotiva</h1>
        <p style="color: white; margin: 10px 0 0;">Orçamento Aprovado!</p>
      </div>
      
      <div style="padding: 30px; background: #fff;">
        <p>Olá <strong>${orcamento.nome}</strong>,</p>
        <p>Seu orçamento foi aprovado! 🎉</p>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Orçamento #${orcamento.id.slice(-6).toUpperCase()}</h3>
          <p><strong>Veículo:</strong> ${orcamento.veiculo}${orcamento.ano ? ` (${orcamento.ano})` : ""}</p>
          <p><strong>Serviço:</strong> ${orcamento.servico}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #333; color: white;">
              <th style="padding: 12px; text-align: left;">Descrição</th>
              <th style="padding: 12px; text-align: center;">Qtd</th>
              <th style="padding: 12px; text-align: right;">Valor Unit.</th>
              <th style="padding: 12px; text-align: right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itensHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 15px; text-align: right; font-size: 18px; font-weight: bold;">TOTAL:</td>
              <td style="padding: 15px; text-align: right; font-size: 18px; font-weight: bold; color: #dc2626;">${formatCurrency(valorTotal)}</td>
            </tr>
          </tfoot>
        </table>
        
        <p style="text-align: center; margin-top: 30px;">
          Para confirmar o serviço, responda este email ou entre em contato conosco.
        </p>
        
        <p style="text-align: center; color: #666; font-size: 12px;">
          Att,<br>
          Equipe Malibu Automotiva
        </p>
      </div>
    </div>
  `;
}
