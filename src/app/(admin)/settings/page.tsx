"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Bell, Palette, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "security", label: "Segurança", icon: Lock },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "appearance", label: "Aparência", icon: Palette },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
        <p className="text-gray-400 mt-1">
          Gerencie suas preferências e conta
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="lg:w-64 shrink-0">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </Card>

        <div className="flex-1">
          <Card>
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Informações do Perfil
                  </h2>
                  <div className="space-y-4">
                    <Input
                      label="Nome"
                      defaultValue="Administrador"
                    />
                    <Input
                      label="Email"
                      type="email"
                      defaultValue="admin@malibuautomotiva.com.br"
                    />
                    <Input
                      label="Cargo"
                      defaultValue="Administrador"
                      disabled
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button>Salvar Alterações</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Alterar Senha
                  </h2>
                  <div className="space-y-4">
                    <Input
                      label="Senha Atual"
                      type="password"
                      placeholder="••••••••"
                    />
                    <Input
                      label="Nova Senha"
                      type="password"
                      placeholder="••••••••"
                    />
                    <Input
                      label="Confirmar Nova Senha"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button>Atualizar Senha</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Preferências de Notificação
                  </h2>
                  <div className="space-y-4">
                    {[
                      { label: "Novos orçamentos", description: "Receber notificação quando um novo orçamento for criado" },
                      { label: "Status atualizado", description: "Notificar quando o status de um orçamento mudar" },
                      { label: "Relatório diário", description: "Receber resumo diário de atividades" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 rounded-lg bg-white/5"
                      >
                        <div>
                          <p className="font-medium text-white">{item.label}</p>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-background-elevated peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button>Salvar Preferências</Button>
                </div>
              </motion.div>
            )}

            {activeTab === "appearance" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Aparência
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      className="p-4 rounded-xl bg-white/5 border-2 border-primary text-left"
                      onClick={() => document.documentElement.classList.add("dark")}
                    >
                      <div className="w-full h-24 rounded-lg bg-[#0F0F0F] mb-3 flex items-center justify-center">
                        <Moon className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-medium text-white">Dark Mode</p>
                      <p className="text-sm text-gray-400">Recomendado</p>
                    </button>
                    <button
                      className="p-4 rounded-xl bg-white/5 border border-border text-left"
                      onClick={() => document.documentElement.classList.remove("dark")}
                    >
                      <div className="w-full h-24 rounded-lg bg-white mb-3 flex items-center justify-center">
                        <Sun className="w-8 h-8 text-[#FBBF24]" />
                      </div>
                      <p className="font-medium text-white">Light Mode</p>
                      <p className="text-sm text-gray-400">Claro</p>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Moon, Sun } from "lucide-react";
