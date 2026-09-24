import React from "react";

export function ProgressBar({ progress = 0, showLabel = true, height = 8 }) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {showLabel && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
          <span>PROGRES PIPELINE</span>
          <span style={{ color: "var(--color-primary-dark)" }}>{clamped}%</span>
        </div>
      )}
      <div
        style={{
          width: "100%",
          height: `${height}px`,
          backgroundColor: "#e2e8f0",
          borderRadius: "9999px",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <div
          style={{
            width: `${clamped}%`,
            height: "100%",
            background: "var(--grad-primary)",
            borderRadius: "9999px",
            transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        />
      </div>
    </div>
  );
}
