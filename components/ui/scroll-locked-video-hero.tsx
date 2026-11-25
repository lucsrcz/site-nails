"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

function NailPolishIcon({ className = "h-9 w-9" }: { className?: string }) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const capId = `np-cap-${uid}`;
  const bodyId = `np-body-${uid}`;
  const shineId = `np-shine-${uid}`;
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      style={{
        filter:
          "drop-shadow(0 0 6px rgba(252,105,152,0.45)) drop-shadow(0 0 10px rgba(239,184,16,0.4))",
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={capId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff4bd" />
          <stop offset="45%" stopColor="#efb810" />
          <stop offset="100%" stopColor="#a87000" />
        </linearGradient>
        <linearGradient id={bodyId} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#ff94b8" />
          <stop offset="50%" stopColor="#fc6998" />
          <stop offset="100%" stopColor="#d9386d" />
        </linearGradient>
        <linearGradient id={shineId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Metallic gold cap */}
      <rect x="19" y="5" width="10" height="14" rx="2" fill={`url(#${capId})`} />
      <rect x="20.5" y="7" width="2" height="10" rx="1" fill="#ffffff" opacity="0.45" />

      {/* Bottle collar */}
      <rect x="17" y="18" width="14" height="3" rx="1" fill={`url(#${capId})`} opacity="0.9" />

      {/* Chic glass bottle */}
      <rect
        x="11"
        y="21"
        width="26"
        height="22"
        rx="6"
        fill={`url(#${bodyId})`}
      />

      {/* Glossy glass specular reflection */}
      <rect x="14.5" y="24.5" width="4" height="14" rx="2" fill={`url(#${shineId})`} />
      <circle cx="24" cy="24" r="1.1" fill="#ffffff" opacity="0.65" />

      {/* Sparkle / brilho */}
      <path
        d="M38 11 L39.2 14.3 L42.5 15.5 L39.2 16.7 L38 20 L36.8 16.7 L33.5 15.5 L36.8 14.3 Z"
        fill="#efb810"
      />
      <path
        d="M9 12 L9.8 14 L11.8 14.8 L9.8 15.6 L9 17.6 L8.2 15.6 L6.2 14.8 L8.2 14 Z"
        fill="#fc6998"
      />
    </svg>
  );
}

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
    eyebrow: "Nail Studio",
    title: "Suas mãos contam a sua história.",
    subtitle: "Role suavemente e acompanhe cada detalhe da transformação.",
    start: 0.0,
    end: 0.24,
    positionClass:
      "items-center justify-start px-6 text-left md:pl-14 lg:pl-20",
  },
  {
    eyebrow: "Autoestima & Cuidado",
    title: "Cuidar de si não é luxo, é amor próprio.",
    subtitle: "Reserve um momento só seu para desacelerar e florescer.",
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
      {/* Fixed Header revealed after Hero scroll finishes */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
          showHeader
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setLogoModalOpen(true);
            }}
            aria-label="Ampliar ícone Nayara Oliveira Studio"
            className="flex min-h-[44px] cursor-pointer items-center gap-2 text-left transition hover:scale-[1.02]"
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              <NailPolishIcon className="h-9 w-9" />
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-script text-metallic-gold text-2xl font-normal tracking-normal sm:text-[28px]">
                Nayara Oliveira
              </span>
              <span className="font-serif text-[9px] font-semibold tracking-[0.35em] text-[#6e5c62] uppercase">
                Studio
              </span>
            </div>
          </button>

          {/* Desktop links & original social icons */}
          <nav
            aria-label="Menu principal"
            className="hidden items-center gap-6 text-sm font-semibold tracking-wide md:flex"
          >
            <button
              type="button"
              onClick={() => scrollToSection("unhas-em-gel")}
              className="cursor-pointer py-2 text-[#1c1417] transition hover:text-[#fc6998]"
            >
              Unhas em Gel
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("cursos")}
              className="cursor-pointer py-2 text-[#1c1417] transition hover:text-[#efb810]"
            >
              Cursos
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
              className="min-h-[40px] cursor-pointer rounded-full bg-[#fc6998] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#e65283]"
            >
              Agendar
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
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => scrollToSection("unhas-em-gel")}
                className="border-pink-gold flex min-h-[44px] cursor-pointer items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-[#1c1417]"
              >
                <span>Serviços — Unhas em Gel</span>
                <span className="text-xs font-semibold text-[#fc6998]">Fibra &amp; Gel</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("cursos")}
                className="border-pink-gold flex min-h-[44px] cursor-pointer items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-[#1c1417]"
              >
                <span>Cursos Profissionais</span>
                <span className="text-xs font-semibold text-[#b67d03]">Certificado</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("agendar")}
                className="mt-1 min-h-[44px] cursor-pointer rounded-full bg-[#fc6998] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#e65283]"
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
                      ? "w-full max-w-[92vw] sm:max-w-2xl md:max-w-[54vw]"
                      : "w-full max-w-[88vw] sm:max-w-xl md:max-w-[46vw]"
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
                        className="font-script text-metallic-gold text-6xl leading-[1.05] font-normal tracking-normal sm:text-7xl md:text-8xl lg:text-9xl"
                        style={{
                          filter:
                            "drop-shadow(0 2px 14px rgba(255,255,255,0.95)) drop-shadow(0 1px 2px rgba(28,20,23,0.18))",
                        }}
                      >
                        {ch.title}
                      </h1>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="h-[1px] w-8 bg-[#efb810]" aria-hidden="true" />
                        <span className="font-serif text-xs font-semibold tracking-[0.42em] text-[#1c1417] uppercase sm:text-sm">
                          STUDIO
                        </span>
                        <span className="h-[1px] w-8 bg-[#efb810]" aria-hidden="true" />
                      </div>
                    </div>
                  ) : (
                    <h2
                      className="font-serif text-[3.1rem] leading-[0.98] font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
                      style={{ color: "#140d10" }}
                    >
                      {ch.title}
                    </h2>
                  )}

                  <p
                    className="text-metallic-gold mt-3.5 text-lg font-semibold leading-snug sm:text-xl md:mt-4 md:text-2xl lg:text-[26px]"
                    style={{
                      filter:
                        "drop-shadow(0 1px 10px rgba(255,255,255,0.92)) drop-shadow(0 1px 2px rgba(28,20,23,0.18))",
                    }}
                  >
                    {ch.subtitle}
                  </p>

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

      {/* Floating WhatsApp Side Button — slides in from right to left when header appears */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com Nayara Oliveira Studio no WhatsApp"
        title="Falar no WhatsApp"
        className={`border-pink-gold fixed right-4 bottom-5 z-50 flex h-13 w-13 items-center justify-center rounded-full shadow-lg transition-all duration-500 ease-out hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6 ${
          showHeader
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="border-pink-gold relative w-full max-w-sm overflow-hidden rounded-full bg-black p-2 shadow-2xl transition-transform duration-300"
          >
            <button
              type="button"
              onClick={() => setLogoModalOpen(false)}
              aria-label="Fechar visualização da logo"
              className="border-pink-gold absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-[#1c1417] shadow-md transition hover:scale-105"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={`${BASE_PATH}/esmalte-perfil.jpg`}
              alt="Nayara Oliveira Studio"
              className="aspect-square w-full rounded-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
}
