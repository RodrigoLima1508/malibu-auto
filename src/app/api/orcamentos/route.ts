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
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where = status ? { status } : {};

    const [orcamentos, total] = await Promise.all([
      prisma.orcamento.findMany({
        where,
        include: {
          observacoes: {
            orderBy: { createdAt: "desc" },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.orcamento.count({ where }),
    ]);

    return NextResponse.json({
      orcamentos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching orçamentos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar orçamentos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const images = formData.getAll("images") as File[];
    let imagens: string[] = [];

    for (const file of images) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString("base64");
        const mimeType = file.type || "image/jpeg";
        imagens.push(`data:${mimeType};base64,${base64}`);
      }
    }

    const orcamento = await prisma.orcamento.create({
      data: {
        nome: formData.get("nome") as string,
        telefone: formData.get("telefone") as string,
        whatsapp: formData.get("whatsapp") as string || null,
        email: formData.get("email") as string || null,
        veiculo: formData.get("veiculo") as string,
        ano: formData.get("ano") ? parseInt(formData.get("ano") as string) : null,
        servico: formData.get("servico") as string,
        descricao: formData.get("descricao") as string || null,
        imagens: imagens.length > 0 ? JSON.stringify(imagens) : null,
        status: "PENDENTE",
      },
    });

    return NextResponse.json(orcamento, { status: 201 });
  } catch (error) {
    console.error("Error creating orçamento:", error);
    return NextResponse.json(
      { error: "Erro ao criar orçamento" },
      { status: 500 }
    );
  }
}
