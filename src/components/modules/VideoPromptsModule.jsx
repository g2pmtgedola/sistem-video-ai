import React, { useState } from "react";
import {
  Video,
  Copy,
  Sparkles,
  Clapperboard,
  ShieldCheck,
  Zap,
  Film
} from "lucide-react";
import { CopyButton } from "../common/CopyButton";

export function VideoPromptsModule({ project, onUpdateProject, showToast }) {
  const scenes = project?.scenes || [];
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);

  const currentScene = scenes[selectedSceneIndex] || scenes[0];

  const handleCopyAllVideoPrompts = async () => {
    let text = `SEMUA VIDEO GENERATION PROMPTS (SORA / KLING / RUNWAY) - ${project.name}\n`;
    text += `Gaya: ${project.visualStyle || "Cinematic"} | Aspek: ${project.aspectRatio || "16:9"}\n\n`;

    scenes.forEach((s) => {
      text += `[SCENE ${String(s.sceneNumber).padStart(2, "0")}: ${s.title} (${s.duration} Saat)]\n`;
      text += `${s.videoPrompt}\n\n`;
      text += `--------------------------------------------------------\n\n`;
    });

    try {
      await navigator.clipboard.writeText(text);
      showToast("Semua prompt video berjaya disalin ke papan klip!", "success");
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
            <Video size={12} />
            <span>AI VIDEO PRODUCTION PROMPT ENGINE</span>
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
            VIDEO PROMPT GENERATOR
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Format arahan pergerakan, fizik dan kesinambungan untuk OpenAI Sora, Kling AI, Runway Gen-3 & Luma
          </p>
        </div>

        <button
          onClick={handleCopyAllVideoPrompts}
          className="btn btn-primary btn-sm"
          type="button"
        >
          <Copy size={14} />
          <span>COPY ALL VIDEO PROMPTS</span>
        </button>
      </div>

      {/* AI Video Architecture Banner */}
      <div
        className="studio-card"
        style={{
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.07) 0%, rgba(236, 72, 153, 0.06) 100%)",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          padding: "16px 20px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <Sparkles size={16} className="text-purple-600" />
          <strong style={{ fontSize: "0.85rem", color: "#6b21a8" }}>
            Struktur Video Pintar & Negative Instructions
          </strong>
        </div>
        <p style={{ fontSize: "0.8rem", color: "#581c87", margin: 0, lineHeight: 1.5 }}>
          Setiap prompt video mengandungi arahan watak terkunci, fizik pergerakan kain dan tangan, pergerakan zarah persekitaran (dust particles),
          serta <em>Negative Instructions</em> bagi mengelakkan herotan wajah, morphing, atau perubahan pakaian rawak.
        </p>
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
              <span>SCENE {String(s.sceneNumber).padStart(2, "0")} ({s.duration}s)</span>
            </button>
          );
        })}
      </div>

      {/* Active Scene Video Prompt Card */}
      {currentScene && (
        <div className="studio-card" style={{ padding: "28px" }}>
          {/* Card Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "16px", marginBottom: "20px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span className="badge badge-primary">
                  SCENE {String(currentScene.sceneNumber).padStart(2, "0")}
                </span>
                <span className="badge badge-accent">Durasi: {currentScene.duration}s</span>
                <span className="badge badge-secondary">{currentScene.camera?.movement}</span>
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: 0 }}>
                {currentScene.title}
              </h3>
            </div>

            <CopyButton
              text={currentScene.videoPrompt}
              label="COPY VIDEO PROMPT"
            />
          </div>

          {/* Master Video Prompt Display Box */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}>
              Production Video Generation Prompt
            </div>
            <div
              className="prompt-box prompt-box-code"
              style={{
                fontSize: "0.9rem",
                padding: "20px",
                lineHeight: 1.7,
                background: "linear-gradient(180deg, #faf5ff 0%, #fdf4ff 100%)",
                borderColor: "#e9d5ff",
                color: "#3b0764"
              }}
            >
              {currentScene.videoPrompt}
            </div>
          </div>

          {/* Core Video Parameters Grid */}
          <div className="grid-3" style={{ gap: "16px", background: "#f8fafc", padding: "16px", borderRadius: "var(--radius-lg)" }}>
            <div>
              <strong style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>Subjek & Pergerakan:</strong>
              <div style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>{currentScene.action}</div>
            </div>
            <div>
              <strong style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>Kamera & Syot:</strong>
              <div style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>{currentScene.camera?.shotType} ({currentScene.camera?.movement})</div>
            </div>
            <div>
              <strong style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block" }}>Pencahayaan & Atmosfera:</strong>
              <div style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>{currentScene.lighting}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
