"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Reparação de Arranhões",
    vehicle: "Chevrolet Astra",
    year: 2018,
    service: "Reparação de Arranhões",
    category: "reparacao-arranhoes",
    beforeImage: "/servicos/astra antes.png",
    afterImage: "/servicos/astra depois.png",
    description: "Remoção de arranhões e imperfeições na pintura.",
  },
  {
    id: 2,
    title: "Pintura Completa",
    vehicle: "Renault Kwid",
    year: 2023,
    service: "Pintura Completa",
    category: "pintura-completa",
    beforeImage: "/servicos/kwid antes.jpeg",
    afterImage: "/servicos/kwid depois.jpeg",
    description: "Pintura profissional para veículos, com acabamento impecável.",
  },
  {
    id: 3,
    title: "Funilaria Artesanal",
    vehicle: "Chevrolet Spin",
    year: 2020,
    service: "Funilaria Artesanal",
    category: "funilaria-artesanal",
    beforeImage: "/servicos/spin antes.jpeg",
    afterImage: "/servicos/spin depois.jpeg",
    description: "Recuperamos a estrutura e a aparência do seu veículo com técnicas detalhadas.",
  },
];

const categories = [
  { id: "all", label: "Todos" },
  { id: "pintura-completa", label: "Pintura Completa" },
  { id: "reparacao-arranhoes", label: "Reparação de Arranhões" },
  { id: "funilaria-artesanal", label: "Funilaria Artesanal" },
];

export default function Results() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showLabel, setShowLabel] = useState<"antes" | "depois">("depois");
  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
    setShowLabel(position < 50 ? "antes" : "depois");
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  }, [updateSliderPosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  }, [isDragging, updateSliderPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  }, [updateSliderPosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e.touches[0].clientX);
  }, [isDragging, updateSliderPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <section id="resultados" className="relative py-32 bg-zinc-950">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-t from-red-950/20 to-transparent blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-sm font-medium mb-6">
            RESULTADOS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
            Transformações que
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400"> impressionam</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Confira alguns dos nossos projetos mais recentes e veja a qualidade do nosso trabalho.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                  : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                  setSliderPosition(50);
                }}
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
                  {/* After Image (background) */}
                  <img
                    src={project.afterImage}
                    alt="Depois"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Before Image (clipped) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={project.beforeImage}
                      alt="Antes"
                      className="absolute inset-0 h-full object-cover"
                      style={{ width: `${100 / (sliderPosition / 100)}%`, minWidth: "0" }}
                    />
                  </div>

                  {/* Slider Line */}
                  <div
                    ref={sliderRef}
                    className={`absolute inset-y-0 z-20 ${isDragging ? "cursor-ew-resize" : ""}`}
                    style={{ left: `${sliderPosition}%`, width: "4px" }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-white rounded-full shadow-lg" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center">
                      <div className="flex items-center">
                        <ChevronLeft className="w-4 h-4 text-gray-800" />
                        <ChevronRight className="w-4 h-4 text-gray-800" />
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-xs font-bold text-white border border-white/20 transition-opacity duration-200" style={{ opacity: showLabel === "antes" ? 1 : 0.5 }}>
                    ANTES
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-red-600 text-xs font-bold text-white transition-opacity duration-200" style={{ opacity: showLabel === "depois" ? 1 : 0.5 }}>
                    DEPOIS
                  </div>

                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-lg font-bold text-white">{project.title}</p>
                    <p className="text-sm text-zinc-300">{project.vehicle} ({project.year})</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl bg-zinc-900 rounded-3xl overflow-hidden border border-white/10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-3 rounded-xl bg-black/50 hover:bg-black/70 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid lg:grid-cols-2">
                {/* Image Comparison */}
                <div className="relative aspect-[4/3] lg:aspect-auto cursor-ew-resize"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* After */}
                  <img
                    src={selectedProject.afterImage}
                    alt="Depois"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Before */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={selectedProject.beforeImage}
                      alt="Antes"
                      className="absolute inset-0 h-full object-cover"
                      style={{ width: `${100 / (sliderPosition / 100)}%`, minWidth: "0" }}
                    />
                  </div>

                  {/* Slider */}
                  <div
                    className="absolute inset-y-0"
                    style={{ left: `${sliderPosition}%`, width: "4px" }}
                  >
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-white shadow-lg" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center">
                      <div className="flex items-center">
                        <ChevronLeft className="w-5 h-5 text-gray-800" />
                        <ChevronRight className="w-5 h-5 text-gray-800" />
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-4 left-4 px-4 py-2 rounded-lg bg-black/60 backdrop-blur-sm text-sm font-bold text-white border border-white/20">
                    ANTES
                  </div>
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-red-600 text-sm font-bold text-white">
                    DEPOIS
                  </div>

                  {/* Quick Buttons */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSliderPosition(0); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        sliderPosition < 10 ? "bg-white text-black" : "bg-black/50 text-white hover:bg-black/70"
                      }`}
                    >
                      100% Antes
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSliderPosition(100); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        sliderPosition > 90 ? "bg-white text-black" : "bg-black/50 text-white hover:bg-black/70"
                      }`}
                    >
                      100% Depois
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-red-600/20 border border-red-600/30 text-red-400 text-xs font-medium mb-4 w-fit">
                    {selectedProject.service}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-lg text-zinc-400 mb-6">{selectedProject.vehicle} ({selectedProject.year})</p>
                  <p className="text-zinc-300 leading-relaxed">{selectedProject.description}</p>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="btn-primary w-full"
                    >
                      Quero um orçamento igual
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
                    const prevIndex = currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1;
                    setSelectedProject(filteredProjects[prevIndex]);
                    setSliderPosition(50);
                  }}
                  className="p-3 rounded-xl bg-black/50 hover:bg-black/70 text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
                    const nextIndex = currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1;
                    setSelectedProject(filteredProjects[nextIndex]);
                    setSliderPosition(50);
                  }}
                  className="p-3 rounded-xl bg-black/50 hover:bg-black/70 text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
