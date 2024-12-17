# TASK: O1 PRO - Unify SimplyMaid Core Architecture


core/appconfig.ts
/**
 * @file appconfig.ts
 * @version 6.3.2
 * @license MIT
 *
 * @description
 * Central configuration with integrated brand colors and semantic naming.
 * Uses schemas from `apporigin.ts` to ensure type safety and validation.
 *
 * @llm-helpers
 * - Update feature flags or advancedConfig as needed.
 * - Adjust theme colors and semantic tuples to match brand identity.
 */

import { appConfigSchema, AppConfigData, validationUtils } from "@/core/apporigin"

const configData: AppConfigData = {
  featureFlags: {
    enablePersonalization: false,
    enableABTesting: false,
    enableAIContent: true,
    enableMarketIntelligence: false,
    enableAdvancedSEO: true,
    enableCompetitorCrawling: true,
    enableVectorSEO: false,
    enableLeadFunnels: true,
    enableMultiRegionDeploy: false,
    enableMicrofrontends: false,
    enableEmailAutomation: true,
    enableN8nWorkflows: false,
    enableProgrammaticSEO: true,
    enableContentClustering: true,
    enableSharedSections: true,
    enableRoutePersonalization: false,
    enableLocalizationSEO: true,
    enableAdvancedCompetitorAnalysis: true,
    enableRecentlyCleaned: false,
    enableProviderFlow: false
  },
  theme: {
    colors: {
      primary: { hue: 273, saturation: 83, lightness: 60 },    // hsl(273,83%,60%) Purple
      secondary: { hue: 335, saturation: 85, lightness: 65 },  // hsl(335,85%,65%) Pink Accent
      neutral: { hue: 273, saturation: 6, lightness: 32 },     // A neutral dark tone
      semantic: {
        background: [0,0,100],              // hsl(0,0%,100%) white background
        foreground: [273,45,15],            // hsl(273,45%,15%) dark text
        accent: [273,60,97],                // hsl(273,60%,97%) subtle accent
        muted: [273,60,97],                 // hsl(273,60%,97%) muted backgrounds
        destructive: [350,84,60],           // hsl(350,84%,60%) red for errors
        border: [273,30,92],                // hsl(273,30%,92%) light border
        input: [273,30,92],                 // same as border
        ring: [273,83,60],                  // hsl(273,83%,60%) purple ring
        card: [0,0,100],                    // white card backgrounds
        popover: [0,0,100],                 // white popovers
        cardForeground: [273,45,15],        // dark text on card
        popoverForeground: [273,45,15],     // dark text on popover
        primaryForeground: [210,40,98],     // light text for primary
        secondaryForeground: [222.2,47.4,11.2], 
        mutedForeground: [215.4,16.3,46.9],
        accentForeground: [222.2,47.4,11.2],
        destructiveForeground: [210,40,98]
      },
      sidebar: {
        background: [0,0,98],               // Almost white background
        foreground: [240,5.3,26.1],         // Dark text
        primary: [240,5.9,10],              // Very dark blue/gray
        primaryForeground: [0,0,98],        // Light text on primary
        accent: [240,4.8,95.9],             // Very light blue/gray
        accentForeground: [240,5.9,10],     // Dark text on accent
        border: [220,13,91],                // Light border
        ring: [217.2,91.2,59.8]            // Focus ring color
      },
      chart: {
        '1': [12,76,61],                    // Green
        '2': [173,58,39],                   // Red
        '3': [197,37,24],                   // Orange
        '4': [43,74,66],                    // Teal
        '5': [27,87,67]                     // Blue
      }
    },
    spacing: {
      base:16,
      scale:1.5,
      fluid:{ min:0.5, max:1.5 }
    },
    typography: {
      baseSize:16,
      scaleRatio:1.25,
      fluid:{ minVw:320, maxVw:1280 }
    },
    containers: {
      maxWidth:{ sm:640, md:768, lg:1024, xl:1280 },
      padding:{ sm:16, md:24, lg:32 }
    },
    motion: {
      duration:{ instant:50, fast:100, normal:200, slow:300 },
      easing:{ default:'cubic-bezier(0.4,0,0.2,1)', in:'cubic-bezier(0.4,0,1,1)', out:'cubic-bezier(0,0,0.2,1)' }
    },
    darkMode: false,
    prefersReducedMotion: false
  },
  advancedConfig: {
    seo: {
      internalLinking: { enabled:true, strategy:'cluster-based' },
      schemaEnhancements: ['FAQ','LocalBusiness'],
      vectorSEO: {
        enabled:false,
        embeddingModel:'text-embedding-model',
        vectorDB:'pinecone',
        clusterStrategy:'semantic'
      },
      programmaticSEO: {
        enabled:true,
        routeRules:[{ 
          pattern:"/:city/:service", 
          type:"dynamic", 
          generateFrom:"locations", 
          aiInstructions:"Generate city-service pages using AI"
        }],
        localization:true,
        contentClusters:[
          { clusterId:"cleaning-hub", label:"Cleaning Hub", description:"Cluster of cleaning guides", sectionRefs:[] }
        ],
        sharedSections:[],
        multilingualSupport:[ { lang:'en', alternateLinks:{'fr':'/fr/home','zh':'/zh/home'} } ]
      }
    },
    aiContent: {
      enabled:true,
      provider:'openai',
      model:'gpt-4',
      fallback:true,
      promptTemplates:{
        'rewriteSection':'Rewrite this section focusing on local relevance',
        'faqRefinement':'Refine these FAQs using GSC queries and transcripts'
      },
      contentPolicies:['No duplicate content','Maintain brand voice'],
      competitorAwareContent:true,
      localizationSupport:true
    },
    competitorAnalysis: {
      enabled:true,
      sources:['semrush','serpApi','searchConsole'],
      frequency:'weekly',
      metrics:{ trackSERP:true, trackBacklinks:false, trackLocalCompetitors:true }
    }
  }
}

const validatedConfig = validationUtils.validateSafely(appConfigSchema, configData, 'ERR_CONFIG')
export const globalAppConfig = Object.freeze(validatedConfig)



core/apporigin.ts

