import * as fs from "fs";
import * as path from "path";
import { parse as parseYaml } from "yaml";
import archiver from "archiver";

const SOURCES_DIR = path.join(process.cwd(), "sources");
const DIST_DIR = path.join(process.cwd(), "dist");

interface SourceInfo {
  author: string;
  sourceName: string;
  sourcePath: string;
  manifestPath: string;
  indexPath: string;
  version: string;
}

function parseArgs(): { source?: string } {
  const args = process.argv.slice(2);
  const sourceIndex = args.indexOf("--source");
  if (sourceIndex !== -1 && args[sourceIndex + 1]) {
    return { source: args[sourceIndex + 1] };
  }
  return {};
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
    if (!fs.statSync(namespacePath).isDirectory()) continue;

    const sourceNames = fs.readdirSync(namespacePath);

    for (const sourceName of sourceNames) {
      const sourcePath = path.join(namespacePath, sourceName);
      if (!fs.statSync(sourcePath).isDirectory()) continue;

      const sourceId = `${namespace}/${sourceName}`;
      if (filterSource && sourceId !== filterSource) continue;

      const versionDirs = fs.readdirSync(sourcePath);

      for (const version of versionDirs) {
        const versionPath = path.join(sourcePath, version);
        if (!fs.statSync(versionPath).isDirectory()) continue;

        const files = fs.readdirSync(versionPath);
        const jsFile = files.find((f) => f.endsWith(".js"));
        const manifestPath = path.join(versionPath, "manifest.yaml");

        if (jsFile && fs.existsSync(manifestPath)) {
          const indexPath = path.join(versionPath, jsFile);
          sources.push({
            author: namespace,
            sourceName,
            sourcePath: versionPath,
            manifestPath,
            indexPath,
            version,
          });
        }
      }
    }
  }

  return sources;
}

function getExistingVersions(author: string, sourceName: string): Set<string> {
  const distPath = path.join(DIST_DIR, author, sourceName);
  const versions = new Set<string>();

  if (!fs.existsSync(distPath)) {
    return versions;
  }

  const files = fs.readdirSync(distPath);
  for (const file of files) {
    // Match version patterns like "1.0.0.gwsrc"
    const match = file.match(/^(\d+\.\d+\.\d+)\.gwsrc$/);
    if (match) {
      versions.add(match[1]);
    }
  }

  return versions;
}

async function createZip(
  outputPath: string,
  files: { name: string; content: string | Buffer }[],
): Promise<void> {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", resolve);
    archive.on("error", reject);

    archive.pipe(output);

    for (const file of files) {
      archive.append(file.content, { name: file.name });
    }

    archive.finalize();
  });
}

async function buildJsSource(source: SourceInfo): Promise<boolean> {
  const existingVersions = getExistingVersions(
    source.author,
    source.sourceName,
  );

  if (existingVersions.has(source.version)) {
    console.log(
      `  ⏭️  ${source.author}/${source.sourceName}@${source.version} already exists, skipping`,
    );
    return false;
  }

  console.log(
    `  📦 Building ${source.author}/${source.sourceName}@${source.version}`,
  );

  // Read JS source as-is
  const compiledJs = fs.readFileSync(source.indexPath, "utf-8");

  // Read manifest
  const manifestContent = fs.readFileSync(source.manifestPath, "utf-8");

  // Create dist directory
  const distPath = path.join(DIST_DIR, source.author, source.sourceName);
  fs.mkdirSync(distPath, { recursive: true });

  // Create versioned .gwsrc (zip archive with .gwsrc extension)
  const versionedPath = path.join(distPath, `${source.version}.gwsrc`);
  await createZip(versionedPath, [
    { name: "manifest.yaml", content: manifestContent },
    { name: "index.js", content: compiledJs },
  ]);

  // Create/update latest.gwsrc
  const latestPath = path.join(distPath, "latest.gwsrc");
  fs.copyFileSync(versionedPath, latestPath);

  console.log(`  ✅ Created ${source.version}.gwsrc and latest.gwsrc`);
  return true;
}

async function main() {
  const args = parseArgs();

  console.log("🔍 Scanning sources...\n");
  const sources = scanSources(args.source);

  if (sources.length === 0) {
    console.log("No sources found to build");
    return;
  }

  console.log(`Found ${sources.length} source(s)\n`);

  const results = await Promise.allSettled(
    sources.map((source) => buildJsSource(source)),
  );

  let built = 0;
  let skipped = 0;

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status === "fulfilled") {
      if (result.value) {
        built++;
      } else {
        skipped++;
      }
    } else {
      const source = sources[i];
      console.error(
        `  ❌ Error building ${source.author}/${source.sourceName}:`,
        result.reason,
      );
    }
  }

  console.log(`\n✨ Done! Built: ${built}, Skipped: ${skipped}`);
}

main().catch(console.error);
