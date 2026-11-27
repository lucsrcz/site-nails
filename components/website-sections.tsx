"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Award,
  Check,
  Calendar,
  Instagram,
  Phone,
  ArrowRight,
  ShieldCheck,
  X,
  ChevronDown,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { POLICY_SECTIONS } from "@/components/privacy-content";

const GEL_SERVICES = [
  {
    id: "unhas-simples",
    name: "Unhas Simples",
    tag: "Cuidados Essenciais",
    image: "/servico-simples.jpg",
    imageAlt: "Unhas amendoadas em esmaltação vinho brilhante",
    description:
      "Cuidado completo para mãos e pés com cuticulagem precisa, hidratação e esmaltação impecável.",
    items: [
      { name: "Mão", price: "R$ 35,00", spec: "Cuticulagem, lixamento e esmaltação" },
      { name: "Pé", price: "R$ 35,00", spec: "Cuticulagem, lixamento e esmaltação" },
      { name: "Mão e Pé", price: "R$ 60,00", spec: "Combo completo mãos e pés" },
    ],
  },
  {
    id: "aplicacao",
    name: "Aplicação",
    tag: "Estrutura em Gel",
    image: "/servico-aplicacao.jpg",
    imageAlt: "Unhas quadradas vermelhas em gel com detalhe em glitter",
    description:
      "Alongamento e proteção em gel com naturalidade, resistência e acabamento sofisticado.",
    items: [
      {
        name: "Alongamento",
        price: "R$ 150,00",
        spec: "Estrutura resistente com acabamento natural",
      },
      {
        name: "Banho de Gel",
        price: "R$ 120,00",
        spec: "Camada protetora sobre a unha natural",
      },
    ],
  },
  {
    id: "decoracao",
    name: "Decoração",
    tag: "Nail Art",
    image: "/servico-decoracao.jpg",
    imageAlt: "Unhas decoradas com francesinha, glitter rosado e laços 3D",
    description:
      "Técnicas artísticas e acabamentos exclusivos para personalizar suas unhas com elegância.",
    items: [
      { name: "Francesinha", price: "R$ 30,00" },
      { name: "Pó Cromado", price: "R$ 30,00" },
      { name: "Esmaltação em Gel", price: "R$ 30,00" },
      { name: "Baby Boomer", price: "R$ 30,00" },
      { name: "Baby Color", price: "R$ 30,00" },
      { name: "Baby Gliter (o par)", price: "R$ 30,00" },
      { name: "Encapsulados (o par)", price: "R$ 30,00" },
    ],
  },
];

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const LOCATION_URL =
  "https://maps.google.com/maps?q=-16.172563552856445%2C-47.927513122558594&z=17&hl=pt-BR";

const COURSES = [
  {
    id: "florescendo-molde-f1",
    name: "Florescendo no Molde F1",
    duration: "1 dia inteiro • Presencial",
    price: "R$ 1.100,00",
    paymentNote:
      "Entrada de R$ 150,00 para confirmar inscrição e restante parcelado no cartão de crédito.",
    image: `${BASE_PATH}/curso-florescendo.jpg`,
    description:
      "Um dia inteiro presencial com foco na técnica de molde F1, ensinando todo o passo a passo para desenvolver uma aplicação com segurança, técnica e excelência — para sair preparada, confiante e pronta para dar os primeiros passos na profissão.",
    schedule: [
      "Coffee break especial pela manhã",
      "1h30 de intervalo para o almoço",
      "Encerramento conforme o aproveitamento da aluna",
      "Bônus: técnica de fibra de vidro sem custo adicional",
      "Suporte vitalício após a conclusão do curso",
    ],
    highlights: ["Bônus Fibra de Vidro", "Suporte Vitalício", "Coffee Break"],
  },
  {
    id: "curso-aperfeicoamento",
    name: "Aperfeiçoamento no Molde F1 & Fibra",
    duration: "1 dia • Presencial",
    price: "R$ 800,00",
    paymentNote:
      "Consulte condições de reserva e parcelamento diretamente pelo WhatsApp.",
    image: `${BASE_PATH}/curso-aperfeicoamento.jpg`,
    description:
      "Indicado para profissionais que já atendem e desejam elevar o padrão do acabamento: controle de produto, curvatura anatômica, redução do tempo em mesa, eliminação de descolamentos e naturalidade impecável.",
    schedule: [
      "Diagnóstico individual de técnica e lixamento",
      "Prática intensiva de simetria, curvatura e naturalidade",
      "Estratégias para agilidade e rentabilidade em mesa",
      "Acompanhamento próximo durante todo o dia",
    ],
    highlights: ["1 Dia Intensivo", "Foco em Naturalidade", "Acompanhamento Próximo"],
  },
];

