import React from "react";
import {
  Music,
  Volume2,
  Copy,
  Sliders,
  Disc,
  Layers,
  Sparkles,
  Headphones,
  CheckCircle2
} from "lucide-react";
import { CopyButton } from "../common/CopyButton";
import { promptBuilder } from "../../services/promptBuilder";

export function MusicModule({ project, onUpdateProject, showToast }) {
  const scenes = project?.scenes || [];
  const soundDesign = project?.soundDesign || {};
  const isMusicDisabled = project?.musicStyle === "None";

  const overallMusicPrompt = promptBuilder.buildMusicPrompt({
    style: soundDesign.overallMusicTheme || "Traditional Malay Cinematic Instrumental",
    mood: "Nostalgic, emotional, reflective",
    tempo: "70 BPM",
    instrumentation: (soundDesign.instruments || []).join(", ") || "Seruling, Gambus, Strings",
    purpose: soundDesign.mixNotes || "Underlying atmospheric music supporting character dialogue"
  });

  return (
    <div className="space-y-6 animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--color-primary-light)", padding: "3px 10px", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: 6 }}>
            <Music size={12} />
            <span>STUDIO SKOR MUZIK & FOLEY SFX</span>
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
            BACKGROUND MUSIC & SFX GENERATOR
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Arahan orkestrasi muzik, instrumen akustik tradisi, dan pecahan kesan bunyi (SFX) per-babak
          </p>
        </div>

        {!isMusicDisabled && (
          <CopyButton
            text={overallMusicPrompt}
            label="COPY MASTER MUSIC PROMPT"
          />
        )}
      </div>

      {/* Music Status or None Warning */}
      {isMusicDisabled ? (
        <div className="studio-card text-center p-8 bg-slate-50">
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-secondary)" }}>
            Muzik Ditetapkan Kepada: NONE (Tiada Muzik)
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 4 }}>
            Projek ini hanya menggunakan trek kesan bunyi foley persekitaran semula jadi.
          </p>
        </div>
      ) : (
        /* Master Soundtrack Architecture Card */
        <div className="studio-card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "14px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "16px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: "10px", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary-dark)" }}>
                <Disc size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>
                  Master Soundtrack Package
                </h3>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Tema: <strong>{soundDesign.overallMusicTheme}</strong> • Tempo: <strong>{soundDesign.bpmRange || "65 - 75 BPM"}</strong>
                </div>
              </div>
            </div>

            <span className="badge badge-accent">Audio Mixing Ready</span>
          </div>

          {/* Key Audio Parameters */}
          <div className="grid-3" style={{ gap: "16px", marginBottom: "20px" }}>
            <div className="studio-card" style={{ background: "#fafafa" }}>
              <strong style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Instrumen Utama
              </strong>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {(soundDesign.instruments || []).map((inst, i) => (
                  <span key={i} className="badge badge-secondary" style={{ fontSize: "0.75rem" }}>
                    {inst}
                  </span>
                ))}
              </div>
            </div>

            <div className="studio-card" style={{ background: "#fafafa" }}>
              <strong style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Foley Ambience
              </strong>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0 }}>
                {soundDesign.ambientFoleyTrack || "Desiran bayu, kicauan burung, sungai mengalir"}
              </p>
            </div>

            <div className="studio-card" style={{ background: "#fafafa" }}>
              <strong style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Panduan Adunan (Mix Notes)
              </strong>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0 }}>
                {soundDesign.mixNotes || "Muzik berada di bawah vokal"}
              </p>
            </div>
          </div>

          {/* Music Prompt Box */}
          <div>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}>
              AI Music Generator Prompt (Suno / Udio / AudioCraft)
            </div>
            <div className="prompt-box prompt-box-code" style={{ background: "#fefce8", borderColor: "#fef08a", color: "#854d0e" }}>
              {overallMusicPrompt}
            </div>
          </div>
        </div>
      )}

      {/* Per-Scene SFX Breakdown Table */}
      <div className="studio-card" style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "16px" }}>
          Pecahan Kesan Bunyi (Sound Effects SFX) Mengikut Babak
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {scenes.map((scene) => (
            <div
              key={scene.id}
              style={{
                background: "#f8fafc",
                borderRadius: "var(--radius-md)",
                padding: "14px 18px",
                border: "1px solid var(--border-subtle)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="badge badge-primary" style={{ fontSize: "0.75rem" }}>
                    SCENE {String(scene.sceneNumber).padStart(2, "0")}
                  </span>
                  <strong style={{ fontSize: "0.9rem" }}>{scene.title}</strong>
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Cue Muzik: <em>{scene.music?.cue}</em>
                </span>
              </div>

              {/* SFX List for this scene */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {(scene.sfx || []).map((fx, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "0.82rem",
                      background: "#ffffff",
                      padding: "6px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid #e2e8f0"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Volume2 size={14} className="text-amber-500" />
                      <strong style={{ color: "var(--text-primary)" }}>{fx.name}</strong>
                    </div>
                    <div style={{ display: "flex", gap: "12px", color: "var(--text-muted)", fontSize: "0.75rem" }}>
                      <span>Masa: {fx.timing}</span>
                      <span>Volume: {fx.volume}</span>
                      <span>Tujuan: {fx.purpose}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
