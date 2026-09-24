import React, { useState } from "react";
import {
  Mic,
  Copy,
  Volume2,
  Sparkles,
  Play,
  Languages,
  Clock,
  UserCheck
} from "lucide-react";
import { CopyButton } from "../common/CopyButton";

export function VoiceModule({ project, onUpdateProject, showToast }) {
  const scenes = project?.scenes || [];
  const characters = project?.characters || [];

  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const currentScene = scenes[activeSceneIndex] || scenes[0];

  const handleCopyAllVO = async () => {
    let text = `SKRIP DIALOG & VOICE-OVER LENGKAP - ${project.name}\n`;
    text += `Bahasa: ${project.language || "Bahasa Melayu"}\n\n`;

    scenes.forEach((s) => {
      text += `SCENE ${String(s.sceneNumber).padStart(2, "0")}: ${s.title}\n`;
      if (s.dialogue?.text) {
        text += `Watak: ${s.dialogue.speaker} (Emosi: ${s.dialogue.emotion}, Kelajuan: ${s.dialogue.speed || "0.9x"})\n`;
        text += `Dialog: "${s.dialogue.text}"\n`;
      }
      if (s.narration) {
        text += `Narasi: "${s.narration}"\n`;
      }
      text += `VO Prompt:\n${s.voPrompt}\n`;
      text += `---------------------------------------------------\n\n`;
    });

    try {
      await navigator.clipboard.writeText(text);
      showToast("Semua skrip dialog dan arahan VO berjaya disalin!", "success");
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
            <Mic size={12} />
            <span>MODUL SUARA & DIALOG MALAYSIA</span>
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
            AI VOICE & DIALOGUE
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Parameter lakonan suara, emosi, tempo jeda, dan prompt penjana suara (ElevenLabs / TTS)
          </p>
        </div>

        <button
          onClick={handleCopyAllVO}
          className="btn btn-primary btn-sm"
          type="button"
        >
          <Copy size={14} />
          <span>COPY ALL VO PROMPTS</span>
        </button>
      </div>

      {/* Malaysian Diction Guide Notice */}
      <div
        className="studio-card"
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(6, 182, 212, 0.06) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          padding: "16px 20px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Languages size={16} className="text-emerald-600" />
          <strong style={{ fontSize: "0.85rem", color: "#065f46" }}>
            Standard Sebutan Bahasa Melayu Malaysia Tulen
          </strong>
        </div>
        <p style={{ fontSize: "0.8rem", color: "#047857", margin: 0 }}>
          Sistem memastikan dialog mengekalkan kosa kata dan struktur ayat Bahasa Melayu Malaysia (bukan dialek Indonesia automatik).
          Intonasi disesuaikan mengikut umur, adab dan konteks babak.
        </p>
      </div>

      {/* Scene Navigation Selector */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
        {scenes.map((s, idx) => {
          const isSelected = idx === activeSceneIndex;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSceneIndex(idx)}
              type="button"
              className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-secondary"}`}
              style={{ borderRadius: "var(--radius-full)", fontSize: "0.78rem" }}
            >
              <span>SCENE {String(s.sceneNumber).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      {/* Active Scene Voice Sheet */}
      {currentScene && (
        <div className="studio-card" style={{ padding: "28px" }}>
          {/* Top Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "16px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="badge badge-primary">
                SCENE {String(currentScene.sceneNumber).padStart(2, "0")}
              </span>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: 0 }}>
                {currentScene.title}
              </h3>
            </div>

            <CopyButton
              text={currentScene.voPrompt}
              label="COPY VO PROMPT"
            />
          </div>

          {/* Dialogue Presentation Box */}
          {currentScene.dialogue?.text ? (
            <div
              style={{
                background: "#f8fafc",
                borderRadius: "var(--radius-lg)",
                padding: "20px",
                border: "1px solid var(--border-subtle)",
                marginBottom: "24px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <UserCheck size={16} className="text-indigo-600" />
                  <strong style={{ fontSize: "0.95rem", color: "var(--color-primary-dark)" }}>
                    {currentScene.dialogue.speaker}
                  </strong>
                  <span className="badge badge-secondary" style={{ fontSize: "0.7rem" }}>
                    {currentScene.dialogue.emotion}
                  </span>
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Kelajuan: <strong>{currentScene.dialogue.speed || "0.9x"}</strong>
                </span>
              </div>

              <div style={{ fontSize: "1.15rem", color: "var(--text-primary)", fontStyle: "italic", fontWeight: 600, margin: "10px 0 14px", lineHeight: 1.6 }}>
                &ldquo;{currentScene.dialogue.text}&rdquo;
              </div>

              {/* Voice Direction Specs */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px", fontSize: "0.8rem", color: "var(--text-secondary)", background: "#ffffff", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid #e2e8f0" }}>
                <div><strong>Arahan Suara:</strong> {currentScene.dialogue.voiceDirection}</div>
                <div><strong>Jeda (Pause):</strong> {currentScene.dialogue.pause}</div>
                <div><strong>Penekanan:</strong> {currentScene.dialogue.emphasis}</div>
                <div><strong>Dialek:</strong> Bahasa Melayu Asli</div>
              </div>
            </div>
          ) : (
            <div className="p-4 mb-6 bg-slate-50 text-slate-500 rounded-md">
              Babak ini tidak mempunyai dialog watak langsung (fokus visual / narasi).
            </div>
          )}

          {/* ElevenLabs / TTS Production Voice Prompt */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                Complete AI Voice Generation Prompt (ElevenLabs / Azure TTS)
              </span>
              <CopyButton text={currentScene.voPrompt} label="Salin Prompt Suara" />
            </div>
            <div className="prompt-box prompt-box-code" style={{ background: "#f0fdf4", borderColor: "#bbf7d0", color: "#166534" }}>
              {currentScene.voPrompt}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
