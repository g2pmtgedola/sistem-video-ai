import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ text, label = "Salin", copiedLabel = "Disalin!", className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`btn btn-secondary btn-sm transition-all ${copied ? "bg-emerald-50 text-emerald-700 border-emerald-300" : ""} ${className}`}
      title="Salin ke papan klip"
    >
      {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
}
