# 🎮 SimplyMaid Behemoth System
> Last Updated: 2024-12-17 13:33 AEDT  
> Status: Active  
> Version: 1.6.3
> Line Count: 252 (TRACKED)

## ⚠️ Critical Safety Guidelines
1. **NEVER** auto-run these commands:
   - Package management (npm install, yarn add)
   - Git operations (push, pull, commit)
   - Database operations (migrations, schema changes)
   - Deployment commands
   - System commands (rm, del, format)

2. **ALWAYS** verify before file operations:
   - Check if file exists
   - Verify write permissions
   - Confirm it's not a system file
   - Have backup of original
   - Track line count changes

3. **ALWAYS** validate schema changes:
   - Load complete schema context
   - Check all dependencies
   - Verify backward compatibility
   - Test with sample data
   - Use feature flags for breaking changes
   - Monitor line count deltas

4. **ALWAYS** track file metrics:
   - Current line count
   - Line count changes
   - Significant size changes
   - Unusual growth patterns
   - File size anomalies

## Core Files
- `origincore.ts` - Business logic & schemas (CRITICAL)
- `origintheme.ts` - Design system
- `workflow.md` - Progress tracking
- `cascade.md` - AI guidelines (this file)

## Quick Start
Copy this to start a powerful development session:
```typescript
Hi Cascade! I'm working on SimplyMaid. Before we begin:

1. VERIFY CORE FILE COVERAGE:
// First get last line number by viewing end of file
view_file({
  AbsolutePath: "c:/Users/Huy/simplymaid-origin/src/core/origincore.ts",
  StartLine: 1000,  // Start near end
  EndLine: 1100     // Go past likely end
})
// Note the last line number from [EndOfDocument] marker

2. LOAD CORE CONTEXT (MUST VIEW ALL LINES):
// Load origincore.ts first (CRITICAL)
view_file({
  AbsolutePath: "c:/Users/Huy/simplymaid-origin/src/core/origincore.ts",
  StartLine: 0,
  EndLine: LAST_LINE_NUMBER  // Update with number from step 1
})

// Check for any recent changes
grep_search({
  SearchDirectory: "c:/Users/Huy/simplymaid-origin/src/core",
  Query: "@changelog",
  MatchPerLine: true,
  Includes: ["*.ts"],
  CaseInsensitive: true
})

// Load other core files
view_file({
  AbsolutePath: "c:/Users/Huy/simplymaid-origin/src/core/origintheme.ts",
  StartLine: 0,
  EndLine: LAST_LINE_NUMBER  // Get actual last line first!
})

// Load documentation
view_file({
  AbsolutePath: "c:/Users/Huy/simplymaid-origin/docs/workflow.md",
  StartLine: 0,
  EndLine: LAST_LINE_NUMBER  // Get actual last line first!
})

view_file({
  AbsolutePath: "c:/Users/Huy/simplymaid-origin/docs/cascade.md",
  StartLine: 0,
  EndLine: LAST_LINE_NUMBER  // Get actual last line first!
})

3. CHECK CURRENT DEVELOPMENT STATUS:
// Verify implementation progress
grep_search({
  SearchDirectory: "c:/Users/Huy/simplymaid-origin/docs",
  Query: "Implementation Progress|System Health|Recent Changes",
  MatchPerLine: true,
  Includes: ["workflow.md"],
  CaseInsensitive: true
})

4. VERIFY DEPENDENCIES:
// Find related files for context
related_files({
  absolutepath: "c:/Users/Huy/simplymaid-origin/src/core/origincore.ts"
})

5. Follow these CRITICAL safety rules:
- NEVER proceed without verifying full file coverage
- ALWAYS check [EndOfDocument] marker in responses
- ALWAYS verify no lines were skipped
- NEVER use hardcoded line numbers
- NEVER edit without full context
- ALWAYS verify schema compatibility
- ALWAYS track changes in workflow.md
- ALWAYS use feature flags for breaking changes
- NEVER auto-run unsafe commands
- ALWAYS check @changelog entries
- ALWAYS verify implementation progress
- ALWAYS check related files
- NEVER skip performance monitoring
- ALWAYS validate error handling
```

## Cascade's Development Powers

### 1. Safe Code Search
```typescript
// Semantic search for implementation patterns
codebase_search({
  Query: "feature description",
  TargetDirectories: ["c:/Users/Huy/simplymaid-origin/src"]
})

// Find exact code matches (SAFE)
grep_search({
  SearchDirectory: "c:/Users/Huy/simplymaid-origin/src",
  Query: "pattern",
  MatchPerLine: true,
  Includes: ["*.ts"],
  CaseInsensitive: true
})

// View specific code items (SAFE)
view_code_item({
  AbsolutePath: "c:/Users/Huy/simplymaid-origin/src/path/file.ts",
  NodeName: "functionName"
})
```

### 2. Protected File Operations
```typescript
// Get full file context (SAFE)
view_file({
  AbsolutePath: "c:/Users/Huy/simplymaid-origin/src/path/file.ts",
  StartLine: 0,
  EndLine: 1100
})

// Find related files (SAFE)
related_files({
  absolutepath: "c:/Users/Huy/simplymaid-origin/src/target/file.ts"
})

// Make precise edits (REQUIRES CAUTION)
edit_file({
  TargetFile: "c:/Users/Huy/simplymaid-origin/src/path/file.ts",
  CodeMarkdownLanguage: "typescript",
  Instruction: "Clear description of changes",
  CodeEdit: `{{ ... }}
  // Only changed lines
  {{ ... }}`,
  Blocking: true  // Wait for completion
})
```

