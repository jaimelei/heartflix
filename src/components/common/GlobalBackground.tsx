// src/components/common/GlobalBackground.tsx
import { useEffect, useState } from "react";

const BLOB_COLORS = [
  "rgba(126, 200, 227, 0.35)", // sky blue
  "rgba(195, 177, 225, 0.50)", // lavender
  "rgba(244, 167, 187, 0.25)", // rose
  "rgba(168, 230, 207, 0.25)", // mint
];

export default function GlobalBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none overflow-hidden"
      style={{
        zIndex: 0,
        background: "var(--color-bg)",
      }}
    >
      {/* Radial overlay to give center glow depth */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 30%, rgba(248, 251, 255, 0.4) 100%)",
          zIndex: 1,
        }}
      />

      {/* Blob 1 - Top Left */}
      <div
        className="absolute rounded-full filter blur-[100px] animate-float"
        style={{
          width: "35vw",
          height: "35vw",
          background: BLOB_COLORS[0],
          top: "-5%",
          left: "-5%",
          animationDuration: "14s",
        }}
      />

      {/* Blob 2 - Top Right */}
      <div
        className="absolute rounded-full filter blur-[100px] animate-float"
        style={{
          width: "30vw",
          height: "30vw",
          background: BLOB_COLORS[1],
          top: "15%",
          right: "5%",
          animationDuration: "18s",
          animationDelay: "2s",
        }}
      />

      {/* Blob 3 - Bottom Left */}
      <div
        className="absolute rounded-full filter blur-[120px] animate-float"
        style={{
          width: "40vw",
          height: "40vw",
          background: BLOB_COLORS[2],
          bottom: "10%",
          left: "15%",
          animationDuration: "16s",
          animationDelay: "4s",
        }}
      />

      {/* Blob 4 - Bottom Right */}
      <div
        className="absolute rounded-full filter blur-[100px] animate-float"
        style={{
          width: "35vw",
          height: "35vw",
          background: BLOB_COLORS[3],
          bottom: "-5%",
          right: "10%",
          animationDuration: "15s",
          animationDelay: "1s",
        }}
      />
    </div>
  );
}
