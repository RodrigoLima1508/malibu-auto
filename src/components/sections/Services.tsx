"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  Paintbrush,
  Sparkles,
  Shield,
  Droplet,
  Check,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: 1,
    icon: Paintbrush,
    title: "Pintura Completa",
    description: "Pintura profissional para veículos, com acabamento impecável.",
    features: ["Acabamento perfeito", "Tecnologia avançada", "Verniz cristalino", "Durabilidade"],
    popular: true,
    image: "https://images.unsplash.com/photo-1486551937199-baf066858de7?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Reparação de Arranhões",
    description: "Remoção de arranhões e imperfeições na pintura.",
    features: ["Microarranhões", "Imperfeições", "Restauração", "Resultado perfeito"],
    popular: true,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    icon: Shield,
    title: "Polimento",
    description: "Técnicas para proteção da pintura.",
    features: ["Proteção da pintura", "Brilho intenso", "Camada protetora", "Durabilidade"],
    popular: false,
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    icon: Car,
    title: "Martelinho de Ouro",
    description: "Removemos amassados sem danificar a pintura original.",
    features: ["Sem pintura", "Preserva original", "Técnica profissional", "Resultado perfeito"],
    popular: true,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    icon: Droplet,
    title: "Funilaria Artesanal",
    description: "Recuperamos a estrutura e a aparência do seu veículo com técnicas detalhadas.",
    features: ["Recuperação estrutural", "Técnicas detalhadas", "Acabamento artesanal", "Precisão"],
    popular: false,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop",
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section id="servicos" className="relative py-32 bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-red-950/30 to-transparent blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-sm font-medium mb-6">
            NOSSOS SERVIÇOS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
            Excelência em cada
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400"> detalhe</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Oferecemos uma gama completa de serviços de recuperação e estética automotiva 
            com qualidade premium e garantia de satisfação.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${
                activeService === service.id ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="relative h-full bg-zinc-900 border border-white/10 rounded-3xl transition-all duration-500 group-hover:border-red-600/50 group-hover:bg-zinc-800">
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold shadow-lg shadow-red-600/25">
                      MAIS PROCURADO
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-600/30 flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-xs text-zinc-500">
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-red-600 hover:border-red-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    Solicitar Orçamento
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-600/10 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-400 mb-6">
            Não encontrou o que precisa? Entre em contato para um orçamento personalizado.
          </p>
          <button
            onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-secondary inline-flex items-center gap-2"
          >
            Falar com um especialista
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