/**
 * @file apporigin.ts
 * @version 6.3.0
 * @license MIT
 *
 * @mermaid
 * graph TD
 *   A[apporigin.ts] --> B[Feature Flags]
 *   A --> C[Theme & Design System]
 *   A --> D[Localization & Multilingual SEO]
 *   A --> E[Content Clusters & Shared Sections]
 *   A --> F[Route Handling & Dynamic Generation]
 *   A --> G[Vector SEO & AI Capabilities]
 *   A --> H[Competitor Analysis Config]
 *   A --> I[SEO Enhancements]
 *   A --> J[Advanced Config]
 *   A --> K[Fields & Sections]
 *   A --> L[Page Schema]
 *   A --> M[Auth Schema]
 *   A --> N[Validation & Errors]
 *   A --> O[Type Guards]
 *   A --> P[Section Registry & Page Builder]
 *   A --> Q[Caching & Performance]
 *   A --> R[Migrations]
 *
 * @description
 * `apporigin.ts` defines all core schemas, types, and utilities for SimplyMaid's configuration-driven architecture.
 * This file integrates features from previous iterations (v3.4, v6.0, v6.1) into a unified schema.
 * LLMs can rely on these schemas for code generation and safe transformations.
 *
 * @llm-helpers
 * - Use JSDoc comments and section headings to locate relevant schemas.
 * - Refer to naming conventions and usage notes in each section for consistent data shaping.
 * - Merge code suggestions with these schemas to ensure runtime-safe code.
 *
 * @namingconventions
 * - Schemas: `SomethingSchema`
 * - Types: `SomethingConfig`, `FeatureFlags`, `Page`, `Section`, etc.
 * - Utilities: `somethingUtils`
 * - Classes: `SomethingError`
 *
 * @tableofcontents
 * 1. [Constants & Versions](#constants--versions)
 * 2. [Utilities & Types](#utilities--types)
 * 3. [Feature Flags](#feature-flags)
 * 4. [Theme & Design System](#theme--design-system)
 * 5. [Localization & Multilingual SEO](#localization--multilingual-seo)
 * 6. [Content Clusters & Shared Sections](#content-clusters--shared-sections)
 * 7. [Route Handling & Dynamic Generation](#route-handling--dynamic-generation)
 * 8. [Vector SEO & AI Capabilities](#vector-seo--ai-capabilities)
 * 9. [Competitor Analysis Config](#competitor-analysis-config)
 * 10. [SEO Enhancements](#seo-enhancements)
 * 11. [Advanced Config](#advanced-config)
 * 12. [Fields & Sections](#fields--sections)
 * 13. [Page Schema](#page-schema)
 * 14. [Auth Schema](#auth-schema)
 * 15. [Validation & Errors](#validation--errors)
 * 16. [Type Guards](#type-guards)
 * 17. [Section Registry & Page Builder](#section-registry--page-builder)
 * 18. [Caching & Performance](#caching--performance)
 * 19. [Migrations](#migrations)
 */

import { z } from 'zod'
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// =============================================================================
// 1. Constants & Versions
// =============================================================================
/**
 * @section Constants & Versions
 * @description Holds application and schema version info.
 * @namingconventions
 * - `APP_VERSION`: current app version
 * - `SCHEMA_VERSION`: current schema version
 * @mermaid
 * graph LR
 *   A[APP_VERSION] --> B[SCHEMA_VERSION]
 */
export const APP_VERSION = '6.3.0' as const
export const SCHEMA_VERSION = '4.0.0' as const

// =============================================================================
// 2. Utilities & Types
// =============================================================================
/**
 * @section Utilities & Types
 * @description Basic utility types and functions (cn, WithRequired, Nullable, DeepPartial).
 * @namingconventions
 * - Utility types: PascalCase (WithRequired, Nullable, DeepPartial)
 * - Utility functions: camelCase (cn)
 * @mermaid
 * graph LR
 *   A[cn(...inputs)] --> B[Class Merging]
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
export type Nullable<T> = T | null
export type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] }

// =============================================================================
// 3. Feature Flags
// =============================================================================
/**
 * @section Feature Flags
 * @description Toggles for enabling/disabling major site features.
 * @llm-helpers
 * - Enable flags before generating code dependent on them.
 * @mermaid
 * graph LR
 *   A[featureFlagsSchema] -->|conditional| CodePaths
 */
export const featureFlagsSchema = z.object({
  enablePersonalization: z.boolean().default(false),
  enableABTesting: z.boolean().default(false),
  enableAIContent: z.boolean().default(false),
  enableMarketIntelligence: z.boolean().default(false),
  enableAdvancedSEO: z.boolean().default(false),
  enableCompetitorCrawling: z.boolean().default(false),
  enableVectorSEO: z.boolean().default(false),
  enableLeadFunnels: z.boolean().default(false),
  enableMultiRegionDeploy: z.boolean().default(false),
  enableMicrofrontends: z.boolean().default(false),
  enableEmailAutomation: z.boolean().default(false),
  enableN8nWorkflows: z.boolean().default(false),
  enableProgrammaticSEO: z.boolean().default(false),
  enableContentClustering: z.boolean().default(false),
  enableSharedSections: z.boolean().default(false),
  enableRoutePersonalization: z.boolean().default(false),
  enableLocalizationSEO: z.boolean().default(false),
  enableAdvancedCompetitorAnalysis: z.boolean().default(false),
  enableRecentlyCleaned: z.boolean().default(false),
  enableProviderFlow: z.boolean().default(false)
}).strict()
export type FeatureFlags = z.infer<typeof featureFlagsSchema>

// =============================================================================
// 4. Theme & Design System
// =============================================================================
/**
 * @section Theme & Design System
 * @description Defines color groups, spacing, typography, containers, and motion tokens for UI.
 * @llm-helpers
 * - Use these tokens when generating styling code or Tailwind classes.
 * @mermaid
 * graph LR
 *   A[themeSchema] --> B[colors, spacing, typography, motion]
 */
const hueSchema = z.number().min(0).max(360).default(273)
const saturationSchema = z.number().min(0).max(100).default(83)
const lightnessSchema = z.number().min(0).max(100).default(60)

const colorGroupSchema = z.object({
  hue: hueSchema,
  saturation: saturationSchema,
  lightness: lightnessSchema
}).strict()

const spacingSchema = z.object({
  base: z.number().default(16),
  scale: z.number().default(1.5),
  fluid: z.object({ min: z.number().default(0.5), max: z.number().default(1.5) }).strict()
}).strict()

const typographySchema = z.object({
  baseSize: z.number().default(16),
  scaleRatio: z.number().default(1.25),
  fluid: z.object({ minVw: z.number().default(320), maxVw: z.number().default(1280) }).strict()
}).strict()

const containersSchema = z.object({
  maxWidth: z.object({ sm: z.number().default(640), md: z.number().default(768), lg: z.number().default(1024), xl: z.number().default(1280) }).strict(),
  padding: z.object({ sm: z.number().default(16), md: z.number().default(24), lg: z.number().default(32) }).strict()
}).strict()

const motionTokensSchema = z.object({
  duration: z.object({ instant: z.number().default(50), fast: z.number().default(100), normal: z.number().default(200), slow: z.number().default(300) }).strict(),
  easing: z.object({ default: z.string().default('cubic-bezier(0.4,0,0.2,1)'), in: z.string().default('cubic-bezier(0.4,0,1,1)'), out: z.string().default('cubic-bezier(0,0,0.2,1)') }).strict()
}).strict()

