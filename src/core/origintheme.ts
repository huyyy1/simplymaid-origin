/**
 * @file origintheme.ts
 * @version 1.0.1
 * @license MIT
 *
 * @description
 * This file centralizes all theme-related logic for SimplyMaid:
 * - Defines `themeSchema` and `RawThemeConfig` used by `origincore.ts`.
 * - Provides fluid typography/spacing utilities.
 * - Offers `ThemeProvider` to apply CSS variables to the DOM based on the passed theme.
 *
 * @llm-helpers
 * - Keep all theme changes here to avoid context switching.
 * - `origincore.ts` imports `themeSchema`, but not the provider. You pass the theme where you mount your app.
 *
 * @cascade Optimized for Cascade/Windsurf IDE.
 *
 * @changelog
 * - 1.0.1: Fixed ThemeProvider fragment syntax, improved code formatting and organization.
 * - 1.0.0: Initial extraction of theme logic into separate file.
 */

import * as React from "react";
import { z } from "zod";

/* ========================================================================== */
/* Theme Schema                                                               */
/* ========================================================================== */
/**
 * @section Theme Schema
 * Defines the schema for theme configuration. `origincore.ts` imports this schema for validation.
 */
const hueSchema = z.number().min(0).max(360).default(273);
const saturationSchema = z.number().min(0).max(100).default(83);
const lightnessSchema = z.number().min(0).max(100).default(60);
const colorGroupSchema = z.object({ hue: hueSchema, saturation: saturationSchema, lightness: lightnessSchema }).strict();
const semanticColorTuple = z.tuple([z.number(), z.number(), z.number()]);

const spacingSchema = z.object({
  base: z.number().default(16),
  scale: z.number().default(1.5),
  fluid: z.object({ min: z.number().default(0.5), max: z.number().default(1.5) }).strict(),
}).strict();

const typographySchema = z.object({
  baseSize: z.number().default(16),
  scaleRatio: z.number().default(1.25),
  fluid: z.object({ minVw: z.number().default(320), maxVw: z.number().default(1280) }).strict(),
}).strict();

const containersSchema = z.object({
  maxWidth: z.object({
    sm: z.number().default(640),
    md: z.number().default(768),
    lg: z.number().default(1024),
    xl: z.number().default(1280),
  }).strict(),
  padding: z.object({
    sm: z.number().default(16),
    md: z.number().default(24),
    lg: z.number().default(32),
  }).strict(),
}).strict();

const motionTokensSchema = z.object({
  duration: z.object({
    instant: z.number().default(50),
    fast: z.number().default(100),
    normal: z.number().default(200),
    slow: z.number().default(300),
  }).strict(),
  easing: z.object({
    default: z.string().default("cubic-bezier(0.4,0,0.2,1)"),
    in: z.string().default("cubic-bezier(0.4,0,1,1)"),
    out: z.string().default("cubic-bezier(0,0,0.2,1)"),
  }).strict(),
}).strict();

export const themeSchema = z.object({
  colors: z.object({
    primary: colorGroupSchema,
    secondary: colorGroupSchema,
    neutral: colorGroupSchema,
    semantic: z.object({
      background: semanticColorTuple,
      foreground: semanticColorTuple,
      accent: semanticColorTuple,
      muted: semanticColorTuple,
      destructive: semanticColorTuple,
      border: semanticColorTuple,
      input: semanticColorTuple,
      ring: semanticColorTuple,
      card: semanticColorTuple,
      popover: semanticColorTuple,
      cardForeground: semanticColorTuple,
      popoverForeground: semanticColorTuple,
      primaryForeground: semanticColorTuple,
      secondaryForeground: semanticColorTuple,
      mutedForeground: semanticColorTuple,
      accentForeground: semanticColorTuple,
      destructiveForeground: semanticColorTuple,
    }).strict(),
    sidebar: z.object({
      background: semanticColorTuple,
      foreground: semanticColorTuple,
      primary: semanticColorTuple,
      primaryForeground: semanticColorTuple,
      accent: semanticColorTuple,
      accentForeground: semanticColorTuple,
      border: semanticColorTuple,
      ring: semanticColorTuple,
    }).strict(),
    chart: z.object({
      "1": semanticColorTuple,
      "2": semanticColorTuple,
      "3": semanticColorTuple,
      "4": semanticColorTuple,
      "5": semanticColorTuple,
    }).strict(),
  }).strict(),
  spacing: spacingSchema,
  typography: typographySchema,
  containers: containersSchema,
  motion: motionTokensSchema,
  darkMode: z.boolean().default(false),
  prefersReducedMotion: z.boolean().default(false),
}).strict();

