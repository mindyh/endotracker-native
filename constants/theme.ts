// Centralized theme constants for EndoTracker
export const COLORS = {
    // Primary brand colors
    primary: "#4a7c59",
    primaryDark: "#2d5a3d",
    primaryLight: "#a3d5b7",
    primaryBackground: "#f8fdf9",

    // Neutral colors
    white: "#ffffff",
    black: "#000000",

    // Gray scale
    gray50: "#f9fafb",
    gray100: "#f3f4f6",
    gray200: "#e5e7eb",
    gray300: "#d1d5db",
    gray400: "#9ca3af",
    gray500: "#6b7280",
    gray600: "#4b5563",
    gray700: "#374151",
    gray800: "#1f2937",
    gray900: "#111827",

    // Status colors
    success: "#059669",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#2563eb",

    // Background colors
    background: "#4a7c59",
    surface: "#ffffff",
    inactive: "#9ca3af",

    // Semantic colors
    neutral: "#e5e7eb",
    accent: "#2563eb",

    // Text colors
    textPrimary: "#1f2937",
    textSecondary: "#374151",
    textTertiary: "#9ca3af",
} as const;

export const SHADOWS = {
    small: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    medium: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    large: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
} as const;

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
} as const;

export const BORDER_RADIUS = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 999,
} as const;

export const FONT_SIZES = {
    xs: 12,
    sm: 13,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 22,
    xxxl: 24,
    xxxxl: 28,
} as const;

export const FONT_WEIGHTS = {
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
};