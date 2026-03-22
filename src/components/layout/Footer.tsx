"use client";

import Link from "next/link";
import { Car, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Clock, ArrowRight, Lock } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const quickLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#resultados", label: "Resultados" },
  { href: "#sobre", label: "Sobre Nós" },
  { href: "#contato", label: "Contato" },
];

const whatsappNumber = "551197249954";
const phoneNumber = "551197249954";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-red-600/20">
      <div className="container-custom">
        <div className="py-16 border-b border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Pronto para transformar seu veículo?
              </h2>
              <p className="text-zinc-400">
                Solicite um orçamento sem compromisso e conheça nossos serviços.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary inline-flex items-center gap-2"
              >
                Solicitar Orçamento
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="#inicio" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">MALIBU</span>
                <span className="block text-[10px] text-red-500 tracking-[0.2em] -mt-1 font-semibold">AUTOMOTIVA</span>
              </div>
            </Link>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              Especialistas em recuperação automotiva de alta qualidade. Transformamos veículos com excelência e dedicação.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-600 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-zinc-400 hover:text-red-500 transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-500" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Serviços</h3>
            <ul className="space-y-3 text-zinc-400">
              <li>Pintura Completa</li>
              <li>Reparação de Arranhões</li>
              <li>Polimento</li>
              <li>Martelinho de Ouro</li>
              <li>Funilaria Artesanal</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-zinc-400">
                  R. Dom João VI, 28<br />
                  Jd. Victoria, Serpa<br />
                  Caieiras - SP
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <a href={`tel:+${phoneNumber}`} className="text-zinc-400 hover:text-white transition-colors">
                  (11) 97243-9954
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <a href="mailto:contato@malibu.com.br" className="text-zinc-400 hover:text-white transition-colors">
                  contato@malibu.com.br
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-zinc-400">
                  Seg - Sáb: 8h às 18h<br />
                  Dom e Feriados: A combinar
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">
              © 2024 Malibu Automotiva. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm items-center">
              <a href="/login" className="flex items-center gap-2 text-zinc-500 hover:text-red-500 transition-colors">
                <Lock className="w-4 h-4" />
                Área Administrativa
              </a>
              <span className="text-zinc-700">|</span>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
