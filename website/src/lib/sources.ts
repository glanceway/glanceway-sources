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
  type: "js";
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
  lang: "js" | "yaml" | "md";
  html?: string;
}

export interface VersionFiles {
  version: string;
  files: SourceFile[];
}

export interface SourceDetail extends SourceEntry {
  config: ConfigField[];
  files: SourceFile[];
  versionFiles: VersionFiles[];
}

const LANG_MAP: Record<string, "js" | "yaml" | "md"> = {
  ".js": "js",
  ".yaml": "yaml",
  ".yml": "yaml",
  ".md": "md",
};

export function getSources(): SourceEntry[] {
  const data = JSON.parse(fs.readFileSync(SOURCES_JSON, "utf-8"));
  return data.sources;
}

const FILE_PRIORITY = ["README.md", "manifest.yaml", "index.js"];

function readVersionFiles(versionDir: string): SourceFile[] {
  const entries = fs.readdirSync(versionDir).sort();
  const files: SourceFile[] = [];

  for (const entry of entries) {
    const filePath = path.join(versionDir, entry);
    if (!fs.statSync(filePath).isFile()) continue;

    const ext = path.extname(entry);
    const lang = LANG_MAP[ext];
    if (!lang) continue;

    const code = fs.readFileSync(filePath, "utf-8");
    const html = lang === "md" ? (marked.parse(code) as string) : undefined;
    files.push({ filename: entry, code, lang, html });
  }

  files.sort((a, b) => {
    const ai = FILE_PRIORITY.indexOf(a.filename);
    const bi = FILE_PRIORITY.indexOf(b.filename);
    const ap = ai === -1 ? FILE_PRIORITY.length : ai;
    const bp = bi === -1 ? FILE_PRIORITY.length : bi;
    return ap - bp;
  });

  return files;
}

export function getSourceDetail(id: string): SourceDetail | undefined {
  const sources = getSources();
  const source = sources.find((s) => s.id === id);
  if (!source) return undefined;

  const [author, name] = id.split("/");
  const sourceDir = path.join(SOURCES_DIR, author, name);

  // Read files for all versions
  const versionFiles: VersionFiles[] = source.versions.map((v) => ({
    version: v.version,
    files: readVersionFiles(path.join(sourceDir, v.version)),
  }));

  // Latest version files and config
  const latestFiles = versionFiles[0]?.files ?? [];
  const manifestFile = latestFiles.find((f) => f.filename === "manifest.yaml");
  const config: ConfigField[] = manifestFile
    ? (YAML.parse(manifestFile.code).config ?? [])
    : [];

  return { ...source, config, files: latestFiles, versionFiles };
}
