import React from "react";
import { Menu, Sparkles, Download, ShieldCheck, Plus, Check } from "lucide-react";
import { StatusBadge, ConsistencyBadge } from "../common/StatusBadge";

export function Topbar({
  project,
  onOpenMobileMenu,
  onOpenConsistencyModal,
  onOpenExportModal,
  onNewProjectClick
}) {
  const consistencyScore = project?.consistencyAudit?.score ?? 98;

  return (
    <header
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "sticky",
        top: 0,
        zIndex: 30,
        padding: "14px 28px"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >
        {/* Left: Mobile Toggle & Project Titles */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden btn btn-ghost btn-sm"
            style={{ padding: 6 }}
            title="Menu"
          >
            <Menu size={20} />
          </button>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
                MASTER AI VIDEO PROMPT STUDIO
              </h1>
              <span className="hidden sm:inline-block badge badge-accent" style={{ fontSize: "0.68rem" }}>
                v2.0 PRO
              </span>
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 500 }}>
              &ldquo;From Idea to Complete AI Video&rdquo;
            </div>
          </div>
        </div>

        {/* Center: Live Project Status & Progress */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "var(--bg-card-subtle)",
            padding: "6px 14px",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border-subtle)"
          }}
          className="hidden lg:flex"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem" }}>
            <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>PROJECT:</span>
            <span style={{ fontWeight: 700, color: "var(--text-primary)", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {project?.name || "Tiada Projek"}
            </span>
          </div>

          <div style={{ width: 1, height: 16, background: "var(--border-subtle)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem" }}>
            <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>STATUS:</span>
            <StatusBadge status={project?.status || "Draft"} />
          </div>

          <div style={{ width: 1, height: 16, background: "var(--border-subtle)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem" }}>
            <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>PROGRESS:</span>
            <span style={{ fontWeight: 800, color: "var(--color-primary-dark)" }}>
              {project?.progress ?? 100}%
            </span>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Consistency Badge */}
          <ConsistencyBadge
            score={consistencyScore}
            onClick={onOpenConsistencyModal}
          />

          {/* Export Project Button */}
          <button
            onClick={onOpenExportModal}
            className="btn btn-secondary btn-sm"
            type="button"
          >
            <Download size={15} />
            <span className="hidden sm:inline">Export Pack</span>
          </button>

          {/* New Project CTA */}
          <button
            onClick={onNewProjectClick}
            className="btn btn-primary btn-sm"
            type="button"
          >
            <Plus size={15} />
            <span>Projek Baru</span>
          </button>
        </div>
      </div>
    </header>
  );
}
