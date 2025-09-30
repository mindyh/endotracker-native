// Centralized theme constants for EndoTracker
// Base palette
const PALETTE = {
    lightest: "#F1F2EB",
    light: "#D8DAD3",
    green: "#A4C2A5",
    darkGreen: "#566246",
    dark: "#4A4A48",
};

export const COLORS = {
    // Primary brand colors
    primary: PALETTE.darkGreen,
    primaryDark: PALETTE.dark,
    primaryLight: PALETTE.green,
    primaryBackground: PALETTE.lightest,

    // Neutral colors
    white: PALETTE.lightest,
    black: PALETTE.dark,

    // Gray scale (mapped to palette for consistency)
    gray50: PALETTE.lightest,
    gray100: PALETTE.light,
    gray200: PALETTE.light,
    gray300: PALETTE.green,
    gray400: PALETTE.green,
    gray500: PALETTE.darkGreen,
    gray600: PALETTE.darkGreen,
    gray700: PALETTE.dark,
    gray800: PALETTE.dark,
    gray900: PALETTE.dark,

    // Status colors (unchanged, but could be added to palette if desired)
    success: "#5ca98e",   // Softer green, blends with background
    warning: "#e6b86a",   // Muted gold, less saturated
    error: "#e57373",     // Soft red, less harsh
    info: "#5b8fd6",      // Muted blue, less vibrant

    // Background colors
    background: PALETTE.green,
    surface: PALETTE.lightest,
    inactive: PALETTE.darkGreen,

    // Semantic colors
    neutral: PALETTE.light,
    accent: PALETTE.darkGreen,

    // Text colors
    textPrimary: PALETTE.dark,
    textSecondary: PALETTE.darkGreen,
    textTertiary: PALETTE.green,
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