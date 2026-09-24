import React, { useState } from "react";
import {
  Users,
  Lock,
  Unlock,
  Edit3,
  Copy,
  Plus,
  Trash2,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  Eye,
  Check
} from "lucide-react";
import { CopyButton } from "../common/CopyButton";
import { LockBadge } from "../common/StatusBadge";
import { Modal } from "../common/Modal";
import { aiService } from "../../services/aiService.js";

export function CharacterProfileModule({ project, onUpdateProject, showToast }) {
  const characters = project?.characters || [];
  const [selectedCharId, setSelectedCharId] = useState(characters[0]?.id || "CHAR_001");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);

  // Check if story text has demographic/age/student or gender mismatch with character
  const ideaText = ((project?.idea || "") + " " + (project?.story?.logline || "")).toLowerCase();
  const analysis = aiService.analyzeIdeaContext(ideaText, project || {});
  
  const isStoryFemale = /(gadis|gadia|wanita|perempuan|ibu|emak|mak|girl|woman|female)/i.test(ideaText);
  const isGenderMismatch = isStoryFemale && characters.length > 0 && characters[0]?.gender === "Male";

  const isStudentMismatch = analysis.isStudent && characters.length > 0 && (
    characters[0]?.age > 18 || 
    (analysis.extractedAge && characters[0]?.age !== analysis.extractedAge) ||
    !characters[0]?.role?.toLowerCase().includes("pelajar")
  );

  const isAgeMismatch = analysis.extractedAge && characters.length > 0 && characters[0]?.age !== analysis.extractedAge;

  const isMismatch = isGenderMismatch || isStudentMismatch || isAgeMismatch;

  let mismatchTitle = "Ketidakselarasan Profil Watak Dikesan";
  let mismatchDesc = "";
  if (isStudentMismatch) {
    mismatchTitle = `Idea Cerita Mengandungi ${analysis.studentGrade || "Pelajar Sekolah"}`;
    mismatchDesc = `Idea anda menyatakan watak sebagai ${analysis.studentGrade || "Pelajar Sekolah Menengah"}, tetapi profil watak memaparkan umur ${characters[0]?.age || 23} tahun (${characters[0]?.role}).`;
  } else if (isGenderMismatch) {
    mismatchTitle = "Ketidakselarasan Jantina Dikesan: Idea Cerita Mengenai Watak Gadis";
    mismatchDesc = `Idea cerita mengisahkan tentang seorang gadis/wanita, tetapi profil watak utama memaparkan watak lelaki (${characters[0]?.name}).`;
  } else if (isAgeMismatch) {
    mismatchTitle = `Umur Watak Tidak Selaras (Idea: ${analysis.extractedAge} tahun vs Profil: ${characters[0]?.age} tahun)`;
    mismatchDesc = `Idea cerita mengandungi penetapan umur ${analysis.extractedAge} tahun, tetapi watak kini berumur ${characters[0]?.age} tahun.`;
  }

  const handleSyncWithStoryProfile = () => {
    const updated = aiService.synthesizeProject({
      ...project,
      idea: project?.idea || "",
      leadGender: isStoryFemale ? "Female" : (project?.leadGender || "Auto")
    });
    onUpdateProject(updated);
    if (updated.characters && updated.characters.length > 0) {
      setSelectedCharId(updated.characters[0].id);
    }
    showToast("✨ Profil berjaya diselaraskan kepada spesifikasi idea cerita & semua babak dikemaskini!", "success");
  };

  // Cascade Update Confirmation Modal State
  const [showCascadeModal, setShowCascadeModal] = useState(false);
  const [pendingCharUpdate, setPendingCharUpdate] = useState(null);

  const activeChar = characters.find((c) => c.id === selectedCharId) || characters[0];

  // Toggle lock state
  const handleToggleLock = (charId) => {
    const updated = {
      ...project,
      characters: characters.map((c) => {
        if (c.id === charId) {
          const nextLock = !c.isLocked;
          showToast(
            nextLock ? `🔒 ${c.name} telah dikunci (Character Locked)` : `🔓 ${c.name} dibuka kuncian`,
            "info"
          );
          return { ...c, isLocked: nextLock };
        }
        return c;
      })
    };
    onUpdateProject(updated);
  };

  // Start editing
  const handleStartEdit = (char) => {
    setEditForm(JSON.parse(JSON.stringify(char)));
    setIsEditing(true);
  };

  // Save edit request -> triggers cascade modal check
  const handleSaveEditRequest = () => {
    if (!editForm) return;

    // Auto update lockedDescription if age, role or clothing changed but user didn't manually rewrite lockedDescription
    let preparedChar = { ...editForm };
    const original = characters.find((c) => c.id === editForm.id);

    if (original && original.lockedDescription === editForm.lockedDescription) {
      if (original.age !== editForm.age || original.role !== editForm.role || original.clothing !== editForm.clothing) {
        // Regenerate locked description to reflect new age/role/clothing
        preparedChar.lockedDescription = `A ${preparedChar.age}-year-old ${preparedChar.gender === "Female" ? "female" : "male"} Malaysian named ${preparedChar.name}, ${preparedChar.role}, wearing ${preparedChar.clothing}, ${preparedChar.faceDescription || "expressive features"}.`;
      }
    }

    // Check if visual attributes, age, role, or locked description changed
    const visualChanged =
      original &&
      (original.lockedDescription !== preparedChar.lockedDescription ||
        original.clothing !== preparedChar.clothing ||
        original.name !== preparedChar.name ||
        original.age !== preparedChar.age ||
        original.gender !== preparedChar.gender ||
        original.role !== preparedChar.role);

    if (visualChanged) {
      setPendingCharUpdate(preparedChar);
      setShowCascadeModal(true);
    } else {
      // Just save directly
      applyCharUpdate(preparedChar, false);
      setIsEditing(false);
    }
  };

  // Apply character update (with or without updating scenes)
  const applyCharUpdate = (updatedChar, updateAllScenes = false) => {
    let updatedScenes = project.scenes || [];

    if (updateAllScenes) {
      // Re-inject updated locked description in all scenes where this character is present
      const oldChar = characters.find((c) => c.id === updatedChar.id);
      
      updatedScenes = updatedScenes.map((scene) => {
        let updatedScene = { ...scene };

        if ((scene.charactersPresent || []).includes(updatedChar.id)) {
          let newImgPrompt = scene.imagePrompt || "";
          let newVidPrompt = scene.videoPrompt || "";

          // Replace old locked descriptor or append fresh one
          if (oldChar && oldChar.lockedDescription && newImgPrompt.includes(oldChar.lockedDescription)) {
            newImgPrompt = newImgPrompt.replace(oldChar.lockedDescription, updatedChar.lockedDescription);
            newVidPrompt = newVidPrompt.replace(oldChar.lockedDescription, updatedChar.lockedDescription);
          } else {
            // Replace pattern matching old character name or descriptor tag
            const tagRegex = new RegExp(`\\[${updatedChar.id}:[^\\]]+\\]`, "g");
            if (tagRegex.test(newImgPrompt)) {
              newImgPrompt = newImgPrompt.replace(tagRegex, `[${updatedChar.id}: ${updatedChar.name}, ${updatedChar.lockedDescription}]`);
              newVidPrompt = newVidPrompt.replace(tagRegex, `[${updatedChar.id}: ${updatedChar.name}, ${updatedChar.lockedDescription}]`);
            } else {
              newImgPrompt = `Cinematic ${scene.camera?.shotType || "Medium Shot"} featuring [${updatedChar.id}: ${updatedChar.name}, ${updatedChar.lockedDescription}]. ${scene.action} Facial expression: ${scene.emotion || "natural"}. Environment: ${scene.environment || scene.location}. Lighting: ${scene.lighting}.`;
              newVidPrompt = `Motion camera ${scene.camera?.movement || "cinematic movement"} focusing on [${updatedChar.id}: ${updatedChar.name}, ${updatedChar.lockedDescription}]. Action: ${scene.action}. Physical movement at 24fps. Negative instructions: No morphing, no distortion, no face shift.`;
            }
          }

          updatedScene.imagePrompt = newImgPrompt;
          updatedScene.videoPrompt = newVidPrompt;
        }

        // Also update dialogue speaker name if applicable
        if (updatedScene.dialogue && updatedScene.dialogue.characterId === updatedChar.id) {
          updatedScene.dialogue = {
            ...updatedScene.dialogue,
            speaker: updatedChar.name,
            voiceDirection: updatedChar.gender === "Female"
              ? `Nada suara perempuan/gadis (${updatedChar.age} tahun), santun dan berekspresi`
              : `Nada suara lelaki (${updatedChar.age} tahun), jelas dan bertenaga`
          };
        }

        return updatedScene;
      });
      showToast(`Deskripsi ${updatedChar.name} (${updatedChar.age} thn) diselaraskan ke semua babak!`, "success");
    } else {
      showToast(`Profil ${updatedChar.name} berjaya dikemaskini.`, "success");
    }

    const updatedChars = characters.map((c) => (c.id === updatedChar.id ? updatedChar : c));
    onUpdateProject({
      ...project,
      characters: updatedChars,
      scenes: updatedScenes
    });

    setShowCascadeModal(false);
    setPendingCharUpdate(null);
    setIsEditing(false);
  };

  // Duplicate character
  const handleDuplicate = (char) => {
    const newId = `CHAR_${String(characters.length + 1).padStart(3, "0")}`;
    const copy = {
      ...JSON.parse(JSON.stringify(char)),
      id: newId,
      name: `${char.name} (Salinan)`,
      isLocked: true
    };
    onUpdateProject({
      ...project,
      characters: [...characters, copy]
    });
    setSelectedCharId(newId);
    showToast(`Watak ${copy.name} berjaya disalin.`, "success");
  };

  // Add new blank character
  const handleAddCharacter = () => {
    const newId = `CHAR_${String(characters.length + 1).padStart(3, "0")}`;
    const newChar = {
      id: newId,
      name: `Watak Baru ${characters.length + 1}`,
      role: "Watak Tambahan (Supporting)",
      age: 30,
      gender: "Male",
      nationality: "Malaysian",
      ethnicity: "Malay",
      faceDescription: "Wajah tenang dengan ciri-ciri natural",
      skinTone: "Sawo matang (Tan Asian)",
      hair: "Rambut hitam pendek",
      hairStyle: "Kemas natural",
      eyeColor: "Coklat gelap",
      bodyType: "Sederhana",
      height: "170 cm",
      clothing: "Pakaian harian kasual bersesuaian",
      shoes: "Kasut santai",
      accessories: "Tiada",
      personality: "Bersahabat dan peka",
      emotionalTraits: "Positif",
      voiceCharacteristics: "Suara Melayu sederhana 1.0x",
      speakingStyle: "Santai sopan",
      typicalFacialExpressions: "Senyuman mesra",
      typicalGestures: "Pergerakan santai",
      movementStyle: "Stabil",
      backstory: "Watak yang menyumbang kepada dinamik penceritaan.",
      isLocked: true,
      lockedDescription: `A 30-year-old Malaysian person, medium build, warm tan skin, short black hair, wearing casual attire.`
    };
    onUpdateProject({
      ...project,
      characters: [...characters, newChar]
    });
    setSelectedCharId(newId);
    handleStartEdit(newChar);
  };

  if (!activeChar) {
    return <div className="p-8 text-center text-slate-500">Tiada watak ditemui dalam projek.</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fdf2f8", padding: "3px 10px", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, color: "#be185d", marginBottom: 6 }}>
            <Users size={12} />
            <span>CHARACTER CONSISTENCY ENGINE</span>
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
            PROFIL WATAK (CHARACTER DOSSIER)
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Daftar profil kekal dan sistem Character Lock bagi menjamin identiti visual tidak berubah di setiap babak
          </p>
        </div>

        <button
          onClick={handleAddCharacter}
          className="btn btn-primary btn-sm"
          type="button"
        >
          <Plus size={14} />
          <span>Tambah Watak Baru</span>
        </button>
      </div>

      {/* Character / Demographic Mismatch Alert Banner & Instant Fix */}
      {isMismatch && (
        <div
          style={{
            background: "linear-gradient(135deg, #fff1f2 0%, #fef3c7 100%)",
            border: "1px solid #fecdd3",
            borderRadius: "var(--radius-lg)",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            boxShadow: "0 4px 14px rgba(225, 29, 72, 0.08)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: "1 1 300px" }}>
            <AlertCircle size={26} className="text-rose-600" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: "0.95rem", color: "#9f1239", display: "block" }}>
                {mismatchTitle}
              </strong>
              <p style={{ fontSize: "0.82rem", color: "#881337", margin: "2px 0 0" }}>
                {mismatchDesc}
              </p>
            </div>
          </div>

          <button
            onClick={handleSyncWithStoryProfile}
            className="btn btn-primary btn-sm"
            type="button"
            style={{ background: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)", padding: "10px 18px", fontWeight: 800 }}
          >
            <Sparkles size={15} />
            <span>SELARASKAN PROFIL WATAK & SEMUA BABAK SEKARANG</span>
          </button>
        </div>
      )}

      {/* Character Selector Pills */}
      <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px" }}>
        {characters.map((c) => {
          const isSelected = c.id === activeChar.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCharId(c.id);
                setIsEditing(false);
              }}
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "var(--radius-full)",
                background: isSelected ? "var(--color-primary)" : "#ffffff",
                color: isSelected ? "#ffffff" : "var(--text-secondary)",
                border: isSelected ? "1px solid var(--color-primary)" : "1px solid var(--border-subtle)",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all var(--trans-fast)",
                boxShadow: isSelected ? "0 4px 12px rgba(99, 102, 241, 0.3)" : "none"
              }}
            >
              <Users size={14} />
              <span>{c.name}</span>
              <span
                style={{
                  fontSize: "0.65rem",
                  padding: "1px 6px",
                  borderRadius: "9999px",
                  background: isSelected ? "rgba(255, 255, 255, 0.25)" : "#e2e8f0",
                  color: isSelected ? "#ffffff" : "var(--text-muted)"
                }}
              >
                {c.id}
              </span>
              {c.isLocked && <Lock size={12} />}
            </button>
          );
        })}
      </div>

      {/* Main Character Sheet */}
      <div className="studio-card" style={{ padding: "28px" }}>
        {/* Character Title Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "20px", marginBottom: "24px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span className="badge badge-primary">{activeChar.id}</span>
              <LockBadge
                isLocked={activeChar.isLocked}
                onClick={() => handleToggleLock(activeChar.id)}
              />
              <span className="badge badge-secondary">{activeChar.gender}</span>
              <span className="badge badge-secondary">{activeChar.age} Tahun</span>
              <span className="badge badge-secondary">{activeChar.ethnicity}</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
              {activeChar.name}
            </h3>
            <div style={{ fontSize: "0.9rem", color: "var(--color-primary-dark)", fontWeight: 600, marginTop: 4 }}>
              {activeChar.role}
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <CopyButton
              text={activeChar.lockedDescription}
              label="Salin Locked Description"
            />
            <button
              onClick={() => handleDuplicate(activeChar)}
              className="btn btn-secondary btn-sm"
              type="button"
              title="Salin watak ini sebagai templat baru"
            >
              <span>Duplicate</span>
            </button>
            <button
              onClick={() => {
                if (isEditing) {
                  setIsEditing(false);
                } else {
                  handleStartEdit(activeChar);
                }
              }}
              className="btn btn-secondary btn-sm"
              type="button"
            >
              <Edit3 size={14} />
              <span>{isEditing ? "Batal Edit" : "Edit Profil Watak"}</span>
            </button>
          </div>
        </div>

        {/* LOCKED CHARACTER DESCRIPTION (THE CORE ENGINE REQUIREMENT) */}
        <div
          style={{
            background: "linear-gradient(135deg, #fdf2f8 0%, #ffffff 100%)",
            border: "1px solid #fbcfe8",
            borderRadius: "var(--radius-lg)",
            padding: "20px",
            marginBottom: "28px",
            boxShadow: "0 4px 14px rgba(219, 39, 119, 0.06)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Lock size={16} className="text-pink-600" />
              <strong style={{ fontSize: "0.85rem", color: "#9d174d", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                LOCKED CHARACTER DESCRIPTION (KONSISTENSI KEKAL)
              </strong>
            </div>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontStyle: "italic" }}>
              Dimasukkan automatik ke dalam setiap scene prompt
            </span>
          </div>

          {isEditing ? (
            <textarea
              className="studio-textarea"
              rows={4}
              value={editForm?.lockedDescription || ""}
              onChange={(e) => setEditForm({ ...editForm, lockedDescription: e.target.value })}
              style={{ background: "#ffffff", borderColor: "#f472b6" }}
            />
          ) : (
            <p style={{ fontSize: "0.95rem", color: "#1e293b", lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
              &ldquo;{activeChar.lockedDescription}&rdquo;
            </p>
          )}
        </div>

        {/* DETAILS GRID */}
        {isEditing ? (
          /* Edit Form */
          <div className="space-y-6" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Kemaskini Ciri-Ciri Watak</h4>
            <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Nama Watak</label>
                <input
                  type="text"
                  className="studio-input"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Peranan (Role)</label>
                <input
                  type="text"
                  className="studio-input"
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Umur (Age)</label>
                <input
                  type="number"
                  className="studio-input"
                  value={editForm.age}
                  onChange={(e) => setEditForm({ ...editForm, age: Number(e.target.value) })}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Jantina (Gender)</label>
                <select
                  className="studio-select"
                  value={editForm.gender}
                  onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                >
                  <option value="Female">Female (Perempuan / Gadis)</option>
                  <option value="Male">Male (Lelaki)</option>
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Penerangan Wajah (Face Description)</label>
                <textarea
                  className="studio-textarea"
                  rows={2}
                  value={editForm.faceDescription}
                  onChange={(e) => setEditForm({ ...editForm, faceDescription: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Busana / Pakaian (Clothing)</label>
                <textarea
                  className="studio-textarea"
                  rows={2}
                  value={editForm.clothing}
                  onChange={(e) => setEditForm({ ...editForm, clothing: e.target.value })}
                />
              </div>
            </div>

            <div className="grid-2">
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Karakteristik Suara (Voice)</label>
                <input
                  type="text"
                  className="studio-input"
                  value={editForm.voiceCharacteristics}
                  onChange={(e) => setEditForm({ ...editForm, voiceCharacteristics: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Gaya Percakapan (Speaking Style)</label>
                <input
                  type="text"
                  className="studio-input"
                  value={editForm.speakingStyle}
                  onChange={(e) => setEditForm({ ...editForm, speakingStyle: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 700 }}>Latar Belakang Watak (Backstory)</label>
              <textarea
                className="studio-textarea"
                rows={3}
                value={editForm.backstory}
                onChange={(e) => setEditForm({ ...editForm, backstory: e.target.value })}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary btn-sm"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveEditRequest}
                className="btn btn-primary btn-sm"
              >
                Simpan & Nilai Kesan Babak
              </button>
            </div>
          </div>
        ) : (
          /* View Mode */
          <div className="grid-3" style={{ gap: "20px" }}>
            {/* Visual Attributes Card */}
            <div className="studio-card" style={{ background: "#fafafa" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "14px" }}>
                1. Ciri Fizikal & Busana
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem" }}>
                <div><strong style={{ color: "var(--text-muted)" }}>Wajah:</strong> {activeChar.faceDescription}</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Tona Kulit:</strong> {activeChar.skinTone}</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Rambut:</strong> {activeChar.hair} ({activeChar.hairStyle})</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Mata:</strong> {activeChar.eyeColor}</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Fizikal:</strong> {activeChar.bodyType}, {activeChar.height}</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Pakaian:</strong> {activeChar.clothing}</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Kasut:</strong> {activeChar.shoes}</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Aksesori:</strong> {activeChar.accessories}</div>
              </div>
            </div>

            {/* Psychological & Mannerisms Card */}
            <div className="studio-card" style={{ background: "#fafafa" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ea580c", marginBottom: "14px" }}>
                2. Personaliti & Gestur
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem" }}>
                <div><strong style={{ color: "var(--text-muted)" }}>Personaliti:</strong> {activeChar.personality}</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Sifat Emosi:</strong> {activeChar.emotionalTraits}</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Ekspresi Tipikal:</strong> {activeChar.typicalFacialExpressions}</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Gestur Tangan:</strong> {activeChar.typicalGestures}</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Gaya Pergerakan:</strong> {activeChar.movementStyle}</div>
              </div>
            </div>

            {/* Voice & Backstory Card */}
            <div className="studio-card" style={{ background: "#fafafa" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#059669", marginBottom: "14px" }}>
                3. Suara & Latar Belakang
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem" }}>
                <div><strong style={{ color: "var(--text-muted)" }}>Karakter Suara:</strong> {activeChar.voiceCharacteristics}</div>
                <div><strong style={{ color: "var(--text-muted)" }}>Gaya Percakapan:</strong> {activeChar.speakingStyle}</div>
                <div style={{ marginTop: "8px" }}>
                  <strong style={{ color: "var(--text-muted)", display: "block" }}>Latar Belakang:</strong>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginTop: 4, lineHeight: 1.5 }}>
                    {activeChar.backstory}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CASCADE UPDATE CONFIRMATION MODAL */}
      <Modal
        isOpen={showCascadeModal}
        onClose={() => setShowCascadeModal(false)}
        title="Kemas Kini Deskripsi Merentasi Babak?"
      >
        <div className="space-y-4" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", background: "var(--color-warning-light)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid #fde68a" }}>
            <AlertCircle size={20} className="text-amber-600" style={{ marginTop: 2 }} />
            <div>
              <strong style={{ color: "#92400e", fontSize: "0.9rem" }}>
                Perubahan Pada Deskripsi Watak Terkunci Dikesan
              </strong>
              <p style={{ color: "#78350f", fontSize: "0.85rem", marginTop: 4 }}>
                Anda telah mengubah rupa visual/busana bagi <strong>{pendingCharUpdate?.name}</strong>.
                Adakah anda ingin menyelaraskan perubahan ini ke dalam semua prompt gambar dan video yang melibatkan watak ini?
              </p>
            </div>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Pilih tindakan anda:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button
              onClick={() => applyCharUpdate(pendingCharUpdate, true)}
              className="btn btn-primary"
              style={{ justifyContent: "flex-start", padding: "12px 18px" }}
              type="button"
            >
              <Check size={16} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700 }}>UPDATE ALL (Kemas kini Semua Babak)</div>
                <div style={{ fontSize: "0.75rem", opacity: 0.9 }}>
                  Selaraskan locked description baharu ke dalam semua prompt babak yang aktif.
                </div>
              </div>
            </button>

            <button
              onClick={() => applyCharUpdate(pendingCharUpdate, false)}
              className="btn btn-secondary"
              style={{ justifyContent: "flex-start", padding: "12px 18px" }}
              type="button"
            >
              <Users size={16} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700 }}>SIMPAN DI PROFIL WATAK SAHAJA</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Kemas kini Profil Watak tanpa menyentuh prompt babak sedia ada.
                </div>
              </div>
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
            <button
              onClick={() => setShowCascadeModal(false)}
              className="btn btn-ghost btn-sm"
              type="button"
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
