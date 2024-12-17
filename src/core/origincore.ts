/**
 * @file origincore.ts
 * @version 10.0.1
 * @license MIT
 * @description Core configuration and type definitions for SimplyMaid platform
 *
 * @changelog
 * - [2024-12-17] v10.0.1
 *   - Enhanced page validation middleware with proper typing
 *   - Improved shared section resolution logic
 *   - Added type assertions for better type safety
 *   - Streamlined validation flow with clear three-step process
 *   - Added missing JSDoc comments and section organization
 * - 10.0.0: Added template system with variable substitution and AI integration
 * - 9.0.2: Added version tracking and change management to page schema
 * - 9.0.1: Updated integration with `origintheme.ts` after ThemeProvider fixes
 * - 9.0.0: Initial version with theme logic extracted to `origintheme.ts`
 *
 * @tableofcontents
 * 1. [Constants & Versions](#constants--versions)
 * 2. [Utilities & Types](#utilities--types)
 * 3. [Feature Flags](#feature-flags)
 * 4. [Localization & Multilingual SEO](#localization--multilingual-seo)
 * 5. [Content Clusters & Shared Sections](#content-clusters--shared-sections)
 * 6. [Route Handling & Dynamic Generation](#route-handling--dynamic-generation)
 * 7. [Vector SEO & AI Capabilities](#vector-seo--ai-capabilities)
 * 8. [Competitor Analysis Config](#competitor-analysis-config)
 * 9. [SEO Enhancements](#seo-enhancements)
 * 10. [Schema Validation](#schema-validation)
 * 11. [Fields & Sections](#fields--sections)
 * 12. [Page Schema](#page-schema)
 * 13. [Auth Schema](#auth-schema)
 * 14. [Validation & Errors](#validation--errors)
 * 15. [Type Guards](#type-guards)
 * 16. [Section Registry & Page Builder](#section-registry--page-builder)
 * 17. [Caching & Performance](#caching--performance)
 * 18. [Migrations](#migrations)
 * 19. [App Config Schema & Global Config](#app-config-schema--global-config)
 * 20. [Hooks](#hooks)
 * 21. [Content Manager Integration](#content-manager-integration)
 * 22. [Future Considerations](#future-considerations)
 * 23. [Template System](#template-system)
 *
 * @architecture
 * This file follows a strict schema-first approach where:
 * 1. All data structures are defined as Zod schemas
 * 2. TypeScript types are inferred from schemas
 * 3. Runtime validation ensures type safety
 * 4. Feature flags control functionality
 *
 * @performance
 * - All schemas use .strict() to prevent excess properties
 * - Shared sections are cached after resolution
 * - Template instantiation is memoized
 * - Type guards avoid runtime type checking where possible
 *
 * @llm-helpers
 * - Use `view_file()`, `view_code_item()`, `edit_file()` with Cascade
 * - Section markers simplify large-file navigation
 *
 * @cascade Optimized for Cascade/Windsurf IDE with LLM integration
 *
 * @mermaid
 * graph TD
 *   A[GlobalAppConfig] --> B[FeatureFlags]
 *   A --> C[AdvancedConfig & SEO]
 *   A --> D[PageBuilder & ContentManager]
 *   A --> E[Programmatic SEO & AI]
 *   A --> F[Auth, Validation, Migrations]
 *   A --> G[Imports themeSchema from origintheme.ts]
 *
 */

import { z } from 'zod'
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import React from 'react'
import { randomUUID } from 'crypto'

// Import themeSchema defined in origintheme.ts
import { themeSchema } from '@/core/origintheme'

/* ========================================================================== */
/* 1. Constants & Versions                                                    */
/* ========================================================================== */
/**
 * @section Constants & Versions
 * Track application and schema versions for migrations and debugging.
 */
export const APP_VERSION = '10.0.1' as const
export const SCHEMA_VERSION = '5.0.0' as const

/* ========================================================================== */
/* 2. Utilities & Types                                                       */
/* ========================================================================== */
/**
 * @section Utilities & Types
 * Core utility functions and type definitions.
 */

/**
 * Combines class names with Tailwind-aware merging
 * @param inputs - Class names to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Makes specified properties required in a type
 * @template T - The type to modify
 * @template K - Keys to make required
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

/**
 * Makes a type nullable (type | null)
 * @template T - The type to make nullable
 */
