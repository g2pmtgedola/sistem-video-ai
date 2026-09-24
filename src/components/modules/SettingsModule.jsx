import React, { useState } from "react";
import {
  Settings,
  Key,
  Cpu,
  Globe,
  Sliders,
  Check,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { storageService } from "../../services/storageService";

export function SettingsModule({ showToast }) {
  const [settings, setSettings] = useState(storageService.getSettings());

  const handleSave = (e) => {
    e.preventDefault();
    storageService.saveSettings(settings);
    showToast("Tetapan Studio AI berjaya disimpan!", "success");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in" style={{ maxWidth: 840, margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--color-primary-light)", padding: "3px 10px", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: 6 }}>
          <Settings size={12} />
          <span>KONFIGURASI STUDIO & ENJIN AI</span>
        </div>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
          STUDIO SETTINGS & API ARCHITECTURE
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Pengurusan kunci API pembekal AI masa depan (Gemini, OpenAI, Claude) dan keutamaan lalai
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* AI Provider Architecture Card */}
        <div className="studio-card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "16px" }}>
            <Cpu size={18} className="text-indigo-600" />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0 }}>
              Pilihan Pembekal Enjin AI (AI Provider Selection)
            </h3>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: 700, display: "block", marginBottom: 6 }}>
              Mod Penjanaan Aktif
            </label>
            <select
              className="studio-select"
              value={settings.apiProvider}
              onChange={(e) => setSettings({ ...settings, apiProvider: e.target.value })}
            >
              <option value="simulated">Enjin Heuristik Studio Binaan Dalam (Offline / Cepat & Konsisten)</option>
              <option value="gemini">Google Gemini 1.5 Pro / Flash API</option>
              <option value="openai">OpenAI GPT-4o / Sora Integration</option>
              <option value="claude">Anthropic Claude 3.5 Sonnet API</option>
            </select>
          </div>

          {/* API Key Inputs */}
          <div className="space-y-4" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <Key size={13} />
                <span>Google Gemini API Key:</span>
              </label>
              <input
                type="password"
                className="studio-input"
                placeholder="AIzaSy..."
                value={settings.geminiApiKey || ""}
                onChange={(e) => setSettings({ ...settings, geminiApiKey: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <Key size={13} />
                <span>OpenAI API Key:</span>
              </label>
              <input
                type="password"
                className="studio-input"
                placeholder="sk-proj-..."
                value={settings.openAiApiKey || ""}
                onChange={(e) => setSettings({ ...settings, openAiApiKey: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <Key size={13} />
                <span>Anthropic Claude API Key:</span>
              </label>
              <input
                type="password"
                className="studio-input"
                placeholder="sk-ant-..."
                value={settings.claudeApiKey || ""}
                onChange={(e) => setSettings({ ...settings, claudeApiKey: e.target.value })}
              />
            </div>
          </div>

          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "14px" }}>
            Kunci API disimpan hanya di dalam <em>Local Storage</em> pelayar anda untuk keselamatan privasi penuh.
          </p>
        </div>

        {/* Defaults & Preferences Card */}
        <div className="studio-card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "16px" }}>
            <Globe size={18} className="text-amber-500" />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0 }}>
              Keutamaan Lalai Studio
            </h3>
          </div>

          <div className="grid-2" style={{ gap: "16px", marginBottom: "18px" }}>
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: 6 }}>
                Bahasa Lalai Projek
              </label>
              <select
                className="studio-select"
                value={settings.defaultLanguage}
                onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value })}
              >
                <option value="Bahasa Melayu">Bahasa Melayu (Default)</option>
                <option value="English">English</option>
                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: 6 }}>
                Nisbah Aspek Lalai
              </label>
              <select
                className="studio-select"
                value={settings.defaultAspectRatio}
                onChange={(e) => setSettings({ ...settings, defaultAspectRatio: e.target.value })}
              >
                <option value="16:9">16:9 (Landscape / YouTube / TV)</option>
                <option value="9:16">9:16 (Vertical / TikTok / Reels)</option>
                <option value="1:1">1:1 (Square)</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="checkbox"
              id="autoSave"
              checked={settings.autoSave}
              onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
              style={{ width: 16, height: 16, accentColor: "var(--color-primary)" }}
            />
            <label htmlFor="autoSave" style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
              Simpan projek secara automatik setiap kali perubahan dilakukan (Auto-Save)
            </label>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
          >
            <Check size={18} />
            <span>Simpan Tetapan</span>
          </button>
        </div>
      </form>
    </div>
  );
}
