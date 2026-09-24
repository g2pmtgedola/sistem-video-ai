import React, { useState } from "react";
import {
  Clapperboard,
  Clock,
  MapPin,
  Camera,
  Edit3,
  RefreshCw,
  Copy,
  Trash2,
  Lock,
  Unlock,
  Plus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Music,
  Sliders
} from "lucide-react";
import { CopyButton } from "../common/CopyButton";
import { Modal } from "../common/Modal";
import { aiService } from "../../services/aiService";

export const CAMERA_SHOTS = [
  "Extreme Wide Shot",
  "Wide Shot",
  "Full Shot",
  "Medium Wide Shot",
  "Medium Shot",
  "Medium Close-Up",
  "Close-Up",
  "Extreme Close-Up",
  "Over-the-Shoulder",
  "POV",
  "Low Angle",
  "High Angle",
  "Eye Level",
  "Dutch Angle",
  "Tracking Shot",
  "Dolly In",
  "Dolly Out",
  "Crane Shot",
  "Orbit Shot"
];

export function SceneBuilderModule({ project, onUpdateProject, showToast }) {
  const scenes = project?.scenes || [];
  const characters = project?.characters || [];

  const [activeSceneId, setActiveSceneId] = useState(scenes[0]?.id || "SCENE_001");
  const [editingScene, setEditingScene] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const activeScene = scenes.find((s) => s.id === activeSceneId) || scenes[0];

  // Open editor
  const handleOpenEdit = (scene) => {
    setEditingScene(JSON.parse(JSON.stringify(scene)));
    setIsEditModalOpen(true);
  };

  // Save edited scene
  const handleSaveScene = () => {
    if (!editingScene) return;
    const updatedScenes = scenes.map((s) => (s.id === editingScene.id ? editingScene : s));
    onUpdateProject({
      ...project,
      scenes: updatedScenes
    });
    setIsEditModalOpen(false);
    showToast(`Adegan ${editingScene.sceneNumber} berjaya disimpan!`, "success");
  };

  // Regenerate single scene while preserving locked character traits
  const handleRegenerateScene = (scene) => {
    const refreshed = aiService.regenerateScene(scene, characters, project.visualStyle);
    const updatedScenes = scenes.map((s) => (s.id === scene.id ? refreshed : s));
    onUpdateProject({
      ...project,
      scenes: updatedScenes
    });
    showToast(`Adegan ${scene.sceneNumber} dijana semula tanpa menukar identiti watak!`, "success");
  };

  // Delete scene
  const handleDeleteScene = (sceneId) => {
    if (scenes.length <= 1) {
      alert("Projek mestilah mempunyai sekurang-kurangnya satu adegan.");
      return;
    }
    const updatedScenes = scenes
      .filter((s) => s.id !== sceneId)
      .map((s, idx) => ({ ...s, sceneNumber: idx + 1, id: `SCENE_${String(idx + 1).padStart(3, "0")}` }));

    onUpdateProject({
      ...project,
      scenes: updatedScenes
    });
    setActiveSceneId(updatedScenes[0].id);
    showToast("Adegan dipadam dan garis masa diselaraskan.", "info");
  };

  // Add new scene
  const handleAddScene = () => {
    const newIndex = scenes.length + 1;
    const newSceneId = `SCENE_${String(newIndex).padStart(3, "0")}`;
    const newScene = {
      id: newSceneId,
      sceneNumber: newIndex,
      duration: 8,
      title: `Babak ${newIndex}: Perkembangan Lanjutan`,
      objective: "Meneruskan kesinambungan naratif dengan visual yang mantap.",
      location: project.continuity?.primaryLocation || "Bengkel Tradisional",
      time: "4:00 PM (Petang)",
      environment: "Suasana tenang dengan pencahayaan sinematik.",
      charactersPresent: [characters[0]?.id || "CHAR_001"],
      characterPositions: `${characters[0]?.name || "Watak"} berada di posisi utama.`,
      action: `${characters[0]?.name || "Watak"} melakukan tindakan dengan penuh tumpuan.`,
      emotion: "Tekun dan tenang",
      narration: "Setiap langkah mengukir masa depan.",
      dialogue: {
        characterId: characters[0]?.id || "CHAR_001",
        speaker: characters[0]?.name || "Watak",
        text: "Teruskan usaha dengan hati yang lapang.",
        emotion: "Lembut dan tenang",
        voiceDirection: "Tempo 0.9x",
        speed: "0.9x",
        pause: "Jeda normal",
        emphasis: "hati, lapang"
      },
      camera: {
        shotType: "Medium Shot",
        movement: "Slow Dolly In",
        lens: "50mm f/1.8",
        angle: "Eye Level"
      },
      lighting: "Warm natural sunlight.",
      sfx: [{ name: "Ambient foley", volume: "50%", timing: "00:00 - 00:08", purpose: "Suasana" }],
      music: { cue: "Muzik sinematik lembut", mood: "Menenangkan", tempo: "70 BPM" },
      imagePrompt: `Cinematic Medium Shot featuring [${characters[0]?.name}]. Environment: traditional setting. Warm lighting, 50mm lens.`,
      videoPrompt: `Cinematic video of [${characters[0]?.name}]. Natural fluid motion at 24fps. Negative instructions: no morphing, no extra fingers.`,
      voPrompt: `Generate natural voice for ${characters[0]?.name}.`
    };

    onUpdateProject({
      ...project,
      scenes: [...scenes, newScene]
    });
    setActiveSceneId(newSceneId);
    showToast(`Adegan ${newIndex} berjaya ditambah!`, "success");
  };

  return (
    <div className="space-y-6 animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Module Title */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--color-primary-light)", padding: "3px 10px", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: 6 }}>
            <Clapperboard size={12} />
            <span>GARIS MASA & KESINAMBUNGAN VISUAL</span>
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
            SCENE BUILDER & TIMELINE
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Susun atur babak, variasi kamera 18-sudut, dan penjejakan kesinambungan objek
          </p>
        </div>

        <button
          onClick={handleAddScene}
          className="btn btn-primary btn-sm"
          type="button"
        >
          <Plus size={14} />
          <span>Tambah Babak Baharu</span>
        </button>
      </div>

      {/* Continuity Engine Banner */}
      {project.continuity && (
        <div
          className="studio-card"
          style={{
            background: "linear-gradient(135deg, rgba(6, 182, 212, 0.06) 0%, rgba(99, 102, 241, 0.06) 100%)",
            border: "1px solid rgba(6, 182, 212, 0.2)",
            padding: "16px 20px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <ShieldCheck size={16} className="text-cyan-600" />
            <strong style={{ fontSize: "0.85rem", color: "#0e7490", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Continuity Engine (Kesinambungan Aktif)
            </strong>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            <div><strong style={{ color: "var(--text-primary)" }}>Lokasi Utama:</strong> {project.continuity.primaryLocation}</div>
            <div><strong style={{ color: "var(--text-primary)" }}>Aliran Masa:</strong> {project.continuity.timeProgression}</div>
            <div><strong style={{ color: "var(--text-primary)" }}>Objek/Props Kekal:</strong> {(project.continuity.activeProps || []).join(", ")}</div>
          </div>
        </div>
      )}

      {/* Visual Timeline Rail */}
      <div className="studio-card" style={{ padding: "16px" }}>
        <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 12 }}>
          Garis Masa Babak (Scene Timeline)
        </div>
        <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "8px" }}>
          {scenes.map((s) => {
            const isCurrent = s.id === activeScene?.id;
            return (
              <div
                key={s.id}
                onClick={() => setActiveSceneId(s.id)}
                style={{
                  minWidth: "160px",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  background: isCurrent ? "var(--color-primary)" : "#ffffff",
                  color: isCurrent ? "#ffffff" : "var(--text-primary)",
                  border: isCurrent ? "1px solid var(--color-primary)" : "1px solid var(--border-subtle)",
                  cursor: "pointer",
                  transition: "all var(--trans-fast)",
                  boxShadow: isCurrent ? "0 4px 14px rgba(99, 102, 241, 0.3)" : "none"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, opacity: 0.9 }}>
                    SCENE {String(s.sceneNumber).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>
                    {s.duration}s
                  </span>
                </div>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {s.title}
                </div>
                <div style={{ fontSize: "0.7rem", opacity: 0.8, marginTop: 4 }}>
                  {s.camera?.shotType || "Medium Shot"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Scene Detail Card */}
      {activeScene && (
        <div className="studio-card" style={{ padding: "24px" }}>
          {/* Action Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "18px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span className="badge badge-primary" style={{ fontSize: "0.85rem", padding: "6px 12px" }}>
                SCENE {String(activeScene.sceneNumber).padStart(2, "0")}
              </span>
              <div>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0 }}>
                  {activeScene.title}
                </h3>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>
                  Durasi: <strong>{activeScene.duration} saat</strong> • Lokasi: <strong>{activeScene.location}</strong> ({activeScene.time})
                </div>
              </div>
            </div>

            {/* Scene Action Buttons */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={() => handleOpenEdit(activeScene)}
                className="btn btn-secondary btn-sm"
                type="button"
              >
                <Edit3 size={14} />
                <span>EDIT</span>
              </button>
              <button
                onClick={() => handleRegenerateScene(activeScene)}
                className="btn btn-secondary btn-sm"
                type="button"
                title="Jana semula aksi & prompt babak tanpa merosakkan profil watak"
              >
                <RefreshCw size={14} />
                <span>REGENERATE</span>
              </button>
              <CopyButton
                text={`SCENE ${activeScene.sceneNumber}: ${activeScene.title}\n${activeScene.imagePrompt}\n\nVIDEO PROMPT:\n${activeScene.videoPrompt}`}
                label="COPY SCENE"
              />
              <button
                onClick={() => handleDeleteScene(activeScene.id)}
                className="btn btn-ghost btn-sm text-red-600 hover:bg-red-50"
                type="button"
                title="Padam adegan ini"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Scene Metadata Columns */}
          <div className="grid-3" style={{ gap: "20px", marginBottom: "24px" }}>
            {/* Column 1: Action & Objective */}
            <div className="studio-card" style={{ background: "#fafafa" }}>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "10px" }}>
                1. Tindakan & Objektif
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-primary)", marginBottom: "8px" }}>
                <strong>Tindakan:</strong> {activeScene.action}
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "8px" }}>
                <strong>Objektif:</strong> {activeScene.objective}
              </p>
              <div style={{ fontSize: "0.8rem", color: "#c2410c" }}>
                <strong>Emosi:</strong> {activeScene.emotion}
              </div>
            </div>

            {/* Column 2: Camera & Cinematography */}
            <div className="studio-card" style={{ background: "#fafafa" }}>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ea580c", marginBottom: "10px" }}>
                2. Sistem Kamera (18-Shots)
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.82rem" }}>
                <div><strong style={{ color: "var(--text-muted)" }}>Jenis Syot:</strong> <span className="badge badge-accent">{activeScene.camera?.shotType}</span></div>
                <div><strong style={{ color: "var(--text-muted)" }}>Lensa:</strong> {activeScene.camera?.lens}</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Pergerakan:</strong> {activeScene.camera?.movement}</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Pencahayaan:</strong> {activeScene.lighting}</div>
              </div>
            </div>

            {/* Column 3: Sound & Foley */}
            <div className="studio-card" style={{ background: "#fafafa" }}>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#059669", marginBottom: "10px" }}>
                3. Audio, Muzik & SFX
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.82rem" }}>
                <div><strong style={{ color: "var(--text-muted)" }}>Muzik:</strong> {activeScene.music?.cue}</div>
                <div>
                  <strong style={{ color: "var(--text-muted)" }}>SFX:</strong>{" "}
                  {activeScene.sfx?.map((x) => x.name).join(", ") || "Ambient"}
                </div>
                {activeScene.dialogue?.text && (
                  <div style={{ marginTop: 4, background: "#ffffff", padding: "6px 10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                    <span style={{ fontWeight: 700, color: "var(--color-primary-dark)" }}>{activeScene.dialogue.speaker}:</span> &ldquo;{activeScene.dialogue.text}&rdquo;
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Collapsible Prompts Accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Image Prompt Box */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Image Prompt (18 Aspek Sinematik)
                </span>
                <CopyButton text={activeScene.imagePrompt} label="Salin Prompt Imej" />
              </div>
              <div className="prompt-box prompt-box-code">
                {activeScene.imagePrompt}
              </div>
            </div>

            {/* Video Prompt Box */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Video Generation Prompt (Sora / Kling / Runway Gen-3)
                </span>
                <CopyButton text={activeScene.videoPrompt} label="Salin Prompt Video" />
              </div>
              <div className="prompt-box prompt-box-code" style={{ background: "#fdf4ff", borderColor: "#f0abfc" }}>
                {activeScene.videoPrompt}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT SCENE MODAL */}
      {editingScene && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit Adegan ${editingScene.sceneNumber}: ${editingScene.title}`}
          maxWidth="720px"
        >
          <div className="space-y-4" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="grid-2">
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Tajuk Adegan</label>
                <input
                  type="text"
                  className="studio-input"
                  value={editingScene.title}
                  onChange={(e) => setEditingScene({ ...editingScene, title: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Durasi (Saat)</label>
                <input
                  type="number"
                  className="studio-input"
                  value={editingScene.duration}
                  onChange={(e) => setEditingScene({ ...editingScene, duration: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid-2">
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Lokasi</label>
                <input
                  type="text"
                  className="studio-input"
                  value={editingScene.location}
                  onChange={(e) => setEditingScene({ ...editingScene, location: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Waktu / Cahaya</label>
                <input
                  type="text"
                  className="studio-input"
                  value={editingScene.time}
                  onChange={(e) => setEditingScene({ ...editingScene, time: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Tindakan Watak (Action)</label>
              <textarea
                className="studio-textarea"
                rows={2}
                value={editingScene.action}
                onChange={(e) => setEditingScene({ ...editingScene, action: e.target.value })}
              />
            </div>

            {/* Camera Shot Selector */}
            <div className="grid-2">
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Jenis Syot Kamera (18 Options)</label>
                <select
                  className="studio-select"
                  value={editingScene.camera?.shotType || "Medium Shot"}
                  onChange={(e) =>
                    setEditingScene({
                      ...editingScene,
                      camera: { ...editingScene.camera, shotType: e.target.value }
                    })
                  }
                >
                  {CAMERA_SHOTS.map((shot) => (
                    <option key={shot} value={shot}>
                      {shot}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Pergerakan Kamera</label>
                <input
                  type="text"
                  className="studio-input"
                  value={editingScene.camera?.movement || ""}
                  onChange={(e) =>
                    setEditingScene({
                      ...editingScene,
                      camera: { ...editingScene.camera, movement: e.target.value }
                    })
                  }
                />
              </div>
            </div>

            {/* Dialogue Edit */}
            {editingScene.dialogue && (
              <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: 8 }}>
                  Dialog Watak
                </div>
                <div className="grid-2" style={{ marginBottom: 8 }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 600 }}>Pembicara (Speaker)</label>
                    <input
                      type="text"
                      className="studio-input"
                      value={editingScene.dialogue.speaker}
                      onChange={(e) =>
                        setEditingScene({
                          ...editingScene,
                          dialogue: { ...editingScene.dialogue, speaker: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 600 }}>Arahan Emosi Suara</label>
                    <input
                      type="text"
                      className="studio-input"
                      value={editingScene.dialogue.voiceDirection}
                      onChange={(e) =>
                        setEditingScene({
                          ...editingScene,
                          dialogue: { ...editingScene.dialogue, voiceDirection: e.target.value }
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600 }}>Teks Dialog</label>
                  <textarea
                    className="studio-textarea"
                    rows={2}
                    value={editingScene.dialogue.text}
                    onChange={(e) =>
                      setEditingScene({
                        ...editingScene,
                        dialogue: { ...editingScene.dialogue, text: e.target.value }
                      })
                    }
                  />
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: 8 }}>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="btn btn-secondary btn-sm"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveScene}
                className="btn btn-primary btn-sm"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
