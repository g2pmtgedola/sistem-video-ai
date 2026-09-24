import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Wand2,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Info
} from "lucide-react";
import { consistencyChecker } from "../../services/consistencyChecker";

export function ConsistencyModule({ project, onUpdateProject, showToast }) {
  const [isFixing, setIsFixing] = useState(false);

  const audit = project?.consistencyAudit || consistencyChecker.runAudit(project);
  const score = audit.score ?? 100;
  const items = audit.items || [];
  const passedCount = audit.passedCount ?? items.filter((i) => i.status === "passed").length;

  const handleRunRecheck = () => {
    const newAudit = consistencyChecker.runAudit(project);
    onUpdateProject({
      ...project,
      consistencyAudit: newAudit
    });
    showToast(`Audit kualiti dijalankan: Skor terkini ${newAudit.score}%`, "info");
  };

  const handleAutoFix = () => {
    setIsFixing(true);
    setTimeout(() => {
      const fixedProject = consistencyChecker.autoFix(project);
      onUpdateProject(fixedProject);
      setIsFixing(false);
      showToast("✨ Semua ketidakkonsistenan berjaya diperbaiki secara automatik!", "success");
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--color-success-light)", padding: "3px 10px", borderRadius: "99999px", fontSize: "0.72rem", fontWeight: 700, color: "#065f46", marginBottom: 6 }}>
            <ShieldCheck size={12} />
            <span>AI QUALITY CONTROL & CONTINUITY AUDIT</span>
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
            AI CONSISTENCY CHECK
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Pemeriksaan audit 13-perkara bagi mengesahkan kesinambungan watak, dialek suara, props dan kamera
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleRunRecheck}
            className="btn btn-secondary btn-sm"
            type="button"
          >
            <RefreshCw size={14} />
            <span>Jalankan Audit Semula</span>
          </button>
          <button
            onClick={handleAutoFix}
            disabled={isFixing || score === 100}
            className="btn btn-primary btn-sm"
            type="button"
          >
            <Wand2 size={14} className={isFixing ? "animate-spin" : ""} />
            <span>FIX AUTOMATICALLY</span>
          </button>
        </div>
      </div>

      {/* Score Overview Card */}
      <div
        className="studio-card"
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          padding: "28px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#065f46", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>
              SKOR KONSISTENSI PRODUKSI (CONSISTENCY SCORE)
            </div>
            <div style={{ fontSize: "3.5rem", fontWeight: 900, color: score >= 90 ? "#059669" : score >= 70 ? "#d97706" : "#dc2626", lineHeight: 1 }}>
              {score}%
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 8 }}>
              {passedCount} daripada {items.length} piawaian kesinambungan video dipatuhi sepenuhnya.
            </div>
          </div>

          <div style={{ maxWidth: "380px" }}>
            <div style={{ background: "#ffffff", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: "0.85rem", color: "var(--text-primary)", marginBottom: 4 }}>
                <Sparkles size={15} className="text-amber-500" />
                <span>Enjin Auto-Fix Diaktifkan</span>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                Sekiranya terdapat perbezaan busana watak atau kekosongan prompt, butang <strong>[FIX AUTOMATICALLY]</strong> akan
                menyelaraskan deskripsi berkunci merentasi semua babak serta-merta.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 13-Point Audit Checklist */}
      <div className="studio-card" style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "16px" }}>
          Senarai Semak Audit 13-Perkara (Quality Checklist)
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((item) => {
            const isPassed = item.status === "passed";

            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  padding: "14px 18px",
                  borderRadius: "var(--radius-md)",
                  background: isPassed ? "#ffffff" : "#fffbeb",
                  border: isPassed ? "1px solid var(--border-subtle)" : "1px solid #fde68a",
                  transition: "all var(--trans-fast)"
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ marginTop: 2 }}>
                    {isPassed ? (
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    ) : (
                      <AlertTriangle size={18} className="text-amber-500" />
                    )}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <strong style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>
                        {item.title}
                      </strong>
                      <span className="badge badge-secondary" style={{ fontSize: "0.68rem" }}>
                        {item.category}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: isPassed ? "var(--text-secondary)" : "#92400e", margin: "4px 0 0" }}>
                      {item.detail}
                    </p>
                  </div>
                </div>

                {!isPassed && (
                  <button
                    onClick={handleAutoFix}
                    className="btn btn-primary btn-sm"
                    type="button"
                    style={{ fontSize: "0.75rem", padding: "4px 10px" }}
                  >
                    <span>Baiki</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
