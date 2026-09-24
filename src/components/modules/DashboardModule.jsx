import React from "react";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Users,
  Film,
  Sparkles,
  ArrowRight,
  Plus,
  Play,
  Copy,
  BookOpen,
  Image as ImageIcon,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { StatusBadge, ConsistencyBadge } from "../common/StatusBadge";
import { CopyButton } from "../common/CopyButton";

export function DashboardModule({
  project,
  projects,
  onNavigate,
  onSelectProject,
  onResetSample
}) {
  // Statistics calculations
  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.status === "Completed").length;
  const draftProjects = projects.filter((p) => p.status !== "Completed").length;
  const totalCharacters = project?.characters?.length || 0;
  const totalScenes = project?.scenes?.length || 0;

  return (
    <div className="space-y-6 animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Studio Welcome Banner */}
      <div
        className="studio-card"
        style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.07) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(249, 115, 22, 0.07) 100%)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ maxWidth: "680px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#ffffff", padding: "4px 12px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: 12, border: "1px solid var(--border-subtle)" }}>
              <Sparkles size={13} className="text-amber-500" />
              <span>AI Video Production Workflow Architect</span>
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "8px", letterSpacing: "-0.02em" }}>
              Selamat Datang ke <span className="gradient-text">Master AI Video Studio</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Ubah satu idea video ringkas kepada pakej produksi AI penuh: dari konsep cerita, skrip,
              Profil Watak berkunci, pecahan adegan, prompt imej 18-aspek, dialog suara Melayu asli,
              sehingga arahan video Sora/Kling dan storyboard lengkap.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => onNavigate("new-project")}
              className="btn btn-primary btn-lg"
              type="button"
            >
              <Plus size={18} />
              <span>Bina Projek Baharu</span>
            </button>
            <button
              onClick={onResetSample}
              className="btn btn-secondary btn-lg"
              type="button"
              title="Muat semula contoh projek 'Warisan Ukiran'"
            >
              <RotateCcw size={16} />
              <span>Muat Sampel Ukiran</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <div className="studio-card studio-card-interactive" style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Jumlah Projek</span>
            <div style={{ width: 36, height: 36, borderRadius: "10px", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary-dark)" }}>
              <FolderKanban size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)" }}>{totalProjects}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>Semua projek dalam memori studio</div>
        </div>

        <div className="studio-card studio-card-interactive" style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Projek Selesai</span>
            <div style={{ width: 36, height: 36, borderRadius: "10px", background: "var(--color-success-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "#059669" }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#059669" }}>{completedProjects}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>Pakej siap untuk produksi AI</div>
        </div>

        <div className="studio-card studio-card-interactive" style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Watak Terkunci</span>
            <div style={{ width: 36, height: 36, borderRadius: "10px", background: "#fdf2f8", display: "flex", alignItems: "center", justifyContent: "center", color: "#db2777" }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#db2777" }}>{totalCharacters}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>Profil Watak dilindungi (Lock)</div>
        </div>

        <div className="studio-card studio-card-interactive" style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Jumlah Adegan</span>
            <div style={{ width: 36, height: 36, borderRadius: "10px", background: "var(--color-accent-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c" }}>
              <Film size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ea580c" }}>{totalScenes}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>Adegan berurutan berkesinambungan</div>
        </div>
      </div>

      {/* Active Project Highlight Card */}
      {project && (
        <div className="studio-card" style={{ borderLeft: "4px solid var(--color-primary)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="badge badge-primary">{project.id}</span>
                <StatusBadge status={project.status} />
                <span className="badge badge-accent">{project.duration}</span>
                <span className="badge badge-secondary">{project.aspectRatio}</span>
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginTop: "8px" }}>
                {project.name}
              </h3>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => onNavigate("storyboard")}
                className="btn btn-primary btn-sm"
              >
                <Play size={14} />
                <span>Lihat Storyboard</span>
              </button>
              <button
                onClick={() => onNavigate("story")}
                className="btn btn-secondary btn-sm"
              >
                <span>Buka Skrip</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "20px", fontStyle: "italic", background: "#f8fafc", padding: "12px 16px", borderRadius: "var(--radius-md)", borderLeft: "3px solid #cbd5e1" }}>
            &ldquo;{project.idea}&rdquo;
          </p>

          {/* Quick Module Jump Links */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
            <div
              onClick={() => onNavigate("character-profile")}
              className="studio-card studio-card-interactive"
              style={{ padding: "14px", cursor: "pointer", background: "var(--bg-app)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--color-primary-dark)", fontWeight: 700, fontSize: "0.85rem", marginBottom: 4 }}>
                <Users size={16} />
                <span>Profil Watak</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                {project.characters?.map(c => c.name).join(", ") || "Tiada watak"}
              </div>
            </div>

            <div
              onClick={() => onNavigate("scene-builder")}
              className="studio-card studio-card-interactive"
              style={{ padding: "14px", cursor: "pointer", background: "var(--bg-app)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#ea580c", fontWeight: 700, fontSize: "0.85rem", marginBottom: 4 }}>
                <Film size={16} />
                <span>Scene Timeline</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                {project.scenes?.length} adegan lengkap & kamera
              </div>
            </div>

            <div
              onClick={() => onNavigate("image-prompts")}
              className="studio-card studio-card-interactive"
              style={{ padding: "14px", cursor: "pointer", background: "var(--bg-app)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#059669", fontWeight: 700, fontSize: "0.85rem", marginBottom: 4 }}>
                <ImageIcon size={16} />
                <span>Image Prompts</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                18 aspek visual sinematik
              </div>
            </div>

            <div
              onClick={() => onNavigate("video-prompts")}
              className="studio-card studio-card-interactive"
              style={{ padding: "14px", cursor: "pointer", background: "var(--bg-app)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#8b5cf6", fontWeight: 700, fontSize: "0.85rem", marginBottom: 4 }}>
                <Sparkles size={16} />
                <span>Video Prompts</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Format Sora / Kling / Runway
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Projects List */}
      <div className="studio-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Projek Terkini (Recent Projects)</h3>
          <button
            onClick={() => onNavigate("projects")}
            className="btn btn-ghost btn-sm"
          >
            <span>Semua Projek ({projects.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {projects.slice(0, 5).map((p) => {
            const isCurrent = p.id === project?.id;
            return (
              <div
                key={p.id}
                onClick={() => onSelectProject(p.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 18px",
                  borderRadius: "var(--radius-md)",
                  background: isCurrent ? "rgba(99, 102, 241, 0.06)" : "#fafafa",
                  border: isCurrent ? "1px solid var(--color-primary-light)" : "1px solid var(--border-subtle)",
                  cursor: "pointer",
                  transition: "all var(--trans-fast)"
                }}
                className="hover:bg-slate-100"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: isCurrent ? "var(--color-primary)" : "#cbd5e1"
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {p.scenes?.length || 0} adegan • {p.duration} • {p.language}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <StatusBadge status={p.status} />
                  {isCurrent && (
                    <span className="badge badge-primary" style={{ fontSize: "0.68rem" }}>
                      Sedang Dibuka
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
