import React, { useState } from "react";
import {
  Grid3X3,
  Clock,
  MapPin,
  Camera,
  MessageSquare,
  Sparkles,
  Copy,
  ChevronDown,
  ChevronUp,
  Film,
  Music,
  Volume2
} from "lucide-react";
import { CopyButton } from "../common/CopyButton";

export function StoryboardModule({ project, onUpdateProject, showToast }) {
  const scenes = project?.scenes || [];
  const characters = project?.characters || [];
  const [expandedSceneId, setExpandedSceneId] = useState(scenes[0]?.id || null);

  // Compute accumulated timestamps
  let accumulatedSeconds = 0;
  const scenesWithTimestamps = scenes.map((s) => {
    const startSec = accumulatedSeconds;
    const endSec = startSec + s.duration;
    accumulatedSeconds = endSec;

    const formatTime = (secs) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    return {
      ...s,
      timeRange: `${formatTime(startSec)} – ${formatTime(endSec)}`
    };
  });

  return (
    <div className="space-y-6 animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--color-primary-light)", padding: "3px 10px", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: 6 }}>
            <Grid3X3 size={12} />
            <span>PAPAN CERITA AKHIR</span>
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
            FINAL PRODUCTION STORYBOARD
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Urutan visual bergaris masa dengan bingkai babak, durasi kumulatif, dialog dan prompt pengeluaran
          </p>
        </div>

        <div className="badge badge-accent" style={{ fontSize: "0.85rem", padding: "6px 14px" }}>
          Jumlah Keseluruhan: {accumulatedSeconds} Saat ({scenes.length} Babak)
        </div>
      </div>

      {/* Storyboard Sequence Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {scenesWithTimestamps.map((scene, index) => {
          const isExpanded = expandedSceneId === scene.id;
          const isEven = index % 2 === 0;

          return (
            <div key={scene.id} className="relative">
              {/* Timeline Connector Line */}
              {index < scenes.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: "32px",
                    bottom: "-24px",
                    width: "2px",
                    height: "24px",
                    background: "var(--color-primary-light)",
                    zIndex: 0
                  }}
                />
              )}

              <div
                className="studio-card"
                style={{
                  padding: "20px 24px",
                  borderLeft: isExpanded ? "4px solid var(--color-primary)" : "1px solid var(--border-subtle)",
                  transition: "all var(--trans-fast)"
                }}
              >
                {/* Visual Thumbnail & Metadata Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "16px",
                    cursor: "pointer"
                  }}
                  onClick={() => setExpandedSceneId(isExpanded ? null : scene.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, minWidth: "280px" }}>
                    {/* Visual Frame Placeholder Art */}
                    <div
                      style={{
                        width: "120px",
                        height: "68px",
                        borderRadius: "var(--radius-md)",
                        background: isEven
                          ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)"
                          : "linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #c2410c 100%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        padding: "6px",
                        textAlign: "center",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                        flexShrink: 0
                      }}
                    >
                      <Film size={18} style={{ opacity: 0.8, marginBottom: 2 }} />
                      <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.05em" }}>
                        FRAME {String(scene.sceneNumber).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: "0.62rem", opacity: 0.75 }}>
                        {scene.camera?.shotType || "Medium Shot"}
                      </span>
                    </div>

                    {/* Scene Identity */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span className="badge badge-primary" style={{ fontSize: "0.72rem" }}>
                          SCENE {String(scene.sceneNumber).padStart(2, "0")}
                        </span>
                        <span className="badge badge-secondary" style={{ fontSize: "0.72rem" }}>
                          <Clock size={11} /> {scene.timeRange} ({scene.duration}s)
                        </span>
                      </div>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0 }}>
                        {scene.title}
                      </h4>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>
                        {scene.location} • Watak: <strong>{(scene.charactersPresent || []).join(", ")}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="hidden sm:block text-right" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      <div>Kamera: <strong>{scene.camera?.shotType}</strong></div>
                      <div>Muzik: <em>{scene.music?.mood || "Sinematik"}</em></div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      style={{ padding: 6 }}
                    >
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div
                    className="space-y-4 animate-fade-in"
                    style={{
                      marginTop: "20px",
                      paddingTop: "20px",
                      borderTop: "1px solid var(--border-subtle)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px"
                    }}
                  >
                    {/* Action & Dialogue Snippet */}
                    <div className="grid-2" style={{ gap: "16px" }}>
                      <div style={{ background: "#f8fafc", padding: "12px 16px", borderRadius: "var(--radius-md)" }}>
                        <strong style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
                          Tindakan Watak:
                        </strong>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-primary)", margin: 0 }}>
                          {scene.action}
                        </p>
                      </div>

                      {scene.dialogue?.text && (
                        <div style={{ background: "#f0fdf4", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid #dcfce7" }}>
                          <strong style={{ fontSize: "0.78rem", color: "#166534", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
                            Dialog ({scene.dialogue.speaker}):
                          </strong>
                          <p style={{ fontSize: "0.88rem", color: "#14532d", fontStyle: "italic", margin: 0, fontWeight: 500 }}>
                            &ldquo;{scene.dialogue.text}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Quick Copy Prompts */}
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <CopyButton
                        text={scene.imagePrompt}
                        label="Salin Image Prompt"
                      />
                      <CopyButton
                        text={scene.videoPrompt}
                        label="Salin Video Prompt"
                      />
                      <CopyButton
                        text={scene.voPrompt}
                        label="Salin VO Prompt"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
