import React, { useState } from "react";
import {
  BookOpen,
  Clapperboard,
  Copy,
  Edit3,
  RefreshCw,
  Sparkles,
  MapPin,
  Clock,
  Camera,
  MessageSquare,
  Volume2
} from "lucide-react";
import { CopyButton } from "../common/CopyButton";

export function StoryGeneratorModule({ project, onUpdateProject }) {
  const [activeSubTab, setActiveSubTab] = useState("concept"); // "concept" | "script"
  const [isEditingConcept, setIsEditingConcept] = useState(false);
  const [conceptForm, setConceptForm] = useState(project?.story || {});

  if (!project) {
    return <div className="p-8 text-center text-slate-500">Sila pilih atau cipta projek terlebih dahulu.</div>;
  }

  const story = project.story || {};
  const scenes = project.scenes || [];

  const handleSaveConcept = () => {
    const updated = {
      ...project,
      story: conceptForm
    };
    onUpdateProject(updated);
    setIsEditingConcept(false);
  };

  const getFullScriptText = () => {
    let text = `SKRIP PENUH AI VIDEO: ${project.name}\n`;
    text += `Tajuk: ${story.title}\n`;
    text += `Logline: ${story.logline}\n`;
    text += `Tema: ${story.theme}\n\n`;
    text += `==============================================\n\n`;

    scenes.forEach((s) => {
      text += `SCENE ${String(s.sceneNumber).padStart(2, "0")}: ${s.title}\n`;
      text += `Durasi: ${s.duration} saat | Lokasi: ${s.location} (${s.time})\n`;
      text += `Objektif: ${s.objective}\n`;
      text += `Persekitaran: ${s.environment}\n`;
      text += `Watak Terlibat: ${(s.charactersPresent || []).join(", ")}\n`;
      text += `Tindakan: ${s.action}\n`;
      text += `Emosi: ${s.emotion}\n`;
      text += `Kamera: ${s.camera?.shotType} (${s.camera?.lens}) - ${s.camera?.movement}\n`;
      if (s.narration) text += `Narasi: "${s.narration}"\n`;
      if (s.dialogue?.text) {
        text += `Dialog (${s.dialogue.speaker}): "${s.dialogue.text}" [${s.dialogue.voiceDirection}]\n`;
      }
      text += `----------------------------------------------\n\n`;
    });

    return text;
  };

  return (
    <div className="space-y-6 animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header & Sub-tabs */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--color-primary-light)", padding: "3px 10px", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: 6 }}>
            <BookOpen size={12} />
            <span>MODUL PENCERITAAN AI</span>
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
            AI STORY GENERATOR
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Struktur naratif lengkap dan pecahan skrip adegan sinematik
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "8px", background: "var(--bg-card-subtle)", padding: "4px", borderRadius: "var(--radius-md)" }}>
          <button
            type="button"
            onClick={() => setActiveSubTab("concept")}
            className={`btn btn-sm ${activeSubTab === "concept" ? "btn-primary" : "btn-ghost"}`}
          >
            <Sparkles size={14} />
            <span>Story Concept</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("script")}
            className={`btn btn-sm ${activeSubTab === "script" ? "btn-primary" : "btn-ghost"}`}
          >
            <Clapperboard size={14} />
            <span>Full Script ({scenes.length} Babak)</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: STORY CONCEPT */}
      {activeSubTab === "concept" && (
        <div className="space-y-6" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Action Bar */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <CopyButton
              text={`TAJUK: ${story.title}\nLOGLINE: ${story.logline}\nTEMA: ${story.theme}\nNILAI MORAL: ${story.moralMessage}`}
              label="Salin Konsep"
            />
            <button
              onClick={() => {
                setConceptForm(story);
                setIsEditingConcept(!isEditingConcept);
              }}
              className="btn btn-secondary btn-sm"
              type="button"
            >
              <Edit3 size={14} />
              <span>{isEditingConcept ? "Batal Edit" : "Edit Konsep"}</span>
            </button>
          </div>

          {/* Edit Form or View Cards */}
          {isEditingConcept ? (
            <div className="studio-card space-y-4" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Kemaskini Konsep Cerita</h4>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Tajuk Cerita</label>
                <input
                  type="text"
                  className="studio-input"
                  value={conceptForm.title || ""}
                  onChange={(e) => setConceptForm({ ...conceptForm, title: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Logline</label>
                <textarea
                  className="studio-textarea"
                  rows={3}
                  value={conceptForm.logline || ""}
                  onChange={(e) => setConceptForm({ ...conceptForm, logline: e.target.value })}
                />
              </div>
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Genre</label>
                  <input
                    type="text"
                    className="studio-input"
                    value={conceptForm.genre || ""}
                    onChange={(e) => setConceptForm({ ...conceptForm, genre: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Tema</label>
                  <input
                    type="text"
                    className="studio-input"
                    value={conceptForm.theme || ""}
                    onChange={(e) => setConceptForm({ ...conceptForm, theme: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Mesej Moral / Falsafah</label>
                <textarea
                  className="studio-textarea"
                  rows={2}
                  value={conceptForm.moralMessage || ""}
                  onChange={(e) => setConceptForm({ ...conceptForm, moralMessage: e.target.value })}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsEditingConcept(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveConcept}
                  className="btn btn-primary btn-sm"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Title & Logline Card */}
              <div className="studio-card" style={{ borderLeft: "4px solid var(--color-primary)" }}>
                <span className="badge badge-primary" style={{ marginBottom: "10px" }}>LOGLINE & KONSEP UTAMA</span>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "12px" }}>
                  {story.title}
                </h3>
                <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, fontStyle: "italic", background: "#f8fafc", padding: "16px", borderRadius: "var(--radius-md)" }}>
                  &ldquo;{story.logline}&rdquo;
                </p>
              </div>

              {/* Story Narrative Arc Grid */}
              <div className="grid-2">
                <div className="studio-card">
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "14px", color: "var(--color-primary-dark)" }}>
                    Parameter Penceritaan
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.875rem" }}>
                    <div>
                      <strong style={{ color: "var(--text-muted)", display: "inline-block", width: "110px" }}>Genre:</strong>
                      <span>{story.genre}</span>
                    </div>
                    <div>
                      <strong style={{ color: "var(--text-muted)", display: "inline-block", width: "110px" }}>Tema:</strong>
                      <span>{story.theme}</span>
                    </div>
                    <div>
                      <strong style={{ color: "var(--text-muted)", display: "inline-block", width: "110px" }}>Latar Tempat:</strong>
                      <span>{story.setting}</span>
                    </div>
                    <div>
                      <strong style={{ color: "var(--text-muted)", display: "inline-block", width: "110px" }}>Era / Zaman:</strong>
                      <span>{story.timePeriod}</span>
                    </div>
                    <div>
                      <strong style={{ color: "var(--text-muted)", display: "inline-block", width: "110px" }}>Nada Emosi:</strong>
                      <span>{story.storyTone}</span>
                    </div>
                    <div>
                      <strong style={{ color: "var(--text-muted)", display: "inline-block", width: "110px" }}>Konflik Utama:</strong>
                      <span style={{ color: "#c2410c", fontWeight: 500 }}>{story.mainConflict}</span>
                    </div>
                  </div>
                </div>

                <div className="studio-card">
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "14px", color: "#ea580c" }}>
                    Struktur 4-Babak Dramatik
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem" }}>
                    <div style={{ background: "#fafafa", padding: "10px 14px", borderRadius: "var(--radius-md)", borderLeft: "3px solid #6366f1" }}>
                      <strong style={{ display: "block", color: "#4338ca", fontSize: "0.78rem" }}>PERMULAAN (BEGINNING):</strong>
                      <span>{story.beginning}</span>
                    </div>
                    <div style={{ background: "#fafafa", padding: "10px 14px", borderRadius: "var(--radius-md)", borderLeft: "3px solid #f59e0b" }}>
                      <strong style={{ display: "block", color: "#b45309", fontSize: "0.78rem" }}>PERKEMBANGAN (MIDDLE):</strong>
                      <span>{story.middle}</span>
                    </div>
                    <div style={{ background: "#fafafa", padding: "10px 14px", borderRadius: "var(--radius-md)", borderLeft: "3px solid #ef4444" }}>
                      <strong style={{ display: "block", color: "#b91c1c", fontSize: "0.78rem" }}>KLIMAKS (CLIMAX):</strong>
                      <span>{story.climax}</span>
                    </div>
                    <div style={{ background: "#fafafa", padding: "10px 14px", borderRadius: "var(--radius-md)", borderLeft: "3px solid #10b981" }}>
                      <strong style={{ display: "block", color: "#047857", fontSize: "0.78rem" }}>PELERAIAN (ENDING):</strong>
                      <span>{story.ending}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Moral / Message */}
              <div className="studio-card" style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                <span className="badge badge-success" style={{ marginBottom: "8px" }}>NILAI MORAL & FALSAFAH BANGSA</span>
                <p style={{ fontSize: "0.95rem", color: "#065f46", fontWeight: 600, margin: 0, lineHeight: 1.6 }}>
                  {story.moralMessage}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* VIEW 2: FULL SCRIPT */}
      {activeSubTab === "script" && (
        <div className="space-y-4" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
              Menampilkan {scenes.length} adegan berurutan dengan dialog dan arahan kamera
            </span>
            <CopyButton text={getFullScriptText()} label="Salin Skrip Lengkap" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {scenes.map((scene) => (
              <div key={scene.id} className="studio-card" style={{ padding: "20px" }}>
                {/* Scene Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px", marginBottom: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span className="badge badge-primary" style={{ fontWeight: 800 }}>
                      SCENE {String(scene.sceneNumber).padStart(2, "0")}
                    </span>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
                      {scene.title}
                    </h4>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    <span className="badge badge-secondary">{scene.duration} Saat</span>
                    <span>•</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={13} /> {scene.location}
                    </span>
                    <span>•</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Clock size={13} /> {scene.time}
                    </span>
                  </div>
                </div>

                {/* Scene Body Grid */}
                <div className="grid-2" style={{ gap: "16px", marginBottom: "14px" }}>
                  <div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 4 }}>
                      Objektif Babak
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
                      {scene.objective}
                    </p>

                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginTop: 12, marginBottom: 4 }}>
                      Aksi & Emosi
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-primary)", margin: 0 }}>
                      {scene.action} <span style={{ color: "#c2410c", fontStyle: "italic" }}>({scene.emotion})</span>
                    </p>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 4 }}>
                      Arahan Kamera & Sinematografi
                    </div>
                    <div style={{ background: "#f8fafc", padding: "10px", borderRadius: "var(--radius-md)", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>
                        <Camera size={14} className="text-indigo-600" />
                        <span>{scene.camera?.shotType} • Lens: {scene.camera?.lens}</span>
                      </div>
                      <div>Pergerakan: {scene.camera?.movement}</div>
                    </div>

                    {scene.narration && (
                      <div style={{ marginTop: 10 }}>
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                          Narasi Suara
                        </div>
                        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontStyle: "italic", margin: 0 }}>
                          &ldquo;{scene.narration}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Character Dialogue Bubble */}
                {scene.dialogue?.text && (
                  <div
                    style={{
                      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(241, 245, 249, 0.8) 100%)",
                      borderRadius: "var(--radius-md)",
                      padding: "12px 16px",
                      border: "1px solid rgba(99, 102, 241, 0.15)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px"
                    }}
                  >
                    <MessageSquare size={16} className="text-indigo-600" style={{ marginTop: 2 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                        <strong style={{ fontSize: "0.85rem", color: "var(--color-primary-dark)" }}>
                          {scene.dialogue.speaker.toUpperCase()}
                        </strong>
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                          ({scene.dialogue.voiceDirection})
                        </span>
                      </div>
                      <div style={{ fontSize: "0.92rem", color: "var(--text-primary)", fontStyle: "italic", fontWeight: 500 }}>
                        &ldquo;{scene.dialogue.text}&rdquo;
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
