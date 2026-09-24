import React from "react";
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Users,
  Clapperboard,
  Image as ImageIcon,
  Mic,
  Music,
  Video,
  Grid3X3,
  FolderKanban,
  Settings,
  Sparkles,
  ChevronRight,
  X
} from "lucide-react";

export const NAVIGATION_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
  { id: "new-project", label: "New Project", icon: PlusCircle, badge: "AI" },
  { id: "story", label: "Story Generator", icon: BookOpen, badge: null },
  { id: "character-profile", label: "Profil Watak", icon: Users, badge: "Lock" },
  { id: "scene-builder", label: "Scene Builder", icon: Clapperboard, badge: null },
  { id: "image-prompts", label: "Image Prompts", icon: ImageIcon, badge: null },
  { id: "voice", label: "Voice / VO", icon: Mic, badge: "Malay" },
  { id: "music", label: "Music & SFX", icon: Music, badge: null },
  { id: "video-prompts", label: "Video Prompts", icon: Video, badge: "Sora" },
  { id: "storyboard", label: "Storyboard", icon: Grid3X3, badge: null },
  { id: "projects", label: "Projects", icon: FolderKanban, badge: null },
  { id: "settings", label: "Settings", icon: Settings, badge: null }
];

export function Sidebar({ activeTab, onSelectTab, isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.4)",
            zIndex: 40,
            backdropFilter: "blur(4px)"
          }}
          className="md:hidden"
        />
      )}

      <aside
        style={{
          width: "260px",
          background: "var(--bg-sidebar)",
          borderRight: "1px solid var(--border-subtle)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 50,
          transition: "transform 0.3s ease"
        }}
        className={`sidebar-aside ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: "24px 20px 20px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "var(--grad-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)"
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                MASTER AI VIDEO
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600 }}>
                PROMPT STUDIO
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="md:hidden btn btn-ghost btn-sm"
            style={{ padding: 4 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-light)", padding: "0 10px 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Production Modules
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onClose) onClose();
                  }}
                  type="button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.85rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "var(--color-primary-dark)" : "var(--text-secondary)",
                    background: isActive ? "var(--color-primary-light)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    transition: "all var(--trans-fast)",
                    textAlign: "left",
                    width: "100%"
                  }}
                  className={`hover:bg-slate-100 ${isActive ? "shadow-sm" : ""}`}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Icon size={17} style={{ color: isActive ? "var(--color-primary)" : "var(--text-muted)" }} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      style={{
                        fontSize: "0.65rem",
                        padding: "2px 6px",
                        borderRadius: "9999px",
                        fontWeight: 700,
                        background: isActive ? "var(--color-primary)" : "#e2e8f0",
                        color: isActive ? "#ffffff" : "var(--text-secondary)"
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Pro Badge / Studio Info */}
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid var(--border-subtle)",
            background: "var(--grad-surface)"
          }}
        >
          <div
            style={{
              padding: "12px",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(249, 115, 22, 0.08) 100%)",
              border: "1px solid rgba(99, 102, 241, 0.15)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)" }}>
                AI Engine Online
              </span>
            </div>
            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.4 }}>
              Malaysian Culture & Story Continuity Studio Ready
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
