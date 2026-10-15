"use client";

/**
 * Κινηματογραφικά scroll animations για όλο το site:
 * - Reveal: fade + rise (μεταφορά και στα subpages)
 * - RevealStagger / RevealItem: στοιχεία που εμφανίζονται διαδοχικά
 * - Counter: αριθμοί που "μετράνε" όταν μπουν στο οπτικό πεδίο
 * - GrowLine: οριζόντια γραμμή που "ανοίγει" στο scroll
 * Όλα σέβονται το prefers-reduced-motion.
 */

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  blur?: boolean;
};

/** Fade-and-rise reveal animation wrapper used across sections. */
export function Reveal({ children, delay = 0, y = 26, className, blur }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, ...(blur ? { filter: "blur(6px)" } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Stagger (διαδοχικά στοιχεία) ---------------- */

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
};

/** Container — τα παιδιά (RevealItem) εμφανίζονται ένα-ένα καθώς κάνετε scroll. */
export function RevealStagger({ children, className }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
    >
      {children}
    </motion.div>
  );
}

/** Παιδί του RevealStagger — εφαρμόζει το animation εμφάνισης. */
export function RevealItem({ children, className }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/* ---------------- Counter (αρίθμηση σε κίνηση) ---------------- */

type CounterProps = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

function formatNumber(value: number, decimals: number) {
  return new Intl.NumberFormat("el-GR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Αριθμός που μετράει από το 0 μέχρι το `to` όταν εμφανισθεί στην οθόνη. */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1500,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    if (reduceMotion) {
      el.textContent = `${prefix}${formatNumber(to, decimals)}${suffix}`;
      return;
    }

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${prefix}${formatNumber(to * eased, decimals)}${suffix}`;
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, decimals, prefix, suffix, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(0, decimals)}
      {suffix}
    </span>
  );
}

/* ---------------- GrowLine (γραμμή που ανοίγει) ---------------- */

/** Οριζόντια γραμμή που "ζωγραφίζεται" από αριστερά προς τα δεξιά στο scroll. */
export function GrowLine({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className} aria-hidden />;
  }

  return (
    <motion.div
      className={className}
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{ transformOrigin: "left center" }}
    />
  );
}