export default function WebsiteSections() {
  const [selectedTopic, setSelectedTopic] = useState("Unhas Simples");
  const [openServiceIds, setOpenServiceIds] = useState<string[]>([]);
  const [openCourseIds, setOpenCourseIds] = useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activePolicyId, setActivePolicyId] = useState<string | null>(null);
  const activePolicy = POLICY_SECTIONS.find((s) => s.id === activePolicyId) ?? null;

  const toggleService = (id: string) => {
    setOpenServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleCourse = (id: string) => {
    setOpenCourseIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const navigateToServiceCard = (id: string) => {
    setOpenServiceIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    const el = document.getElementById(`card-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const navigateToCourses = () => {
    const el = document.getElementById("cursos");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navigateToConsultoria = () => {
    setSelectedTopic("Consultoria Personalizada");
    const el = document.getElementById("agendar");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const WHATSAPP_NUMBER = "5562992118416";

  const buildWhatsAppUrl = (text: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;
    const message = `Oi, Nayara! Me chamo ${clientName.trim()} (WhatsApp: ${clientPhone.trim()}). Gostaria de agendar: ${selectedTopic}${
      preferredDate ? ` para o dia ${preferredDate}` : ""
    }.`;
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-ink">
      {/* Pink-to-Gold Gradient Section Divider */}
      <div className="line-pink-gold h-[2px] w-full" aria-hidden="true" />

      {/* Seção 1: Serviços de Unhas em Gel */}
      <section id="unhas-em-gel" className="mx-auto max-w-5xl px-5 py-14 md:py-20">
        <div className="mb-8 flex flex-nowrap items-center justify-center gap-1 text-[9.5px] font-semibold tracking-tight text-ink-muted sm:gap-2.5 sm:text-xs sm:tracking-wide">
          {GEL_SERVICES.map((srv) => {
            const isOpen = openServiceIds.includes(srv.id);
            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => navigateToServiceCard(srv.id)}
                className={`btn-liquid-glass min-h-[32px] shrink-0 cursor-pointer rounded-full px-2 py-1 text-center whitespace-nowrap sm:min-h-[40px] sm:px-4 sm:py-1.5 ${
                  isOpen
                    ? "!border-[#fc6998]/60 !bg-[#fff0f5]/85 text-[#fc6998]"
                    : "text-ink"
                }`}
              >
                {srv.name}
              </button>
            );
          })}
          <button
            type="button"
            onClick={navigateToCourses}
            className="btn-liquid-glass min-h-[32px] shrink-0 cursor-pointer rounded-full px-2 py-1 text-center whitespace-nowrap text-ink sm:min-h-[40px] sm:px-4 sm:py-1.5"
          >
            Cursos
          </button>
          <button
            type="button"
            onClick={navigateToConsultoria}
            className="btn-liquid-glass min-h-[32px] shrink-0 cursor-pointer rounded-full px-2 py-1 text-center whitespace-nowrap text-ink sm:min-h-[40px] sm:px-4 sm:py-1.5"
          >
            Consultoria
          </button>
        </div>
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[#fc6998] uppercase">
              Serviços &amp; Valores
            </p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Nossos Serviços
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
            Toque em cada serviço para abrir a tabela completa de valores e
            especificações.
          </p>
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-2 md:grid-cols-3">
          {GEL_SERVICES.map((srv) => {
            const isOpen = openServiceIds.includes(srv.id);
            return (
              <article
                id={`card-${srv.id}`}
                key={srv.id}
                className={`border-pink-gold flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  isOpen ? "ring-2 ring-[#fc6998]/30 shadow-md" : ""
                }`}
              >
                <div>
                  <button
                    type="button"
                    onClick={() => toggleService(srv.id)}
                    aria-expanded={isOpen}
                    className="group w-full cursor-pointer text-left focus:outline-none"
                  >
                    <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#efb810]/30 bg-[#fff5f8]">
                      <img
                        src={`${BASE_PATH}${srv.image}`}
                        alt={srv.imageAlt}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>

                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full border border-[#efb810]/70 bg-[#fef9e7] px-3 py-1 text-xs font-semibold tracking-wider text-ink uppercase">
                        {srv.tag}
                      </span>
                      <Sparkles
                        className="h-4 w-4 text-[#fc6998]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-serif text-2xl font-medium tracking-wide text-ink uppercase">
                      {srv.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {srv.description}
                    </p>
                  </button>
                </div>

                <div className="mt-5 border-t border-black/5 pt-3">
                  <button
                    type="button"
                    onClick={() => toggleService(srv.id)}
                    aria-expanded={isOpen}
                    className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-2 text-sm font-semibold text-[#fc6998] transition hover:text-[#e34f7e]"
                  >
                    <span>{isOpen ? "Ocultar valores" : "Ver valores e especificações"}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-3 space-y-2.5 border-t border-[#fc6998]/15 pt-3">
                      <ul className="space-y-2">
                        {srv.items.map((item) => (
                          <li
                            key={item.name}
                            className="flex items-start justify-between gap-3 rounded-xl bg-[#fff7fa] px-3 py-2"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-ink">
                                {item.name}
                              </p>
                              {"spec" in item && item.spec && (
                                <p className="mt-0.5 text-xs leading-snug text-ink-muted">
                                  {item.spec}
                                </p>
                              )}
                            </div>
                            <span className="shrink-0 rounded-full border border-[#efb810]/60 bg-white px-2.5 py-0.5 text-xs font-bold text-[#fc6998]">
                              {item.price}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href={buildWhatsAppUrl(
                          `Oi, Nayara! Gostaria de agendar um serviço de ${srv.name}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-liquid-pink mt-2 inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white"
                      >
                        Agendar {srv.name}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Seção 2: Cursos Profissionais */}
      <div className="line-pink-gold h-[2px] w-full" aria-hidden="true" />
      <section
        id="cursos"
        className="bg-[#fff4f7]/45 py-16 md:py-20"
      >
        <div className="mx-auto max-w-5xl px-5">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[#efb810] uppercase">
                Educação &amp; Carreira
              </p>
              <h2 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                Cursos Nayara Oliveira Estúdio
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
              Formação prática em turmas reduzidas para dominar o gel com
              técnica e elegância.
            </p>
          </div>

          <div className="grid items-start gap-6 md:grid-cols-2">
            {COURSES.map((course) => {
              const isOpen = openCourseIds.includes(course.id);
              return (
                <article
                  key={course.id}
                  className={`border-pink-gold flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                    isOpen ? "ring-2 ring-[#fc6998]/30 shadow-md" : ""
                  }`}
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleCourse(course.id)}
                      aria-expanded={isOpen}
                      className="group w-full cursor-pointer text-left focus:outline-none"
                    >
                      {course.image && (
                        <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#efb810]/30 bg-[#fff5f8]">
                          <img
                            src={course.image}
                            alt={course.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#efb810]/70 bg-[#fef9e7] px-3 py-1 text-xs font-semibold tracking-wider text-ink uppercase">
                          <Award
                            className="h-3.5 w-3.5 text-[#fc6998]"
                            aria-hidden="true"
                          />
                          {course.duration}
                        </span>
                        <span className="shrink-0 rounded-full border border-[#efb810]/60 bg-[#fff7fa] px-3 py-1 text-xs font-bold text-[#fc6998]">
                          {course.price}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-medium tracking-wide text-ink uppercase">
                        {course.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                        {course.description}
                      </p>
                    </button>
                  </div>

                  <div className="mt-5 border-t border-black/5 pt-3">
                    <button
                      type="button"
                      onClick={() => toggleCourse(course.id)}
                      aria-expanded={isOpen}
                      className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-2 text-sm font-semibold text-[#fc6998] transition hover:text-[#e34f7e]"
                    >
                      <span>{isOpen ? "Ocultar detalhes" : "Ver detalhes e valores"}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <div className="mt-3 space-y-3 border-t border-[#fc6998]/15 pt-3">
                        <p className="rounded-xl bg-[#fef9e7] px-3 py-2 text-xs font-medium text-[#8c6306]">
                          {course.paymentNote}
                        </p>

                        <ul className="space-y-2">
                          {course.schedule.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2 rounded-xl bg-[#fff7fa] px-3 py-2 text-xs text-ink sm:text-sm"
                            >
                              <Check
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#fc6998]"
                                aria-hidden="true"
                              />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {course.highlights.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-[#efb810]/60 bg-[#fef9e7] px-3 py-1 text-xs font-medium text-ink"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        <a
                          href={buildWhatsAppUrl(
                            `Oi, Nayara! Gostaria de garantir minha vaga no curso: ${course.name}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-liquid-pink mt-2 inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white"
                        >
                          Garantir minha vaga
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seção 3: Agendamento & Inscrição */}
      <section id="agendar" className="mx-auto max-w-2xl px-5 py-16 md:py-20">
        <div className="text-center">
          <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[#fc6998] uppercase">
            Reserva Online
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Agende seu horário ou curso
          </h2>
          <p className="mt-2.5 text-sm text-ink-muted sm:text-base">
            Atendimento individual com hora marcada. Confirmação pelo WhatsApp.
          </p>
        </div>

        {submitted ? (
          <div className="border-pink-gold mt-8 rounded-2xl p-6 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#fc6998] text-white">
              <Check className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-2xl font-medium text-ink">
              Solicitação enviada, {clientName}
            </h3>
            <p className="mt-2 text-sm text-ink-muted sm:text-base">
              Interesse em <strong>{selectedTopic}</strong>
              {preferredDate ? ` para ${preferredDate}` : ""}. Confirmaremos
              pelo WhatsApp <strong>{clientPhone}</strong>.
            </p>
            <Button
              size="default"
              variant="outline"
              className="mt-5"
              onClick={() => {
                setSubmitted(false);
                setClientName("");
                setClientPhone("");
                setPreferredDate("");
              }}
            >
              Fazer nova solicitação
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border-pink-gold mt-8 space-y-5 rounded-2xl p-6 shadow-xs sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="site-name"
                  className="mb-1.5 block text-xs font-semibold tracking-wide text-ink uppercase"
                >
                  Seu nome
                </label>
                <input
                  id="site-name"
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex: Juliana Mendes"
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base text-ink outline-none focus:border-[#fc6998] focus:ring-2 focus:ring-[#fc6998]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="site-phone"
                  className="mb-1.5 block text-xs font-semibold tracking-wide text-ink uppercase"
                >
                  WhatsApp
                </label>
                <input
                  id="site-phone"
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base text-ink outline-none focus:border-[#fc6998] focus:ring-2 focus:ring-[#fc6998]/20"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="site-topic"
                  className="mb-1.5 block text-xs font-semibold tracking-wide text-ink uppercase"
                >
                  Serviço ou Curso
                </label>
                <select
                  id="site-topic"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full rounded-xl border border-black/15 bg-white py-3 pr-9 pl-4 text-base text-ink outline-none focus:border-[#fc6998] focus:ring-2 focus:ring-[#fc6998]/20"
                >
                  <optgroup label="Unhas em Gel">
                    {GEL_SERVICES.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Cursos">
                    {COURSES.map((c) => (
                      <option key={c.id} value={`Curso: ${c.name}`}>
                        Curso: {c.name} — {c.price}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Consultoria">
                    <option value="Consultoria Personalizada">
                      Consultoria Personalizada
                    </option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label
                  htmlFor="site-date"
                  className="mb-1.5 block text-xs font-semibold tracking-wide text-ink uppercase"
                >
                  Data preferida
                </label>
                <input
                  id="site-date"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base text-ink outline-none focus:border-[#fc6998] focus:ring-2 focus:ring-[#fc6998]/20"
                />
              </div>
            </div>

            <div className="pt-1">
              <Button type="submit" className="w-full text-base font-semibold text-white">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Solicitar agendamento
              </Button>
            </div>
          </form>
        )}
      </section>

      {/* Rodapé tradicional do site */}
      <div className="line-pink-gold h-[2px] w-full" aria-hidden="true" />
      <footer className="bg-white py-6">
        <div className="mx-auto flex max-w-5xl flex-row items-start justify-between gap-4 px-5 md:items-center">
          <div>
            <div className="inline-flex flex-col items-center">
              <p className="font-script px-2 py-0.5 text-2xl leading-[1.25] font-normal text-[#c86382] sm:text-3xl">
                Nayara Oliveira
              </p>
              <span className="-mt-0.5 flex w-full items-center gap-2 px-1">
                <span
                  className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#c86382]"
                  aria-hidden="true"
                />
                <span className="font-serif text-[8px] font-medium tracking-[0.38em] text-[#c86382] uppercase sm:text-[9px] sm:tracking-[0.42em]">
                  ESTÚDIO
                </span>
                <span
                  className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#c86382]"
                  aria-hidden="true"
                />
              </span>
            </div>
            <a
              href={LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 block text-xs text-ink-muted underline-offset-4 transition hover:text-[#fc6998] hover:underline sm:text-sm"
            >
              Fibra de Vidro, Molde F1 &amp; Gel • Ver endereço no mapa
            </a>
          </div>

          <div className="flex shrink-0 flex-col items-center pr-2 text-center md:items-end md:pr-0 md:text-right">
            <div className="flex flex-col items-center gap-1 text-xs font-medium text-ink-muted sm:text-sm md:flex-row md:items-center md:gap-5">
              <a
                href="https://wa.me/5562992118416?text=Oi%2C%20gostaria%20de%20marcar%20meu%20hor%C3%A1rio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[32px] items-center gap-1.5 transition hover:text-[#fc6998]"
              >
                <Phone className="h-3.5 w-3.5 text-[#efb810] sm:h-4 sm:w-4" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/nayara_designernail"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[32px] items-center gap-1.5 transition hover:text-[#fc6998]"
              >
                <Instagram
                  className="h-3.5 w-3.5 text-[#fc6998] sm:h-4 sm:w-4"
                  aria-hidden="true"
                />
                @nayara_designernail
              </a>
              <span className="text-[11px] md:text-xs">
                © {new Date().getFullYear()} Nayara Oliveira Estúdio
              </span>
            </div>

            {/* Desktop: discreet LGPD & Meta links directly below contacts */}
            <div className="hidden flex-wrap justify-end gap-x-3 gap-y-1 text-[11px] text-ink-muted/85 md:flex">
              {POLICY_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActivePolicyId(sec.id)}
                  className="cursor-pointer underline-offset-4 transition hover:text-[#fc6998] hover:underline"
                >
                  {sec.tabLabel}
                </button>
              ))}
              <Link
                href="/privacidade"
                className="underline-offset-4 transition hover:text-[#fc6998] hover:underline"
              >
                Página completa
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile: separate policy row below */}
        <div className="mx-auto mt-5 max-w-5xl border-t border-black/5 px-5 pt-4 md:hidden">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-ink-muted/85">
            {POLICY_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActivePolicyId(sec.id)}
                className="cursor-pointer underline-offset-4 transition hover:text-[#fc6998] hover:underline"
              >
                {sec.tabLabel}
              </button>
            ))}
            <Link
              href="/privacidade"
              className="underline-offset-4 transition hover:text-[#fc6998] hover:underline"
            >
              Página completa
            </Link>
          </div>
        </div>
      </footer>

      {/* Minimalist Legal & Meta Policy Modal */}
      {activePolicy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePolicy.title}
          onClick={() => setActivePolicyId(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="border-pink-gold relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setActivePolicyId(null)}
              aria-label="Fechar política"
              className="border-pink-gold absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink transition hover:scale-105"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-wrap gap-2 pr-12">
              {POLICY_SECTIONS.map((sec) => {
                const isSelected = sec.id === activePolicy.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActivePolicyId(sec.id)}
                    className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      isSelected
                        ? "bg-[#fc6998] text-white"
                        : "border border-black/10 bg-white text-ink-muted hover:border-[#efb810] hover:text-ink"
                    }`}
                  >
                    {sec.tabLabel}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#efb810]/70 bg-[#fef9e7] px-3 py-1 text-[11px] font-semibold tracking-wider text-ink uppercase">
                <ShieldCheck className="h-3.5 w-3.5 text-[#fc6998]" aria-hidden="true" />
                {activePolicy.badge}
              </span>
              <h3 className="mt-3 font-serif text-2xl font-medium text-ink sm:text-3xl">
                {activePolicy.title}
              </h3>

              <div className="mt-5 space-y-4 border-t border-black/5 pt-5">
                {activePolicy.items.map((item) => (
                  <div key={item.heading}>
                    <h4 className="text-sm font-semibold text-ink">
                      {item.heading}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted sm:text-sm">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