export type RawThemeConfig = z.infer<typeof themeSchema>;

/* ========================================================================== */
/* Fluid Utilities                                                            */
/* ========================================================================== */
/**
 * @section Fluid Utilities
 * Utilities for creating fluid typography and spacing values.
 */
export function createFluidValue(
  min: number,
  max: number,
  minVw: number,
  maxVw: number,
  unit: "px" | "rem" = "px",
): string {
  const slope = (max - min) / (maxVw - minVw);
  const yAxisIntersection = min - slope * minVw;
  const minValue = unit === "rem" ? min / 16 : min;
  const maxValue = unit === "rem" ? max / 16 : max;
  const yAxisIntersectionUnit = unit === "rem" ? yAxisIntersection / 16 : yAxisIntersection;
  return `clamp(${minValue}${unit}, ${yAxisIntersectionUnit}${unit} + ${slope * 100}vw, ${maxValue}${unit})`;
}

export function createFluidTypeScale(
  minVw: number,
  maxVw: number,
  baseMin: number,
  baseMax: number,
  ratio: number = 1.25,
): Record<string, string> {
  const scale = {
    xs: -2,
    sm: -1,
    base: 0,
    lg: 1,
    xl: 2,
    "2xl": 3,
    "3xl": 4,
    "4xl": 5,
  };

  return Object.entries(scale).reduce((acc, [name, step]) => {
    const min = baseMin * Math.pow(ratio, step);
    const max = baseMax * Math.pow(ratio, step);
    acc[name] = createFluidValue(min, max, minVw, maxVw, "rem");
    return acc;
  }, {} as Record<string, string>);
}

export function createFluidSpaceScale(
  minVw: number,
  maxVw: number,
  baseMin: number,
  baseMax: number,
): Record<string, string> {
  const scale = {
    xs: 0.25,
    sm: 0.5,
    base: 1,
    lg: 1.5,
    xl: 2,
    "2xl": 2.5,
    "3xl": 3,
  };

  return Object.entries(scale).reduce((acc, [name, multiplier]) => {
    const min = baseMin * multiplier;
    const max = baseMax * multiplier;
    acc[name] = createFluidValue(min, max, minVw, maxVw);
    return acc;
  }, {} as Record<string, string>);
}

/* ========================================================================== */
/* Theme Provider                                                             */
/* ========================================================================== */
/**
 * @section Theme Provider
 * Applies CSS variables to the document root based on the given RawThemeConfig.
 */