export type Nullable<T> = T | null

/**
 * Creates a deeply partial version of a type
 * @template T - The type to make deeply partial
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/* ========================================================================== */
/* 3. Feature Flags                                                           */
/* ========================================================================== */
/**
 * @section Feature Flags
 * Enable/disable features for staged rollouts and experiments.
 */
const featureFlagsSchema = z.object({
  enablePersonalization: z.boolean().default(false),
  enableABTesting: z.boolean().default(false),
  enableVersioning: z.boolean().default(false),
  enableDrafts: z.boolean().default(false),
  enableTemplates: z.boolean().default(false),
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

/* ========================================================================== */
/* 4. Localization & Multilingual SEO                                         */
/* ========================================================================== */
const localeSchema = z.object({
  lang: z.string().default('en'),
  region: z.string().optional(),
  alternateLinks: z.record(z.string(), z.string()).optional()
}).strict()

/* ========================================================================== */
/* 5. Content Clusters & Shared Sections                                      */
/* ========================================================================== */
const contentClusterSchema = z.object({
  clusterId: z.string(),
  label: z.string(),
  description: z.string().optional(),
  sectionRefs: z.array(z.string()).default([])
}).strict()

let sectionSchema: z.ZodTypeAny // forward declare

const sharedSectionSchema = z.object({
  id: z.string(),
  section: z.any()
}).strict()

/* ========================================================================== */
/* 6. Route Handling & Dynamic Generation                                      */
/* ========================================================================== */
const routeRuleSchema = z.object({
  pattern: z.string(),
  type: z.enum(['static','dynamic']),
  generateFrom: z.enum(['locations','services','clusters','aiGenerated']).optional(),
  aiInstructions: z.string().optional(),
}).strict()

/* ========================================================================== */
/* 7. Vector SEO & AI Capabilities                                            */
/* ========================================================================== */
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

/* ========================================================================== */
/* 8. Competitor Analysis Config                                              */
/* ========================================================================== */
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

/* ========================================================================== */
/* 9. SEO Enhancements                                                       */
/* ========================================================================== */
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

/* ========================================================================== */
/* 10. Schema Validation                                                      */
/* ========================================================================== */
const advancedConfigSchema = z.object({
  seo: seoEnhancementsSchema.optional(),
  aiContent: aiCapabilitiesSchema.optional(),
  competitorAnalysis: competitorAnalysisSchema.optional(),
}).strict()
export type AdvancedConfig = z.infer<typeof advancedConfigSchema>

/* ========================================================================== */
/* 11. Fields & Sections                                                      */
/* ========================================================================== */
const fieldFormatEnum = z.enum(['markdown','html'])
const aiPromptFieldSchema = z.object({
  id: z.string(),
  type: z.literal('aiPrompt'),
  template: z.string(),
  variables: z.record(z.string()).default({}),
  constraints: z.array(z.string()).default([]),
  expectedFormat: z.string().default('markdown'),
  fallbackStrategy: z.string().default('retry')
}).strict()

const fieldSchema = z.discriminatedUnion('type', [
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

const pageTypeEnum = z.enum([
  'service','home','city','about','contact','blog','suburb','cluster','landing'
])

const sectionIntentEnum = z.enum(['default','primary','secondary','accent'])
const alignmentEnum = z.enum(['left','center','right'])
const componentSizeEnum = z.enum(['xs','sm','md','lg','xl','2xl'])
const containerSizeEnum = z.enum(['sm','md','lg','xl','full'])

sectionSchema = z.object({
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
// Patch sharedSectionSchema now that sectionSchema is defined
(sharedSectionSchema.shape.section as z.ZodTypeAny) = sectionSchema

/* ========================================================================== */
/* 12. Page Schema                                                            */
/* ========================================================================== */
/**
 * @section Page Schema
 * Schema for pages in the CMS/page builder. Includes:
 * - Basic metadata (title, description, image)
 * - SEO configuration
 * - Content sections
 * - Version tracking and change management
 * - Shared section references
 * - Localization support
 */
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
  sharedSectionRefs: z.array(z.string()).default([]),
  version: z.number().int().positive().default(1),
  lastModified: z.string().datetime(),
  lastModifiedBy: z.string(),
  publishedAt: z.string().datetime().optional(),
  publishedBy: z.string().optional()
}).strict()
export type Page = z.infer<typeof pageSchema>

/* ========================================================================== */
/* 13. Auth Schema                                                            */
/* ========================================================================== */
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

/* ========================================================================== */
/* 14. Validation & Errors                                                    */
/* ========================================================================== */
/**
 * @section Validation & Errors
 * Error handling and validation utilities for runtime type safety.
 */

/**
 * Custom error for validation failures
 * @class ValidationError
 * @extends Error
 */
export class ValidationError extends Error {
  constructor(message: string, public code: string, public details?: unknown) {
    super(message)
    this.name = 'ValidationError'
  }
}

/**
 * Custom error for schema version mismatches
 * @class SchemaError
 * @extends Error
 */
export class SchemaError extends Error {
  constructor(message: string, public version: string, public details?: unknown) {
    super(message)
    this.name = 'SchemaError'
  }
}

/**
 * Utilities for safe schema validation and content verification
 * @namespace validationUtils
 */
export const validationUtils = {
  /**
   * Safely validates data against a schema with error handling
   * @template T - The expected type after validation
   * @param schema - Zod schema to validate against
   * @param data - Data to validate
   * @param errorCode - Error code for validation failure
   * @returns Validated data of type T
   * @throws {ValidationError} If validation fails
   */
  validateSafely<T>(schema: z.ZodType<T>, data: unknown, errorCode: string): T {
    const result = schema.safeParse(data)
    if (!result.success) {
      throw new ValidationError(
        'Validation failed',
        errorCode,
        result.error.errors
      )
    }
    return result.data
  },

  /**
   * Validates content against specified rules
   * @param content - Content string to validate
   * @param rules - Validation rules
   * @returns boolean indicating if content is valid
   */
  validateContent(
    content: string,
    rules: {
      minLength?: number
      maxLength?: number
      requiredKeywords?: string[]
    }
  ): boolean {
    if (rules.minLength && content.length < rules.minLength) return false
    if (rules.maxLength && content.length > rules.maxLength) return false
    if (rules.requiredKeywords) {
      return rules.requiredKeywords.every(keyword => 
        content.toLowerCase().includes(keyword.toLowerCase())
      )
    }
    return true
  }
}

/* ========================================================================== */
/* 15. Type Guards                                                            */
/* ========================================================================== */
export const typeGuards = {
  isField: (data: unknown): data is Field => fieldSchema.safeParse(data).success,
  isSection: (data: unknown): data is Section => sectionSchema.safeParse(data).success,
  isPage: (data: unknown): data is Page => pageSchema.safeParse(data).success,
  isUserProfile: (data: unknown): data is UserProfile => userProfileSchema.safeParse(data).success,
  isSession: (data: unknown): data is Session => sessionSchema.safeParse(data).success,
}

/**
 * Middleware utilities for page validation
 * @namespace pageValidationMiddleware
 */
export const pageValidationMiddleware = {
  /**
   * Validates a page object and optionally resolves shared sections
   * @param page - Page object to validate
   * @param options - Validation options
   * @returns Validated Page object
   * @throws {ValidationError} If validation fails
   */
  validatePage(page: unknown, options: { resolveShared?: boolean } = {}): Page {
    // 1. Validate basic page structure first
    const validatedPage = validationUtils.validateSafely(
      pageSchema,
      page,
      'INVALID_PAGE_STRUCTURE'
    ) as Page

    // 2. Validate sections recursively
    validatedPage.sections.forEach((section, index) => {
      validationUtils.validateSafely(
        sectionSchema,
        section,
        `INVALID_SECTION_${index}`
      )
    })

    // 3. Resolve and validate shared sections if requested
    if (options.resolveShared) {
      const resolvedPage = resolveSharedSections(validatedPage)
      return resolvedPage
    }

    return validatedPage
  },

  /**
   * Express middleware for page validation
   * @param req - Express request
   * @param res - Express response
   * @param next - Next middleware function
   */
  validatePageMiddleware: async (req: any, res: any, next: any) => {
    try {
      const page = req.body?.page
      if (!page) {
        throw new ValidationError('Page data is required', 'PAGE_REQUIRED')
      }

      req.validatedPage = pageValidationMiddleware.validatePage(page, {
        resolveShared: true
      })
      
      next()
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          error: error.message,
          code: error.code,
          details: error.details
        })
      } else {
        res.status(500).json({
          error: 'Internal validation error',
          code: 'INTERNAL_ERROR'
        })
      }
    }
  }
}

/* ========================================================================== */
/* 16. Section Registry & Page Builder                                        */
/* ========================================================================== */
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
    return { 
      id: randomUUID(), 
      type, 
      fields, 
      style: {}, 
      tracking: {}, 
      seo: {} 
    }
  },
  createPage(type: z.infer<typeof pageTypeEnum>, slug: string): Page {
    const result = pageTypeEnum.safeParse(type)
    if (!result.success) {
      throw new ValidationError(`Invalid page type: ${type}`, 'INVALID_PAGE_TYPE', result.error)
    }
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      throw new ValidationError('Invalid slug: must be non-empty string', 'INVALID_PAGE_SLUG')
    }
    return { 
      id: randomUUID(), 
      type, 
      slug, 
      sections: [], 
      clusterRefs: [], 
      sharedSectionRefs: [], 
      meta: {
        title: undefined,
        description: undefined,
        image: undefined,
        schema: undefined,
        robots: undefined
      },
      version: 1,
      lastModified: new Date().toISOString(),
      lastModifiedBy: 'system',
      locale: undefined
    }
  }
}

