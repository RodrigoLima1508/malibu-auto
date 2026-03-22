import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("malibu2024", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@malibuautomotiva.com.br" },
    update: {},
    create: {
      email: "admin@malibuautomotiva.com.br",
      password: hashedPassword,
      name: "Administrador",
      role: "ADMIN",
    },
  });

  console.log("Admin created:", admin.email);

  const servicos = [
    {
      veiculo: "BMW X3 xDrive30i",
      ano: 2022,
      servico: "Pintura completa para-choque dianteiro",
      descricao: "Reparo de amassado e pintura completa",
      valor: 3500,
      tipo: "ENTRADA",
      categoria: "Serviço",
      data: new Date("2024-01-15"),
    },
    {
      veiculo: "Mercedes-Benz C300",
      ano: 2021,
      servico: "Polimento técnico completo",
      descricao: "Polimento de três estágios + cristalização",
      valor: 2800,
      tipo: "ENTRADA",
      categoria: "Serviço",
      data: new Date("2024-01-18"),
    },
    {
      veiculo: "Audi Q5",
      ano: 2023,
      servico: "Vitrificação de pintura",
      descricao: "Aplicação de coating cerâmico",
      valor: 4500,
      tipo: "ENTRADA",
      categoria: "Serviço",
      data: new Date("2024-01-20"),
    },
    {
      veiculo: "Volkswagen Polo",
      ano: 2020,
      servico: "Funilaria - Lataria",
      descricao: "Troca de componentes danificados",
      valor: 1800,
      tipo: "ENTRADA",
      categoria: "Serviço",
      data: new Date("2024-01-22"),
    },
    {
      veiculo: "Toyota Corolla",
      ano: 2022,
      servico: "Pintura de capô",
      descricao: "Reparo e pintura局部",
      valor: 2200,
      tipo: "ENTRADA",
      categoria: "Serviço",
      data: new Date("2024-02-01"),
    },
  ];

  for (const servico of servicos) {
    await prisma.servicoRealizado.create({ data: servico });
  }

  console.log("Sample services created:", servicos.length);

  const orcamentos = [
    {
      nome: "Carlos Eduardo Silva",
      telefone: "(11) 98765-4321",
      whatsapp: "(11) 98765-4321",
      email: "carlos@email.com",
      veiculo: "Honda Civic Touring",
      ano: 2023,
      servico: "Pintura",
      descricao: "Arranhão profundo no para-choque traseiro. Preciso de orçamento para reparo e pintura completa.",
      status: "PENDENTE",
    },
    {
      nome: "Ana Paula Ferreira",
      telefone: "(11) 91234-5678",
      whatsapp: "(11) 91234-5678",
      email: "ana.paula@email.com",
      veiculo: "Ford Ranger XLS",
      ano: 2022,
      servico: "Funilaria",
      descricao: "Amassado na porta esquerda. Busco qualidade na reparação.",
      status: "EM_ANALISE",
    },
    {
      nome: "Roberto Mendes",
      telefone: "(11) 99876-5432",
      email: "rmendes@email.com",
      veiculo: "Chevrolet Onix LTZ",
      ano: 2021,
      servico: "Polimento",
      descricao: "Veículo com oxidação leve. Gostaria de polimento e cristalização.",
      status: "APROVADO",
    },
    {
      nome: "Juliana Costa",
      telefone: "(11) 95555-1234",
      whatsapp: "(11) 95555-1234",
      email: "juliana.costa@email.com",
      veiculo: "Hyundai Creta Ultimate",
      ano: 2024,
      servico: "Vitrificação",
      descricao: "Veículo novo, quero proteger a pintura com vitrificação.",
      status: "FINALIZADO",
    },
  ];

  for (const orcamento of orcamentos) {
    await prisma.orcamento.create({ data: orcamento });
  }

  console.log("Sample budgets created:", orcamentos.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
