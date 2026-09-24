// LocalStorage Service for Master AI Video Prompt Studio
import { sampleProject } from "../data/sampleProject.js";

const STORAGE_KEY = "MASTER_AI_VIDEO_PROJECTS";
const ACTIVE_PROJECT_KEY = "MASTER_AI_ACTIVE_PROJECT_ID";
const SETTINGS_KEY = "MASTER_AI_STUDIO_SETTINGS";

export const storageService = {
  // Get all projects
  getProjects() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Initialize with sample project
        const initial = [sampleProject];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to load projects from localStorage", e);
      return [sampleProject];
    }
  },

  // Save all projects
  saveProjects(projects) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error("Failed to save projects to localStorage", e);
    }
  },

  // Get active project
  getActiveProject() {
    const projects = this.getProjects();
    const activeId = localStorage.getItem(ACTIVE_PROJECT_KEY);
    if (activeId) {
      const found = projects.find((p) => p.id === activeId);
      if (found) return found;
    }
    // Default to first project
    if (projects.length > 0) {
      this.setActiveProjectId(projects[0].id);
      return projects[0];
    }
    return sampleProject;
  },

  // Set active project ID
  setActiveProjectId(id) {
    localStorage.setItem(ACTIVE_PROJECT_KEY, id);
  },

  // Save single project (update or add)
  saveProject(project) {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    const updated = {
      ...project,
      updatedAt: new Date().toISOString()
    };

    if (index >= 0) {
      projects[index] = updated;
    } else {
      projects.unshift(updated);
    }

    this.saveProjects(projects);
    this.setActiveProjectId(updated.id);
    return updated;
  },

  // Delete project
  deleteProject(id) {
    let projects = this.getProjects();
    projects = projects.filter((p) => p.id !== id);
    if (projects.length === 0) {
      projects = [sampleProject];
    }
    this.saveProjects(projects);
    this.setActiveProjectId(projects[0].id);
    return projects;
  },

  // Duplicate project
  duplicateProject(id) {
    const projects = this.getProjects();
    const target = projects.find((p) => p.id === id);
    if (!target) return null;

    const copy = JSON.parse(JSON.stringify(target));
    copy.id = "PROJ_" + Date.now().toString(36).toUpperCase();
    copy.name = `${target.name} (Salinan)`;
    copy.createdAt = new Date().toISOString();
    copy.updatedAt = new Date().toISOString();

    projects.unshift(copy);
    this.saveProjects(projects);
    this.setActiveProjectId(copy.id);
    return copy;
  },

  // Reset to default sample
  resetSample() {
    const projects = [sampleProject];
    this.saveProjects(projects);
    this.setActiveProjectId(sampleProject.id);
    return sampleProject;
  },

  // Settings
  getSettings() {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return {
      apiProvider: "simulated",
      geminiApiKey: "",
      openAiApiKey: "",
      claudeApiKey: "",
      defaultLanguage: "Bahasa Melayu",
      defaultAspectRatio: "16:9",
      autoSave: true,
      autoConsistencyFix: false
    };
  },

  saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
};
