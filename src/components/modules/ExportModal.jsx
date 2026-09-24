import React, { useState } from "react";
import {
  Download,
  Copy,
  FileText,
  FileCode,
  Printer,
  Sparkles,
  Check,
  Package
} from "lucide-react";
import { Modal } from "../common/Modal";
import confetti from "canvas-confetti";

export function ExportModal({ isOpen, onClose, project, showToast }) {
  if (!project) return null;

  const generateFullExportMarkdown = () => {
    const s = project.story || {};
    const chars = project.characters || [];
    const scenes = project.scenes || [];
    const sound = project.soundDesign || {};

    let md = `# MASTER AI VIDEO PRODUCTION PACKAGE\n`;
    md += `**Projek:** ${project.name}\n`;
    md += `**ID Projek:** ${project.id}\n`;
    md += `**Durasi:** ${project.duration} | **Nisbah Aspek:** ${project.aspectRatio} | **Gaya:** ${project.videoStyle}\n`;
    md += `**Bahasa:** ${project.language} | **Tarikh:** ${new Date(project.updatedAt || Date.now()).toLocaleDateString("ms-MY")}\n\n`;
    md += `> **Idea Asal:** "${project.idea}"\n\n`;
    md += `---\n\n`;

    // 1. Story Concept
    md += `## 1. STORY CONCEPT & LOGLINE\n\n`;
    md += `**Tajuk:** ${s.title}\n`;
    md += `**Logline:** ${s.logline}\n`;
    md += `**Genre:** ${s.genre} | **Tema:** ${s.theme}\n`;
    md += `**Latar Masa & Tempat:** ${s.setting} (${s.timePeriod})\n`;
    md += `**Konflik Utama:** ${s.mainConflict}\n`;
    md += `**Mesej Moral:** ${s.moralMessage}\n\n`;

    // 2. Profil Watak
    md += `## 2. PROFIL WATAK (CHARACTER DOSSIER) & LOCKED DESCRIPTIONS\n\n`;
    chars.forEach((c) => {
      md += `### ${c.name} (${c.id})\n`;
      md += `- **Peranan:** ${c.role}\n`;
      md += `- **Umur / Jantina:** ${c.age} tahun / ${c.gender} (${c.ethnicity})\n`;
      md += `- **Fizikal & Wajah:** ${c.faceDescription}, ${c.hair} (${c.hairStyle}), tona kulit: ${c.skinTone}\n`;
      md += `- **Busana:** ${c.clothing}, kasut: ${c.shoes}\n`;
      md += `- **Personaliti & Suara:** ${c.personality}. Suara: ${c.voiceCharacteristics}\n`;
      md += `- **🔒 LOCKED CHARACTER DESCRIPTION:**\n`;
      md += `  > ${c.lockedDescription}\n\n`;
    });

    // 3. Scene Breakdown & Full Script
    md += `## 3. SCENE BREAKDOWN & PRODUCTION PROMPTS\n\n`;
    scenes.forEach((sc) => {
      md += `### SCENE ${String(sc.sceneNumber).padStart(2, "0")}: ${sc.title}\n`;
      md += `- **Durasi:** ${sc.duration} saat\n`;
      md += `- **Lokasi & Waktu:** ${sc.location} (${sc.time})\n`;
      md += `- **Objektif:** ${sc.objective}\n`;
      md += `- **Watak Hadir:** ${(sc.charactersPresent || []).join(", ")}\n`;
      md += `- **Tindakan:** ${sc.action}\n`;
      md += `- **Kamera:** ${sc.camera?.shotType} (${sc.camera?.lens}) - ${sc.camera?.movement}\n`;
      if (sc.narration) md += `- **Narasi:** "${sc.narration}"\n`;
      if (sc.dialogue?.text) {
        md += `- **Dialog (${sc.dialogue.speaker}):** "${sc.dialogue.text}" [${sc.dialogue.voiceDirection}]\n`;
      }
      md += `\n**[IMAGE PROMPT (18-ASPECTS)]:**\n\`\`\`text\n${sc.imagePrompt}\n\`\`\`\n`;
      md += `\n**[VIDEO GENERATION PROMPT (SORA/KLING)]:**\n\`\`\`text\n${sc.videoPrompt}\n\`\`\`\n`;
      md += `\n**[VOICE PROMPT]:**\n\`\`\`text\n${sc.voPrompt}\n\`\`\`\n`;
      md += `---\n\n`;
    });

    // 4. Music & SFX Master
    md += `## 4. MASTER SOUNDTRACK & SFX DESIGN\n\n`;
    md += `**Tema Muzik:** ${sound.overallMusicTheme}\n`;
    md += `**Instrumen:** ${(sound.instruments || []).join(", ")}\n`;
    md += `**Tempo:** ${sound.bpmRange}\n`;
    md += `**Adunan:** ${sound.mixNotes}\n\n`;

    return md;
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Download File Helper
  const downloadFile = (filename, content, type = "text/plain;charset=utf-8") => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerConfetti();
    showToast(`Fail ${filename} berjaya dimuat turun!`, "success");
  };

  const handleExportMarkdown = () => {
    const md = generateFullExportMarkdown();
    downloadFile(`${project.name.replace(/\s+/g, "_")}_AI_Video_Pack.md`, md);
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(project, null, 2);
    downloadFile(`${project.name.replace(/\s+/g, "_")}_Schema.json`, json, "application/json");
  };

  const handleExportTXT = () => {
    const md = generateFullExportMarkdown();
    downloadFile(`${project.name.replace(/\s+/g, "_")}_Production_Prompts.txt`, md);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyAll = async () => {
    const md = generateFullExportMarkdown();
    try {
      await navigator.clipboard.writeText(md);
      triggerConfetti();
      showToast("Seluruh pakej produksi video berjaya disalin ke papan klip!", "success");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eksport Pakej AI Video Lengkap"
      maxWidth="680px"
    >
      <div className="space-y-6" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(249, 115, 22, 0.08) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            borderRadius: "var(--radius-lg)",
            padding: "18px 20px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Package size={20} className="text-indigo-600" />
            <h4 style={{ fontSize: "1.05rem", fontWeight: 800, margin: 0 }}>
              Master AI Video Production Pack
            </h4>
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
            Pakej eksport mengandungi 11 komponen penuh: Concept, Full Script, Profil Watak dengan Locked Descriptions,
            Image Prompts 18-aspek, Prompt Video (Sora/Kling), Voice-Over Melayu, Muzik dan Storyboard.
          </p>
        </div>

        {/* Big CTA: Copy Complete Pack */}
        <button
          onClick={handleCopyAll}
          className="btn btn-primary btn-lg"
          type="button"
          style={{ width: "100%", padding: "16px" }}
        >
          <Copy size={18} />
          <span>COPY COMPLETE AI VIDEO PACK (ONE-CLICK)</span>
        </button>

        {/* Format Options Grid */}
        <div>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 12 }}>
            Muat Turun Fail Mengikut Format:
          </div>

          <div className="grid-2" style={{ gap: "12px" }}>
            {/* Markdown */}
            <button
              onClick={handleExportMarkdown}
              className="studio-card studio-card-interactive text-left"
              style={{ padding: "16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", border: "1px solid var(--border-subtle)" }}
              type="button"
            >
              <FileText size={24} className="text-indigo-600" />
              <div>
                <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)", display: "block" }}>Markdown (.md)</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Format dokumentasi GitHub/Notion</span>
              </div>
            </button>

            {/* JSON Schema */}
            <button
              onClick={handleExportJSON}
              className="studio-card studio-card-interactive text-left"
              style={{ padding: "16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", border: "1px solid var(--border-subtle)" }}
              type="button"
            >
              <FileCode size={24} className="text-purple-600" />
              <div>
                <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)", display: "block" }}>JSON Full Schema (.json)</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Struktur data tulen untuk API & Automation</span>
              </div>
            </button>

            {/* Plain TXT */}
            <button
              onClick={handleExportTXT}
              className="studio-card studio-card-interactive text-left"
              style={{ padding: "16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", border: "1px solid var(--border-subtle)" }}
              type="button"
            >
              <FileText size={24} className="text-emerald-600" />
              <div>
                <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)", display: "block" }}>Plain Text (.txt)</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Mudah dibuka di Notepad & telefon</span>
              </div>
            </button>

            {/* Print / PDF */}
            <button
              onClick={handlePrint}
              className="studio-card studio-card-interactive text-left"
              style={{ padding: "16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", border: "1px solid var(--border-subtle)" }}
              type="button"
            >
              <Printer size={24} className="text-amber-600" />
              <div>
                <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)", display: "block" }}>Cetak / Simpan PDF</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Paparan dokumen cetakan kemas</span>
              </div>
            </button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            type="button"
          >
            Tutup
          </button>
        </div>
      </div>
    </Modal>
  );
}
