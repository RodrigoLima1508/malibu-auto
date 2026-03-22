"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  ChevronRight,
  Car,
  MessageCircle,
  Mail,
} from "lucide-react";

const navigation = [
  { name: "Início", href: "#inicio" },
  { name: "Serviços", href: "#servicos" },
  { name: "Resultados", href: "#resultados" },
  { name: "Sobre", href: "#sobre" },
  { name: "Localização", href: "#localizacao" },
];

const whatsappNumber = "551197249954";
const phoneNumber = "551197249954";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navigation.map((n) => n.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-red-600/20"
            : "bg-transparent"
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-20">
            <Link href="#inicio" className="flex items-center gap-3 group">
              <div>
                <span className="text-xl font-bold tracking-tight text-white">MALIBU</span>
                <span className="block text-[10px] text-red-500 tracking-[0.2em] -mt-1 font-semibold">AUTOMOTIVA</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "bg-red-600 text-white"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <button
                onClick={() => scrollToSection("#contato")}
                className="btn-primary !py-3 !px-6 !text-sm"
              >
                Solicitar Orçamento
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-black border-l border-red-600/20"
            >
              <div className="p-6 pt-24 space-y-2">
                {navigation.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollToSection(item.href)}
                    className="w-full flex items-center justify-between px-5 py-4 rounded-xl text-left text-lg font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {item.name}
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100" />
                  </motion.button>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 space-y-3"
                >
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-green-600 text-white font-semibold"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Falar no WhatsApp
                  </a>
                  <button
                    onClick={() => scrollToSection("#contato")}
                    className="w-full py-4 rounded-xl border border-red-500/50 text-white font-semibold hover:bg-red-600/20 transition-colors"
                  >
                    Solicitar Orçamento
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-6 border-t border-white/10"
                >
                  <div className="space-y-3 text-sm text-zinc-500">
                    <a href={`tel:+${phoneNumber}`} className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-red-500" />
                      (11) 97243-9954
                    </a>
                    <a href="mailto:contato@malibu.com.br" className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-red-500" />
                      contato@malibu.com.br
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
