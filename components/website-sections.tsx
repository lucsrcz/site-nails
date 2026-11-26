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
  Coffee,
  Gift,
  HeartHandshake,
  MapPin,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { POLICY_SECTIONS } from "@/components/privacy-content";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const MAPS_URL =
  "https://maps.google.com/maps?q=-16.172563552856445%2C-47.927513122558594&z=17&hl=pt-BR";

const GEL_SERVICES = [
  {
    id: "alongamento-gel",
    name: "Fibra de Vidro & Molde F1",
    tag: "Alto Padrão",
    description:
      "Alongamento com naturalidade e elegância, estrutura ultrafina e resistência impecável.",
  },
  {
    id: "banho-gel",
    name: "Blindagem & Banho em Gel",
    tag: "Proteção",
    description:
      "Camada protetora sobre a unha natural para fortalecer e manter o brilho por semanas.",
  },
  {
    id: "esmaltacao-gel",
    name: "Esmaltação em Gel",
    tag: "Essencial",
    description:
      "Secagem imediata em cabine LED, cor intensa e durabilidade de até 21 dias.",
  },
];

const COURSES = [
  {
    id: "florescendo-molde-f1",
    name: "Florescendo no Molde F1",
    image: `${BASE_PATH}/curso-florescendo-f1.png`,
    duration: "1 dia inteiro presencial",
    price: "R$ 1.100,00",
    entryNote:
      "Entrada de R$ 150,00 para confirmar inscrição e restante parcelado no cartão de crédito.",
    description:
      "Curso presencial com foco na técnica de Molde F1, ensinando todo o passo a passo para desenvolver uma aplicação com segurança, técnica e excelência.",
    details: [
      { icon: Coffee, text: "Coffee break especial pela manhã e 1h30 de almoço" },
      { icon: Gift, text: "Bônus exclusivo: técnica de Fibra de Vidro sem custo adicional" },
      { icon: HeartHandshake, text: "Suporte vitalício após a conclusão do curso" },
    ],
    closingNote:
      "Encerramento definido conforme o desenvolvimento e aproveitamento da aluna.",
  },
  {
    id: "aperfeicoamento",
    name: "Aperfeiçoamento",
    duration: "1 dia de curso presencial",
    price: "R$ 800,00",
    entryNote:
      "Imersão prática voltada para quem já atua na área e busca excelência em mesa.",
    description:
      "Aperfeiçoe controle de produto, simetria, curvatura, acabamento ultrafino e redução do tempo de atendimento no Molde F1 e Fibra de Vidro.",
    details: [
      { icon: Award, text: "Correção de descolamentos e nivelamento perfeito" },
      { icon: Sparkles, text: "Acabamento natural com brilho espelhado duradouro" },
      { icon: HeartHandshake, text: "Acompanhamento e suporte pós-curso" },
    ],
    closingNote:
      "Saia ainda mais segura para elevar o padrão e o faturamento dos seus atendimentos.",
  },
];

export default function WebsiteSections() {
  const [selectedTopic, setSelectedTopic] = useState("Fibra de Vidro & Molde F1");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activePolicyId, setActivePolicyId] = useState<string | null>(null);
  const activePolicy = POLICY_SECTIONS.find((s) => s.id === activePolicyId) ?? null;

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
        <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-ink-muted md:hidden">
          <span className="border-pink-gold rounded-full px-3 py-1 text-ink">Fibra de Vidro</span>
          <span className="border-pink-gold rounded-full px-3 py-1 text-ink">Molde F1</span>
          <span className="border-pink-gold rounded-full px-3 py-1 text-ink">Blindagem</span>
        </div>
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[#fc6998] uppercase">
              Serviços Especializados
            </p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Unhas em Gel
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
            Protocolos minimalistas focados na saúde da lâmina natural e brilho
            duradouro.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {GEL_SERVICES.map((srv) => (
            <article
              key={srv.id}
              className="border-pink-gold flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full border border-[#efb810]/70 bg-[#fef9e7] px-3 py-1 text-xs font-semibold tracking-wider text-ink uppercase">
                    {srv.tag}
                  </span>
                  <Sparkles
                    className="h-4 w-4 text-[#fc6998]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-serif text-2xl font-medium text-ink">
                  {srv.name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted sm:text-base">
                  {srv.description}
                </p>
              </div>

              <div className="mt-6 border-t border-black/5 pt-3">
                <a
                  href={buildWhatsAppUrl(
                    `Oi, Nayara! Gostaria de agendar o serviço: ${srv.name}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#fc6998] transition hover:underline"
                >
                  Agendar este serviço
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
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
              Formação presencial para você sair preparada, confiante e pronta
              para atuar com excelência.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {COURSES.map((course) => (
              <article
                key={course.id}
                className="border-pink-gold flex flex-col justify-between rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div>
                  {course.image && (
                    <div className="mb-5 overflow-hidden rounded-xl bg-[#f9e5e8]">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="h-44 w-full object-cover object-center"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted sm:text-sm">
                        <Award
                          className="h-4 w-4 text-[#fc6998]"
                          aria-hidden="true"
                        />
                        {course.duration}
                      </span>
                      <h3 className="mt-1.5 font-serif text-2xl font-semibold text-ink">
                        {course.name}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#fc6998] px-3.5 py-1 text-sm font-semibold text-white">
                      {course.price}
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-semibold text-[#8c6306]">
                    {course.entryNote}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {course.description}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-black/5 pt-4">
                    {course.details.map((detail) => {
                      const Icon = detail.icon;
                      return (
                        <li
                          key={detail.text}
                          className="flex items-start gap-2 text-xs leading-relaxed text-ink sm:text-sm"
                        >
                          <Icon
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#fc6998]"
                            aria-hidden="true"
                          />
                          <span>{detail.text}</span>
                        </li>
                      );
                    })}
                  </ul>

                  <p className="mt-3 text-xs italic text-ink-muted">
                    {course.closingNote}
                  </p>
                </div>

                <div className="mt-5 border-t border-black/5 pt-4">
                  <a
                    href={buildWhatsAppUrl(
                      `Oi, Nayara! Gostaria de garantir minha vaga no curso: ${course.name} (${course.price}).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Garantir minha vaga
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
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
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base text-ink outline-none focus:border-[#fc6998] focus:ring-2 focus:ring-[#fc6998]/20"
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
              <p className="font-script text-metallic-gold px-2 py-0.5 text-2xl leading-[1.25] font-normal sm:text-3xl">
                Nayara Oliveira
              </p>
              <span className="-mt-0.5 flex w-full items-center gap-2 px-1">
                <span
                  className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#efb810]"
                  aria-hidden="true"
                />
                <span className="font-serif text-[8px] font-medium tracking-[0.38em] text-[#8c6306] uppercase sm:text-[9px] sm:tracking-[0.42em]">
                  ESTÚDIO
                </span>
                <span
                  className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#efb810]"
                  aria-hidden="true"
                />
              </span>
            </div>
            <p className="mt-1.5 text-xs text-ink-muted sm:text-sm">
              Fibra de Vidro, Molde F1 &amp; Gel
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-center pr-2 text-center md:items-end md:pr-0 md:text-right">
            <div className="flex flex-col items-center gap-1 text-xs font-medium text-ink-muted sm:text-sm md:flex-row md:items-center md:gap-5">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[32px] items-center gap-1.5 transition hover:text-[#fc6998]"
              >
                <MapPin className="h-3.5 w-3.5 text-[#fc6998] sm:h-4 sm:w-4" aria-hidden="true" />
                Localização
              </a>
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
