import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "role" TEXT NOT NULL DEFAULT 'ADMIN',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Orcamento" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "nome" TEXT NOT NULL,
        "telefone" TEXT NOT NULL,
        "whatsapp" TEXT,
        "email" TEXT,
        "veiculo" TEXT NOT NULL,
        "ano" INTEGER,
        "servico" TEXT NOT NULL,
        "descricao" TEXT,
        "imagens" TEXT,
        "valorTotal" DOUBLE PRECISION,
        "itens" TEXT,
        "status" TEXT NOT NULL DEFAULT 'PENDENTE',
        "statusPagamento" TEXT NOT NULL DEFAULT 'AGUARDANDO_APROVACAO',
        "observacoesFinanceiro" TEXT,
        "dataAprovacao" TIMESTAMP(3),
        "dataPagamento" TIMESTAMP(3),
        "enviadoAoCliente" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Observacao" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "orcamentoId" TEXT NOT NULL,
        "texto" TEXT NOT NULL,
        "createdBy" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Observacao_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "Orcamento"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "ServicoRealizado" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "veiculo" TEXT NOT NULL,
        "ano" INTEGER,
        "servico" TEXT NOT NULL,
        "descricao" TEXT,
        "valor" DOUBLE PRECISION NOT NULL,
        "tipo" TEXT NOT NULL,
        "categoria" TEXT NOT NULL,
        "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      );
    `;

    const hashedPassword = await bcrypt.hash("malibu2024", 12);
    
    await prisma.$executeRaw`
      INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
      VALUES (
        ${crypto.randomUUID()},
        'admin@malibuautomotiva.com.br',
        ${hashedPassword},
        'Administrador',
        'ADMIN',
        NOW(),
        NOW()
      )
      ON CONFLICT (email) DO NOTHING;
    `;

    return NextResponse.json({ 
      message: "Banco de dados configurado com sucesso!",
      status: "ready"
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao configurar banco" },
      { status: 500 }
    );
  }
}
