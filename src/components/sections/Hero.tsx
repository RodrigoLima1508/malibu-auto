"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageCircle,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";

const stats = [
  { icon: Star, value: "5.0", label: "Avaliação Google" },
  { icon: Shield, value: "100%", label: "Garantia" },
];

const highlights = [
  "Funilaria e Pintura Premium",
  "Polimento e Vitrificação",
  "Restauração de Original",
];

const whatsappNumber = "551197249954";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(220,38,38,0.2),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(at_40%_20%,rgba(220,38,38,0.15)_0px,transparent_50%),radial-gradient(at_80%_0%,rgba(220,38,38,0.1)_0px,transparent_50%),radial-gradient(at_0%_50%,rgba(220,38,38,0.08)_0px,transparent_50%)]" />
        
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-red-600/20 to-red-800/10 blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-[5%] w-96 h-96 rounded-full bg-gradient-to-tr from-red-900/15 to-transparent blur-3xl"
      />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="container-custom py-32 lg:py-0 lg:min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30">
                <Star className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-400 font-medium">Referência em recuperação automotiva</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white">
                  Seu carro{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-300">
                    novo de novo
                  </span>
                </h1>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
                  Qualidade e confiança na Malibu Automotiva. Transformamos veículos com excelência, 
                  técnica de ponta e atenção aos detalhes.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {highlights.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-300"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-primary inline-flex items-center justify-center gap-2 text-lg group"
                >
                  Solicitar Orçamento
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                >
                  <MessageCircle className="w-6 h-6" />
                  Falar no WhatsApp
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="text-center md:text-left"
                  >
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                      <stat.icon className="w-5 h-5 text-red-500" />
                      <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-xs text-zinc-500">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="Malibu Automotiva"
                    className="w-full h-full object-contain"
                  />
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.querySelector("#servicos")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-xs text-zinc-500 tracking-wider">ROLE PARA BAIXO</span>
          <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
