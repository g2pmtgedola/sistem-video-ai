import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Play,
  Sliders,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Wand2,
  ArrowRight,
  RefreshCw,
  Film,
  Clock,
  Gauge,
  Info
} from "lucide-react";
import { aiService, PIPELINE_STEPS } from "../../services/aiService";
import { ProgressBar } from "../common/ProgressBar";

export function NewProjectModule({ onProjectCreated, onNavigate }) {
  // Main form state
  const [idea, setIdea] = useState("");
  const [projectName, setProjectName] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Configuration options
  const [language, setLanguage] = useState("Bahasa Melayu");

  // Duration & Scene calculation system
  const [durationValue, setDurationValue] = useState(60); // numeric value
  const [durationUnit, setDurationUnit] = useState("seconds"); // "seconds" | "minutes"
  const [pacingMode, setPacingMode] = useState("standard"); // "fast" (~5s/scene), "standard" (~7.5s/scene), "slow" (~10s/scene)
  const [numberOfScenes, setNumberOfScenes] = useState(8);
  const [isManualSceneOverride, setIsManualSceneOverride] = useState(false);

  const [videoStyle, setVideoStyle] = useState("Cinematic");
  const [targetAudience, setTargetAudience] = useState("Pencinta seni budaya Melayu, generasi muda & penonton sinematik");
  const [videoPurpose, setVideoPurpose] = useState("Mendokumentasikan warisan pusaka dan nilai falsafah ketuhanan");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [voiceStyle, setVoiceStyle] = useState("Multiple Characters");
  const [musicStyle, setMusicStyle] = useState("Traditional");
  const [visualStyle, setVisualStyle] = useState("Cinematic");
  const [dialogueStyle, setDialogueStyle] = useState("Natural Malaysian Malay");
  const [leadGender, setLeadGender] = useState("Auto"); // "Auto" | "Female" | "Male"

  // Pipeline execution state
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepTitle, setStepTitle] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);

  // Compute total duration in seconds
  const totalSeconds = Math.max(5, durationUnit === "minutes" ? Math.round(durationValue * 60) : Math.round(durationValue));

  // Compute recommended scene count based on duration & pacing
  const calculateScenes = (seconds, pacing) => {
    let paceFactor = 7.5; // default standard
    if (pacing === "fast") paceFactor = 5;
    if (pacing === "slow") paceFactor = 10;
    const computed = Math.round(seconds / paceFactor);
    return Math.max(2, Math.min(30, computed)); // minimum 2 scenes, max 30
  };

  // Automatically recalculate scenes whenever duration or pacing changes (unless user explicitly manually overrides)
  useEffect(() => {
    if (!isManualSceneOverride) {
      const computed = calculateScenes(totalSeconds, pacingMode);
      setNumberOfScenes(computed);
    }
  }, [totalSeconds, pacingMode, isManualSceneOverride]);

  // Duration Quick Presets
  const DURATION_PRESETS = [
    { label: "15s (Reel Pendek)", val: 15, unit: "seconds" },
    { label: "30s (Iklan Standard)", val: 30, unit: "seconds" },
    { label: "45s (Teaser)", val: 45, unit: "seconds" },
    { label: "60s (1 Minit Penuh)", val: 60, unit: "seconds" },
    { label: "90s (1.5 Minit)", val: 90, unit: "seconds" },
    { label: "120s (2 Minit)", val: 2, unit: "minutes" },
    { label: "180s (3 Minit)", val: 3, unit: "minutes" }
  ];

  const handleApplyPreset = (preset) => {
    setDurationValue(preset.val);
    setDurationUnit(preset.unit);
    setIsManualSceneOverride(false);
    const secs = preset.unit === "minutes" ? preset.val * 60 : preset.val;
    setNumberOfScenes(calculateScenes(secs, pacingMode));
  };

  // Sample prompt suggestions
  const SAMPLE_PROMPTS = [
    {
      title: "Warkah Batik Gadis Kampung",
      desc: "Kisah seorang gadis kampung yang mewarisi perniagaan batik dari arwah ayahnya. beliau mula-mulanya tidak percaya batik mampu menjadi sesuatu yang unik. sehinggalah sekeping surat dari arwah ayahnya mengubah persepsinya 100%",
      style: "Cinematic Traditional",
      durationVal: 60,
      durationUnit: "seconds",
      gender: "Female"
    },
    {
      title: "Warisan Ukiran Kayu",
      desc: "Seorang tukang ukir kayu tua mengajar anak muridnya menghasilkan ukiran tradisional Melayu.",
      style: "Cinematic Traditional",
      durationVal: 90,
      durationUnit: "seconds",
      gender: "Male"
    },
    {
      title: "Pendekar Silat & Tasbih",
      desc: "Seorang guru silat Melayu mengajar muridnya bahawa jurus terhebat adalah ketundukan jiwa dan doa perlindungan diri.",
      style: "Cinematic Drama",
      durationVal: 60,
      durationUnit: "seconds",
      gender: "Male"
    },
    {
      title: "Tenunan Songket Emas",
      desc: "Seorang penenun songket diraja mewariskan motif bunga teratai emas kepada anak gadisnya sebelum festival kraf kebangsaan.",
      style: "Cinematic Documentary",
      durationVal: 60,
      durationUnit: "seconds",
      gender: "Female"
    },
    {
      title: "Kampung Nelayan Senja",
      desc: "Detik pulang nelayan kampung di pesisir Pantai Timur disambut anak kecil dengan sorak riang di bawah langit jingga.",
      style: "Short Film",
      durationVal: 45,
      durationUnit: "seconds",
      gender: "Auto"
    }
  ];

  const handleSelectSample = (sample) => {
    setIdea(sample.desc);
    setProjectName(sample.title);
    setDurationValue(sample.durationVal);
    setDurationUnit(sample.durationUnit);
    setIsManualSceneOverride(false);
    const secs = sample.durationUnit === "minutes" ? sample.durationVal * 60 : sample.durationVal;
    setNumberOfScenes(calculateScenes(secs, pacingMode));
    if (sample.gender) {
      setLeadGender(sample.gender);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setIsGenerating(true);
    setProgressPercent(5);
    setCurrentStep(1);
    setStepTitle("Memulakan Analisis AI...");

    const formattedDuration = `${totalSeconds} seconds`;

    try {
      const newProj = await aiService.generateVideoPlan(
        {
          name: projectName || (idea.length > 28 ? idea.slice(0, 28) + "..." : idea),
          idea,
          language,
          duration: formattedDuration,
          videoStyle,
          targetAudience,
          videoPurpose,
          aspectRatio,
          numberOfScenes,
          voiceStyle,
          musicStyle,
          visualStyle,
          dialogueStyle,
          leadGender
        },
        (step, title, pct) => {
          setCurrentStep(step);
          setStepTitle(title);
          setProgressPercent(pct);
        }
      );

      // Successfully generated
      setTimeout(() => {
        setIsGenerating(false);
        onProjectCreated(newProj);
        onNavigate("story");
      }, 600);
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
      alert("Ralat semasa menjana pelan video. Sila cuba lagi.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in" style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--color-primary-light)", padding: "4px 14px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: 12 }}>
          <Wand2 size={13} />
          <span>ALIRAN PROGRESIF AI</span>
        </div>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
          CREATE NEW VIDEO PROJECT
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 620, margin: "6px auto 0" }}>
          Masukkan satu idea video ringkas, dan biarkan AI Studio menstrukturkan keseluruhan pakej
          produksi video sinematik bertaraf industri.
        </p>
      </div>

      {/* Main Idea Input Studio Card */}
      <form onSubmit={handleGenerate} className="studio-card" style={{ padding: "32px" }}>
        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "1rem", fontWeight: 700, marginBottom: "8px", color: "var(--text-primary)" }}>
            Apakah Idea Video Anda? <span style={{ color: "var(--color-primary)" }}>*</span>
          </label>
          <textarea
            className="studio-textarea"
            rows={4}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Contoh: Seorang tukang ukir kayu tua mengajar anak muridnya menghasilkan ukiran tradisional Melayu."
            style={{ fontSize: "1rem", lineHeight: 1.6, padding: "16px", borderRadius: "var(--radius-lg)" }}
            required
          />

          {/* Gender Selector Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "12px",
              background: "#f8fafc",
              padding: "10px 16px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Jantina Watak Utama:
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  type="button"
                  onClick={() => setLeadGender("Female")}
                  className={`btn btn-sm ${leadGender === "Female" ? "btn-primary" : "btn-secondary"}`}
                  style={{ borderRadius: "var(--radius-full)", fontSize: "0.78rem" }}
                >
                  👩 Gadis / Wanita
                </button>
                <button
                  type="button"
                  onClick={() => setLeadGender("Male")}
                  className={`btn btn-sm ${leadGender === "Male" ? "btn-primary" : "btn-secondary"}`}
                  style={{ borderRadius: "var(--radius-full)", fontSize: "0.78rem" }}
                >
                  👨 Lelaki
                </button>
                <button
                  type="button"
                  onClick={() => setLeadGender("Auto")}
                  className={`btn btn-sm ${leadGender === "Auto" ? "btn-primary" : "btn-secondary"}`}
                  style={{ borderRadius: "var(--radius-full)", fontSize: "0.78rem" }}
                >
                  ⚡ Auto-Detect
                </button>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {/(gadis|gadia|wanita|perempuan|ibu|emak|mak|girl|woman|female)/i.test(idea) && (
                <span className="badge badge-accent" style={{ fontSize: "0.75rem", padding: "4px 10px" }}>
                  ✓ Dikesan: Watak Gadis / Wanita
                </span>
              )}
              {/(tingkatan\s*3|form\s*3)/i.test(idea) && (
                <span className="badge" style={{ fontSize: "0.75rem", padding: "4px 10px", background: "#e0e7ff", color: "#3730a3", border: "1px solid #c7d2fe" }}>
                  🎓 Dikesan: Pelajar Tingkatan 3 (15 Tahun)
                </span>
              )}
              {/(tingkatan\s*[1245]|form\s*[1245]|spm|sekolah|pelajar)/i.test(idea) && !/(tingkatan\s*3|form\s*3)/i.test(idea) && (
                <span className="badge" style={{ fontSize: "0.75rem", padding: "4px 10px", background: "#e0e7ff", color: "#3730a3", border: "1px solid #c7d2fe" }}>
                  🎓 Dikesan: Pelajar Sekolah
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Sample Inspiration Pills */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 10 }}>
            <Lightbulb size={14} className="text-amber-500" />
            <span>Pilih contoh idea untuk dicuba segera:</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {SAMPLE_PROMPTS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: "0.78rem", borderRadius: "var(--radius-full)", background: "#ffffff" }}
              >
                <span>💡 {sample.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dedicated Duration & Scene Auto-Determination Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #f0f7ff 0%, #f5f3ff 100%)",
            border: "1px solid #bfdbfe",
            borderRadius: "var(--radius-lg)",
            padding: "20px",
            marginBottom: "24px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Clock size={18} className="text-primary" style={{ color: "var(--color-primary)" }} />
                <h3 style={{ fontSize: "1rem", fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                  Tempoh Video & Penentuan Babak Automatik
                </h3>
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: "4px 0 0 26px" }}>
                Masukkan tempoh video yang diingini. Bilangan babak (scenes) akan dihitung secara pintar berasaskan pacing sinematik AI.
              </p>
            </div>

            {/* Live Indicator Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#ffffff",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                border: "1px solid #93c5fd",
                boxShadow: "0 2px 4px rgba(37, 99, 235, 0.08)"
              }}
            >
              <Film size={15} style={{ color: "var(--color-primary)" }} />
              <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--color-primary)" }}>
                {numberOfScenes} Babak
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                (~{(totalSeconds / numberOfScenes).toFixed(1)}s / babak)
              </span>
            </div>
          </div>

          <div className="grid-2" style={{ gap: "16px", marginBottom: "14px" }}>
            {/* Custom Duration Input */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "var(--text-primary)" }}>
                Tempoh Sasaran Video:
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="number"
                  min="5"
                  max="1800"
                  className="studio-input"
                  value={durationValue}
                  onChange={(e) => {
                    const val = Math.max(1, parseInt(e.target.value, 10) || 0);
                    setDurationValue(val);
                    setIsManualSceneOverride(false);
                  }}
                  style={{ fontWeight: 700, fontSize: "1rem", flex: "1 1 auto" }}
                />
                <select
                  className="studio-select"
                  value={durationUnit}
                  onChange={(e) => {
                    setDurationUnit(e.target.value);
                    setIsManualSceneOverride(false);
                  }}
                  style={{ width: "130px", fontWeight: 600 }}
                >
                  <option value="seconds">Saat (Sec)</option>
                  <option value="minutes">Minit (Min)</option>
                </select>
              </div>
              <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginTop: 4, display: "block" }}>
                Jumlah mutlak: <strong>{totalSeconds} saat</strong>
              </span>
            </div>

            {/* Pacing Speed Selector */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "var(--text-primary)" }}>
                Gaya Rentak (Pacing Sinematik):
              </label>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setPacingMode("fast");
                    setIsManualSceneOverride(false);
                  }}
                  className={`btn btn-sm ${pacingMode === "fast" ? "btn-primary" : "btn-secondary"}`}
                  style={{ flex: 1, fontSize: "0.75rem", padding: "8px 6px" }}
                >
                  ⚡ Pantas (~5s)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPacingMode("standard");
                    setIsManualSceneOverride(false);
                  }}
                  className={`btn btn-sm ${pacingMode === "standard" ? "btn-primary" : "btn-secondary"}`}
                  style={{ flex: 1, fontSize: "0.75rem", padding: "8px 6px" }}
                >
                  🎬 Standard (~7.5s)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPacingMode("slow");
                    setIsManualSceneOverride(false);
                  }}
                  className={`btn btn-sm ${pacingMode === "slow" ? "btn-primary" : "btn-secondary"}`}
                  style={{ flex: 1, fontSize: "0.75rem", padding: "8px 6px" }}
                >
                  🍃 Tenang (~10s)
                </button>
              </div>
              <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginTop: 4, display: "block" }}>
                Formula: Tempoh ÷ Rentak = Bilangan Babak optimum
              </span>
            </div>
          </div>

          {/* Quick Preset Chips */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginRight: 4 }}>
              Pilihan Cepat:
            </span>
            {DURATION_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="btn btn-ghost btn-sm"
                style={{
                  fontSize: "0.73rem",
                  padding: "3px 10px",
                  background: totalSeconds === (p.unit === "minutes" ? p.val * 60 : p.val) ? "#dbeafe" : "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "var(--radius-full)",
                  color: totalSeconds === (p.unit === "minutes" ? p.val * 60 : p.val) ? "var(--color-primary-dark)" : "var(--text-secondary)",
                  fontWeight: totalSeconds === (p.unit === "minutes" ? p.val * 60 : p.val) ? 700 : 500
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Manual Scene Stepper Override (Optional) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px dashed #cbd5e1",
              marginTop: "12px",
              paddingTop: "10px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "var(--text-secondary)" }}>
              <Info size={14} className="text-primary" />
              <span>
                Babak ditentukan secara automatik ({numberOfScenes} babak). Ingin laraskan secara manual?
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                onClick={() => {
                  setNumberOfScenes((prev) => Math.max(2, prev - 1));
                  setIsManualSceneOverride(true);
                }}
                className="btn btn-secondary btn-sm"
                style={{ width: 28, height: 28, padding: 0, borderRadius: "var(--radius-full)" }}
                title="Kurangkan satu babak"
              >
                -
              </button>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, minWidth: 20, textAlign: "center" }}>
                {numberOfScenes}
              </span>
              <button
                type="button"
                onClick={() => {
                  setNumberOfScenes((prev) => Math.min(30, prev + 1));
                  setIsManualSceneOverride(true);
                }}
                className="btn btn-secondary btn-sm"
                style={{ width: 28, height: 28, padding: 0, borderRadius: "var(--radius-full)" }}
                title="Tambah satu babak"
              >
                +
              </button>
              {isManualSceneOverride && (
                <button
                  type="button"
                  onClick={() => {
                    setIsManualSceneOverride(false);
                    setNumberOfScenes(calculateScenes(totalSeconds, pacingMode));
                  }}
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize: "0.72rem", color: "var(--color-primary)", textDecoration: "underline", padding: "2px 6px" }}
                >
                  Reset ke Kiraan AI
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Optional Project Name */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px", color: "var(--text-secondary)" }}>
            Nama Projek (Pilihan):
          </label>
          <input
            type="text"
            className="studio-input"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="cth: Warisan Ukiran Melayu"
          />
        </div>

        {/* Advanced Options Accordion */}
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "18px", marginBottom: "28px" }}>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn btn-ghost btn-sm"
            style={{ padding: "6px 0", color: "var(--color-primary)", fontWeight: 700 }}
          >
            <Sliders size={16} />
            <span>{showAdvanced ? "Sembunyikan Tetapan Lanjutan" : "Ubah Suai Parameter Pengeluaran (Gaya, Aspek, Bahasa, dsb.)"}</span>
            {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showAdvanced && (
            <div className="grid-3 animate-fade-in" style={{ marginTop: "18px", gap: "16px" }}>
              {/* Language */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 4 }}>
                  Bahasa (Language)
                </label>
                <select
                  className="studio-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="Bahasa Melayu">Bahasa Melayu (Default)</option>
                  <option value="English">English</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Chinese">Chinese (Mandarin)</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              {/* Video Style */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 4 }}>
                  Gaya Video (Video Style)
                </label>
                <select
                  className="studio-select"
                  value={videoStyle}
                  onChange={(e) => setVideoStyle(e.target.value)}
                >
                  <option value="Cinematic">Cinematic</option>
                  <option value="Realistic">Realistic</option>
                  <option value="Traditional">Traditional / Heritage</option>
                  <option value="Short Film">Short Film</option>
                  <option value="Documentary">Documentary</option>
                  <option value="3D Animation">3D Animation</option>
                  <option value="Cartoon">Cartoon</option>
                  <option value="Anime">Anime</option>
                  <option value="Commercial">Commercial / Iklan</option>
                  <option value="Social Media">Social Media (Reels / TikTok)</option>
                  <option value="Historical">Historical</option>
                </select>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 4 }}>
                  Nisbah Aspek (Aspect Ratio)
                </label>
                <select
                  className="studio-select"
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                >
                  <option value="16:9">16:9 (Landscape / YouTube / TV)</option>
                  <option value="9:16">9:16 (Vertical / TikTok / Reels)</option>
                  <option value="1:1">1:1 (Square / Instagram)</option>
                  <option value="4:5">4:5 (Social Feed)</option>
                </select>
              </div>

              {/* Visual Style */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 4 }}>
                  Gaya Visual (Visual Style)
                </label>
                <select
                  className="studio-select"
                  value={visualStyle}
                  onChange={(e) => setVisualStyle(e.target.value)}
                >
                  <option value="Photorealistic">Photorealistic</option>
                  <option value="Cinematic">Cinematic 35mm Film</option>
                  <option value="3D">3D Render (Unreal Engine 5)</option>
                  <option value="Illustration">Illustration</option>
                  <option value="Anime">Anime Studio</option>
                  <option value="Watercolor">Watercolor</option>
                  <option value="Clay">Clay / Stop Motion</option>
                </select>
              </div>

              {/* Voice Style */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 4 }}>
                  Gaya Suara (Voice Style)
                </label>
                <select
                  className="studio-select"
                  value={voiceStyle}
                  onChange={(e) => setVoiceStyle(e.target.value)}
                >
                  <option value="Multiple Characters">Multiple Characters (Pelbagai Watak)</option>
                  <option value="Male">Male (Lelaki)</option>
                  <option value="Female">Female (Wanita)</option>
                  <option value="Narrator">Narrator (Pencerita Sahaja)</option>
                  <option value="Elderly">Elderly (Warga Emas)</option>
                  <option value="No Voice">No Voice (Visual Sahaja)</option>
                </select>
              </div>

              {/* Music */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 4 }}>
                  Muzik Latar (Background Music)
                </label>
                <select
                  className="studio-select"
                  value={musicStyle}
                  onChange={(e) => setMusicStyle(e.target.value)}
                >
                  <option value="Traditional">Traditional (Gambus, Seruling, Gendang)</option>
                  <option value="Cinematic">Cinematic Orchestral</option>
                  <option value="Emotional">Emotional & Heartfelt</option>
                  <option value="Inspirational">Inspirational</option>
                  <option value="Ambient">Ambient & Peaceful</option>
                  <option value="Suspense">Suspense</option>
                  <option value="None">None (Tiada Muzik)</option>
                </select>
              </div>

              {/* Dialogue Style */}
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 4 }}>
                  Gaya Dialog (Dialogue Style)
                </label>
                <select
                  className="studio-select"
                  value={dialogueStyle}
                  onChange={(e) => setDialogueStyle(e.target.value)}
                >
                  <option value="Natural Malaysian Malay">Natural Malaysian Malay (Standard)</option>
                  <option value="Dialek Pantai Timur">Dialek Pantai Timur (Terengganu/Kelantan)</option>
                  <option value="Bahasa Istana Klasik">Bahasa Istana Klasik Melayu</option>
                  <option value="Formal English">Formal English</option>
                  <option value="Colloquial Malaysian">Colloquial Malaysian</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Generate Plan Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            disabled={isGenerating || !idea.trim()}
            className="btn btn-primary btn-lg"
            style={{ padding: "16px 36px", fontSize: "1.05rem" }}
          >
            <Sparkles size={20} />
            <span>GENERATE VIDEO PLAN</span>
          </button>
        </div>
      </form>

      {/* 12-Step Progressive Pipeline Modal Overlay */}
      {isGenerating && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "620px", padding: "32px", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: "var(--grad-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff"
                }}
              >
                <Sparkles size={22} className="animate-spin" />
              </div>
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: 0 }}>
                  AI Generation Pipeline Aktif
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                  Langkah {currentStep} / 12: {stepTitle}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ margin: "20px 0 24px" }}>
              <ProgressBar progress={progressPercent} height={10} />
            </div>

            {/* Steps Checklist */}
            <div
              style={{
                background: "#f8fafc",
                borderRadius: "var(--radius-lg)",
                padding: "16px",
                border: "1px solid var(--border-subtle)",
                maxHeight: "260px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
            >
              {PIPELINE_STEPS.map((step) => {
                const isPast = currentStep > step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <div
                    key={step.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      opacity: isPast || isCurrent ? 1 : 0.4
                    }}
                  >
                    <div style={{ marginTop: 2 }}>
                      {isPast ? (
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      ) : isCurrent ? (
                        <RefreshCw size={16} className="text-indigo-600 animate-spin" />
                      ) : (
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            border: "1px solid #cbd5e1"
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: isCurrent ? "var(--color-primary-dark)" : "var(--text-primary)" }}>
                        {step.id}. {step.title}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                        {step.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: "18px", textAlign: "center", fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Sistem sedang menstrukturkan konsistensi watak, kesinambungan masa dan prompt pengeluaran...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
