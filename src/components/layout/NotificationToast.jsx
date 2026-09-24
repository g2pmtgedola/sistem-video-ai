import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function NotificationToast({ toast, onClose }) {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case "error":
        return <AlertCircle size={18} className="text-red-500" />;
      case "info":
        return <Info size={18} className="text-blue-500" />;
      case "success":
      default:
        return <CheckCircle2 size={18} className="text-emerald-500" />;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 99999,
        background: "#ffffff",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-xl)",
        border: "1px solid var(--border-subtle)",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        maxWidth: "420px",
        animation: "fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      {getIcon()}
      <div style={{ flex: 1, fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 500 }}>
        {toast.message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "var(--text-muted)",
          padding: 2
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