const semanticColorTuple = z.tuple([z.number(), z.number(), z.number()])

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
      popover: semanticColorTuple
    })
  }).strict(),
  spacing: spacingSchema,
  typography: typographySchema,
  containers: containersSchema,
  motion: motionTokensSchema,
  darkMode: z.boolean().default(false),
  prefersReducedMotion: z.boolean().default(false)
}).strict()
export type RawThemeConfig = z.infer<typeof themeSchema>

// =============================================================================
// 5. Localization & Multilingual SEO
// =============================================================================
/**
 * @section Localization & Multilingual SEO
 * @description Defines localeSchema for handling languages and alternate links.
 * @llm-helpers
 * - Adjust lang and region for i18n strategies.
 * @mermaid
 * graph LR
 *   A[localeSchema] --> B[multilingualSupport in advancedConfig]
 */
const localeSchema = z.object({
  lang: z.string().default('en'),
  region: z.string().optional(),
  alternateLinks: z.record(z.string(), z.string()).optional()
}).strict()

// =============================================================================
// 6. Content Clusters & Shared Sections
// =============================================================================
/**
 * @section Content Clusters & Shared Sections
 * @description contentClusterSchema groups related pages, sharedSectionSchema defines reusable sections.
 * @mermaid
 * graph LR
 *   A[contentClusterSchema] --> B[semantic linking]
 *   A --> C[sharedSectionSchema]
 */
const contentClusterSchema = z.object({
  clusterId: z.string(),
  label: z.string(),
  description: z.string().optional(),
  sectionRefs: z.array(z.string()).default([])
}).strict()

const sharedSectionSchema = z.object({
  id: z.string(),
  section: z.any() // replaced after sectionSchema definition
}).strict()

// =============================================================================
// 7. Route Handling & Dynamic Generation
// =============================================================================
/**
 * @section Route Handling & Dynamic Generation
 * @description routeRuleSchema defines patterns like "/:city/:service" for programmatic SEO pages.
 * @llm-helpers
 * - Use these rules to generate dynamic pages at runtime.
 * @mermaid
 * graph LR
 *   A[routeRuleSchema] --> B[programmaticSEO]
 */
const routeRuleSchema = z.object({
  pattern: z.string(),
  type: z.enum(['static','dynamic']),
  generateFrom: z.enum(['locations','services','clusters','aiGenerated']).optional(),
  aiInstructions: z.string().optional(),
}).strict()

// =============================================================================
// 8. Vector SEO & AI Capabilities
// =============================================================================
/**
 * @section Vector SEO & AI Capabilities
 * @description vectorSEOSchema & aiCapabilitiesSchema handle semantic embeddings and AI prompts.
 * @mermaid
 * graph LR
 *   A[vectorSEOSchema] --> B[aiCapabilitiesSchema]
 */
const vectorSEOSchema = z.object({
  enabled: z.boolean(),
  embeddingModel: z.string().default('text-embedding-model'),
  vectorDB: z.string().default('pinecone'),
  clusterStrategy: z.enum(['semantic','keyword','hybrid']).default('semantic')
}).strict().optional()

const aiCapabilitiesSchema = z.object({
  enabled: z.boolean(),
  provider: z.enum(['openai','custom']),
  model: z.string().default('gpt-4'),
  fallback: z.boolean().default(true),
  promptTemplates: z.record(z.string(), z.string()).optional(),
  contentPolicies: z.array(z.string()).default([]),
  competitorAwareContent: z.boolean().default(false),
  localizationSupport: z.boolean().default(false)
}).strict()

// =============================================================================
// 9. Competitor Analysis Config
// =============================================================================
/**
 * @section Competitor Analysis Config
 * @description competitorAnalysisSchema sets competitor crawling frequency and sources.
 * @mermaid
 * graph LR
 *   A[competitorAnalysisSchema] --> B[metrics trackSERP trackBacklinks]
 */
const competitorAnalysisSchema = z.object({
  enabled: z.boolean().default(false),
  sources: z.array(z.string()).default([]),
  frequency: z.enum(['daily','weekly','monthly']).default('weekly'),
  metrics: z.object({
    trackSERP: z.boolean().default(true),
    trackBacklinks: z.boolean().default(false),
    trackLocalCompetitors: z.boolean().default(true)
  }).strict()
}).strict()

// =============================================================================
// 10. SEO Enhancements
// =============================================================================
/**
 * @section SEO Enhancements
 * @description seoEnhancementsSchema integrates internalLinking, vectorSEO, programmaticSEO, and localization.
 * @llm-helpers
 * - Use internalLinking.strategy for link approach.
 * @mermaid
 * graph LR
 *   A[seoEnhancementsSchema] --> B[internalLinking]
 *   A --> C[programmaticSEO]
 */
const seoEnhancementsSchema = z.object({
  internalLinking: z.object({
    enabled: z.boolean(),
    strategy: z.enum(['keyword-based','cluster-based','ai-suggested'])
  }).strict(),
  schemaEnhancements: z.array(z.string()).optional(),
  vectorSEO: vectorSEOSchema,
  programmaticSEO: z.object({
    enabled: z.boolean().default(false),
    routeRules: z.array(routeRuleSchema).default([]),
    localization: z.boolean().default(false),
    contentClusters: z.array(contentClusterSchema).default([]),
    sharedSections: z.array(sharedSectionSchema).default([]),
    multilingualSupport: z.array(localeSchema).default([])
  }).strict()
}).strict()

// =============================================================================
// 11. Advanced Config
// =============================================================================
/**
 * @section Advanced Config
 * @description advancedConfigSchema blends SEO, AI, and competitor analysis settings.
 * @mermaid
 * graph TD
 *   A[advancedConfigSchema] --> seoEnhancementsSchema
 *   A --> aiCapabilitiesSchema
 *   A --> competitorAnalysisSchema
 */
const advancedConfigSchema = z.object({
  seo: seoEnhancementsSchema.optional(),
  aiContent: aiCapabilitiesSchema.optional(),
  competitorAnalysis: competitorAnalysisSchema.optional(),
}).strict()
export type AdvancedConfig = z.infer<typeof advancedConfigSchema>

// =============================================================================
// 12. Fields & Sections
// =============================================================================
/**
 * @section Fields & Sections
 * @description fieldSchema for atomic elements, sectionSchema for structured page sections.
 * @mermaid
 * graph LR
 *   A[fieldSchema] --> B[sectionSchema]
 */
const fieldFormatEnum = z.enum(['markdown','html'])
const fieldTypeEnum = z.enum(['text','richText','image','cta','form','service','aiPrompt'])

const aiPromptFieldSchema = z.object({
  id: z.string(),
  type: z.literal('aiPrompt'),
  template: z.string(),
  variables: z.record(z.string()).default({}),
  constraints: z.array(z.string()).default([]),
  expectedFormat: z.string().default('markdown'),
  fallbackStrategy: z.string().default('retry')
}).strict()