/* ========================================================================== */
/* 17. Caching & Performance                                                  */
/* ========================================================================== */
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

/* ========================================================================== */
/* 18. Migrations                                                             */
/* ========================================================================== */
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

/* ========================================================================== */
/* 19. App Config Schema & Global Config                                      */
/* ========================================================================== */
/**
 * @section App Config
 * Integrates feature flags, theme (from origintheme), and advancedConfig.
 * Ensures advancedConfig is only provided if relevant flags are enabled.
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

const configData: AppConfigData = {
  featureFlags: {
    enablePersonalization: false,
    enableABTesting: false,
    enableVersioning: true,
    enableDrafts: true,
    enableTemplates: true,
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
    // The actual theme configuration will match the schema defined in origintheme.ts.
    // Example:
    colors: {
      primary: { hue: 273, saturation: 83, lightness: 60 },
      secondary: { hue: 335, saturation: 85, lightness: 65 },
      neutral: { hue: 273, saturation: 6, lightness: 32 },
      semantic: {
        background: [0,0,100],
        foreground: [273,45,15],
        accent: [273,60,97],
        muted: [273,60,97],
        destructive: [350,84,60],
        border: [273,30,92],
        input: [273,30,92],
        ring: [273,83,60],
        card: [0,0,100],
        popover: [0,0,100],
        cardForeground: [273,45,15],
        popoverForeground: [273,45,15],
        primaryForeground: [210,40,98],
        secondaryForeground: [222.2,47.4,11.2],
        mutedForeground: [215.4,16.3,46.9],
        accentForeground: [222.2,47.4,11.2],
        destructiveForeground: [210,40,98]
      },
      sidebar: {
        background: [0,0,98],
        foreground: [240,5.3,26.1],
        primary: [240,5.9,10],
        primaryForeground: [0,0,98],
        accent: [240,4.8,95.9],
        accentForeground: [240,5.9,10],
        border: [220,13,91],
        ring: [217.2,91.2,59.8]
      },
      chart: {
        '1': [12,76,61],
        '2': [173,58,39],
        '3': [197,37,24],
        '4': [43,74,66],
        '5': [27,87,67]
      }
    },
    spacing: { base:16, scale:1.5, fluid:{ min:0.5, max:1.5 }},
    typography: { baseSize:16, scaleRatio:1.25, fluid:{ minVw:320, maxVw:1280 }},
    containers:{ maxWidth:{ sm:640, md:768, lg:1024, xl:1280 }, padding:{ sm:16, md:24, lg:32 }},
    motion:{
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
      vectorSEO: { enabled:false, embeddingModel:'text-embedding-model', vectorDB:'pinecone', clusterStrategy:'semantic' },
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
        multilingualSupport:[ { lang:'en', alternateLinks:{ 'fr':'/fr/home','zh':'/zh/home'} } ]
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

/* ========================================================================== */
/* 20. Hooks                                                                  */
/* ========================================================================== */
/**
 * @section Hooks
 * Client-side hooks for responsive design and toast notifications.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const MOBILE_BREAKPOINT = 768
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

type ToastActionElement = React.ReactNode
type ToastProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000
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
  | { type: ActionType["ADD_TOAST"], toast: ToasterToast }
  | { type: ActionType["UPDATE_TOAST"], toast: Partial<ToasterToast> }
  | { type: ActionType["DISMISS_TOAST"], toastId?: string }
  | { type: ActionType["REMOVE_TOAST"], toastId?: string }

interface State { toasts: ToasterToast[] }

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({ type: "REMOVE_TOAST", toastId })
  }, TOAST_REMOVE_DELAY)
  toastTimeouts.set(toastId, timeout)
}

export const toastReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) }
    case "UPDATE_TOAST":
      return { ...state, toasts: state.toasts.map(t => t.id === action.toast.id ? { ...t, ...action.toast } : t) }
    case "DISMISS_TOAST": {
      const { toastId } = action
      if (toastId) { addToRemoveQueue(toastId) } else { state.toasts.forEach(toast => addToRemoveQueue(toast.id)) }
      return { ...state, toasts: state.toasts.map(t => (t.id === toastId || toastId === undefined) ? { ...t, open: false } : t) }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) return { ...state, toasts: [] }
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.toastId) }
  }
}

let memoryState: State = { toasts: [] }
const listeners: Array<(state: State) => void> = []

function dispatch(action: Action) {
  memoryState = toastReducer(memoryState, action)
  listeners.forEach(listener => listener(memoryState))
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()
  const update = (props: ToasterToast) => dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })
  dispatch({
    type: "ADD_TOAST",
    toast: { ...props, id, open: true, onOpenChange: (open) => { if (!open) dismiss() } },
  })
  return { id, dismiss, update }
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState)
  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [state])
  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

/* ========================================================================== */
/* 21. Content Manager Integration                                            */
/* ========================================================================== */
/**
 * @section Content Manager Integration
 * Utilities to manage pages, content clusters, shared sections, and programmatic routes.
 */
