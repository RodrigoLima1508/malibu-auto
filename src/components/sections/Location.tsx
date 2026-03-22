"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle, ExternalLink } from "lucide-react";

const whatsappNumber = "551197249954";
const phoneNumber = "551197249954";

export default function Location() {
  return (
    <section id="localizacao" className="relative py-32 bg-zinc-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-sm font-medium mb-6">
            LOCALIZAÇÃO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
            Venha nos
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400"> visitar</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Estamos localizados em uma região de fácil acesso. Agende uma visita e conheça 
            nossas instalações!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-3xl overflow-hidden border border-white/10 h-[400px] lg:h-[500px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.8937553198845!2d-46.74768562381087!3d-23.38576586128438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cebf3d3d3d3d3d%3A0x3d3d3d3d3d3d3d3d!2sR.%20Dom%20Jo%C3%A3o%20VI%2C%2028%20-%20Jardim%20Victoria%2C%20Caieiras%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Endereço</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    R. Dom João VI, 28<br />
                    Jardim Victoria, Serpa<br />
                    Caieiras - SP
                  </p>
                  <a
                    href="https://maps.google.com/?q=R+Dom+Joao+VI+28+Jardim+Victoria+Caieiras+SP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Abrir no Google Maps
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-600/10 border border-green-600/30 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Telefone</h3>
                  <a href={`tel:+${phoneNumber}`} className="text-zinc-400 hover:text-white transition-colors">
                    (11) 97243-9954
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-600/30 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">E-mail</h3>
                  <p className="text-zinc-400 text-sm">contato@malibuautomotiva.com.br</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-600/10 border border-amber-600/30 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2">Horário de Funcionamento</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Segunda - Sexta</span>
                      <span className="text-white font-medium">08:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Sábado</span>
                      <span className="text-white font-medium">08:00 - 12:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Domingo</span>
                      <span className="text-red-400 font-medium">Fechado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
            >
              <MessageCircle className="w-6 h-6" />
              Fale conosco pelo WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
