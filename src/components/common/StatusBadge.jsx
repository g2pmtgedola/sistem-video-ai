import React from "react";
import { CheckCircle2, Clock, Sparkles, Lock, ShieldCheck, AlertTriangle } from "lucide-react";

export function StatusBadge({ status = "Draft" }) {
  switch (status.toLowerCase()) {
    case "completed":
    case "selesai":
      return (
        <span className="badge badge-success">
          <CheckCircle2 size={12} />
          <span>Selesai (Completed)</span>
        </span>
      );
    case "processing":
    case "menjana":
      return (
        <span className="badge badge-primary">
          <Sparkles size={12} className="animate-spin" />
          <span>Sedang Diproses</span>
        </span>
      );
    case "draft":
    default:
      return (
        <span className="badge badge-warning">
          <Clock size={12} />
          <span>Draf (Draft)</span>
        </span>
      );
  }
}

export function LockBadge({ isLocked = true, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`badge ${isLocked ? "badge-locked hover:bg-pink-100" : "badge-secondary hover:bg-slate-200"} cursor-pointer transition-colors`}
      title={isLocked ? "Kunci aktif - Deskripsi dilindungi dari perubahan rawak" : "Klik untuk mengunci deskripsi watak"}
    >
      <Lock size={12} />
      <span>{isLocked ? "🔒 CHARACTER LOCKED" : "🔓 UNLOCKED"}</span>
    </button>
  );
}

export function ConsistencyBadge({ score = 100, onClick }) {
  const isHigh = score >= 90;
  const isMid = score >= 70 && score < 90;
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`badge ${isHigh ? "badge-success" : isMid ? "badge-warning" : "badge-danger"} cursor-pointer transition-all hover:scale-105`}
      title="Klik untuk membuka AI Quality Control Audit"
    >
      {isHigh ? <ShieldCheck size={13} /> : <AlertTriangle size={13} />}
      <span>Skor Konsistensi: {score}%</span>
    </button>
  );
}