export const fieldSchema = z.discriminatedUnion('type', [
  z.object({ id: z.string(), type: z.literal('text'), value: z.string() }).strict(),
  z.object({ id: z.string(), type: z.literal('richText'), value: z.string(), format: fieldFormatEnum }).strict(),
  z.object({
    id: z.string(), type: z.literal('image'),
    src: z.string().url(), alt: z.string(),
    width: z.number().optional(), height: z.number().optional(),
    optimization: z.object({
      quality: z.number().optional(),
      format: z.enum(['webp','avif','jpeg']).optional(),
      sizes: z.array(z.string()).optional(),
      loading: z.enum(['eager','lazy']).optional()
    }).strict().optional()
  }).strict(),
  z.object({
    id: z.string(), type: z.literal('cta'),
    text: z.string(), href: z.string().url(),
    variant: z.enum(['primary','secondary','ghost']).optional(),
    size: z.enum(['sm','md','lg','icon']).optional(),
    icon: z.string().optional(),
    target: z.enum(['_blank','_self']).optional()
  }).strict(),
  z.object({
    id: z.string(), type: z.literal('form'),
    fields: z.array(z.object({
      name: z.string(), label: z.string(),
      type: z.enum(['text','email','tel','textarea']),
      required: z.boolean(),
      placeholder: z.string().optional()
    }).strict())
  }).strict(),
  z.object({
    id: z.string(), type: z.literal('service'),
    name: z.string(), description: z.string(),
    price: z.number(), duration: z.number(),
    image: z.string().url().optional()
  }).strict(),
  aiPromptFieldSchema
])
export type Field = z.infer<typeof fieldSchema>

const sectionTypeEnum = z.enum([
  'hero','text','form','gallery','services','aiGenerated','clusteredContent',
  'reviewsMarquee','howItWorks','ourServices','serviceLocations','pricingComparison','faq','bestRatedCleaners','leadCapture'
])

const sectionIntentEnum = z.enum(['default','primary','secondary','accent'])
const alignmentEnum = z.enum(['left','center','right'])
const componentSizeEnum = z.enum(['xs','sm','md','lg','xl','2xl'])
const containerSizeEnum = z.enum(['sm','md','lg','xl','full'])

export const sectionSchema = z.object({
  id: z.string(),
  type: sectionTypeEnum,
  fields: z.record(fieldSchema),
  style: z.object({
    intent: sectionIntentEnum.optional(),
    align: alignmentEnum.optional(),
    padding: componentSizeEnum.optional(),
    container: containerSizeEnum.optional()
  }).strict().optional(),
  tracking: z.object({
    id: z.string().optional(),
    events: z.array(z.object({ name: z.string(), data: z.record(z.unknown()).optional() }).strict()).optional()
  }).strict().optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    schema: z.object({ type: z.string(), data: z.record(z.unknown()) }).strict().optional()
  }).strict().optional()
}).strict()
export type Section = z.infer<typeof sectionSchema>

// Now that sectionSchema is defined, we can patch sharedSectionSchema
(sharedSectionSchema.shape.section as z.ZodTypeAny) = sectionSchema

// =============================================================================
// 13. Page Schema
// =============================================================================
/**
 * @section Page Schema
 * @description pageSchema defines full page structures with sections, meta, clusters, etc.
 * @mermaid
 * graph LR
 *   A[pageSchema] --> B[sections]
 *   A --> C[clusterRefs]
 *   A --> D[sharedSectionRefs]
 */
const pageTypeEnum = z.enum(['home','city','service','about','contact','blog','suburb','cluster','landing'])
const pageStatusEnum = z.enum(['draft','published','archived'])
const pagePriorityEnum = z.enum(['high','medium','low'])

export const pageSchema = z.object({
  id: z.string(),
  type: pageTypeEnum,
  slug: z.string(),
  status: pageStatusEnum.optional(),
  priority: pagePriorityEnum.optional(),
  meta: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url().optional(),
    schema: z.object({ type: z.string(), data: z.record(z.unknown()) }).strict().optional(),
    robots: z.object({ index: z.boolean().optional(), follow: z.boolean().optional(), imageIndex: z.boolean().optional() }).strict().optional()
  }).strict().optional(),
  sections: z.array(sectionSchema),
  navigation: z.unknown().optional(),
  locale: localeSchema.optional(),
  clusterRefs: z.array(z.string()).default([]),
  sharedSectionRefs: z.array(z.string()).default([])
}).strict()
export type Page = z.infer<typeof pageSchema>

// =============================================================================
// 14. Auth Schema
// =============================================================================
/**
 * @section Auth Schema
 * @description userProfileSchema and sessionSchema define user roles and session tokens.
 * @mermaid
 * graph LR
 *   A[userProfileSchema] --> B[sessionSchema]
 */
const userRoleEnum = z.enum(['admin','editor','viewer'])
export const userProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: userRoleEnum,
  permissions: z.object({
    pages: z.object({ create: z.boolean(), read: z.boolean(), update: z.boolean(), delete: z.boolean(), publish: z.boolean() }).strict(),
    sections: z.object({ create: z.boolean(), read: z.boolean(), update: z.boolean(), delete: z.boolean() }).strict(),
    analytics: z.object({ view: z.boolean(), export: z.boolean() }).strict()
  }).strict(),
  last_login: z.string().datetime().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
}).strict()
export type UserProfile = z.infer<typeof userProfileSchema>

export const sessionSchema = z.object({
  user: userProfileSchema,
  access_token: z.string(),
  refresh_token: z.string().optional(),
  expires_at: z.number().int().positive()
}).strict()
export type Session = z.infer<typeof sessionSchema>

// =============================================================================
// 15. Validation & Errors
// =============================================================================
/**
 * @section Validation & Errors
 * @description validationUtils for schema checks, ValidationError & SchemaError for reporting issues.
 * @mermaid
 * graph LR
 *   A[ValidationError] --> B[validationUtils.validateSafely]
 */
