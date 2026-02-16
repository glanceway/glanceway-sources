import * as fs from "fs";
import * as path from "path";
import { parse as parseYaml } from "yaml";
import * as esbuild from "esbuild";

// ─── ANSI Colors ───────────────────────────────────────────────────────────

const color = {
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
};

// ─── Types ─────────────────────────────────────────────────────────────────

const SOURCES_DIR = path.join(process.cwd(), "sources");

interface SourceInfo {
  author: string;
  sourceName: string;
  sourcePath: string;
  manifestPath: string;
  indexPath: string;
  version: string;
  type: "js" | "yaml";
}

interface ManifestConfig {
  key: string;
  name: string;
  type: string;
  required?: boolean;
  default?: unknown;
  description?: string;
}

interface TestResult {
  sourceId: string;
  type: "js" | "yaml";
  status: "pass" | "fail" | "skip";
  itemCount: number;
  refreshItemCount?: number;
  durationMs: number;
  errors: string[];
  warnings: string[];
}

interface EmittedItem {
  id?: unknown;
  title?: unknown;
  subtitle?: unknown;
  url?: unknown;
  timestamp?: unknown;
  [key: string]: unknown;
}

// ─── Arg Parsing & Source Scanning (reused from build-sources) ─────────────

function parseArgs(): { source?: string; config: Record<string, string> } {
  const args = process.argv.slice(2);
  let source: string | undefined;
  const config: Record<string, string> = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--source" && args[i + 1]) {
      source = args[++i];
    } else if (args[i] === "--config" && args[i + 1]) {
      const val = args[++i];
      const eqIdx = val.indexOf("=");
      if (eqIdx > 0) {
        config[val.slice(0, eqIdx)] = val.slice(eqIdx + 1);
      }
    }
  }

  return { source, config };
}

function scanSources(filterSource?: string): SourceInfo[] {
  const sources: SourceInfo[] = [];

  if (!fs.existsSync(SOURCES_DIR)) {
    console.log("No sources directory found");
    return sources;
  }

  const namespaces = fs.readdirSync(SOURCES_DIR);

  for (const namespace of namespaces) {
    const namespacePath = path.join(SOURCES_DIR, namespace);
    const stat = fs.statSync(namespacePath);

    if (!stat.isDirectory()) continue;

    const entries = fs.readdirSync(namespacePath);

    for (const entry of entries) {
      const entryPath = path.join(namespacePath, entry);
      const entryStat = fs.statSync(entryPath);

      if (entryStat.isDirectory()) {
        const manifestPath = path.join(entryPath, "manifest.yaml");
        const indexTsPath = path.join(entryPath, "index.ts");

        if (fs.existsSync(manifestPath) && fs.existsSync(indexTsPath)) {
          const sourceId = `${namespace}/${entry}`;
          if (filterSource && sourceId !== filterSource) continue;

          try {
            const content = fs.readFileSync(manifestPath, "utf-8");
            const manifest = parseYaml(content);
            sources.push({
              author: namespace,
              sourceName: entry,
              sourcePath: entryPath,
              manifestPath,
              indexPath: indexTsPath,
              version: manifest.version || "1.0.0",
              type: "js",
            });
          } catch (error) {
            console.error(`Error parsing ${manifestPath}:`, error);
          }
        }
      } else if (entry.endsWith(".yaml") || entry.endsWith(".yml")) {
        const sourceName = entry.replace(/\.ya?ml$/, "");
        const sourceId = `${namespace}/${sourceName}`;
        if (filterSource && sourceId !== filterSource) continue;

        try {
          const content = fs.readFileSync(entryPath, "utf-8");
          const manifest = parseYaml(content);
          sources.push({
            author: namespace,
            sourceName,
            sourcePath: entryPath,
            manifestPath: entryPath,
            indexPath: entryPath,
            version: manifest.version || "1.0.0",
            type: "yaml",
          });
        } catch (error) {
          console.error(`Error parsing ${entryPath}:`, error);
        }
      }
    }
  }

  return sources;
}

// ─── Config Resolution ─────────────────────────────────────────────────────

