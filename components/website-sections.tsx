"use client";

import { useState } from "react";
import {
  Sparkles,
  Award,
  Check,
  Calendar,
  MapPin,
  Instagram,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const GEL_SERVICES = [
  {
    id: "alongamento-gel",
    name: "Fibra de Vidro & Molde F1",
    duration: "120 min",
    price: "R$ 220",
    tag: "Alto Padrão",
    description:
      "Alongamento com naturalidade e elegância, estrutura ultrafina e resistência impecável.",
  },
  {
    id: "banho-gel",
    name: "Blindagem & Banho em Gel",
    duration: "75 min",
    price: "R$ 145",
    tag: "Proteção",
    description:
      "Camada protetora sobre a unha natural para fortalecer e manter o brilho por semanas.",
  },
  {
    id: "esmaltacao-gel",
    name: "Esmaltação em Gel",
    duration: "60 min",
    price: "R$ 110",
    tag: "Essencial",
    description:
      "Secagem imediata em cabine LED, cor intensa e durabilidade de até 21 dias.",
  },
];

const COURSES = [
  {
    id: "curso-iniciante",
    name: "Formação Nail Designer em Gel",
    duration: "2 dias • 16h presenciais",
    price: "R$ 1.290",
    description:
      "Do zero ao acabamento de salão: anatomia da unha, preparação segura, molde e esmaltação em gel.",
    highlights: ["Certificado incluso", "Prática em modelo", "Apostila completa"],
  },
  {
    id: "curso-aperfeicoamento",
    name: "Aperfeiçoamento & Naturalidade",
    duration: "1 dia • 8h intensivas",
    price: "R$ 790",
    description:
      "Para profissionais que buscam reduzir tempo em mesa, eliminar descolamentos e entregar unhas ultrafinas.",
    highlights: ["Turma reduzida", "Suporte pós-curso", "Foco em rentabilidade"],
  },
];

export default function WebsiteSections() {
  const [selectedTopic, setSelectedTopic] = useState("Fibra de Vidro & Molde F1");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectAndScrollToBooking = (topic: string) => {
    setSelectedTopic(topic);
    setSubmitted(false);
    document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" });
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
                <button
                  type="button"
                  onClick={() => selectAndScrollToBooking(srv.name)}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#fc6998] transition hover:underline"
                >
                  Agendar este serviço
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
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
                Cursos Nayara Designer Nail
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
              Formação prática em turmas reduzidas para dominar o gel com
              técnica e elegância.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {COURSES.map((course) => (
              <article
                key={course.id}
                className="border-pink-gold flex flex-col justify-between rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted sm:text-sm">
                        <Award
                          className="h-4 w-4 text-[#fc6998]"
                          aria-hidden="true"
                        />
                        {course.duration}
                      </span>
                      <h3 className="mt-2 font-serif text-2xl font-medium text-ink">
                        {course.name}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#fc6998] px-3.5 py-1 text-sm font-semibold text-white">
                      {course.price}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                    {course.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {course.highlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#efb810]/60 bg-[#fef9e7] px-3 py-1 text-xs font-medium text-ink"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t border-black/5 pt-4">
                  <Button
                    size="default"
                    variant="outline"
                    onClick={() =>
                      selectAndScrollToBooking(`Curso: ${course.name}`)
                    }
                  >
                    Garantir minha vaga
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
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
      <footer className="bg-white py-10">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-4 px-5 md:flex-row md:items-center">
          <div>
            <p className="font-serif text-xl font-semibold tracking-wide text-ink">
              Nayara Designer Nail
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
              <MapPin
                className="h-4 w-4 text-[#fc6998]"
                aria-hidden="true"
              />
              Nayara Oliveira • Fibra de Vidro, Molde F1 &amp; Gel
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-ink-muted">
            <a
              href="https://wa.me/5562992118416?text=Oi%2C%20gostaria%20de%20marcar%20meu%20hor%C3%A1rio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 transition hover:text-[#fc6998]"
            >
              <Phone className="h-4 w-4 text-[#efb810]" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/nayara_designernail"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 transition hover:text-[#fc6998]"
            >
              <Instagram
                className="h-4 w-4 text-[#fc6998]"
                aria-hidden="true"
              />
              @nayara_designernail
            </a>
            <span>© {new Date().getFullYear()} Nayara Designer Nail</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