export class ValidationError extends Error {
  constructor(message: string, public code: string, public details?: unknown) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class SchemaError extends Error {
  constructor(message: string, public version: string, public details?: unknown) {
    super(message)
    this.name = 'SchemaError'
  }
}

export const validationUtils = {
  validateSafely<T>(schema: z.ZodType<T>, data: unknown, errorCode: string): T {
    const result = schema.safeParse(data)
    if (!result.success) {
      throw new ValidationError('Validation failed', errorCode, result.error.errors)
    }
    return result.data
  },
  validateContent(content: string, rules: { minLength?: number; maxLength?: number; requiredKeywords?: string[] }): boolean {
    if (rules.minLength && content.length < rules.minLength) return false
    if (rules.maxLength && content.length > rules.maxLength) return false
    if (rules.requiredKeywords && rules.requiredKeywords.some(kw => !content.includes(kw))) return false
    return true
  }
}

// =============================================================================
// 16. Type Guards
// =============================================================================
/**
 * @section Type Guards
 * @description Runtime checks to confirm data structures (e.g., isPage).
 * @mermaid
 * graph LR
 *   A[typeGuards] --> B[isPage, isSection, etc.]
 */
export const typeGuards = {
  isField: (data: unknown): data is Field => fieldSchema.safeParse(data).success,
  isSection: (data: unknown): data is Section => sectionSchema.safeParse(data).success,
  isPage: (data: unknown): data is Page => pageSchema.safeParse(data).success,
  isUserProfile: (data: unknown): data is UserProfile => userProfileSchema.safeParse(data).success,
  isSession: (data: unknown): data is Session => sessionSchema.safeParse(data).success,
}

// =============================================================================
// 17. Section Registry & Page Builder
// =============================================================================
/**
 * @section Section Registry & Page Builder
 * @description sectionRegistryUtils and pageBuilderUtils for dynamic composition of pages.
 * @mermaid
 * graph LR
 *   A[sectionRegistryUtils] --> B[Register/Get Sections]
 *   A --> C[pageBuilderUtils createPage createSection]
 */
export type SectionRegistryItem = {
  component: React.ComponentType<any>
  label: string
  icon: string
  description: string
  generateContent?: (variables: Record<string,string>) => Promise<string>
}
export type SectionRegistry = Record<string, SectionRegistryItem>
const _sectionRegistry: SectionRegistry = {}

export const sectionRegistryUtils = {
  register(type: string, item: SectionRegistryItem): void {
    if (_sectionRegistry[type]) throw new Error(`Section type ${type} already registered`)
    _sectionRegistry[type] = item
  },
  get(type: string): SectionRegistryItem {
    const item = _sectionRegistry[type]
    if (!item) throw new Error(`Section type ${type} not found`)
    return item
  },
  getAll(): SectionRegistry { return _sectionRegistry },
  has(type: string): boolean { return !!_sectionRegistry[type] }
}

export const pageBuilderUtils = {
  createSection(type: z.infer<typeof sectionTypeEnum>, fields: Record<string, Field> = {}): Section {
    if (!sectionRegistryUtils.has(type)) {
      throw new Error(`Cannot create section: type ${type} not found in registry`)
    }
    return { id: crypto.randomUUID(), type, fields }
  },
  createPage(type: z.infer<typeof pageTypeEnum>, slug: string): Page {
    return { id: crypto.randomUUID(), type, slug, sections: [] }
  }
}

// =============================================================================
// 18. Caching & Performance
// =============================================================================
/**
 * @section Caching & Performance
 * @description cacheUtils validate caching strategies, checks for expired entries.
 * @mermaid
 * graph LR
 *   A[cacheUtils] --> B[validateConfig validateEntry isExpired]
 */
const cacheConfigSchema = z.object({ maxSize: z.number().positive(), ttl: z.number().positive() }).strict()
const cacheEntrySchema = z.object({ key: z.string(), value: z.unknown(), expires: z.date() }).strict()

export const cacheUtils = {
  validateConfig(config: unknown) {
    const result = cacheConfigSchema.safeParse(config)
    if (!result.success) throw new SchemaError('Invalid cache config', SCHEMA_VERSION, result.error.errors)
    return result.data
  },
  validateEntry(entry: unknown) {
    const result = cacheEntrySchema.safeParse(entry)
    if (!result.success) throw new SchemaError('Invalid cache entry', SCHEMA_VERSION, result.error.errors)
    return result.data
  },
  isExpired(entry: z.infer<typeof cacheEntrySchema>): boolean {
    return Date.now() > entry.expires.getTime()
  }
}

// =============================================================================
// 19. Migrations
// =============================================================================
/**
 * @section Migrations
 * @description migrationUtils manage schema evolution over time.
 * @mermaid
 * graph LR
 *   A[migrationUtils] --> B[registerMigration migrateSchema]
 */
export type MigrationFn = (data: unknown) => unknown
export type MigrationRegistry = Record<string, MigrationFn>

export const migrationUtils = {
  migrations: {} as MigrationRegistry,
  registerMigration(fromVersion: string, fn: MigrationFn): void {
    this.migrations[fromVersion] = fn
  },
  migrateSchema(fromVersion: string, data: unknown): unknown {
    const migration = this.migrations[fromVersion]
    if (!migration) throw new SchemaError('No migration path found', fromVersion, { to: SCHEMA_VERSION })
    return migration(data)
  }
}

/**
 * @schema appConfigSchema
 * @description The main AppConfig schema integrating feature flags, theme, and advancedConfig.
 * Ensures advancedConfig is only provided if relevant feature flags are enabled.
 */
export const appConfigSchema = z.object({
  featureFlags: featureFlagsSchema,
  theme: themeSchema.optional(),
  advancedConfig: advancedConfigSchema.optional()
}).refine(data => {
  if (data.advancedConfig && !data.featureFlags.enableAdvancedSEO && !data.featureFlags.enableAIContent) {
    return false
  }
  return true
}, {
  message: 'Advanced config provided without enabling relevant feature flags'
})

export type AppConfigData = z.infer<typeof appConfigSchema>


hooks/use-mobile.tsx
 import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

hooksa/use-toast.ts
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

providers/themeProvider.tsx
// providers/themeProvider.tsx
"use client"
import React, { useEffect } from "react"
import { globalAppConfig } from "@/core/appconfig"
import { RawThemeConfig } from "@/core/apporigin"
import { createFluidTypeScale, createFluidSpaceScale, createFluidValue } from "@/utils/fluid-theme"

function createCSSVariables(theme: RawThemeConfig) {
  const { typography, spacing, containers, colors, motion, prefersReducedMotion } = theme
  const { minVw: tMinVw, maxVw: tMaxVw } = typography.fluid

  // Helpers
  const toHSL = ([h,s,l]: number[]) => `hsl(${h} ${s}% ${l}%)`

  // Fluid scales
  const typeScale = createFluidTypeScale(tMinVw, tMaxVw, typography.baseSize, typography.baseSize * typography.scaleRatio)
  const spaceScale = createFluidSpaceScale(tMinVw, tMaxVw, spacing.base, spacing.base * spacing.scale)

  // Containers
  const containerValues = {
    '--container-sm': createFluidValue(containers.maxWidth.sm, containers.maxWidth.md, tMinVw, tMaxVw),
    '--container-md': createFluidValue(containers.maxWidth.md, containers.maxWidth.lg, tMinVw, tMaxVw),
    '--container-lg': createFluidValue(containers.maxWidth.lg, containers.maxWidth.xl, tMinVw, tMaxVw),
    '--container-xl': createFluidValue(containers.maxWidth.xl, containers.maxWidth.xl, tMinVw, tMaxVw)
  }

  // Motion tokens
  const motionTokens = {
    '--motion-instant': prefersReducedMotion ? '0ms' : `${motion.duration.instant}ms`,
    '--motion-fast': prefersReducedMotion ? '0ms' : `${motion.duration.fast}ms`,
    '--motion-normal': prefersReducedMotion ? '0ms' : `${motion.duration.normal}ms`,
    '--motion-slow': prefersReducedMotion ? '0ms' : `${motion.duration.slow}ms`,
    '--motion-ease-default': prefersReducedMotion ? 'linear' : motion.easing.default,
    '--motion-ease-in': prefersReducedMotion ? 'linear' : motion.easing.in,
    '--motion-ease-out': prefersReducedMotion ? 'linear' : motion.easing.out
  }

  const {
    background, foreground, accent, muted, destructive, border, input, ring, card, popover,
    cardForeground, popoverForeground, primaryForeground, secondaryForeground, mutedForeground, accentForeground, destructiveForeground
  } = colors.semantic

  const semanticColors = {
    '--background': toHSL(background),
    '--foreground': toHSL(foreground),
    '--accent': toHSL(accent),
    '--muted': toHSL(muted),
    '--destructive': toHSL(destructive),
    '--border': toHSL(border),
    '--input': toHSL(input),
    '--ring': toHSL(ring),
    '--card': toHSL(card),
    '--popover': toHSL(popover),
    '--card-foreground': toHSL(cardForeground),
    '--popover-foreground': toHSL(popoverForeground),
    '--primary-foreground': toHSL(primaryForeground),
    '--secondary-foreground': toHSL(secondaryForeground),
    '--muted-foreground': toHSL(mutedForeground),
    '--accent-foreground': toHSL(accentForeground),
    '--destructive-foreground': toHSL(destructiveForeground)
  }

  const {
    background: sidebarBackground,
    foreground: sidebarForeground,
    primary: sidebarPrimary,
    primaryForeground: sidebarPrimaryForeground,
    accent: sidebarAccent,
    accentForeground: sidebarAccentForeground,
    border: sidebarBorder,
    ring: sidebarRing
  } = colors.sidebar

  const sidebarColors = {
    '--sidebar-background': toHSL(sidebarBackground),
    '--sidebar-foreground': toHSL(sidebarForeground),
    '--sidebar-primary': toHSL(sidebarPrimary),
    '--sidebar-primary-foreground': toHSL(sidebarPrimaryForeground),
    '--sidebar-accent': toHSL(sidebarAccent),
    '--sidebar-accent-foreground': toHSL(sidebarAccentForeground),
    '--sidebar-border': toHSL(sidebarBorder),
    '--sidebar-ring': toHSL(sidebarRing)
  }

  const {
    '1': chart1,
    '2': chart2,
    '3': chart3,
    '4': chart4,
    '5': chart5
  } = colors.chart

  const chartColors = {
    '--chart-1': toHSL(chart1),
    '--chart-2': toHSL(chart2),
    '--chart-3': toHSL(chart3),
    '--chart-4': toHSL(chart4),
    '--chart-5': toHSL(chart5)
  }

  return {
    ...Object.entries(typeScale).reduce((acc, [k, v]) => {
      acc[`--font-${k}`] = v
      return acc
    }, {} as Record<string, string>),
    ...Object.entries(spaceScale).reduce((acc, [k, v]) => {
      acc[`--space-${k}`] = v
      return acc
    }, {} as Record<string, string>),
    ...containerValues,
    ...motionTokens,
    '--container-padding': 'var(--space-base)',
    ...semanticColors,
    ...sidebarColors,
    ...chartColors
  }
}

export const ThemeProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
  if (!globalAppConfig.theme) {
    throw new Error('Theme configuration is required but was not found in globalAppConfig')
  }

