/**
 * Advaita Hyginie Design System - Color Palette
 * Centralized color configuration for consistent theming across the application
 */

export const colors = {
  // Primary Brand Color
  primary: {
    main: "#0A2540", // Navy Blue
    light: "#1a3a52",
    dark: "#051427",
    lighter: "#f0f4f9",
  },

  // Secondary Color
  secondary: {
    main: "#CBD5E1", // Silver Grey
    light: "#e2e8f0",
    dark: "#94a3b8",
  },

  // Background
  background: {
    main: "#FFFFFF", // White
    light: "#f8fafc",
    dark: "#0f172a",
  },

  // Text
  text: {
    primary: "#020617", // Almost Black
    secondary: "#475569",
    muted: "#6b7280",
    light: "#cbd5e1",
    inverse: "#ffffff",
  },

  // CTA & Accent
  cta: {
    main: "#2563EB", // Royal Blue
    hover: "#1d4ed8",
    active: "#1e40af",
    light: "#dbeafe",
  },

  // Semantic Colors
  semantic: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },

  // Borders & Dividers
  border: {
    light: "#e2e8f0",
    dark: "#cbd5e1",
    primary: "#2563EB",
  },
} as const;

// Utility function to get color by path
export function getColor(path: string): string {
  const keys = path.split(".");
  let value: any = colors;
  for (const key of keys) {
    value = value[key];
  }
  return value;
}
