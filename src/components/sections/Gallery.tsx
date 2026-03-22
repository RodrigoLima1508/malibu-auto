"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    before: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    title: "Pintura Completa",
    description: "Honda Civic - Azul Metálico",
  },
  {
    id: 2,
    before: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",
    title: "Polimento Técnico",
    description: "Mercedes-Benz C300",
  },
  {
    id: 3,
    before: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop",
    title: "Funilaria e Pintura",
    description: "BMW X3 - Para-choque",
  },
  {
    id: 4,
    before: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop",
    title: "Vitrificação",
    description: "Audi Q5 - Proteção Cerâmica",
  },
  {
    id: 5,
    before: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop",
    title: "Recuperação Total",
    description: "Volkswagen Amarok",
  },
  {
    id: 6,
    before: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
    title: "Antes e Depois",
    description: "Toyota Corolla - Brilho Perfeito",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [showAfter, setShowAfter] = useState(true);

  const handlePrev = () => {
    if (selectedImage) {
      const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage.id);
      const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
      setSelectedImage(galleryImages[prevIndex]);
      setShowAfter(true);
    }
  };

  const handleNext = () => {
    if (selectedImage) {
      const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage.id);
      const nextIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
      setSelectedImage(galleryImages[nextIndex]);
      setShowAfter(true);
    }
  };

  return (
    <section id="galeria" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Portfólio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Nossos Trabalhos
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Confira alguns dos nossos projetos mais recentes e veja a qualidade do nosso trabalho.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, i) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => {
                setSelectedImage(image);
                setShowAfter(true);
              }}
            >
              <img
                src={image.after}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-2">
                  Depois
                </span>
                <h3 className="text-lg font-bold text-white">{image.title}</h3>
                <p className="text-gray-300 text-sm">{image.description}</p>
              </div>

              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <span className="text-white font-bold">+</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 w-full max-w-4xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
              <img
                src={showAfter ? selectedImage.after : selectedImage.before}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setShowAfter(!showAfter)}
                className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                {showAfter ? "Ver Antes" : "Ver Depois"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
              <p className="text-gray-400">{selectedImage.description}</p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
