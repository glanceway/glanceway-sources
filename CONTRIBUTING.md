# Contributing

Thanks for your interest in contributing a source to [Glanceway](https://glanceway.app)!

## Submitting a Source

[Open an issue](https://github.com/glanceway/glanceway-sources/issues) with a link to your source project repository. We'll review it and add it to the collection.

Or clone the repo and create a directory for your source under `sources/`, then open a pull request.

## Reference

- [JS Source Development](docs/js-source.md) — JavaScript source development

## Website Development

Run these commands from the repository root (Node.js 22 LTS recommended):

```bash
npm ci --prefix website
npm run dev
```

Open the local URL printed by Astro (normally http://localhost:4321). Changes in
`website/src/` reload automatically. To expose the server on your local network,
run `npm run dev -- --host`.

Build and preview the production website from the root:

```bash
npm run build:website
npm run check:website
npm run preview:website
```

Website release settings, hostname redirects, and Search Console verification are
documented in [website/DEPLOYMENT.md](website/DEPLOYMENT.md).
