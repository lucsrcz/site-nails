"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export interface MetroHeroProps {
  frames?: string[];
  className?: string;
  style?: React.CSSProperties;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const DEFAULT_FRAMES = Array.from(
  { length: 103 },
  (_, i) => `${BASE_PATH}/novo-frames/frame_${String(i + 1).padStart(3, "0")}.jpg`
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
    eyebrow: "Nail Studio",
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
    eyebrow: "Beleza & Formação",
    title: "LOREN NAILS",
    subtitle: "Brilhe com leveza, presença e autenticidade. Unhas em gel e cursos.",
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
  height: number
) {
  if (!img.naturalWidth || !img.naturalHeight) return;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = width / height;

  let drawWidth = width;
  let drawHeight = height;

  if (canvasRatio > imgRatio) {
    drawWidth = width;
    drawHeight = width / imgRatio;
  } else {
    drawHeight = height;
    drawWidth = height * imgRatio;
  }

  // On portrait/mobile screens, center the crop on the nails & pink polish bottle (~28% from left).
  const isPortrait = canvasRatio < 1;
  const focalX = isPortrait ? 0.28 : 0.5;
  const focalY = isPortrait ? 0.46 : 0.5;

  const offsetX = (width - drawWidth) * focalX;
  const offsetY = (height - drawHeight) * focalY;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
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
  const [showHeader, setShowHeader] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    let lockedWidth = 0;
    let lockedHeight = 0;

    const syncCanvasSize = (force = false) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const rect = stage.getBoundingClientRect();
      // Prevent mobile address-bar collapse/expand from resizing & zooming the canvas during scroll
      const widthChanged = Math.abs(rect.width - lockedWidth) > 2;
      const heightChangedSignificantly = Math.abs(rect.height - lockedHeight) > 140;

      if (force || lockedWidth === 0 || widthChanged || heightChangedSignificantly) {
        lockedWidth = rect.width;
        lockedHeight = rect.height;
        canvas.width = Math.max(1, Math.floor(lockedWidth * dpr));
        canvas.height = Math.max(1, Math.floor(lockedHeight * dpr));
        lastDrawnIndex = -1;
      }
    };

    const renderCanvasFrame = (progress: number) => {
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      if (canvas.width === 0 || canvas.height === 0) {
        syncCanvasSize(true);
      }

      const index = clamp(
        Math.round(progress * (frames.length - 1)),
        0,
        frames.length - 1
      );

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

      if (img && img.complete && img.naturalWidth > 0 && index !== lastDrawnIndex) {
        drawCoverImage(ctx, img, canvas.width, canvas.height);
        lastDrawnIndex = index;
      }
    };

    syncCanvasSize(true);

    // Priority keyframe-first loading: load frame 0, final frame, and every 8th frame first
    // so scrubbing is responsive immediately, then fill in-between frames in small batches.
    const keyIndices: number[] = [];
    const restIndices: number[] = [];
    for (let i = 0; i < frames.length; i++) {
      if (i === 0 || i === frames.length - 1 || i % 8 === 0) {
        keyIndices.push(i);
      } else {
        restIndices.push(i);
      }
    }

    let cancelled = false;
    const loadFrame = (idx: number, highPriority = false): Promise<void> =>
      new Promise((resolve) => {
        if (cancelled) return resolve();
        const img = new Image();
        img.decoding = "async";
        if (highPriority && "fetchPriority" in img) {
          (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = "high";
        }
        img.onload = () => {
          if (!cancelled) {
            if (idx === 0 || (reduceMotion && idx === frames.length - 1)) {
              setReady(true);
              renderCanvasFrame(currentProgress);
            }
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frames[idx];
        loadedImages[idx] = img;
      });

    (async () => {
      await Promise.all(keyIndices.map((idx) => loadFrame(idx, true)));
      const BATCH_SIZE = 8;
      for (let i = 0; i < restIndices.length; i += BATCH_SIZE) {
        if (cancelled) break;
        const batch = restIndices.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map((idx) => loadFrame(idx, false)));
      }
    })();

    const updateTargetFromScroll = () => {
      if (reduceMotion) {
        setShowHeader(true);
        return;
      }
      const rect = wrapper.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const next = clamp(-rect.top / scrollable, 0, 1);
      targetProgress = next;
      if (next > 0.004) hasStartedScrolling = true;
      // Show top navigation bar once the hero frame scroll finishes
      setShowHeader(next >= 0.92);
    };

    const onResize = () => {
      syncCanvasSize(false);
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
        el.style.transform = `translateY(${(1 - vis) * 16}px)`;
        el.style.filter = `blur(${(1 - vis) * 6}px)`;
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
      cancelled = true;
      window.removeEventListener("scroll", updateTargetFromScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, [frames]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Fixed Header revealed after Hero scroll finishes */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-md transition-all duration-300 ${
          showHeader
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <a
            href="#inicio"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: COL_GOLD }}
              aria-hidden="true"
            />
            <span
              className="font-serif text-xl font-semibold tracking-wider"
              style={{ color: COL_PINK }}
            >
              LOREN NAILS
            </span>
          </a>

          {/* Desktop links */}
          <nav
            aria-label="Menu principal"
            className="hidden items-center gap-7 text-xs font-semibold tracking-wide md:flex"
          >
            <button
              type="button"
              onClick={() => scrollToSection("unhas-em-gel")}
              className="cursor-pointer text-[#1c1417] transition hover:text-[#fc6998]"
            >
              Unhas em Gel
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("cursos")}
              className="cursor-pointer text-[#1c1417] transition hover:text-[#efb810]"
            >
              Cursos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("agendar")}
              className="cursor-pointer rounded-full bg-[#fc6998] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#e65283]"
            >
              Agendar
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-[#fc6998] transition hover:bg-[#fff4f7] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav
            aria-label="Menu mobile"
            className="border-t border-black/5 bg-white px-5 py-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => scrollToSection("unhas-em-gel")}
                className="cursor-pointer rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#1c1417] transition hover:bg-[#fff4f7] hover:text-[#fc6998]"
              >
                Serviços — <span className="text-[#fc6998]">Unhas em Gel</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("cursos")}
                className="cursor-pointer rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#1c1417] transition hover:bg-[#fef9e7]"
              >
                Cursos Profissionais
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("agendar")}
                className="mt-1 cursor-pointer rounded-full bg-[#fc6998] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#e65283]"
              >
                Agendar Horário
              </button>
            </div>
          </nav>
        )}
      </header>

      <section
        ref={wrapperRef}
        id="inicio"
        aria-label="LOREN NAILS — Apresentação"
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
          className="sticky top-0 h-[100svh] w-full overflow-hidden bg-white"
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

          {/* Mobile: bottom scrim so nails & polish stay 100% clear in the upper/center area */}
          <div
            className="pointer-events-none absolute inset-0 md:hidden"
            style={{
              background:
                "linear-gradient(0deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.78) 32%, rgba(255,255,255,0) 62%)",
            }}
          />

          {/* Desktop: right-side scrim */}
          <div
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 34%, rgba(255,255,255,0.74) 68%, rgba(255,255,255,0.94) 100%)",
            }}
          />

          {/* Bottom gradient blend into sections below */}
          <div
            className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-28 bg-gradient-to-t from-white via-white/60 to-transparent"
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
                className={
                  ch.isFinal
                    ? "absolute inset-0 flex items-center justify-center px-6 text-center"
                    : "absolute inset-0 flex items-end justify-center px-6 pb-20 text-center md:items-center md:justify-end md:px-14 md:pb-0 md:text-right lg:px-24"
                }
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  willChange: "transform, opacity, filter",
                }}
              >
                <div
                  className={ch.isFinal ? "max-w-lg" : "max-w-sm md:max-w-md"}
                >
                  <span
                    className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.22em] uppercase md:mb-4 md:px-3.5 md:text-[11px]"
                    style={{
                      borderColor: COL_GOLD,
                      backgroundColor: "rgba(255,255,255,0.95)",
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
                    className={
                      ch.isFinal
                        ? "font-serif text-4xl font-semibold tracking-wider sm:text-5xl lg:text-6xl"
                        : "font-serif text-3xl font-medium leading-[1.12] tracking-tight sm:text-4xl lg:text-6xl"
                    }
                    style={{
                      color: ch.isFinal ? COL_PINK : COL_INK,
                      textShadow: ch.isFinal
                        ? "0 2px 24px rgba(255,255,255,0.95), 0 1px 8px rgba(255,255,255,0.85)"
                        : undefined,
                    }}
                  >
                    {ch.title}
                  </h1>

                  <p
                    className="mt-3 text-xs font-medium leading-relaxed sm:text-sm md:mt-4 md:text-base"
                    style={{
                      color: "#4d3d43",
                      textShadow: ch.isFinal
                        ? "0 1px 14px rgba(255,255,255,0.95)"
                        : undefined,
                    }}
                  >
                    {ch.subtitle}
                  </p>

                  {ch.isFinal && (
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
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
                        className="cursor-pointer rounded-full border border-[#efb810] bg-white px-5 py-2.5 text-xs font-semibold tracking-wide text-ink transition hover:bg-[#fef9e7]"
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
            className="pointer-events-none absolute right-6 bottom-6 z-20 hidden items-center gap-2 md:right-12 md:flex"
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
            className="pointer-events-none absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 transition-opacity duration-300 md:bottom-8"
          >
            <span className="rounded-full bg-white/90 px-3.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-ink uppercase shadow-xs backdrop-blur-sm md:px-4 md:py-1.5 md:text-[11px]">
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
