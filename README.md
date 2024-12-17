# SimplyMaid Origin

**SimplyMaid Origin** is the new ground-up, schema-driven, and AI-ready foundation for the SimplyMaid platform. This codebase aims to deliver a scalable, conversion-focused, and future-proof environment that leverages the latest technologies—including Next.js 15.1 App Router, Tailwind + Shadcn UI, Supabase, and AI-driven SEO enhancements.

This README outlines our architectural decisions, phased roll-out plan, development workflows, and LLM integration patterns. Think of this as the starting point (the “origin”) for building a robust and adaptive cleaning services platform poised for long-term growth.

---

## Core Architecture

### Two-Part System Architecture
1. **`origincore.ts` - Core Business Logic (v10.0.1)**
   - Feature flags & configuration
   - Schema definitions (pages, sections, templates)
   - Enhanced validation middleware with three-step process
   - Type-safe content management & versioning
   - AI integration & SEO optimization
   - Performance monitoring & error tracking

2. **`origintheme.ts` - Design System (v1.0.1)**
   - Theme provider & context
   - Design tokens & variables
   - Component variants
   - Fluid typography
   - Motion system
   - Color schemes

### Primary Objectives
1. **Business Growth & Conversions:**  
   Restore and surpass previous traffic levels (targeting 20k+ monthly), improve lead capture, and streamline booking flows.
   
2. **Future-Proof AI & SEO Integration:**  
   Leverage `origincore.ts` schema-driven architecture for:
   - Programmatic SEO & vector embeddings
   - AI-driven FAQ and content optimization
   - Competitor analysis and semantic internal linking
   
3. **Scalability & Flexibility:**  
   Use feature flags in `origincore.ts` for incremental enhancements. Start simple with MVP and enable advanced capabilities (AI content rewriting, vector SEO, “Recently Cleaned”, provider sign-ups) over time.

### Technical Highlights
- **Next.js 15.1 App Router:**  
  Server components and edge functions in `src/app/` directory.
  
- **Three-Step Validation Pattern:**
  Structured approach to data validation ensuring type safety and proper error handling:
  1. Basic structure validation
  2. Nested item validation
  3. Optional transformations (e.g., shared sections)
  
- **Tailwind + Shadcn UI Design System:**  
  Token-based, accessible UI with fluid typography managed via `src/core/origintheme.ts`.
  
- **Schema-Driven Architecture:**  
  Centralized configuration in `src/core/origincore.ts` for feature flags, SEO rules, content clusters, and AI prompts.
  
- **Supabase Integration:**  
  Store leads, booking data, and provider info with real-time and vector search capabilities.
  
- **AI & Vector SEO Preparedness:**  
  Prompt templates and vector embeddings ready for activation via feature flags.

---

## Phased Roll-Out Plan

This phased approach ensures a stable MVP launch while leaving room for strategic enhancements as traffic grows and the platform matures.

### Phase 1: Foundation & MVP
**Focus:** Get lead capture, booking flow, and basic marketing pages running.

- **Tasks:**
  1. **OriginCore Setup:**  
     Create `origincore.ts` in a `src/core/` directory.
  2. **Navigation & Footer:**  
     Basic global navigation and footer controlled by `origincore.ts`.
  3. **Lead Capture Forms:**  
     Integrate lead capture on every page. Users must complete lead capture before accessing the booking form.
  4. **Booking Flow with Launch27:**  
     Connect booking form to Launch27 API for real-time pricing and scheduling.
  5. **Initial Programmatic SEO Hooks:**  
     Define route rules and `contentClusters` in `origincore.ts`, but keep advanced SEO features turned off initially.

**Outcome:** A working MVP ready for initial deployment, with lead capture, booking, and a stable design system.

---

### Phase 2: Dynamic Data & Basic SEO Enhancements
**Focus:** Enhance internal linking, content clusters, and data-driven sections.

- **Tasks:**
  1. **Content Clusters & Internal Linking:**  
     Enable `internalLinking.strategy = "cluster-based"` in `origincore.ts`.  
     Add initial city/suburb pages, linking services and guides.
  2. **Footer & Navigation Enhancements:**  
     Dynamically show service categories, top cities, and related guides.
  3. **Competitor Analysis (Flagged):**  
     Integrate competitor metrics into `origincore.ts` (if `enableCompetitorCrawling` and `enableAdvancedSEO` are on), start gathering data for future refinement.
  4. **Recently Cleaned (Planned):**  
     Add placeholders for “Recently Cleaned” sections in `origincore.ts`, not yet activated.

**Outcome:** Improved internal linking, structured data ready for SEO improvements, and placeholders for advanced features.

---