function resolveConfig(
  configEntries: ManifestConfig[] | undefined,
  overrides: Record<string, string>,
): { resolved: Record<string, unknown>; warnings: string[] } | null {
  const resolved: Record<string, unknown> = {};
  const warnings: string[] = [];

  if (!configEntries || configEntries.length === 0) {
    return { resolved, warnings };
  }

  for (const entry of configEntries) {
    const override = overrides[entry.key];

    if (override !== undefined) {
      if (entry.type === "list") {
        resolved[entry.key] = override.split(",").map((s) => s.trim());
      } else if (entry.type === "boolean") {
        resolved[entry.key] = override === "true" || override === "1";
      } else if (entry.type === "number") {
        resolved[entry.key] = Number(override);
      } else {
        resolved[entry.key] = override;
      }
    } else if (entry.default !== undefined) {
      resolved[entry.key] = entry.default;
    } else if (entry.required) {
      warnings.push(
        `Required config "${entry.key}" has no default. Use --config ${entry.key}=VALUE to provide a value.`,
      );
      return null;
    }
  }

  return { resolved, warnings };
}

// ─── JSONPath Resolver ─────────────────────────────────────────────────────

function resolvePath(obj: unknown, path: string): unknown {
  if (path === "$") return obj;
  if (!path.startsWith("$.")) return undefined;

  const parts = path.slice(2).split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

// ─── Item Validation ───────────────────────────────────────────────────────

const MAX_MESSAGES = 5;

function validateItems(
  items: EmittedItem[],
  phase: string,
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (items.length > 500) {
    errors.push(`${phase}: emitted ${items.length} items (max 500)`);
  }

  if (items.length === 0) {
    warnings.push(`${phase}: zero items emitted`);
    return { errors, warnings };
  }

  const seenIds = new Set<string>();
  let errorCount = 0;
  let warningCount = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const prefix = `${phase} item[${i}]`;

    // Errors: missing id or title
    if (!item.id || typeof item.id !== "string" || item.id.trim() === "") {
      if (errorCount < MAX_MESSAGES) {
        errors.push(`${prefix}: "id" is missing or empty`);
      }
      errorCount++;
      continue;
    }

    const hasTitle =
      item.title && typeof item.title === "string" && item.title.trim() !== "";
    const hasSubtitle =
      item.subtitle &&
      typeof item.subtitle === "string" &&
      item.subtitle.trim() !== "";
    if (!hasTitle && !hasSubtitle) {
      if (errorCount < MAX_MESSAGES) {
        errors.push(
          `${prefix}: must have at least one of "title" or "subtitle"`,
        );
      }
      errorCount++;
      continue;
    }

    // Warnings: duplicates
    if (seenIds.has(item.id)) {
      if (warningCount < MAX_MESSAGES) {
        warnings.push(`${prefix}: duplicate id "${item.id}"`);
      }
      warningCount++;
    }
    seenIds.add(item.id);

    // Warnings: wrong types on optional fields
    if (item.subtitle !== undefined && typeof item.subtitle !== "string") {
      if (warningCount < MAX_MESSAGES) {
        warnings.push(`${prefix}: "subtitle" should be a string`);
      }
      warningCount++;
    }

    if (item.url !== undefined) {
      if (typeof item.url !== "string") {
        if (warningCount < MAX_MESSAGES) {
          warnings.push(`${prefix}: "url" should be a string`);
        }
        warningCount++;
      } else if (
        !item.url.startsWith("http://") &&
        !item.url.startsWith("https://")
      ) {
        if (warningCount < MAX_MESSAGES) {
          warnings.push(
            `${prefix}: "url" does not start with http(s)://`,
          );
        }
        warningCount++;
      }
    }
  }

  if (errorCount > MAX_MESSAGES) {
    errors.push(`... and ${errorCount - MAX_MESSAGES} more errors`);
  }
  if (warningCount > MAX_MESSAGES) {
    warnings.push(`... and ${warningCount - MAX_MESSAGES} more warnings`);
  }

  return { errors, warnings };
}

// ─── Mock API ──────────────────────────────────────────────────────────────

