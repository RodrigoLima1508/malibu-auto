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
        "createdAt" TEXT NOT NULL,
        "updatedAt" TEXT NOT NULL
      )
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
        "valorTotal" REAL,
        "itens" TEXT,
        "status" TEXT NOT NULL DEFAULT 'PENDENTE',
        "statusPagamento" TEXT NOT NULL DEFAULT 'AGUARDANDO_APROVACAO',
        "observacoesFinanceiro" TEXT,
        "dataAprovacao" TEXT,
        "dataPagamento" TEXT,
        "enviadoAoCliente" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TEXT NOT NULL,
        "updatedAt" TEXT NOT NULL
      )
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Observacao" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "orcamentoId" TEXT NOT NULL,
        "texto" TEXT NOT NULL,
        "createdBy" TEXT NOT NULL,
        "createdAt" TEXT NOT NULL,
        FOREIGN KEY ("orcamentoId") REFERENCES "Orcamento"("id") ON DELETE CASCADE
      )
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "ServicoRealizado" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "veiculo" TEXT NOT NULL,
        "ano" INTEGER,
        "servico" TEXT NOT NULL,
        "descricao" TEXT,
        "valor" REAL NOT NULL,
        "tipo" TEXT NOT NULL,
        "categoria" TEXT NOT NULL,
        "data" TEXT NOT NULL,
        "createdAt" TEXT NOT NULL,
        "updatedAt" TEXT NOT NULL
      )
    `;

    const hashedPassword = await bcrypt.hash("malibu2024", 12);
    const now = new Date().toISOString();
    
    await prisma.$executeRaw`
      INSERT INTO "User" ("id", "email", "password", "name", "role", "createdAt", "updatedAt")
      VALUES (
        ${crypto.randomUUID()},
        'admin@malibuautomotiva.com.br',
        ${hashedPassword},
        'Administrador',
        'ADMIN',
        ${now},
        ${now}
      )
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