### Phase 3: AI-Driven SEO & Vector Enhancements
**Focus:** Turn on AI-based content refinement, FAQ rewriting, and vector-based SEO.

- **Tasks:**
  1. **AI-Refined FAQs & Content:**  
     Use `aiPromptTemplates` from `origincore.ts` to refine FAQ answers and localized content.
  2. **Vector SEO Integration:**  
     Enable `enableVectorSEO` and configure embedding models. Let AI suggest related guides and services contextually.
  3. **Competitor Gap Filling:**  
     Activate `competitorAnalysis` and use insights to close content gaps and improve SERP presence.

**Outcome:** Highly relevant, AI-optimized content that leverages semantics, competitor data, and user intent signals to boost SEO and conversions.

---

### Phase 4: Provider Sign-Ups & “Recently Cleaned” Data
**Focus:** Complete the ecosystem with real-time trust signals and provider expansions.

- **Tasks:**
  1. **Provider Sign-Ups:**  
     Once your provider flows are ready, integrate them into `origincore.ts`.
  2. **“Recently Cleaned” Section:**  
     Display live data of completed cleaning jobs for local proof and E-A-T signals.
  3. **Full Local Business Schema & GMB Integration:**  
     Add structured data linking to GMB listings and highlight reviews in footers or city-specific pages.

**Outcome:** A dynamic, trust-rich platform that leverages live operational data, boosting credibility and conversions.

---

## LLM Safety Protocol & Implementation Guidelines

### 1. Documentation Structure
- **cascade.md**: Implementation patterns, safety protocols, reusable solutions
- **workflow.md**: Current tasks, progress tracking, system health
- **README.md**: Core architecture, technical decisions, LLM guidelines

### 2. Safety Checkpoints
1. **Schema Validation**
   - Always use `validateSafely` from `origincore.ts`
   - Follow three-step validation pattern
   - Track validation metrics

2. **Type Safety**
   - Maintain strict TypeScript checks
   - Use explicit type assertions
   - Document type dependencies

3. **Performance**
   - Monitor operation durations
   - Log performance metrics
   - Set up alerts for degradation

4. **Documentation**
   - Keep workflow.md current
   - Document patterns in cascade.md
   - Update technical debt registry

### 3. Implementation Flow
1. Check existing patterns in cascade.md
2. Verify current focus in workflow.md
3. Follow safety protocols from origincore.ts
4. Document changes and metrics

### 4. Version Control
- Semantic versioning (MAJOR.MINOR.PATCH)
- Detailed changelog entries
- Impact assessment for changes

This structure ensures consistent, safe development across all sessions.

---

## Development Guidelines

1. **Directory Structure:**
   - `/src/core/`: Core system and documentation
     - `origincore.ts`: Core business logic and validation
     - `origintheme.ts`: Design system and theming
     - `README.md`: Core system documentation
     - `workflow.md`: Development tracking and technical debt
     - `cascade.md`: Implementation patterns and best practices
   - `/src/components/`: UI building blocks using design system tokens
   - `/src/app/`: Next.js App Router routes and layouts

2. **LLM Integration & Patterns:**
   - Use `aiPromptTemplates` in `origincore.ts` for standardized content generation
   - Follow patterns documented in `src/core/cascade.md` for consistent development
   - Leverage three-step validation pattern for all data processing
   - Use type assertions and proper error handling as shown in `src/core/workflow.md`

3. **Theming & Design System:**
   - Application wrapped in `ThemeProvider` from `src/core/origintheme.ts`
   - Follow token usage examples in core documentation
   - Use Shadcn UI components with our custom theme tokens

4. **CI/CD and Feature Flags:**
   - Control features via `src/core/origincore.ts` flags
   - Follow version management guidelines in `src/core/workflow.md`
   - Use technical debt registry for tracking improvements

---

## Example Workflows

**1. Adding a New City:**
- Update `origincore.ts` city arrays.
- Add a route rule if generating city pages programmatically.
- Run `validationUtils.validateSafely` to ensure no schema violations.
- Commit and redeploy. City pages appear automatically, integrated into navigation and footer.

**2. Activating Vector SEO:**
- Flip `enableVectorSEO` in `origincore.ts`.
- Confirm embedding model and vector DB references.
- Run AI prompt to update related content clusters.  
- Test vector-driven link suggestions locally before enabling in production.

---

## Conclusion

**SimplyMaid Origin** is your fresh start: a flexible, scalable, AI-ready codebase designed to deliver growth, SEO impact, and a seamless user experience. By following the phased roll-out plan, leveraging `origincore.ts` for effortless updates, and adopting LLM-integrated workflows, you ensure continuous innovation as SimplyMaid evolves.

---

**You’re now ready to begin building a stronger, smarter, and more adaptable platform—welcome to SimplyMaid Origin!**