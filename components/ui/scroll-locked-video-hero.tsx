"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

function InstagramBrandIcon({ className = "h-5 w-5" }: { className?: string }) {
  const rawId = useId();
  const gradId = `ig-grad-${rawId.replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="25%" stopColor="#fa7e1e" />
          <stop offset="55%" stopColor="#d62976" />
          <stop offset="80%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="6"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="2.1"
      />
      <circle
        cx="12"
        cy="12"
        r="4.2"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="2.1"
      />
      <circle cx="17.5" cy="6.5" r="1.3" fill={`url(#${gradId})`} />
    </svg>
  );
}

function WhatsAppBrandIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#25D366"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.77 14.11c-.24.68-1.4 1.3-1.95 1.38-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.98-1.29-4.92-4.29-5.07-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.76-2.18 1.03-2.48.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.59.84 2.04.91 2.19.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.53-.15.15-.31.31-.13.61.18.3.79 1.3 1.7 2.11 1.17 1.04 2.15 1.37 2.45 1.52.3.15.47.12.65-.07.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.34.07.12.07.7-.17 1.38z"
      />
    </svg>
  );
}

export interface MetroHeroProps {
  frames?: string[];
  className?: string;
  style?: React.CSSProperties;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const WHATSAPP_URL =
  "https://wa.me/5562992118416?text=Oi%2C%20gostaria%20de%20marcar%20meu%20hor%C3%A1rio";

const BASE_FRAMES = Array.from(
  { length: 103 },
  (_, i) => `${BASE_PATH}/novo-frames/frame_${String(i + 1).padStart(3, "0")}.jpg`
);

// Repeat frame 103 twenty extra times to lengthen the final hold when LOREN NAILS appears
const DEFAULT_FRAMES = [
  ...BASE_FRAMES,
  ...Array.from({ length: 20 }, () => `${BASE_PATH}/novo-frames/frame_103.jpg`),
];

const COL_PINK = "#fc6998";
const COL_GOLD = "#efb810";
const COL_INK = "#1c1417";

interface Chapter {
  eyebrow: string;
  title: string;
  subtitle: string;
  start: number;
  end: number;
  positionClass: string;
  isFinal?: boolean;
}

const CHAPTERS: Chapter[] = [
  {
    eyebrow: "Autoestima & Cuidado",
    title: "Cuidar de si não é luxo, é amor próprio.",
    subtitle: "Reserve um momento só seu para desacelerar e florescer.",
    start: 0.0,
    end: 0.24,
    positionClass:
      "items-center justify-start px-6 text-left md:pl-14 lg:pl-20",
  },
  {
    eyebrow: "Nail Studio",
    title: "Suas mãos contam a sua história.",
    subtitle: "",
    start: 0.25,
    end: 0.49,
    positionClass:
      "items-center justify-end px-6 text-right md:pr-14 lg:pr-20",
  },
  {
    eyebrow: "Força Feminina",
    title: "Você se torna imparável quando se sente bem.",
    subtitle: "A confiança mora nos pequenos rituais do seu dia.",
    start: 0.5,
    end: 0.74,
    positionClass:
      "items-center justify-start px-6 text-left md:pl-14 lg:pl-20",
  },
  {
    eyebrow: "Studio • Alto Padrão",
    title: "Nayara Oliveira",
    subtitle:
      "Especialista em fibra de vidro, método molde F1, esmaltação e banho em gel.",
    start: 0.76,
    end: 1.0,
    positionClass:
      "items-center justify-center px-6 text-center",
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
  const isPortrait = canvasRatio < 1;

  // Full-bleed edge-to-edge cover so the image fills 100% of the viewport without seams
  let drawWidth = width;
  let drawHeight = height;
  if (canvasRatio > imgRatio) {
    drawWidth = width;
    drawHeight = width / imgRatio;
  } else {
    drawHeight = height;
    drawWidth = height * imgRatio;
  }

  const focalX = isPortrait ? 0.32 : 0.5;
  const focalY = isPortrait ? 0.5 : 0.5;
  const offsetX = (width - drawWidth) * focalX;
  const offsetY = (height - drawHeight) * focalY;

  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.filter = "contrast(1.12) saturate(1.15) brightness(0.95)";
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  ctx.restore();
}

function getChapterMotion(progress: number, ch: Chapter): {
  opacity: number;
  translateY: number;
} {
  const fade = 0.055;

  if (ch.isFinal) {
    if (progress <= ch.start) return { opacity: 0, translateY: 28 };
    if (progress >= ch.start + fade) return { opacity: 1, translateY: 0 };
    const vis = (progress - ch.start) / fade;
    return { opacity: vis, translateY: (1 - vis) * 28 };
  }

  // Non-final texts fade smoothly in place without vertical movement
  if (ch.start === 0) {
    if (progress <= ch.end - fade) return { opacity: 1, translateY: 0 };
    if (progress >= ch.end) return { opacity: 0, translateY: 0 };
    return { opacity: 1 - (progress - (ch.end - fade)) / fade, translateY: 0 };
  }

  if (progress <= ch.start || progress >= ch.end) return { opacity: 0, translateY: 0 };
  if (progress < ch.start + fade) {
    return { opacity: (progress - ch.start) / fade, translateY: 0 };
  }
  if (progress > ch.end - fade) {
    return { opacity: (ch.end - progress) / fade, translateY: 0 };
  }
  return { opacity: 1, translateY: 0 };
}

export default function MetroHero({
  frames = DEFAULT_FRAMES,
  className,
  style,
}: MetroHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [ready, setReady] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [pinMode, setPinMode] = useState<"fixed" | "bottom">("fixed");

  useEffect(() => {
    if (!logoModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLogoModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [logoModalOpen]);

  // Close mobile header menu when clicking/tapping outside the header or pressing Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

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

    const syncCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const rect = stage.getBoundingClientRect();
      const targetW = Math.max(1, Math.round(rect.width * dpr));
      const targetH = Math.max(1, Math.round(rect.height * dpr));

      // Always keep canvas backing buffer 1:1 with its CSS aspect ratio (zero stretching)
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        lastDrawnIndex = -1;
      }
    };

    const renderCanvasFrame = (progress: number) => {
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      syncCanvasSize();

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

    syncCanvasSize();

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
        setPinMode("bottom");
        return;
      }
      const rect = wrapper.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const next = clamp(-rect.top / scrollable, 0, 1);
      targetProgress = next;
      if (next > 0.004) hasStartedScrolling = true;
      // Keep the Hero stage fixed to the viewport while scrubbing; release to bottom at end
      setPinMode(rect.bottom <= window.innerHeight ? "bottom" : "fixed");
      // Reveal top navigation bar and main LOREN NAILS text together on first hero scroll
      setShowHeader(next >= 0.01);
    };

    const onResize = () => {
      syncCanvasSize();
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
        const { opacity, translateY } = getChapterMotion(currentProgress, ch);
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${translateY}px)`;
        el.style.filter = `blur(${(1 - opacity) * 5}px)`;
        el.style.pointerEvents = opacity > 0.35 ? "auto" : "none";

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
        el.style.opacity = idx === CHAPTERS.length - 1 ? "1" : "0";
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
      {/* Fixed Header always visible */}
      <header
        ref={headerRef}
        className="fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setLogoModalOpen(true);
            }}
            aria-label="Ampliar logo Nayara Oliveira Studio"
            className="flex min-h-[44px] cursor-pointer flex-col items-center justify-center leading-none transition hover:opacity-85"
          >
            <span className="font-script text-metallic-gold px-2 pt-1 pb-0.5 text-[26px] leading-[1.25] font-normal tracking-normal sm:text-[32px]">
              Nayara Oliveira
            </span>
            <span className="-mt-1 flex w-full items-center gap-2 px-1">
              <span
                className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#efb810]"
                aria-hidden="true"
              />
              <span className="font-serif text-[9px] font-medium tracking-[0.42em] text-[#8c6306] uppercase sm:text-[10px]">
                STUDIO
              </span>
              <span
                className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#efb810]"
                aria-hidden="true"
              />
            </span>
          </button>

          {/* Desktop links & original social icons */}
          <nav
            aria-label="Menu principal"
            className="hidden items-center gap-6 text-xs font-semibold tracking-[0.14em] uppercase md:flex"
          >
            <button
              type="button"
              onClick={() => scrollToSection("unhas-em-gel")}
              className="cursor-pointer py-2 text-[#1c1417] uppercase transition hover:text-[#fc6998]"
            >
              UNHAS EM GEL
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("cursos")}
              className="cursor-pointer py-2 text-[#1c1417] uppercase transition hover:text-[#efb810]"
            >
              CURSOS
            </button>

            <div className="flex items-center gap-2 border-l border-black/10 pl-4">
              <a
                href="https://www.instagram.com/nayara_designernail"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @nayara_designernail"
                title="@nayara_designernail"
                className="border-pink-gold flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-105"
              >
                <InstagramBrandIcon className="h-5 w-5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar no WhatsApp"
                title="Falar no WhatsApp"
                className="border-pink-gold flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-105"
              >
                <WhatsAppBrandIcon className="h-5 w-5" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection("agendar")}
              className="min-h-[40px] cursor-pointer rounded-full bg-[#fc6998] px-5 py-2 text-xs font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-[#e65283]"
            >
              AGENDAR
            </button>
          </nav>

          {/* Mobile Original Social Icons + Menu Button */}
          <div className="flex shrink-0 items-center gap-1.5 md:hidden">
            <a
              href="https://www.instagram.com/nayara_designernail"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @nayara_designernail"
              className="border-pink-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition active:scale-95"
            >
              <InstagramBrandIcon className="h-5 w-5" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className="border-pink-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition active:scale-95"
            >
              <WhatsAppBrandIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
              className="border-pink-gold flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#1c1417] transition active:scale-95"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Pink-to-Gold Gradient Line on Header Bottom */}
        <div className="line-pink-gold h-[2px] w-full" aria-hidden="true" />

        {/* Mobile Dropdown Menu (Informative & Accessible) */}
        {mobileMenuOpen && (
          <nav
            aria-label="Menu mobile"
            className="bg-white px-5 py-4 shadow-md md:hidden"
          >
            <p className="mb-3 text-xs font-medium text-[#6e5c62]">
              Especialista em fibra de vidro, método molde F1 e banho em gel.
            </p>
            <div className="flex flex-col gap-2 uppercase">
              <button
                type="button"
                onClick={() => scrollToSection("unhas-em-gel")}
                className="border-pink-gold flex min-h-[44px] cursor-pointer items-center justify-between rounded-xl px-4 py-2.5 text-left text-xs font-semibold tracking-wider text-[#1c1417] uppercase"
              >
                <span>SERVIÇOS — UNHAS EM GEL</span>
                <span className="text-[11px] font-semibold text-[#fc6998]">FIBRA &amp; GEL</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("cursos")}
                className="border-pink-gold flex min-h-[44px] cursor-pointer items-center justify-between rounded-xl px-4 py-2.5 text-left text-xs font-semibold tracking-wider text-[#1c1417] uppercase"
              >
                <span>CURSOS PROFISSIONAIS</span>
                <span className="text-[11px] font-semibold text-[#b67d03]">CERTIFICADO</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("agendar")}
                className="mt-1 min-h-[44px] cursor-pointer rounded-full bg-[#fc6998] px-4 py-2.5 text-center text-xs font-semibold tracking-wider text-white uppercase transition hover:bg-[#e65283]"
              >
                AGENDAR HORÁRIO
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
          className={
            pinMode === "fixed"
              ? "fixed top-0 right-0 left-0 z-10 h-[100lvh] overflow-hidden bg-white"
              : "absolute right-0 bottom-0 left-0 z-10 h-[100lvh] overflow-hidden bg-white"
          }
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

          {/* Subtle warm vignette & bottom edge blend (no heavy white washout) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 48%, rgba(28,20,23,0) 48%, rgba(28,20,23,0.16) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-16 bg-gradient-to-t from-white/90 via-white/35 to-transparent"
            aria-hidden="true"
          />

          {/* Scroll-Driven Rotating Editorial Phrases (no white cards, ~half-screen scale, LOREN NAILS last) */}
          <div className="pointer-events-none absolute inset-0 z-10">
            {CHAPTERS.map((ch, idx) => (
              <div
                key={ch.eyebrow}
                ref={(el) => {
                  chapterRefs.current[idx] = el;
                }}
                className={`absolute inset-0 flex ${ch.positionClass}`}
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  willChange: "transform, opacity, filter",
                }}
              >
                <div
                  className={
                    ch.isFinal
                      ? "w-full max-w-[96vw] sm:max-w-2xl md:max-w-[76vw]"
                      : "w-full max-w-[88vw] sm:max-w-xl md:max-w-[68vw] lg:max-w-[74vw]"
                  }
                >
                  <span
                    className="mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold tracking-[0.2em] uppercase md:mb-4"
                    style={{
                      borderColor: COL_GOLD,
                      backgroundColor: "rgba(255,255,255,0.92)",
                      color: COL_INK,
                    }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: COL_PINK }}
                    />
                    {ch.eyebrow}
                  </span>

                  {ch.isFinal ? (
                    <div className="flex flex-col items-center">
                      <h1
                        className="font-script text-metallic-gold px-5 py-3 text-[3.25rem] leading-[1.35] font-normal tracking-normal sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem]"
                        style={{
                          filter:
                            "drop-shadow(0 2px 14px rgba(255,255,255,0.95)) drop-shadow(0 1px 2px rgba(28,20,23,0.18))",
                        }}
                      >
                        {ch.title}
                      </h1>
                      <div className="-mt-3 flex w-56 items-center gap-3 sm:w-72 md:w-96">
                        <span
                          className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#efb810]"
                          aria-hidden="true"
                        />
                        <span className="font-serif text-xs font-medium tracking-[0.46em] text-[#8c6306] uppercase sm:text-sm md:text-base">
                          STUDIO
                        </span>
                        <span
                          className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#efb810]"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ) : (
                    <h2
                      className="font-serif text-[3.1rem] leading-[0.95] font-bold tracking-tight sm:text-6xl md:text-[5.5rem] lg:text-[7rem] xl:text-[8.25rem]"
                      style={{ color: "#140d10" }}
                    >
                      {ch.title}
                    </h2>
                  )}

                  {ch.subtitle && (
                    <p
                      className="text-metallic-gold mt-3.5 text-sm font-semibold leading-relaxed tracking-[0.14em] uppercase sm:text-base md:mt-4 md:text-lg"
                      style={{
                        filter:
                          "drop-shadow(0 1px 10px rgba(255,255,255,0.92)) drop-shadow(0 1px 2px rgba(28,20,23,0.18))",
                      }}
                    >
                      {ch.subtitle}
                    </p>
                  )}

                  {ch.isFinal && (
                    <div className="mt-7 flex flex-wrap justify-center gap-3.5">
                      <button
                        type="button"
                        onClick={() => scrollToSection("unhas-em-gel")}
                        className="min-h-[44px] cursor-pointer rounded-full bg-[#fc6998] px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-sm transition hover:bg-[#e65283] md:text-base"
                      >
                        Ver Unhas em Gel
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToSection("cursos")}
                        className="min-h-[44px] cursor-pointer rounded-full border border-[#efb810] bg-white px-7 py-3 text-sm font-semibold tracking-wide text-ink shadow-xs transition hover:bg-[#fef9e7] md:text-base"
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

          {/* Discreet Centered Bottom Scroll Hint */}
          <div
            ref={hintRef}
            className="pointer-events-none absolute bottom-14 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 transition-opacity duration-300 md:bottom-8"
          >
            <span className="rounded-full bg-white/70 px-3 py-1 text-[10px] font-medium tracking-[0.28em] text-[#1c1417]/75 uppercase backdrop-blur-sm">
              ROLE PARA BAIXO
            </span>
            <ChevronDown
              className="h-3.5 w-3.5 animate-bounce opacity-80"
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

      {/* Floating WhatsApp Side Button — slides in from right to left when header appears */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com Nayara Oliveira Studio no WhatsApp"
        title="Falar no WhatsApp"
        className={`border-pink-gold fixed right-4 bottom-5 z-50 flex h-13 w-13 items-center justify-center rounded-full shadow-lg transition-all duration-500 ease-out hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6 ${showHeader
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-24 opacity-0"
          }`}
      >
        <WhatsAppBrandIcon className="h-7 w-7" />
      </a>

      {/* Logo Lightbox Modal */}
      {logoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Logo Nayara Oliveira Studio"
          onClick={() => setLogoModalOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm transition-opacity duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="border-pink-gold relative w-full max-w-md overflow-hidden rounded-3xl bg-black p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setLogoModalOpen(false)}
              aria-label="Fechar visualização da logo"
              className="border-pink-gold absolute top-3 right-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-[#1c1417] shadow-md transition hover:scale-105"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={`${BASE_PATH}/nayara-logo.webp`}
              alt="Nayara Oliveira Studio"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