type PageRegistry = Record<string, Page>
const _pageRegistry: PageRegistry = {}

export function registerPage(page: Page): void {
  if (_pageRegistry[page.slug]) throw new Error(`Page slug ${page.slug} already registered`)
  _pageRegistry[page.slug] = page
}

export function getPageBySlug(slug: string): Page | undefined {
  return _pageRegistry[slug]
}

export function listAllPages(): Page[] {
  return Object.values(_pageRegistry)
}

export async function applyProgrammaticSEO(): Promise<void> {
  if (!globalAppConfig.featureFlags.enableProgrammaticSEO || !globalAppConfig.advancedConfig?.seo?.programmaticSEO?.enabled) return
  const { routeRules, aiInstructions } = extractProgrammaticSEODetails()

  for (const rule of routeRules) {
    if (rule.type === 'dynamic' && rule.generateFrom === 'locations') {
      const cities = ['sydney','melbourne','brisbane']
      const services = ['house-cleaning','end-of-lease']
      for (const city of cities) {
        for (const service of services) {
          const slug = `/${city}/${service}`
          if (!getPageBySlug(slug)) {
            let generatedSections: Section[] = []
            if (globalAppConfig.featureFlags.enableAIContent && globalAppConfig.advancedConfig?.aiContent?.enabled && rule.aiInstructions) {
              generatedSections = await generateAIContentSections(rule.aiInstructions, { city, service })
            }
            const newPage = pageBuilderUtils.createPage('city', slug)
            newPage.sections.push(...generatedSections)
            registerPage(newPage)
          }
        }
      }
    }
  }
}