function createMockApi(
  sourceId: string,
  config: Record<string, unknown>,
): {
  api: any;
  getEmitted: () => EmittedItem[][];
} {
  const emitted: EmittedItem[][] = [];
  const storage = new Map<string, string>();

  const api = {
    emit(items: EmittedItem[]) {
      emitted.push(items);
    },

    async fetch(url: string, options?: any) {
      const timeout = options?.timeout ?? 30000;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);

      try {
        const resp = await globalThis.fetch(url, {
          method: options?.method ?? "GET",
          headers: options?.headers,
          body: options?.body,
          signal: controller.signal,
        });
        clearTimeout(timer);

        const text = await resp.text();
        const headers: Record<string, string> = {};
        resp.headers.forEach((v, k) => {
          headers[k] = v;
        });

        let json: unknown;
        try {
          json = JSON.parse(text);
        } catch {
          // not JSON
        }

        return {
          ok: resp.ok,
          status: resp.status,
          headers,
          text,
          json,
        };
      } catch (err: any) {
        clearTimeout(timer);
        return {
          ok: false,
          status: 0,
          headers: {},
          text: "",
          error: err?.message ?? String(err),
        };
      }
    },

    log(level: string, message: string) {
      console.log(color.dim(`  [${sourceId}] ${level}: ${message}`));
    },

    storage: {
      get(key: string) {
        return storage.get(key);
      },
      set(key: string, value: string) {
        storage.set(key, value);
      },
    },

    config: {
      get(key: string) {
        return config[key];
      },
      getAll() {
        return { ...config };
      },
    },

    websocket: {
      connect() {
        throw new Error("WebSocket is not supported in test mode");
      },
    },

    appVersion: "99.0.0",
  };

  return { api, getEmitted: () => emitted };
}

// ─── TypeScript Source Testing ─────────────────────────────────────────────

async function testTsSource(
  source: SourceInfo,
  overrides: Record<string, string>,
): Promise<TestResult> {
  const sourceId = `${source.author}/${source.sourceName}`;
  const start = Date.now();

  // Read manifest and resolve config
  const manifestContent = fs.readFileSync(source.manifestPath, "utf-8");
  const manifest = parseYaml(manifestContent);
  const configResult = resolveConfig(manifest.config, overrides);

  if (!configResult) {
    // Re-run without required check to collect all warning messages
    const warningMessages: string[] = [];
    if (manifest.config) {
      for (const entry of manifest.config as ManifestConfig[]) {
        if (
          overrides[entry.key] === undefined &&
          entry.default === undefined &&
          entry.required
        ) {
          warningMessages.push(
            `Required config "${entry.key}" has no default. Use --config ${entry.key}=VALUE to provide a value.`,
          );
        }
      }
    }
    return {
      sourceId,
      type: "js",
      status: "skip",
      itemCount: 0,
      durationMs: Date.now() - start,
      errors: [],
      warnings: warningMessages,
    };
  }

  const { resolved: config, warnings } = configResult;

  // Compile TypeScript with esbuild
  let compiledJs: string;
  try {
    const result = await esbuild.build({
      entryPoints: [source.indexPath],
      bundle: true,
      platform: "neutral",
      format: "iife",
      globalName: "_source",
      write: false,
      external: ["node:*"],
      footer: { js: "module.exports = _source.default;" },
    });
    compiledJs = result.outputFiles[0].text;
  } catch (err: any) {
    return {
      sourceId,
      type: "js",
      status: "fail",
      itemCount: 0,
      durationMs: Date.now() - start,
      errors: [`Compilation failed: ${err.message ?? err}`],
      warnings,
    };
  }

  // Execute compiled code
  const { api, getEmitted } = createMockApi(sourceId, config);

  let sourceMethods: any;
  try {
    const moduleObj = { exports: {} as any };
    const fn = new Function("module", "exports", compiledJs);
    fn(moduleObj, moduleObj.exports);

    const factory = moduleObj.exports;
    if (typeof factory !== "function") {
      return {
        sourceId,
        type: "js",
        status: "fail",
        itemCount: 0,
        durationMs: Date.now() - start,
        errors: ["Default export is not a function"],
        warnings,
      };
    }

    // Start phase with timeout
    sourceMethods = await Promise.race([
      factory(api),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Start phase timed out (30s)")), 30000),
      ),
    ]);
  } catch (err: any) {
    return {
      sourceId,
      type: "js",
      status: "fail",
      itemCount: 0,
      durationMs: Date.now() - start,
      errors: [`Start phase error: ${err.message ?? err}`],
      warnings,
    };
  }

  // Validate start phase items
  const startEmitted = getEmitted();
  const startItems =
    startEmitted.length > 0 ? startEmitted[startEmitted.length - 1] : [];
  const startValidation = validateItems(startItems, "start phase");
  const errors = [...startValidation.errors];
  warnings.push(...startValidation.warnings);

  // Refresh phase
  let refreshItemCount: number | undefined;
  if (sourceMethods?.refresh) {
    try {
      // Reset emitted for refresh tracking
      const emittedBefore = getEmitted().length;

      await Promise.race([
        sourceMethods.refresh(),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Refresh phase timed out (30s)")),
            30000,
          ),
        ),
      ]);

      const allEmitted = getEmitted();
      const refreshEmissions = allEmitted.slice(emittedBefore);
      const refreshItems =
        refreshEmissions.length > 0
          ? refreshEmissions[refreshEmissions.length - 1]
          : [];
      refreshItemCount = refreshItems.length;

      const refreshValidation = validateItems(refreshItems, "refresh phase");
      errors.push(...refreshValidation.errors);
      warnings.push(...refreshValidation.warnings);
    } catch (err: any) {
      errors.push(`Refresh phase error: ${err.message ?? err}`);
    }
  }

  // Stop phase
  if (sourceMethods?.stop) {
    try {
      await sourceMethods.stop();
    } catch {
      // ignore stop errors
    }
  }

  return {
    sourceId,
    type: "js",
    status: errors.length > 0 ? "fail" : "pass",
    itemCount: startItems.length,
    refreshItemCount,
    durationMs: Date.now() - start,
    errors,
    warnings,
  };
}