### 3. System Validation
```typescript
// Type checking (SAFE)
run_command({
  Command: "tsc",
  Cwd: "c:/Users/Huy/simplymaid-origin/src",
  ArgsList: ["--noEmit"],
  Blocking: true,
  WaitMsBeforeAsync: 0,
  SafeToAutoRun: true  // Safe to auto-run
})

// Run tests (REQUIRES APPROVAL)
run_command({
  Command: "npm",
  Cwd: "c:/Users/Huy/simplymaid-origin",
  ArgsList: ["test"],
  Blocking: true,
  WaitMsBeforeAsync: 0,
  SafeToAutoRun: false  // Requires user approval
})
```

## Safety Protocols

### Core File Edits
1. **ALWAYS** Load Full Context:
   ```typescript
   // CRITICAL: Load complete core system
   view_file({
     AbsolutePath: "c:/Users/Huy/simplymaid-origin/src/core/origincore.ts",
     StartLine: 0,
     EndLine: 1100
   })
   ```

2. **ALWAYS** Check Dependencies:
   ```typescript
   // Find related files (SAFE)
   related_files({
     absolutepath: "c:/Users/Huy/simplymaid-origin/src/target/file.ts"
   })
   
   // Check core imports (SAFE)
   grep_search({
     SearchDirectory: "c:/Users/Huy/simplymaid-origin/src",
     Query: "import.*from.*@/core",
     MatchPerLine: true,
     Includes: ["*.ts"],
     CaseInsensitive: true
   })
   ```

3. **ALWAYS** Verify Schemas:
   ```typescript
   // Load schema context first
   view_code_item({
     AbsolutePath: "c:/Users/Huy/simplymaid-origin/src/core/origincore.ts",
     NodeName: "pageSchema"
   })
   ```

### Validation Middleware Safety
1. **ALWAYS** Verify Request/Response Types:
   ```typescript
   // Check middleware function signature
   view_code_item({
     AbsolutePath: "c:/Users/Huy/simplymaid-origin/src/core/origincore.ts",
     NodeName: "validatePageMiddleware"
   })
   ```

2. **ALWAYS** Check Cache Implementation:
   ```typescript
   // Verify cache utils
   view_code_item({
     AbsolutePath: "c:/Users/Huy/simplymaid-origin/src/core/origincore.ts",
     NodeName: "cacheUtils"
   })
   ```

3. **NEVER** Skip Performance Monitoring:
   ```typescript
   // Ensure performance tracking
   grep_search({
     SearchDirectory: "c:/Users/Huy/simplymaid-origin/src",
     Query: "performance\\.now\\(\\)",
     MatchPerLine: true,
     Includes: ["*.ts"],
     CaseInsensitive: true
   })
   ```

4. **ALWAYS** Validate Error Handling:
   ```typescript
   // Check error types
   view_code_item({
     AbsolutePath: "c:/Users/Huy/simplymaid-origin/src/core/origincore.ts",
     NodeName: "ValidationError"
   })
   ```

5. **ALWAYS** Test Edge Cases:
   - Empty page data
   - Invalid schema
   - Cache failures
   - Performance degradation
   - SEO validation errors

### Schema Changes (CRITICAL)
1. **BEFORE** Changes:
   ```typescript
   // Find all usages (SAFE)
   grep_search({
     SearchDirectory: "c:/Users/Huy/simplymaid-origin/src",
     Query: "schemaName",
     MatchPerLine: true,
     Includes: ["*.ts"],
     CaseInsensitive: true
   })
   
   // Check implementations (SAFE)
   codebase_search({
     Query: "implements.*Interface",
     TargetDirectories: ["c:/Users/Huy/simplymaid-origin/src"]
   })
   ```

2. **DURING** Changes:
   - NEVER update schemas without full context
   - ALWAYS update related types together
   - ALWAYS add feature flags for breaking changes
   - ALWAYS document in workflow.md
   - ALWAYS test with sample data
   - ALWAYS track line count changes

3. **AFTER** Changes:
   ```typescript
   // Verify types (SAFE)
   run_command({
     Command: "tsc",
     Cwd: "c:/Users/Huy/simplymaid-origin/src",
     ArgsList: ["--noEmit"],
     Blocking: true,
     WaitMsBeforeAsync: 0,
     SafeToAutoRun: true
   })
   
   // Check impacted files (SAFE)
   related_files({
     absolutepath: "c:/Users/Huy/simplymaid-origin/src/changed/file.ts"
   })
   ```

## Development Checklist

### Pre-Implementation Safety ✓
- [ ] Load FULL core context (view_file with exact paths)
- [ ] Check ALL existing patterns (codebase_search with TargetDirectories)
- [ ] Verify ALL dependencies (related_files with absolutepath)
- [ ] Review feature flags (grep_search with proper params)
- [ ] Confirm file safety (not system critical)
- [ ] Check write permissions
- [ ] Have backup plan
- [ ] Track line count changes

### During Implementation Safety ✓
- [ ] Make focused edits ONLY (edit_file with all required fields)
- [ ] Update related schemas TOGETHER (view_code_item with AbsolutePath)
- [ ] Track ALL changes (workflow.md)
- [ ] Test with sample data
- [ ] Validate schema compatibility
- [ ] Monitor line count deltas

### Post-Implementation Safety ✓
- [ ] Run ALL type checks (run_command with proper params)
- [ ] Verify ALL impacted files (related_files with absolutepath)
- [ ] Update documentation
- [ ] Confirm feature flags
- [ ] Verify backward compatibility
- [ ] Track line count changes