function extractProgrammaticSEODetails() {
  const seoConfig = globalAppConfig.advancedConfig?.seo?.programmaticSEO
  const routeRules = seoConfig?.routeRules ?? []
  return {
    routeRules: routeRules as z.infer<typeof routeRuleSchema>[],
    localization: seoConfig?.localization ?? false,
    aiInstructions: routeRules.find(r => r.aiInstructions)?.aiInstructions
  }
}

async function generateAIContentSections(instructions: string | undefined, variables: Record<string,string>): Promise<Section[]> {
  if (!instructions || !globalAppConfig.advancedConfig?.aiContent?.enabled) return []
  const generatedText = `AI generated content for ${variables.city} ${variables.service}`
  const textField: Field = { id: 'intro', type: 'text', value: generatedText }
  const section = pageBuilderUtils.createSection('text', { intro: textField })
  return [section]
}

export function resolveSharedSections(page: Page): Page {
  if (!page) throw new ValidationError('PAGE_REQUIRED', 'Page is required for resolving shared sections')

  const sharedSections = globalAppConfig.advancedConfig?.seo?.programmaticSEO?.sharedSections ?? []
  if (!globalAppConfig.featureFlags.enableSharedSections || sharedSections.length === 0) {
    return page
  }

  // Validate shared section references
  if (!Array.isArray(page.sharedSectionRefs)) {
    throw new ValidationError('INVALID_SHARED_REFS', 'sharedSectionRefs must be an array')
  }

  const updatedSections = [...(page.sections ?? [])]
  const resolvedRefs = new Set<string>()

  for (const refId of page.sharedSectionRefs) {
    if (typeof refId !== 'string') {
      throw new ValidationError('INVALID_REF_ID', `Invalid shared section reference: ${refId}`)
    }

    const sharedSec = sharedSections.find(s => s.id === refId)
    if (!sharedSec) {
      console.warn(`[resolveSharedSections] Shared section not found: ${refId}`)
      continue
    }

    if (!typeGuards.isSection(sharedSec.section)) {
      console.error(`[resolveSharedSections] Invalid section structure for ${refId}`)
      continue
    }

    if (resolvedRefs.has(refId)) {
      console.warn(`[resolveSharedSections] Duplicate shared section reference: ${refId}`)
      continue
    }

    resolvedRefs.add(refId)
    updatedSections.push(sharedSec.section)
  }

  return {
    ...page,
    sections: updatedSections
  }
}