// ─── YAML Source Testing ───────────────────────────────────────────────────

async function testYamlSource(
  source: SourceInfo,
  overrides: Record<string, string>,
): Promise<TestResult> {
  const sourceId = `${source.author}/${source.sourceName}`;
  const start = Date.now();

  const content = fs.readFileSync(source.sourcePath, "utf-8");
  const manifest = parseYaml(content);

  // Resolve config
  const configResult = resolveConfig(manifest.config, overrides);

  if (!configResult) {
    const warningMessages: string[] = [];
    if (manifest.config) {
      for (const entry of manifest.config as ManifestConfig[]) {
        if (
          overrides[entry.key] === undefined &&
          entry.default === undefined &&
          entry.required
        ) {
          warningMessages.push(
            `Required config "${entry.key}" has no default. Use --config ${entry.key}=VALUE to provide a value.`,
          );
        }
      }
    }
    return {
      sourceId,
      type: "yaml",
      status: "skip",
      itemCount: 0,
      durationMs: Date.now() - start,
      errors: [],
      warnings: warningMessages,
    };
  }

  const { resolved: config, warnings } = configResult;

  // Substitute config placeholders in source fields
  const substitute = (str: string): string =>
    str.replace(/\$\{(\w+)\}/g, (_, key) => {
      const val = config[key];
      return val !== undefined ? String(val) : "";
    });

  const srcDef = manifest.source;
  if (!srcDef || !srcDef.url) {
    return {
      sourceId,
      type: "yaml",
      status: "fail",
      itemCount: 0,
      durationMs: Date.now() - start,
      errors: ['YAML source missing "source.url"'],
      warnings,
    };
  }

  const url = substitute(srcDef.url);
  const method = srcDef.method || "GET";
  const headers: Record<string, string> = {};
  if (srcDef.headers) {
    for (const [k, v] of Object.entries(srcDef.headers)) {
      headers[k] = substitute(String(v));
    }
  }
  const body = srcDef.body ? substitute(srcDef.body) : undefined;

  // Make real HTTP request
  let responseData: unknown;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);

    const resp = await globalThis.fetch(url, {
      method,
      headers,
      body,
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!resp.ok) {
      return {
        sourceId,
        type: "yaml",
        status: "fail",
        itemCount: 0,
        durationMs: Date.now() - start,
        errors: [`HTTP ${resp.status} from ${url}`],
        warnings,
      };
    }

    responseData = await resp.json();
  } catch (err: any) {
    return {
      sourceId,
      type: "yaml",
      status: "fail",
      itemCount: 0,
      durationMs: Date.now() - start,
      errors: [`Fetch error: ${err.message ?? err}`],
      warnings,
    };
  }

  // Resolve root path
  const parseDef = manifest.parse;
  if (!parseDef || !parseDef.mapping) {
    return {
      sourceId,
      type: "yaml",
      status: "fail",
      itemCount: 0,
      durationMs: Date.now() - start,
      errors: ['YAML source missing "parse.mapping"'],
      warnings,
    };
  }

  let rawItems = resolvePath(responseData, parseDef.root || "$");
  if (!Array.isArray(rawItems)) {
    return {
      sourceId,
      type: "yaml",
      status: "fail",
      itemCount: 0,
      durationMs: Date.now() - start,
      errors: [
        `parse.root "${parseDef.root || "$"}" did not resolve to an array`,
      ],
      warnings,
    };
  }

  // Apply filters
  if (parseDef.filter && Array.isArray(parseDef.filter)) {
    for (const rule of parseDef.filter) {
      if (!rule.field) continue;
      rawItems = rawItems.filter((item: unknown) => {
        const val = resolvePath(item, rule.field);
        if (rule.equals !== undefined) return val === rule.equals;
        if (rule.notEquals !== undefined) return val !== rule.notEquals;
        if (rule.exists !== undefined) return rule.exists ? val !== undefined : val === undefined;
        return true;
      });
    }
  }

  // Map items
  const mapping = parseDef.mapping;
  const baseUrl = parseDef.baseUrl || "";
  const items: EmittedItem[] = rawItems.map((raw: unknown) => {
    const item: EmittedItem = {} as EmittedItem;

    for (const [field, jsonPath] of Object.entries(mapping)) {
      let val = resolvePath(raw, jsonPath as string);
      if (val !== undefined) {
        // Apply baseUrl for url fields with relative paths
        if (field === "url" && typeof val === "string" && baseUrl && !val.startsWith("http")) {
          val = baseUrl.replace(/\/$/, "") + "/" + val.replace(/^\//, "");
        }
        item[field] = val;
      }
    }

    // Coerce id to string
    if (item.id !== undefined && typeof item.id !== "string") {
      item.id = String(item.id);
    }

    return item;
  });

  // Validate
  const validation = validateItems(items, "items");
  const errors = [...validation.errors];
  warnings.push(...validation.warnings);

  return {
    sourceId,
    type: "yaml",
    status: errors.length > 0 ? "fail" : "pass",
    itemCount: items.length,
    durationMs: Date.now() - start,
    errors,
    warnings,
  };
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const args = parseArgs();

  console.log("Scanning sources...\n");
  const sources = scanSources(args.source);

  if (sources.length === 0) {
    console.log("No sources found");
    process.exit(0);
  }

  console.log(`Found ${color.bold(String(sources.length))} source(s)\n`);

  const results: TestResult[] = [];

  // Test sequentially to avoid rate limiting
  for (const source of sources) {
    const sourceId = `${source.author}/${source.sourceName}`;
    console.log(`Testing ${color.cyan(sourceId)} [${source.type}]...`);

    let result: TestResult;
    if (source.type === "js") {
      result = await testTsSource(source, args.config);
    } else {
      result = await testYamlSource(source, args.config);
    }

    results.push(result);
  }

  // ─── Output Results ──────────────────────────────────────────────────

  const line = "\u2500".repeat(60);

  console.log(`\n${color.bold("Test Results")}`);
  console.log(line);

  for (const r of results) {
    const duration = color.dim(`(${r.durationMs}ms)`);
    const typeTag = `[${r.type}]`;

    if (r.status === "pass") {
      const counts =
        r.refreshItemCount !== undefined
          ? `${r.itemCount} items, refresh: ${r.refreshItemCount}`
          : `${r.itemCount} items`;
      console.log(
        `  ${color.green("PASS")} ${r.sourceId} ${typeTag} ${counts} ${duration}`,
      );
      for (const w of r.warnings) {
        console.log(`    ${color.yellow("warning")}: ${w}`);
      }
    } else if (r.status === "skip") {
      console.log(`  ${color.yellow("SKIP")} ${r.sourceId} ${typeTag} ${duration}`);
      for (const w of r.warnings) {
        console.log(`    ${color.yellow("warning")}: ${w}`);
      }
    } else {
      console.log(`  ${color.red("FAIL")} ${r.sourceId} ${typeTag} ${duration}`);
      for (const e of r.errors) {
        console.log(`    ${color.red("error")}: ${e}`);
      }
      for (const w of r.warnings) {
        console.log(`    ${color.yellow("warning")}: ${w}`);
      }
    }
  }

  console.log(line);

  const passed = results.filter((r) => r.status === "pass").length;
  const failed = results.filter((r) => r.status === "fail").length;
  const skipped = results.filter((r) => r.status === "skip").length;

  console.log(
    `Total: ${color.green(`${passed} passed`)}, ${color.red(`${failed} failed`)}, ${color.yellow(`${skipped} skipped`)}`,
  );

  esbuild.stop();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