function createCSSVariables(theme: RawThemeConfig) {
  const { typography, spacing, containers, colors, motion, prefersReducedMotion } = theme;
  const { minVw: tMinVw, maxVw: tMaxVw } = typography.fluid;

  const toHSL = ([h, s, l]: number[]) => `hsl(${h} ${s}% ${l}%)`;

  // Fluid scales
  const typeScale = createFluidTypeScale(tMinVw, tMaxVw, typography.baseSize, typography.baseSize * typography.scaleRatio);
  const spaceScale = createFluidSpaceScale(tMinVw, tMaxVw, spacing.base, spacing.base * spacing.scale);

  // Containers
  const containerValues = {
    "--container-sm": createFluidValue(containers.maxWidth.sm, containers.maxWidth.md, tMinVw, tMaxVw),
    "--container-md": createFluidValue(containers.maxWidth.md, containers.maxWidth.lg, tMinVw, tMaxVw),
    "--container-lg": createFluidValue(containers.maxWidth.lg, containers.maxWidth.xl, tMinVw, tMaxVw),
    "--container-xl": createFluidValue(containers.maxWidth.xl, containers.maxWidth.xl, tMinVw, tMaxVw),
  };

  // Motion tokens
  const motionTokens = {
    "--motion-instant": prefersReducedMotion ? "0ms" : `${motion.duration.instant}ms`,
    "--motion-fast": prefersReducedMotion ? "0ms" : `${motion.duration.fast}ms`,
    "--motion-normal": prefersReducedMotion ? "0ms" : `${motion.duration.normal}ms`,
    "--motion-slow": prefersReducedMotion ? "0ms" : `${motion.duration.slow}ms`,
    "--motion-ease-default": prefersReducedMotion ? "linear" : motion.easing.default,
    "--motion-ease-in": prefersReducedMotion ? "linear" : motion.easing.in,
    "--motion-ease-out": prefersReducedMotion ? "linear" : motion.easing.out,
  };

  const {
    background,
    foreground,
    accent,
    muted,
    destructive,
    border,
    input,
    ring,
    card,
    popover,
    cardForeground,
    popoverForeground,
    primaryForeground,
    secondaryForeground,
    mutedForeground,
    accentForeground,
    destructiveForeground,
  } = colors.semantic;

  // Semantic colors
  const semanticColors = {
    "--background": toHSL(background),
    "--foreground": toHSL(foreground),
    "--accent": toHSL(accent),
    "--muted": toHSL(muted),
    "--destructive": toHSL(destructive),
    "--border": toHSL(border),
    "--input": toHSL(input),
    "--ring": toHSL(ring),
    "--card": toHSL(card),
    "--popover": toHSL(popover),
    "--card-foreground": toHSL(cardForeground),
    "--popover-foreground": toHSL(popoverForeground),
    "--primary-foreground": toHSL(primaryForeground),
    "--secondary-foreground": toHSL(secondaryForeground),
    "--muted-foreground": toHSL(mutedForeground),
    "--accent-foreground": toHSL(accentForeground),
    "--destructive-foreground": toHSL(destructiveForeground),
  };

  // Sidebar colors
  const sidebarColors = {
    "--sidebar-background": toHSL(colors.sidebar.background),
    "--sidebar-foreground": toHSL(colors.sidebar.foreground),
    "--sidebar-primary": toHSL(colors.sidebar.primary),
    "--sidebar-primary-foreground": toHSL(colors.sidebar.primaryForeground),
    "--sidebar-accent": toHSL(colors.sidebar.accent),
    "--sidebar-accent-foreground": toHSL(colors.sidebar.accentForeground),
    "--sidebar-border": toHSL(colors.sidebar.border),
    "--sidebar-ring": toHSL(colors.sidebar.ring),
  };

  // Chart colors
  const chartColors = {
    "--chart-1": toHSL(colors.chart["1"]),
    "--chart-2": toHSL(colors.chart["2"]),
    "--chart-3": toHSL(colors.chart["3"]),
    "--chart-4": toHSL(colors.chart["4"]),
    "--chart-5": toHSL(colors.chart["5"]),
  };

  return {
    ...Object.entries(typeScale).reduce((acc, [k, v]) => {
      acc[`--font-${k}`] = v;
      return acc;
    }, {} as Record<string, string>),
    ...Object.entries(spaceScale).reduce((acc, [k, v]) => {
      acc[`--space-${k}`] = v;
      return acc;
    }, {} as Record<string, string>),
    ...containerValues,
    ...motionTokens,
    "--container-padding": "var(--space-base)",
    ...semanticColors,
    ...sidebarColors,
    ...chartColors,
  };
}

interface ThemeProviderProps {
  children: React.ReactNode;
  theme: RawThemeConfig;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => {
  React.useEffect(() => {
    const root = document.documentElement;
    const vars = createCSSVariables(theme);
    for (const [prop, val] of Object.entries(vars)) {
      root.style.setProperty(prop, val);
    }
    if (theme.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return children;
};