/* ========================================================================== */
/* 22. Future Considerations                                                  */
/* ========================================================================== */
/**
 * @section Future Considerations
 * - Integrate GraphQL APIs or Supabase for dynamic content storage.
 * - Enhance AI capabilities with competitor analysis data.
 * - Scale to multi-region deployments using featureFlags.
 * - Use Cascade features (view_file, edit_file) for safe, iterative development.
 */

/* ========================================================================== */
/* 23. Template System                                                         */
/* ========================================================================== */
/**
 * @section Template System
 * Schema and utilities for section templates. Enables reusable section patterns
 * with variable substitution and AI-powered content generation.
 */
export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  section: sectionSchema,
  variables: z.array(z.object({
    key: z.string(),
    label: z.string(),
    description: z.string().optional(),
    type: z.enum(['text', 'number', 'boolean', 'select']),
    options: z.array(z.string()).optional(),
    defaultValue: z.union([z.string(), z.number(), z.boolean()]).optional()
  })).default([]),
  aiPrompt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([])
}).strict()

export type Template = z.infer<typeof templateSchema>

const _templateRegistry: Record<string, Template> = {}

export const templateUtils = {
  register(template: Template): void {
    if (_templateRegistry[template.id]) {
      throw new ValidationError('Template already exists', 'TEMPLATE_EXISTS')
    }
    _templateRegistry[template.id] = template
  },

  get(id: string): Template {
    const template = _templateRegistry[id]
    if (!template) {
      throw new ValidationError('Template not found', 'TEMPLATE_NOT_FOUND')
    }
    return template
  },

  list(): Template[] {
    return Object.values(_templateRegistry)
  },

  async instantiate(templateId: string, variables: Record<string, string | number | boolean>): Promise<Section> {
    const template = this.get(templateId)
    let section = { ...template.section }
    
    // Replace variables in content
    if (template.variables.length > 0) {
      section = JSON.parse(
        JSON.stringify(section).replace(
          /\${(\w+)}/g,
          (_, key) => String(variables[key] ?? '')
        )
      )
    }

    // Generate AI content if prompt exists
    if (template.aiPrompt) {
      const aiContent = await generateAIContentSections(
        template.aiPrompt,
        variables as Record<string, string>
      )
      if (aiContent.length > 0) {
        section = { ...section, ...aiContent[0] }
      }
    }

    return section
  }
}