  const theme = globalAppConfig.theme as RawThemeConfig

  useEffect(() => {
    const root = document.documentElement
    const vars = createCSSVariables(theme)
    for (const [prop, val] of Object.entries(vars)) {
      root.style.setProperty(prop, val)
    }

    if (theme.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return <>{children}</>
}


utils/fluid-theme.ts
// utils/fluid-theme.ts
/**
 * @file fluid-theme.ts
 * @description Utilities for creating fluid typography, spacing, and container values.
 * @llm-helpers
 * - Create fluid values using createFluidValue for typography, spacing, containers.
 */

/**
 * @function createFluidValue
 * @description Generate a clamp(...) expression for a fluid value between min and max sizes across a viewport range.
 * @param {number} min - Minimum value at minVw
 * @param {number} max - Maximum value at maxVw
 * @param {number} minVw - Minimum viewport width
 * @param {number} maxVw - Maximum viewport width
 * @param {"px"|"rem"} unit - Unit of measurement
 * @returns {string} A CSS clamp(...) string
 */
export function createFluidValue(
    min: number,
    max: number,
    minVw: number,
    maxVw: number,
    unit: 'px' | 'rem' = 'px'
  ): string {
    const slope = (max - min) / (maxVw - minVw)
    const yAxisIntersection = min - slope * minVw
  
    const minValue = unit === 'rem' ? min / 16 : min
    const maxValue = unit === 'rem' ? max / 16 : max
    const yAxisIntersectionUnit = unit === 'rem' ? (yAxisIntersection / 16) : yAxisIntersection
  
    return `clamp(${minValue}${unit}, ${yAxisIntersectionUnit}${unit} + ${slope * 100}vw, ${maxValue}${unit})`
  }
  
  /**
   * @function createFluidTypeScale
   * @description Create a fluid typography scale based on a base size and ratio.
   * @param {number} minVw - Min viewport width
   * @param {number} maxVw - Max viewport width
   * @param {number} baseMin - Min base size (px)
   * @param {number} baseMax - Max base size (px)
   * @param {number} ratio - Scale ratio for heading sizes
   * @returns {Record<string,string>} A map of size keys to clamp() CSS strings
   */
  export function createFluidTypeScale(
    minVw: number,
    maxVw: number,
    baseMin: number,
    baseMax: number,
    ratio: number = 1.25
  ): Record<string, string> {
    return {
      xs: createFluidValue(baseMin * 0.75, baseMax * 0.75, minVw, maxVw, 'rem'),
      sm: createFluidValue(baseMin * 0.875, baseMax * 0.875, minVw, maxVw, 'rem'),
      base: createFluidValue(baseMin, baseMax, minVw, maxVw, 'rem'),
      lg: createFluidValue(baseMin * ratio, baseMax * ratio, minVw, maxVw, 'rem'),
      xl: createFluidValue(baseMin * ratio * ratio, baseMax * ratio * ratio, minVw, maxVw, 'rem'),
      "2xl": createFluidValue(baseMin * ratio**3, baseMax * ratio**3, minVw, maxVw, 'rem')
    }
  }
  
  /**
   * @function createFluidSpaceScale
   * @description Creates a fluid spacing scale between min and max.
   * @param {number} minVw - Min viewport width
   * @param {number} maxVw - Max viewport width
   * @param {number} baseMin - Minimum base spacing (px)
   * @param {number} baseMax - Maximum base spacing (px)
   * @returns {Record<string,string>} A map of spacing keys to clamp() CSS strings
   */
  export function createFluidSpaceScale(
    minVw: number,
    maxVw: number,
    baseMin: number,
    baseMax: number
  ): Record<string, string> {
    return {
      xs: createFluidValue(baseMin * 0.25, baseMax * 0.25, minVw, maxVw),
      sm: createFluidValue(baseMin * 0.5, baseMax * 0.5, minVw, maxVw),
      base: createFluidValue(baseMin, baseMax, minVw, maxVw),
      lg: createFluidValue(baseMin * 2, baseMax * 2, minVw, maxVw),
      xl: createFluidValue(baseMin * 3, baseMax * 3, minVw, maxVw),
      "2xl": createFluidValue(baseMin * 4, baseMax * 4, minVw, maxVw),
    }
  }

components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/origin/apporigin",
    "ui": "@/components/ui",
    "lib": "@/origin/apporigin",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}

tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

cacade best practises to refine workflow and jsdoc with cascade best practises to improve our quality of life for development

# 🤖 Cascade LLM Guide
> Last Updated: 2024-12-17 09:02 AEDT  
> Version: 1.1.0

## Table of Contents
1. [Quick Start](#quick-start)
2. [Core Principles](#core-principles)
3. [Working with Large Files](#working-with-large-files)
4. [Common Workflows](#common-workflows)
5. [Advanced Features](#advanced-features)
6. [Documentation Management](#documentation-management)
7. [Best Practices](#best-practices)

## Version History
- 1.1.0 (2024-12-17)
  - Reorganized for clarity
  - Added Advanced Features
  - Improved large file handling
  - Added Documentation Management

## Quick Start
```typescript
// Copy at start of each chat:
"Hi Cascade, follow docs/cascade.md guidelines. Before proceeding:
1. Load and verify full context
2. Show identified sections
3. Confirm understanding"
```

## Core Principles

### 1. Context First
```typescript
// Always verify full context
view_file("file.ts", 0, 755)  // For files under 800 lines
// OR for larger files:
view_file("file.ts", 0, 700)  // Core section
view_file("file.ts", 701, 1400)  // Theme section
view_file("file.ts", 1401, END)  // Utils section
```

### 2. Smart Navigation
```typescript
// Find specific code
view_code_item("file.ts", "configItem")
related_files("file.ts")
codebase_search("purpose description")
```

### 3. Safe Editing
```typescript
// Make precise changes
edit_file({
  CodeEdit: `
{{ ... }}
// Your change here
{{ ... }}
  `
})
```

## Working with Large Files

### 1. File Organization
```typescript
/**
 * @section Core (0-700)
 * Types, configs, schemas
 */

/**
 * @section Features (701-1400)
 * Main functionality
 */

/**
 * @section Utils (1401+)
 * Helpers, exports
 */
```

### 2. Safety Protocol
- Verify full context first
- Make targeted changes
- Check dependencies
- Run tests
- Update documentation

## Power Features

### 1. Smart Search
```typescript
// Semantic search
codebase_search("feature purpose")

// Pattern search
grep_search({
  Query: "pattern",
  Includes: ["*.ts"],
  MatchPerLine: true
})
```

### 2. Command Running
```typescript
// Non-blocking (for servers)
run_command({
  Command: "npm",
  ArgsList: ["run", "dev"],
  Blocking: false
})

// Monitor output
command_status({
  CommandId: "cmd_123",
  OutputPriority: "split"
})
```

### 3. Directory Management
```typescript
// List contents
list_dir("src/")

// Find relationships
related_files("file.ts")
```

## Best Practices

### 1. File Size Guidelines
- **Optimal**: < 800 lines (single view)
- **Large**: 800-2000 lines (chunked view)
- **Extra Large**: 2000+ lines (sectioned view)

### 2. Making Changes
1. Verify context
2. Show target section
3. Explain changes
4. Make edits
5. Verify integrity

### 3. Documentation
- Clear section markers
- Type annotations
- Purpose comments
- Relationship notes

## Common Workflows

### 1. Configuration Updates
```typescript
"Update theme config:
1. view_code_item for current config
2. view_file for full context
3. edit_file with changes
4. run_command to test"
```

### 2. Feature Development
```typescript
"Add new feature:
1. related_files to check dependencies
2. view_file for context
3. edit_file for changes
4. verify with tests"
```

### 3. Refactoring
```typescript
"Refactor module:
1. codebase_search for usage
2. view_file for full context
3. edit_file with changes
4. run tests"
```

## Advanced Features

### 1. Smart Code Analysis
```typescript
// Semantic understanding
codebase_search({
  Query: "theme configuration logic",
  TargetDirectories: ["src/"]
})

// Find implementations
view_code_item("file.ts", "ThemeConfig")

// Track relationships
related_files("component.tsx")
```

### 2. Powerful Editing
```typescript
// Multiple non-adjacent edits
edit_file({
  CodeEdit: `
{{ ... }}
// First change
{{ ... }}
// Second change
{{ ... }}
  `
})

// Safe async operations
edit_file({
  Blocking: true,  // Wait for completion
  CodeEdit: "..."
})
```

### 3. Command Control
```typescript
// Non-blocking with error catch
run_command({
  Command: "npm",
  ArgsList: ["run", "dev"],
  Blocking: false,
  WaitMsBeforeAsync: 1000  // Wait 1s for errors
})

// Smart output monitoring
command_status({
  CommandId: "cmd_123",
  OutputPriority: "split",  // Show start/end
  OutputCharacterCount: 1000
})
```

### 4. Pattern Matching
```typescript
// Advanced grep with filters
grep_search({
  Query: "themeConfig",
  Includes: ["*.ts", "*.tsx"],
  MatchPerLine: true,
  CaseInsensitive: true
})
```

### 5. Safety Features
```typescript
// Auto-safe commands
run_command({
  Command: "npm",
  ArgsList: ["test"],
  SafeToAutoRun: true  // Safe commands run automatically
})

// Dependency tracking
related_files("component.tsx")  // Find all related files
```

### 6. Intelligent Navigation
```typescript
// Smart code jumping
view_code_item("file.ts", "ConfigClass.method")  // Jump to specific item
codebase_search("configuration validation")  // Find by purpose

// Directory analysis
list_dir("src/")  // Get full directory structure with sizes
```

## Documentation Management

### 1. Single Source Strategy
```typescript
// Before adding to docs:
1. view_file for full context
2. Analyze current structure
3. Merge similar concepts
4. Remove duplicates
5. Reorganize holistically

// Example workflow:
"Update documentation:
1. Load entire doc
2. Identify duplicate sections
3. Merge related concepts
4. Restructure for clarity
5. Verify no information lost"
```

### 2. Document Organization
```typescript
// Structure Pattern
1. Quick Start (essential info)
2. Core Concepts (fundamentals)
3. Detailed Guides (specifics)
4. Advanced Features (power use)
5. Examples (practical use)

// Section Guidelines
- Keep related info together
- Progressive complexity
- Clear hierarchies
- No duplication
```

### 3. Maintenance Rules
```typescript
// When adding content:
1. Check existing sections first
2. Merge with similar content
3. Restructure if needed
4. Update table of contents

// When removing content:
1. Verify no critical info lost
2. Update related sections
3. Maintain document flow
4. Check all references
```

## Pro Tips & Hidden Features

### 1. Smart File Viewing
```typescript
// View specific code items without line numbers
view_code_item("src/origin/apporigin.ts", "themeConfig")

// Find related files automatically
related_files("src/origin/apporigin.ts")

// Search semantically (by purpose, not just text)
codebase_search("theme configuration logic", ["src/"])
```

### 2. Efficient Command Running
```typescript
// Non-blocking commands (for servers/watch processes)
run_command({
  Command: "npm",
  ArgsList: ["run", "dev"],
  Blocking: false,
  WaitMsBeforeAsync: 1000  // Wait 1s for potential errors
})

// Get command output with priority
command_status({
  CommandId: "cmd_123",
  OutputPriority: "split",  // Shows start and end of output
  OutputCharacterCount: 1000
})
```

### 3. Pattern Searching
```typescript
// Fast grep-style search with file type filtering
grep_search({
  Query: "themeConfig",
  Includes: ["*.ts", "*.tsx"],
  MatchPerLine: true,
  CaseInsensitive: true
})
```

### 4. Directory Intelligence
```typescript
// List directory with size and children count
list_dir("src/origin")

// Smart file relationships
related_files("src/origin/apporigin.ts")
```

### 5. Edit File Tricks
```typescript
// Keep unchanged code with placeholders
edit_file({
  CodeEdit: `
{{ ... }}
export const newConfig = {
  // new code here
}
{{ ... }}
  `
})

// Multiple non-adjacent edits in one call
edit_file({
  CodeEdit: `
{{ ... }}
// First change
{{ ... }}
// Second change
{{ ... }}
  `
})
```

### 6. Safety Features
```typescript
// Auto-safe commands
run_command({
  Command: "npm",
  ArgsList: ["run", "test"],
  SafeToAutoRun: true  // Safe commands run automatically
})

// Blocking edits for verification
edit_file({
  Blocking: true  // Wait for edit to complete
})
```

## Common Issues

### 1. Context Truncation
```typescript
// Problem: Partial view
edit_file("changing something")

// Solution: Full context
view_file(0, end)
edit_file("specific change")
```

### 2. Type Safety
```typescript
// Problem: Lost types
const config = {}

// Solution: Schema validation
const config = validateSafely(configSchema, data)
```

### 3. Documentation
```typescript
// Problem: Unclear purpose
function doThing() {}

// Solution: LLM-friendly docs
/**
 * @function doThing
 * @description Clear purpose
 * @llm-helpers Tips for LLM interaction
 */
function doThing() {}
```

## Version Control

Track changes to this guide in the format:
```markdown
### Recent Updates
- [HH:MM AEDT] DEC-XX - Brief change description


# TASK: O1 PRO - Unify SimplyMaid Core Architecture

## Overview
Unify and optimize the following files into a dual-file architecture:
- Source Files:
  - `apporigin.ts`
  - `appconfig.ts`
  - `fluid-theme.ts`
  - `theme-provider.tsx`
  - `tailwind.config.ts`
  - `components.json`
  - `globals.css`
  - `use-mobile.tsx`
  - `use-toast.tsx`

Target Architecture:
1. `origincore.ts`: Core system and configuration
2. `origintheme.ts`: Unified theme system

### Business Context
- **Market Position**
  - Leading house cleaning platform in Australia (www.simplymaid.com.au)
  - Operating in 7 major cities: Sydney, Melbourne, Brisbane, Adelaide, Canberra, Perth, Gold Coast
  - Current Revenue: $1.3M (Target: $3M by 2025)
  - previous Traffic: 15-20k monthly (currently 5k: 350 pages of exisitng low quality content on wordpress site we want to restore our seo and even beat our original traffic levels)

- **Primary Goals**
  1. Conversion Rate Optimization
     - Highly optimized booking flows
     - Mandatory lead capture with magic links
     - Omni-channel marketing (SMS, WhatsApp, Email)
     - LLM & Heygen AI integration for avatars and voice
     - Automated workflow optimization
     - Minimal human intervention

  2. Traffic Restoration & Growth
     - Restore 350k traffic from existing low-quality content
     - LLM-powered insights and content creation
     - Programmatic SEO with deep content clusters
     - Vector SEO and advanced schemas
     - GraphQL integration

  3. Content Management System
     - Dashboard for page and section models
     - AI prompt management
     - Automated content generation
     - Highly interconnected system
     - Performance analytics

- **Growth Strategy**
  - 350k contact list targeting
  - Omni-channel marketing
  - Waterfall data enrichment
  - Push notifications (web & mobile)
  - A/B testing
  - Hyper-personalization

- **Development Context**
  - Single no-code developer
  - Heavy reliance on LLM development
  - Focus on strong foundational architecture
  - Built for scale and maintainability

## Requirements

### Core Requirements
- **Context-Aware Architecture**
  - Single source of truth with smart navigation
  - Structured for optimal LLM comprehension
  - Comprehensive JSDoc with @cascade directives

- **Developer Experience**
  - Smart code navigation with section markers
  - Integrated LLM helper comments
  - Real-time type validation and hints

- **Documentation Standards**
  - @llm-helpers for common operations
  - @mermaid for visual architecture
  - @description with context boundaries
  - Section-based code organization
  - @version with semantic versioning
  - @changelog tracking major changes
  - @git-context for branch awareness

- **Version Control Integration**
  - Automated version bumping
  - Change tracking with @modified
  - Git commit message templates
  - Branch-aware documentation

- **Technical Foundation**
  - Next.js 15 App Router optimizations
  - Enterprise-grade Zod validation
  - Multi-region deployment (AU/US)
  - Advanced SEO with content clusters

- **Performance & Safety**
  - Smart chunking for large files
  - Safe editing protocols
  - Automated context verification

### Theme Unification
- Simplified color schema using HSL and semantic naming, cva
- Single theme configuration for:
  - Tailwind CSS
  - Shadcn UI
  - Page Builder
  - Dark Mode
  - next-themes v 0.4.4 https://www.npmjs.com/package/next-themes
- Developer ergonomics:
  - Intuitive color naming
  - Semantic variables
  - Fluid scaling
  - Real-time preview

### Technical Stack
- Next.js 15 (App Router)
- TypeScript 5.x (Strict)
- Tailwind CSS 3.4
- Shadcn UI
- Next-themes 0.4.x
- Zod Validation
- Edge Runtime
- Supabase Stack:
  - Auth & User Management
  - Database & Migrations
  - Edge Functions
  - Storage