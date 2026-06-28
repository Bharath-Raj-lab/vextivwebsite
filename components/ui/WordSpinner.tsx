"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WordSpinnerProps {
  words: string[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function WordSpinner({
  words,
  interval = 2500,
  className = "",
  style = {},
}: WordSpinnerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  // Find the longest word to reserve space so the layout doesn't jump
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <span
      className={className}
      style={{
        display: "inline-grid",
        gridTemplateColumns: "1fr",
        textAlign: "left",
        ...style,
      }}
    >
      <span style={{ visibility: "hidden", gridArea: "1 / 1" }}>
        {longestWord}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ gridArea: "1 / 1" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
