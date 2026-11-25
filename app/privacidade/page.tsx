import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { POLICY_SECTIONS } from "@/components/privacy-content";

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <header className="bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 text-xs font-semibold tracking-wider text-ink uppercase transition hover:text-[#fc6998]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar ao site
          </Link>

          <div className="flex flex-col items-center leading-none">
            <span className="font-script text-metallic-gold px-2 text-2xl font-normal">
              Nayara Oliveira
            </span>
            <span className="-mt-0.5 flex w-full items-center gap-2 px-1">
              <span
                className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#efb810]"
                aria-hidden="true"
              />
              <span className="font-serif text-[8px] font-medium tracking-[0.42em] text-[#8c6306] uppercase">
                STUDIO
              </span>
              <span
                className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#efb810]"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
        <div className="line-pink-gold h-[2px] w-full" aria-hidden="true" />
      </header>

      <div className="mx-auto max-w-4xl px-5 py-12 md:py-16">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#fc6998] uppercase">
          Transparência &amp; Conformidade
        </p>
        <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink sm:text-5xl">
          Políticas de Privacidade, LGPD &amp; Meta
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Última atualização: {new Date().getFullYear()} • Nayara Oliveira Studio
          (@nayara_designernail)
        </p>

        <div className="mt-10 space-y-8">
          {POLICY_SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="border-pink-gold rounded-2xl p-6 sm:p-8"
            >
              <span className="inline-block rounded-full border border-[#efb810]/70 bg-[#fef9e7] px-3 py-1 text-[11px] font-semibold tracking-wider text-ink uppercase">
                {section.badge}
              </span>
              <h2 className="mt-3 font-serif text-2xl font-medium text-ink sm:text-3xl">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4">
                {section.items.map((item) => (
                  <div key={item.heading}>
                    <h3 className="text-sm font-semibold text-ink">
                      {item.heading}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
