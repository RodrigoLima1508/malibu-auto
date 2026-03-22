import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST() {
  try {
    const hashedPassword = await bcrypt.hash("malibu2024", 12);

    const existingUser = await prisma.user.findUnique({
      where: { email: "admin@malibuautomotiva.com.br" },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const admin = await prisma.user.create({
      data: {
        email: "admin@malibuautomotiva.com.br",
        password: hashedPassword,
        name: "Administrador",
        role: "ADMIN",
      },
    });

    return NextResponse.json({ 
      message: "Admin created successfully",
      email: admin.email 
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Error creating admin" },
      { status: 500 }
    );
  }
}
