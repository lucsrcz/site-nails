"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface MetroHeroProps {
  frames?: string[];
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_FRAMES = Array.from(
  { length: 103 },
  (_, i) => `/novo-frames/frame_${String(i + 1).padStart(3, "0")}.jpg`
);

const COL_PINK = "#fc6998";
const COL_GOLD = "#efb810";
const COL_INK = "#1c1417";

interface Chapter {
  eyebrow: string;
  title: string;
  subtitle: string;
  start: number;
  end: number;
  isFinal?: boolean;
}

const CHAPTERS: Chapter[] = [
  {
    eyebrow: "Atelier Rosé • Nail Studio",
    title: "Suas mãos contam a sua história.",
    subtitle: "Role suavemente e acompanhe cada detalhe da transformação.",
    start: 0.0,
    end: 0.24,
  },
  {
    eyebrow: "Autoestima & Cuidado",
    title: "Cuidar de si não é luxo, é amor próprio.",
    subtitle: "Reserve um momento só seu para desacelerar e florescer.",
    start: 0.26,
    end: 0.5,
  },
  {
    eyebrow: "Força Feminina",
    title: "Você se torna imparável quando se sente bem.",
    subtitle: "A confiança mora nos pequenos rituais do seu dia.",
    start: 0.52,
    end: 0.76,
  },
  {
    eyebrow: "Sua Melhor Versão",
    title: "Brilhe com leveza, presença e autenticidade.",
    subtitle: "Continue rolando para conhecer nossos serviços em gel e cursos.",
    start: 0.78,
    end: 1.0,
    isFinal: true,
  },
];

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  scale = 1
) {
  if (!img.naturalWidth || !img.naturalHeight) return;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = width / height;

  let drawWidth = width;
  let drawHeight = height;

  if (canvasRatio > imgRatio) {
    drawWidth = width * scale;
    drawHeight = (width / imgRatio) * scale;
  } else {
    drawHeight = height * scale;
    drawWidth = height * imgRatio * scale;
  }

  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

function getChapterVisibility(progress: number, ch: Chapter): number {
  const fade = 0.055;
  if (ch.start === 0) {
    if (progress <= ch.end - fade) return 1;
    if (progress >= ch.end) return 0;
    return 1 - (progress - (ch.end - fade)) / fade;
  }
  if (ch.isFinal) {
    if (progress <= ch.start) return 0;
    if (progress >= ch.start + fade) return 1;
    return (progress - ch.start) / fade;
  }
  if (progress <= ch.start || progress >= ch.end) return 0;
  if (progress < ch.start + fade) return (progress - ch.start) / fade;
  if (progress > ch.end - fade) return (ch.end - progress) / fade;
  return 1;
}

export default function MetroHero({
  frames = DEFAULT_FRAMES,
  className,
  style,
}: MetroHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Fixed navbar transition matching mosa-ai-v1.21st.app (scrollY > 30)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !stage || !canvas) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let targetProgress = reduceMotion ? 1 : 0;
    let currentProgress = reduceMotion ? 1 : 0;
    let hasStartedScrolling = reduceMotion;

    const loadedImages: HTMLImageElement[] = [];
    let lastDrawnIndex = -1;
    let lastScale = -1;

    const renderCanvasFrame = (progress: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = stage.getBoundingClientRect();
      const targetW = Math.max(1, Math.floor(rect.width * dpr));
      const targetH = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        lastDrawnIndex = -1;
      }

      const index = clamp(
        Math.round(progress * (frames.length - 1)),
        0,
        frames.length - 1
      );
      const scale = 1 + progress * 0.045;

      let img = loadedImages[index];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < frames.length; offset++) {
          const prev = loadedImages[index - offset];
          if (prev?.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = loadedImages[index + offset];
          if (next?.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }

      if (img && img.complete && img.naturalWidth > 0) {
        if (index !== lastDrawnIndex || Math.abs(scale - lastScale) > 0.0005) {
          drawCoverImage(ctx, img, targetW, targetH, scale);
          lastDrawnIndex = index;
          lastScale = scale;
        }
      }
    };

    let firstLoaded = false;
    frames.forEach((src, idx) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = () => {
        if (!firstLoaded && idx === 0) {
          firstLoaded = true;
          setReady(true);
          renderCanvasFrame(currentProgress);
        } else if (reduceMotion && idx === frames.length - 1) {
          setReady(true);
          renderCanvasFrame(1);
        }
      };
      loadedImages[idx] = img;
    });

    const updateTargetFromScroll = () => {
      if (reduceMotion) return;
      const rect = wrapper.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const next = clamp(-rect.top / scrollable, 0, 1);
      targetProgress = next;
      if (next > 0.004) hasStartedScrolling = true;
    };

    const onResize = () => {
      lastDrawnIndex = -1;
      renderCanvasFrame(currentProgress);
      updateTargetFromScroll();
    };

    window.addEventListener("scroll", updateTargetFromScroll, { passive: true });
    window.addEventListener("resize", onResize);
    updateTargetFromScroll();

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.14;
      renderCanvasFrame(currentProgress);

      CHAPTERS.forEach((ch, idx) => {
        const el = chapterRefs.current[idx];
        if (!el) return;
        const vis = getChapterVisibility(currentProgress, ch);
        el.style.opacity = String(vis);
        el.style.transform = `translateY(${(1 - vis) * 18}px) scale(${0.97 + vis * 0.03})`;
        el.style.filter = `blur(${(1 - vis) * 8}px)`;
        el.style.pointerEvents = vis > 0.35 ? "auto" : "none";

        const dot = dotRefs.current[idx];
        if (dot) {
          const isCurrent =
            currentProgress >= ch.start && currentProgress <= ch.end;
          dot.style.width = isCurrent ? "22px" : "6px";
          dot.style.backgroundColor = isCurrent
            ? COL_PINK
            : "rgba(28,20,23,0.22)";
        }
      });

      if (hintRef.current) {
        hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1";
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`;
      }

      rafId = requestAnimationFrame(frame);
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame);
    } else {
      CHAPTERS.forEach((ch, idx) => {
        const el = chapterRefs.current[idx];
        if (!el) return;
        el.style.opacity = ch.isFinal ? "1" : "0";
      });
    }

    return () => {
      window.removeEventListener("scroll", updateTargetFromScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, [frames]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Fixed Navbar matching mosa-ai-v1.21st.app scroll transition */}
      <nav
        aria-label="Navegação do site"
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-black/5 bg-white/85 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <a href="#inicio" className="flex items-center gap-2.5 text-ink">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: COL_PINK }}
              aria-hidden="true"
            />
            <span className="font-serif text-2xl font-semibold tracking-tight">
              Atelier Rosé
            </span>
          </a>

          <div className="flex items-center gap-5 text-xs font-semibold tracking-wide text-ink sm:gap-8 sm:text-sm">
            <button
              type="button"
              onClick={() => scrollToSection("unhas-em-gel")}
              className="cursor-pointer transition hover:text-[#fc6998]"
            >
              Unhas em Gel
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("cursos")}
              className="cursor-pointer transition hover:text-[#fc6998]"
            >
              Cursos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("agendar")}
              className="cursor-pointer rounded-full bg-[#fc6998] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#e65283]"
            >
              Agendar
            </button>
          </div>
        </div>
      </nav>

      {/* Tall sticky scroll wrapper so the page scrolls 1:1 naturally into the sections below */}
      <section
        ref={wrapperRef}
        id="inicio"
        aria-label="Atelier Rosé — Apresentação"
        className={className}
        style={{
          position: "relative",
          height: "320vh",
          width: "100%",
          backgroundColor: "#ffffff",
          ...style,
        }}
      >
        <div
          ref={stageRef}
          className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-white"
        >
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: ready ? 1 : 0,
              transition: "opacity 0.5s ease",
              pointerEvents: "none",
            }}
          />

          {/* Right-side light scrim for text legibility */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 34%, rgba(255,255,255,0.74) 68%, rgba(255,255,255,0.94) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Bottom gradient blend into the white sections below (like mosa-ai-v1.21st.app) */}
          <div
            className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-32 bg-gradient-to-t from-white via-white/60 to-transparent"
            aria-hidden="true"
          />

          {/* Scroll-Driven Self-Esteem Phrases */}
          <div className="pointer-events-none absolute inset-0 z-10">
            {CHAPTERS.map((ch, idx) => (
              <div
                key={ch.eyebrow}
                ref={(el) => {
                  chapterRefs.current[idx] = el;
                }}
                className="absolute inset-0 flex items-center justify-end px-6 md:px-14 lg:px-24"
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  willChange: "transform, opacity, filter",
                }}
              >
                <div className="max-w-md text-right">
                  <span
                    className="mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-semibold tracking-[0.22em] uppercase"
                    style={{
                      borderColor: COL_GOLD,
                      backgroundColor: "rgba(255,255,255,0.92)",
                      color: COL_INK,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: COL_PINK }}
                    />
                    {ch.eyebrow}
                  </span>

                  <h1
                    className="font-serif text-4xl font-medium leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
                    style={{ color: COL_INK }}
                  >
                    {ch.title}
                  </h1>

                  <p
                    className="mt-4 text-sm font-medium leading-relaxed sm:text-base"
                    style={{ color: "#4d3d43" }}
                  >
                    {ch.subtitle}
                  </p>

                  {ch.isFinal && (
                    <div className="mt-7 flex flex-wrap justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => scrollToSection("unhas-em-gel")}
                        className="cursor-pointer rounded-full bg-[#fc6998] px-5 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm transition hover:bg-[#e65283]"
                      >
                        Ver Unhas em Gel
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection("cursos")}
                        className="cursor-pointer rounded-full border border-[#efb810] bg-white/95 px-5 py-2.5 text-xs font-semibold tracking-wide text-ink transition hover:bg-[#fef9e7]"
                      >
                        Conhecer Cursos
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chapter Dots Indicator */}
          <div
            className="pointer-events-none absolute right-6 bottom-6 z-20 flex items-center gap-2 md:right-12"
            aria-hidden="true"
          >
            {CHAPTERS.map((ch, idx) => (
              <span
                key={ch.eyebrow}
                ref={(el) => {
                  dotRefs.current[idx] = el;
                }}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: idx === 0 ? "22px" : "6px",
                  backgroundColor: idx === 0 ? COL_PINK : "rgba(28,20,23,0.22)",
                }}
              />
            ))}
          </div>

          {/* Scroll Hint */}
          <div
            ref={hintRef}
            className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 transition-opacity duration-300"
          >
            <span className="rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-semibold tracking-[0.24em] text-ink uppercase shadow-xs backdrop-blur-sm">
              Role a página
            </span>
            <ChevronDown
              className="h-4 w-4 animate-bounce"
              style={{ color: COL_PINK }}
              aria-hidden="true"
            />
          </div>

          {/* Progress Line */}
          <div
            className="absolute right-0 bottom-0 left-0 z-20 h-[3px]"
            style={{ backgroundColor: "rgba(28, 20, 23, 0.08)" }}
          >
            <div
              ref={progressBarRef}
              style={{
                height: "100%",
                width: "100%",
                background: `linear-gradient(90deg, ${COL_PINK}, ${COL_GOLD})`,
                transform: "scaleX(0)",
                transformOrigin: "left center",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
