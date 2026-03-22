"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageCircle,
  Phone,
  Car,
} from "lucide-react";

const serviceOptions = [
  "Selecione um serviço",
  "Pintura Completa",
  "Reparação de Arranhões",
  "Polimento",
  "Martelinho de Ouro",
  "Funilaria Artesanal",
  "Outro",
];

const whatsappNumber = "551197249954";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    whatsapp: "",
    email: "",
    veiculo: "",
    ano: "",
    servico: "",
    descricao: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.slice(0, 5 - files.length);
    setFiles((prev) => [...prev, ...newFiles]);

    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  }, [files.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 5 * 1024 * 1024,
    maxFiles: 5 - files.length,
    disabled: files.length >= 5,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.telefone.trim()) newErrors.telefone = "Telefone é obrigatório";
    if (!formData.veiculo.trim()) newErrors.veiculo = "Veículo é obrigatório";
    if (!formData.servico || formData.servico === "Selecione um serviço") {
      newErrors.servico = "Selecione um serviço";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      for (const file of files) {
        formDataToSend.append("images", file);
      }

      const response = await fetch("/api/orcamentos", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Erro ao enviar");

      setSubmitStatus("success");
      setFormData({
        nome: "",
        telefone: "",
        whatsapp: "",
        email: "",
        veiculo: "",
        ano: "",
        servico: "",
        descricao: "",
      });
      setFiles([]);
      setPreviewUrls([]);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="relative py-32 bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-red-950/40 to-transparent blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-sm font-medium mb-6">
            CONTATO
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
            Solicite seu
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400"> orçamento</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Preencha o formulário abaixo e nossa equipe entrará em contato com você 
            em até 24 horas com um orçamento personalizado.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-8 md:p-10 rounded-3xl bg-zinc-900 border border-white/10"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className={`w-full px-5 py-4 rounded-xl bg-zinc-800 border ${
                    errors.nome ? "border-red-500" : "border-white/10"
                  } text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all`}
                />
                {errors.nome && <p className="mt-2 text-sm text-red-400">{errors.nome}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Telefone * <span className="text-zinc-500">(WhatsApp)</span>
                </label>
                <input
                  type="tel"
                  placeholder="(11) 97243-9954"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className={`w-full px-5 py-4 rounded-xl bg-zinc-800 border ${
                    errors.telefone ? "border-red-500" : "border-white/10"
                  } text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all`}
                />
                {errors.telefone && <p className="mt-2 text-sm text-red-400">{errors.telefone}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  WhatsApp <span className="text-zinc-500">(opcional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="(11) 97243-9954"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  E-mail <span className="text-zinc-500">(opcional)</span>
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Veículo *
                </label>
                <div className="relative">
                  <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Ex: Honda Civic Touring"
                    value={formData.veiculo}
                    onChange={(e) => setFormData({ ...formData, veiculo: e.target.value })}
                    className={`w-full pl-12 pr-5 py-4 rounded-xl bg-zinc-800 border ${
                      errors.veiculo ? "border-red-500" : "border-white/10"
                    } text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all`}
                  />
                </div>
                {errors.veiculo && <p className="mt-2 text-sm text-red-400">{errors.veiculo}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Ano <span className="text-zinc-500">(opcional)</span>
                </label>
                <input
                  type="number"
                  placeholder="2024"
                  value={formData.ano}
                  onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Serviço Desejado *
              </label>
              <select
                value={formData.servico}
                onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
                className={`w-full px-5 py-4 rounded-xl bg-zinc-800 border ${
                  errors.servico ? "border-red-500" : "border-white/10"
                } text-white appearance-none cursor-pointer focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all`}
              >
                {serviceOptions.map((option) => (
                  <option key={option} value={option === "Selecione um serviço" ? "" : option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.servico && <p className="mt-2 text-sm text-red-400">{errors.servico}</p>}
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Descrição do Serviço <span className="text-zinc-500">(opcional)</span>
              </label>
              <textarea
                placeholder="Descreva o problema ou serviço que precisa..."
                rows={4}
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all resize-none"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Fotos do Veículo <span className="text-zinc-500">(opcional)</span>
              </label>
              <div
                {...getRootProps()}
                className={`relative p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                  isDragActive
                    ? "border-red-500 bg-red-500/5"
                    : files.length >= 5
                    ? "border-white/10 bg-zinc-800 opacity-50 cursor-not-allowed"
                    : "border-white/10 bg-zinc-800 hover:border-red-500/30"
                }`}
              >
                <input {...getInputProps()} />
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-red-600/10 flex items-center justify-center mx-auto mb-4">
                    {files.length >= 5 ? (
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    ) : (
                      <Upload className="w-8 h-8 text-red-400" />
                    )}
                  </div>
                  <p className="text-zinc-400 mb-1">
                    {isDragActive
                      ? "Solte os arquivos aqui..."
                      : files.length >= 5
                      ? "Máximo de 5 fotos"
                      : "Arraste e solte imagens aqui ou clique para selecionar"}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Máx. 5 arquivos (5MB cada)
                  </p>
                </div>
              </div>

              {previewUrls.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={url} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-xl border border-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3 text-green-400"
              >
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>Orçamento solicitado com sucesso! Entraremos em contato em breve.</span>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Erro ao enviar orçamento. Tente novamente.</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full text-lg py-5 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Solicitar Orçamento
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-600/20 to-green-600/5 border border-green-600/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Prefere WhatsApp?</h3>
                  <p className="text-sm text-zinc-400">Resposta mais rápida</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-600/30 flex items-center justify-center">
                  <Phone className="w-7 h-7 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Ligação</h3>
                  <a href={`tel:+${whatsappNumber}`} className="text-lg text-red-400 font-semibold">
                    (11) 97243-9954
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
              <h3 className="font-bold text-white mb-4">O que acontece depois?</h3>
              <ul className="space-y-3">
                {[
                  "Analisamos seu pedido",
                  "Enviamos um orçamento detalhado",
                  "Você aprova e agendamos",
                  "Seu carro fica novinho!",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                    <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center shrink-0">
                      <span className="text-xs text-red-400 font-bold">{i + 1}</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-white mb-2">Orçamento Sem Compromisso</h3>
              <p className="text-sm text-zinc-400">
                Você não é obrigado a aceitar nosso orçamento. Solicite sem compromisso!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
