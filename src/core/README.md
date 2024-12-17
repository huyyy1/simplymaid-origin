# README.md

## Overview

Welcome to the `core` folder of the SimplyMaid project! This folder is the heart of our platform’s configuration and architecture. It provides:

- **`origincore.ts`**: Central schemas, advanced configuration (SEO, AI), feature flags, page builder utilities, caching, migrations, and hooks.
- **`origintheme.ts`**: Unified theme system, `themeSchema`, fluid utilities, and `ThemeProvider` for applying CSS variables.

This setup is designed for seamless cooperation between human developers and Large Language Models (LLMs). We follow [Cascade](https://docs.cascade.dev/) and Windsurf IDE best practices, ensuring that LLMs (like Claude, GPT-4) can easily navigate, understand, and transform this codebase without confusion.

## Table of Contents

1. [Philosophy & Goals](#philosophy--goals)
2. [Key Files](#key-files)
3. [Architecture & Responsibilities](#architecture--responsibilities)
4. [LLM-Friendly Development](#llm-friendly-development)
5. [Usage & Integration](#usage--integration)
6. [Best Practices](#best-practices)
7. [Common Workflows](#common-workflows)
8. [Bad Practices to Avoid](#bad-practices-to-avoid)
9. [Documentation Standards](#documentation-standards)
10. [Future Considerations](#future-considerations)

## Philosophy & Goals

- **Single Source of Truth**: `origincore.ts` defines schemas and configuration that form the backbone of the platform, ensuring consistency and easy reference.
- **Separation of Concerns**: `origintheme.ts` handles all theme logic, avoiding mixing theme concerns with core configuration logic.
- **LLM-Friendly**: Organized with section markers, JSDoc, and naming conventions that help LLMs easily parse and modify code.
- **Scalability & Extensibility**: Designed with future-proofing in mind—add features, integrate AI, or expand SEO strategies without heavy refactoring.

## Key Files

- **`origincore.ts`**  
  - **Feature Flags**: Toggle features for staged rollouts, A/B tests, and experiments.
  - **Advanced Config**: Handle SEO enhancements, AI content generation, competitor analysis.
  - **Page & Section Schemas**: Define the structure for the CMS/page builder.
  - **Validation & Migrations**: Ensure data integrity and smooth schema evolution.
  - **Hooks**: `useIsMobile`, `useToast` for responsive design and UI feedback.
  - **Content Manager Integration**: Programmatic SEO page generation, content clusters, shared sections.

- **`origintheme.ts`**  
  - **Theme Schema**: Defines `themeSchema` and `RawThemeConfig`.
  - **Fluid Utilities**: Create fluid typography, spacing, and container sizes.
  - **ThemeProvider**: Applies CSS variables to the DOM, enabling dynamic theming and responsive design.

## Architecture & Responsibilities

- **`origincore.ts`**:  
  - Centralizes core logic: validation, schemas, page building, advanced configs.
  - Imports `themeSchema` from `origintheme.ts` but does not define theme logic itself.
  - Provides a `globalAppConfig` validated against `appConfigSchema`.

- **`origintheme.ts`**:  
  - Defines all theme-related schemas and utilities.
  - The `ThemeProvider` is used at the app root (in `_app.tsx` or `layout.tsx`), receiving `globalAppConfig.theme` or another theme object.

**Result**: Clear boundaries. To adjust theming, edit `origintheme.ts`. To tweak features or page schemas, edit `origincore.ts`.

## LLM-Friendly Development

We use patterns to ensure LLMs (e.g., Claude, GPT) can easily navigate and edit the code:

1. **Section Markers**:  
   Each file is annotated with `/* ========================================================================== */` and `@section` JSDoc markers to divide logic into meaningful segments.

2. **JSDoc & @llm-helpers**:  
   JSDoc comments explain code purpose, while `@llm-helpers` hints guide LLMs on how to modify code safely.

3. **Naming Conventions**:  
   Consistent naming (e.g., `SomethingSchema`, `SomethingConfig`, `fieldSchema`) makes code predictable and easy to reference via `view_code_item()` commands.

4. **Cascade & Windsurf Integration**:  
   Follow workflows described in `docs/cascade.md`:  
   - Use `view_file()`, `edit_file()`, `view_code_item()` for targeted code inspection and modifications.
   - Avoid unnecessary context switching by keeping theme logic separate.

## Usage & Integration

1. **Global App Config**:  
   Import `globalAppConfig` from `origincore.ts`. This object is the single source of truth for features, theme references, advanced SEO, and more.
   
2. **Theme Application**:  
   Pass `globalAppConfig.theme` into `<ThemeProvider theme={globalAppConfig.theme!}>` in your `_app.tsx` or root layout. This applies CSS variables and initializes theme styles.

3. **Page Builder & CMS**:  
   Use `sectionRegistryUtils` and `pageBuilderUtils` from `origincore.ts` to register custom sections and build pages dynamically. Integrate with your CMS or GraphQL endpoints as needed.

4. **Programmatic SEO & AI**:  
   `applyProgrammaticSEO()` in `origincore.ts` can generate pages on-the-fly using route rules and AI content. Extend this logic to fetch dynamic city/service lists from an external source.

5. **Validation & Migrations**:  
   Use `validationUtils` for safe parsing and `migrationUtils` to manage schema changes over time.

## Best Practices

- **Keep Theme Logic in `origintheme.ts`**:  
  If you need to add new color tokens or spacing scales, do it here. This prevents accidental logic leakage into `origincore.ts`.

- **Use Feature Flags for Staged Rollouts**:  
  Toggle features with `featureFlags` before implementing heavy logic. This makes it safe to deploy partially completed features.

- **Document Changes via JSDoc & @changelog**:  
  Update the `@version` and `@changelog` in files to track evolution clearly.

- **Use Type Guards & Validation**:  
  Always validate external data using `validationUtils.validateSafely()`.  
  Use type guards (`typeGuards.isPage`, etc.) for runtime checks.

- **Leverage LLM Commands**:  
  For large refactors:
  1. `view_file("origincore.ts")` to load context.
  2. `view_code_item("origincore.ts", "pageBuilderUtils")` to inspect a specific section.
  3. `edit_file({ CodeEdit: "... changes ..." })` to apply modifications safely.

## Common Workflows

1. **Adding a New Section Type**:  
   - Register it via `sectionRegistryUtils.register()`.
   - Create a schema change if needed in `origincore.ts`.
   - Document new sections with JSDoc and `@llm-helpers`.

2. **Updating the Theme**:  
   - Modify `configData.theme` in `origincore.ts`.
   - Adjust fluid scales or colors in `origintheme.ts`.
   - The `ThemeProvider` automatically updates CSS variables.

3. **Implementing a New Programmatic SEO Rule**:  
   - Add a new `routeRule` in `advancedConfig.seo.programmaticSEO`.
   - Call `applyProgrammaticSEO()` at runtime to generate pages.

4. **Refactoring**:  
   - Use LLM commands for safe navigation and editing.
   - Update JSDoc and `@changelog` after changes.

## Bad Practices to Avoid

- **Mixing Theme & Core Logic**:  
  Don’t define theme schemas in `origincore.ts`. Keep theme changes isolated in `origintheme.ts`.

- **Skipping Validation**:  
  Don’t assume external data is valid. Always use `validationUtils` to parse and validate.

- **Undocumented Changes**:  
  Avoid making schema or feature changes without updating JSDoc and `@changelog`. This leads to confusion.

- **Ignoring Feature Flags**:  
  Don’t release incomplete features without a flag. Feature flags let you deploy safely and enable features gradually.

## Documentation Standards

- **JSDoc with @section Markers**:  
  Each file and major block of code is annotated. Include `@description`, `@llm-helpers`, `@version`, `@changelog` and `@cascade` to assist humans and LLMs.

- **@tableofcontents**:  
  Provide a table of contents at the top of large files for quick navigation.

- **@mermaid Diagrams**:  
  Use mermaid diagrams for complex relationships. They help visualize data flows and dependencies.

- **Clear Naming Conventions**:  
  - Schemas end with `Schema` (e.g., `fieldSchema`, `pageSchema`).
  - Types and interfaces use PascalCase (e.g., `UserProfile`).
  - Utilities in camelCase (e.g., `validationUtils.validateSafely`).

## Future Considerations

- **Multi-Region Deployment**:  
  Use `featureFlags.enableMultiRegionDeploy` to conditionally load logic for region-based configs.

- **AI Enhancements**:  
  Integrate competitor analysis data into AI prompts for more context-aware content generation.

- **Scaling Content Management**:  
  Connect `pageBuilderUtils` and `registerPage()` to a GraphQL or Supabase backend to store pages persistently.

- **Performance & Caching**:  
  Optimize large sets of generated pages with `cacheUtils` and edge functions.

---

**By following these guidelines, using Cascade’s LLM workflows, and adhering to the architecture laid out here, you’ll ensure a productive, scalable, and future-proof development experience for both humans and AI collaborators.**