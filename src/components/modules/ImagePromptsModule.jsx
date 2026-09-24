import React, { useState } from "react";
import {
  Image as ImageIcon,
  Copy,
  Sparkles,
  Layers,
  Filter,
  CheckCircle2,
  Sliders,
  Ratio
} from "lucide-react";
import { CopyButton } from "../common/CopyButton";
import { promptBuilder } from "../../services/promptBuilder";

export function ImagePromptsModule({ project, onUpdateProject, showToast }) {
  const scenes = project?.scenes || [];
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const [filterChar, setFilterChar] = useState("ALL");

  const currentScene = scenes[selectedSceneIndex] || scenes[0];

  const handleCopyAllPrompts = async () => {
    let combined = `SEMUA IMAGE PROMPTS (18 ASPEK) - ${project.name}\n`;
    combined += `Nisbah Aspek: ${project.aspectRatio || "16:9"} | Gaya: ${project.visualStyle || "Photorealistic"}\n\n`;

    scenes.forEach((s) => {
      combined += `[SCENE ${String(s.sceneNumber).padStart(2, "0")}: ${s.title}]\n`;
      combined += `${s.imagePrompt}\n\n`;
      combined += `Negative Prompt:\n${promptBuilder.defaultNegativePrompt}\n`;
      combined += `--------------------------------------------------\n\n`;
    });

    try {
      await navigator.clipboard.writeText(combined);
      showToast("Semua prompt gambar berjaya disalin ke papan klip!", "success");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--color-primary-light)", padding: "3px 10px", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: 6 }}>
            <ImageIcon size={12} />
            <span>18-ASPECT MASTER PROMPT GENERATOR</span>
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
            IMAGE PROMPT GENERATOR
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Prompt fotografi & sinematik tahap pengeluaran (Midjourney, Flux, Stable Diffusion, DALL-E)
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleCopyAllPrompts}
            className="btn btn-primary btn-sm"
            type="button"
          >
            <Copy size={14} />
            <span>COPY ALL IMAGE PROMPTS</span>
          </button>
        </div>
      </div>

      {/* 18-Aspect Architecture Checklist Pill */}
      <div className="studio-card" style={{ padding: "16px 20px", background: "#f8fafc" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>
          ✓ Struktur 18 Aspek Sinematik Terkandung Dalam Setiap Prompt:
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", fontSize: "0.72rem" }}>
          {[
            "1. Character Locked Desc",
            "2. Character Action",
            "3. Facial Expression",
            "4. Body Language",
            "5. Environment",
            "6. Architecture",
            "7. Props",
            "8. Weather",
            "9. Time of Day",
            "10. Lighting",
            "11. Color Atmosphere",
            "12. Camera Angle",
            "13. Lens",
            "14. Depth of Field",
            "15. Composition",
            "16. Cinematic Quality",
            "17. Visual Style",
            "18. Aspect Ratio"
          ].map((aspect, i) => (
            <span
              key={i}
              style={{
                background: "#ffffff",
                padding: "3px 8px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid #cbd5e1",
                color: "var(--text-secondary)",
                fontWeight: 500
              }}
            >
              {aspect}
            </span>
          ))}
        </div>
      </div>

      {/* Scene Navigation Selector */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
        {scenes.map((s, idx) => {
          const isSelected = idx === selectedSceneIndex;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedSceneIndex(idx)}
              type="button"
              className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-secondary"}`}
              style={{ borderRadius: "var(--radius-full)", fontSize: "0.78rem" }}
            >
              <span>SCENE {String(s.sceneNumber).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      {/* Active Scene Image Prompt Card */}
      {currentScene && (
        <div className="studio-card" style={{ padding: "28px" }}>
          {/* Card Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "16px", marginBottom: "20px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span className="badge badge-primary">
                  SCENE {String(currentScene.sceneNumber).padStart(2, "0")}
                </span>
                <span className="badge badge-accent">{currentScene.camera?.shotType}</span>
                <span className="badge badge-secondary">{project.aspectRatio || "16:9"}</span>
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: 0 }}>
                {currentScene.title}
              </h3>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <CopyButton
                text={currentScene.imagePrompt}
                label="COPY IMAGE PROMPT"
              />
            </div>
          </div>

          {/* Prompt Display Box */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}>
              Production Master Image Prompt
            </div>
            <div
              className="prompt-box prompt-box-code"
              style={{
                fontSize: "0.9rem",
                padding: "18px",
                lineHeight: 1.7,
                border: "1px solid rgba(99, 102, 241, 0.25)",
                background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)"
              }}
            >
              {currentScene.imagePrompt}
            </div>
          </div>

          {/* Standard Negative Prompt */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#991b1b", textTransform: "uppercase" }}>
                Production Negative Prompt (Enforced Quality Control)
              </span>
              <CopyButton text={promptBuilder.defaultNegativePrompt} label="Salin Negative Prompt" />
            </div>
            <div className="prompt-box prompt-box-code" style={{ background: "#fef2f2", borderColor: "#fecaca", color: "#991b1b" }}>
              {promptBuilder.defaultNegativePrompt}
            </div>
          </div>

          {/* Breakdown Pills for this Scene */}
          <div className="grid-3" style={{ gap: "16px", background: "#f8fafc", padding: "16px", borderRadius: "var(--radius-lg)" }}>
            <div>
              <strong style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>Lensa & Kamera:</strong>
              <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{currentScene.camera?.shotType} • {currentScene.camera?.lens}</div>
            </div>
            <div>
              <strong style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>Pencahayaan & Suasana:</strong>
              <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>{currentScene.lighting}</div>
            </div>
            <div>
              <strong style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>Watak Terkunci:</strong>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-primary-dark)" }}>
                {(currentScene.charactersPresent || []).join(", ")} (Locked Identity Verified)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
