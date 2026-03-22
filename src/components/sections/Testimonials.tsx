"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, MessageCircle } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marcos Oliveira",
    role: "Proprietário BMW X5",
    rating: 5,
    text: "Serviço impecável! Minha BMW ficou melhor do que quando saiu da concessionária. Equipe muito profissional e atendimento de primeira. Recomendo demais!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    vehicle: "BMW X5 xDrive40i",
    service: "Pintura completa",
  },
  {
    id: 2,
    name: "Fernanda Silva",
    role: "Proprietária Audi A4",
    rating: 5,
    text: "Fiz polimento e vitrificação no meu Audi. O resultado superou todas as expectativas. Agora o carro brilha de verdade! Equipe muito atenciosa.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    vehicle: "Audi A4 45 TFSI",
    service: "Polimento + Vitrificação",
  },
  {
    id: 3,
    name: "Ricardo Santos",
    role: "Gerente de Frota",
    rating: 5,
    text: "Contratamos a Malibu para cuidar da nossa frota de 15 veículos. Economia de 40% comparado às concessionárias e qualidade superior. Parceria perfeita!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    vehicle: "Diversos veículos",
    service: "Manutenção de frota",
  },
  {
    id: 4,
    name: "Carla Mendes",
    role: "Proprietária Mercedes C300",
    rating: 5,
    text: "Tive um amassado no para-choque e resolvi vim na Malibu. Repararam em 2 dias com um preço justo. Superou minhas expectativas!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    vehicle: "Mercedes-Benz C300",
    service: "Funilaria",
  },
  {
    id: 5,
    name: "Pedro Henrique",
    role: "Proprietário Porsche 911",
    rating: 5,
    text: "Procuro a Malibu para qualquer serviço no meu Porsche. Atenção aos detalhes impecável e comunicação excelente durante todo o processo.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    vehicle: "Porsche 911 Carrera",
    service: "Polimento técnico",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const prev = () => {
    setIsAutoPlay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setIsAutoPlay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-red-950/30 via-red-900/20 to-red-950/30 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-sm font-medium mb-6">
            AVALIAÇÕES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
            O que nossos
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400"> clientes dizem</span>
          </h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 mt-4"
          >
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-400">487 avaliações</p>
              </div>
            </div>
            <div className="text-left pl-4 border-l border-white/10">
              <p className="text-3xl font-bold text-white">4.9</p>
              <p className="text-sm text-green-400">Excelente</p>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${current * 100}%` }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full shrink-0 px-4">
                  <div className="relative p-8 md:p-12 rounded-3xl bg-zinc-900 border border-white/10">
                    <Quote className="absolute top-8 right-8 w-16 h-16 text-red-600/10" />
                    
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="shrink-0">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-20 h-20 rounded-2xl object-cover border-2 border-red-600/30"
                        />
                        <div className="flex items-center justify-center gap-0.5 mt-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-6">
                          "{testimonial.text}"
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4">
                          <div>
                            <p className="font-semibold text-white">{testimonial.name}</p>
                            <p className="text-sm text-zinc-500">{testimonial.role}</p>
                          </div>
                          <div className="h-8 w-px bg-white/10 hidden md:block" />
                          <div>
                            <p className="text-sm text-zinc-400">Veículo</p>
                            <p className="text-sm font-medium text-red-400">{testimonial.vehicle}</p>
                          </div>
                          <div>
                            <p className="text-sm text-zinc-400">Serviço</p>
                            <p className="text-sm font-medium text-red-400">{testimonial.service}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setCurrent(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-red-600" : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
