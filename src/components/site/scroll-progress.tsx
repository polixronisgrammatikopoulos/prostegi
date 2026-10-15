"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Λεπτή γραμμή προόδου στην κορυφή της σελίδας — γεμίζει καθώς κάνετε scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#2c7a3e] via-[#3e9b54] to-[#0d4c74]"
      style={{ scaleX }}
    />
  );
}
