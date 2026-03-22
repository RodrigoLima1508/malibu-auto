"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Car,
  LayoutDashboard,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/orcamentos", icon: FileText, label: "Orçamentos" },
  { href: "/contabilidade", icon: DollarSign, label: "Contabilidade" },
  { href: "/settings", icon: Settings, label: "Configurações" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/[...nextauth]", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "signout" }),
      });
    } catch (e) {
      console.error("Logout error:", e);
    }
    window.location.href = "/login";
  };

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-black border-b border-red-600/20 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30">
            <Car className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-white">MALIBU</span>
          </div>
        </Link>
        <button
          onClick={onToggle}
          className="p-2 rounded-xl hover:bg-white/5"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-black border-r border-red-600/20 z-50 transition-all duration-300",
          collapsed ? "lg:w-20" : "lg:w-64",
          collapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div
            className={cn(
              "flex items-center gap-3 p-6 border-b border-white/10",
              collapsed && "justify-center"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30 shrink-0">
              <Car className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-lg font-bold text-white">MALIBU</span>
                <span className="block text-[9px] text-red-500 tracking-widest">AUTOMOTIVA</span>
              </div>
            )}
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-red-600/20 to-red-600/10 text-red-500 border border-red-600/30"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.03]",
                    collapsed && "justify-center px-0"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-red-500")} />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 space-y-2 border-t border-white/10">
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full",
                collapsed && "justify-center px-0"
              )}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="font-medium">Sair</span>}
            </button>

            <button
              onClick={onToggle}
              className="hidden lg:flex items-center justify-center w-full py-3 text-zinc-500 hover:text-white transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {collapsed === false && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
        />
      )}
    </>
  );
}
