import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { marked } from "marked";

const ROOT = path.resolve(import.meta.dirname, "../../../");
const SOURCES_JSON = path.join(ROOT, "sources.json");
const SOURCES_DIR = path.join(ROOT, "sources");

export interface SourceEntry {
  id: string;
  name: string;
  description: string;
  author: string;
  author_url?: string;
  category: string;
  tags?: string[];
  type: "js" | "yaml";
  latest_version: string;
  source_url: string;
  versions: { version: string; download_url: string }[];
}

export interface ConfigField {
  key: string;
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
  options?: string[];
}

export interface SourceFile {
  filename: string;
  code: string;
  lang: "ts" | "yaml" | "md";
  html?: string;
}

export interface SourceDetail extends SourceEntry {
  config: ConfigField[];
  files: SourceFile[];
}

const LANG_MAP: Record<string, "ts" | "yaml" | "md"> = {
  ".ts": "ts",
  ".yaml": "yaml",
  ".yml": "yaml",
  ".md": "md",
};

export function getSources(): SourceEntry[] {
  const data = JSON.parse(fs.readFileSync(SOURCES_JSON, "utf-8"));
  return data.sources;
}

export function getSourceDetail(id: string): SourceDetail | undefined {
  const sources = getSources();
  const source = sources.find((s) => s.id === id);
  if (!source) return undefined;

  const [author, name] = id.split("/");

  if (source.type === "yaml") {
    const yamlPath = path.join(SOURCES_DIR, author, `${name}.yaml`);
    const content = fs.readFileSync(yamlPath, "utf-8");
    const parsed = YAML.parse(content);
    return {
      ...source,
      config: parsed.config ?? [],
      files: [{ filename: `${name}.yaml`, code: content, lang: "yaml" }],
    };
  }

  // JS source — read all files in directory
  const sourceDir = path.join(SOURCES_DIR, author, name);
  const entries = fs.readdirSync(sourceDir).sort();

  let config: ConfigField[] = [];
  const files: SourceFile[] = [];

  for (const entry of entries) {
    const filePath = path.join(sourceDir, entry);
    if (!fs.statSync(filePath).isFile()) continue;

    const ext = path.extname(entry);
    const lang = LANG_MAP[ext];
    if (!lang) continue;

    const code = fs.readFileSync(filePath, "utf-8");
    const html = lang === "md" ? marked.parse(code) as string : undefined;
    files.push({ filename: entry, code, lang, html });

    if (entry === "manifest.yaml") {
      const parsed = YAML.parse(code);
      config = parsed.config ?? [];
    }
  }

  const priority = ["README.md", "manifest.yaml"];
  files.sort((a, b) => {
    const ai = priority.indexOf(a.filename);
    const bi = priority.indexOf(b.filename);
    const ap = ai === -1 ? priority.length : ai;
    const bp = bi === -1 ? priority.length : bi;
    return ap - bp;
  });

  return { ...source, config, files };
}
