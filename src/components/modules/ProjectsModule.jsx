import React from "react";
import {
  FolderKanban,
  Plus,
  Copy,
  Trash2,
  Download,
  Play,
  Clock,
  Film,
  RotateCcw
} from "lucide-react";
import { StatusBadge } from "../common/StatusBadge";

export function ProjectsModule({
  project,
  projects,
  onSelectProject,
  onDuplicateProject,
  onDeleteProject,
  onResetSample,
  onNavigate,
  onOpenExportModal
}) {
  return (
    <div className="space-y-6 animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--color-primary-light)", padding: "3px 10px", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: 6 }}>
            <FolderKanban size={12} />
            <span>PENGURUSAN PROJEK AI</span>
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
            PROJECTS LIBRARY
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Semua pakej produksi video yang disimpan dalam storan studio tempatan anda
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={onResetSample}
            className="btn btn-secondary btn-sm"
            type="button"
          >
            <RotateCcw size={14} />
            <span>Muat Sampel Ukiran</span>
          </button>
          <button
            onClick={() => onNavigate("new-project")}
            className="btn btn-primary btn-sm"
            type="button"
          >
            <Plus size={14} />
            <span>Projek Baru</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid-2" style={{ gap: "20px" }}>
        {projects.map((p) => {
          const isCurrent = p.id === project?.id;

          return (
            <div
              key={p.id}
              className="studio-card studio-card-interactive"
              style={{
                padding: "24px",
                borderLeft: isCurrent ? "4px solid var(--color-primary)" : "1px solid var(--border-subtle)",
                position: "relative"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span className="badge badge-primary" style={{ fontSize: "0.7rem" }}>{p.id}</span>
                    <StatusBadge status={p.status} />
                    <span className="badge badge-secondary" style={{ fontSize: "0.7rem" }}>{p.language}</span>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "6px 0 2px" }}>
                    {p.name}
                  </h3>
                </div>

                {isCurrent && (
                  <span className="badge badge-primary" style={{ fontSize: "0.72rem" }}>
                    Aktif
                  </span>
                )}
              </div>

              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "16px", minHeight: "42px", lineHeight: 1.5 }}>
                &ldquo;{p.idea.length > 90 ? p.idea.slice(0, 90) + "..." : p.idea}&rdquo;
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "18px" }}>
                <span><strong>{p.scenes?.length || 0}</strong> Babak</span>
                <span>•</span>
                <span><strong>{p.characters?.length || 0}</strong> Watak</span>
                <span>•</span>
                <span>{p.duration}</span>
                <span>•</span>
                <span>{p.aspectRatio}</span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-subtle)", paddingTop: "14px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => {
                      onSelectProject(p.id);
                      onNavigate("storyboard");
                    }}
                    className="btn btn-primary btn-sm"
                    type="button"
                  >
                    <Play size={13} />
                    <span>Buka Studio</span>
                  </button>
                  <button
                    onClick={() => onDuplicateProject(p.id)}
                    className="btn btn-secondary btn-sm"
                    type="button"
                    title="Salin projek ini"
                  >
                    <Copy size={13} />
                    <span>Salin</span>
                  </button>
                </div>

                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => {
                      onSelectProject(p.id);
                      onOpenExportModal();
                    }}
                    className="btn btn-ghost btn-sm"
                    title="Eksport Pakej"
                  >
                    <Download size={14} />
                  </button>
                  <button
                    onClick={() => onDeleteProject(p.id)}
                    className="btn btn-ghost btn-sm text-red-600 hover:bg-red-50"
                    title="Padam Projek"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
