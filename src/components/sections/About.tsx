"use client";

import { motion } from "framer-motion";
import { Award, Users, Target, Heart, CheckCircle, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Qualidade",
    description: "Compromisso constante em entregar os melhores resultados com atenção aos detalhes.",
  },
  {
    icon: Users,
    title: "Confiança",
    description: "A satisfação do cliente é nossa maior recompensa e o objetivo principal.",
  },
  {
    icon: Target,
    title: "Preço Justo",
    description: "Preços abaixo do mercado, garantindo excelente custo-benefício.",
  },
  {
    icon: Heart,
    title: "Dedicação",
    description: "Equipe capacitada e apaixonada pelo que faz, com serviços de alto padrão.",
  },
];

const highlights = [
  "Funcionamos aos fins de semana e feriados",
  "Produtos de qualidade comprovada",
  "Técnicas atualizadas e modernas",
  "Preços abaixo do mercado",
  "Atendimento dedicado e personalizado",
  "Equipe capacitada e apaixonada",
];

export default function About() {
  return (
    <section id="sobre" className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-red-950/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-t from-red-950/30 to-transparent blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-red-600/20 to-red-800/10 flex items-center justify-center min-h-[160px]">
                  <div className="text-center p-4">
                    <span className="text-3xl font-bold text-white">Atendemos</span>
                    <p className="text-sm text-zinc-400 mt-2">Fins de semana e feriados</p>
                  </div>
                </div>
                <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center min-h-[160px]">
                  <div className="text-center">
                    <span className="text-4xl font-bold text-red-500">★5.0</span>
                    <p className="text-sm text-zinc-400 mt-2">Avaliação Google</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center min-h-[160px]">
                  <div className="text-center">
                    <span className="text-4xl font-bold text-red-500">100%</span>
                    <p className="text-sm text-zinc-400 mt-2">Satisfação</p>
                  </div>
                </div>
                <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center min-h-[160px]">
                  <div className="text-center">
                    <span className="text-4xl font-bold text-red-500">Diversos</span>
                    <p className="text-sm text-zinc-400 mt-2">Clientes atendidos</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-sm font-medium mb-6">
              SOBRE NÓS
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
              Excelência e qualidade em
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400"> cada detalhe</span>
            </h2>

            <div className="space-y-6 text-zinc-400 leading-relaxed mb-8">
              <p>
                A Malibu Reparação Automotiva é referência em qualidade, confiança e excelência quando o assunto é cuidado com o seu veículo. Com um compromisso constante em entregar os melhores resultados, a empresa se destaca pela atenção aos detalhes, atendimento dedicado e serviços realizados com alto padrão profissional.
              </p>
              <p>
                Pensando na praticidade e na rotina dos clientes, funcionamos aos fins de semana e feriados, oferecendo flexibilidade e conveniência para quem precisa cuidar do carro sem comprometer os compromissos do dia a dia.
              </p>
              <p>
                Com uma equipe capacitada e apaixonada pelo que faz, a empresa oferece uma ampla variedade de serviços, sempre utilizando produtos de qualidade e técnicas atualizadas. Tudo isso com um diferencial importante: preços abaixo do mercado, garantindo um excelente custo-benefício sem abrir mão da qualidade.
              </p>
              <p>
                Seja para manutenção, estética automotiva ou cuidados gerais, a Malibu Automotiva é a escolha certa para quem busca confiança, eficiência e resultados que fazem a diferença.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-sm text-zinc-300">{item}</span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary inline-flex items-center gap-2"
            >
              Solicite seu orçamento
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900 border border-white/10 hover:border-red-600/50 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-600/30 flex items-center justify-center mb-4 group-hover:bg-red-600/20 transition-colors">
                <value.icon className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
