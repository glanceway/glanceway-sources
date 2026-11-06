# Deploying and verifying SEO changes

The existing website is deployed by the Cloudflare Pages GitHub integration for
`glanceway/glanceway-sources`, Pages project `glanceway-sources`. Reuse this project
and its existing production branch and build settings. Do not create a second site.

## Build and release

The existing Astro app builds to `website/dist` from the repository root:

```bash
npm ci --prefix website
npm run build:website
npm run check:website
```

If Pages uses `website` as its root directory, its build command is `npm run build`
and its output directory is `dist`. If its root is the repository root, the command
must install the website dependencies and run `npm run build:website`, with output
`website/dist`. Keep the already working configuration unless it differs from these
paths. Do not add an SPA wildcard rewrite such as `/* /index.html 200`.

Commit/push only with the user's explicit authorization. A push to the project's
configured production branch triggers the existing Pages deployment. Wait for the
Cloudflare Pages check to succeed before validating production.

`404.astro` produces the top-level `404.html` required by Pages to disable its SPA
fallback. Unknown paths should serve this page with HTTP 404, not the homepage with
HTTP 200. Preview servers may differ; validate the actual Pages deployment too.

## Redirect www to the canonical hostname

Pages `_redirects` does not support hostname-based redirects. In Cloudflare's
account-level Bulk Redirects, create this rule and enable its redirect list:

| Setting | Value |
| --- | --- |
| Source URL | `www.glanceway.app` |
| Target URL | `https://glanceway.app` |
| Status | `301` |
| Preserve query string | Enabled |
| Subpath matching | Enabled |
| Preserve path suffix | Enabled |
| Include subdomains | Disabled (only the exact www hostname is needed) |

Keep the existing working proxied DNS record for `www`. No DNS replacement is
needed if requests already reach Cloudflare. Do not redirect the apex back to www.

References:
- https://developers.cloudflare.com/pages/configuration/serving-pages/
- https://developers.cloudflare.com/pages/how-to/www-redirect/
- https://developers.cloudflare.com/pages/configuration/redirects/

## Search Console

Use the existing verified domain property for `glanceway.app` if available. A
verified domain property covers both hostnames. If HTML-tag verification is needed,
set the Pages build variable `PUBLIC_GOOGLE_SITE_VERIFICATION` to the exact value
provided by Google and rebuild; never insert a placeholder token. DNS verification
is managed in Cloudflare, outside this repository.

After release, submit `https://glanceway.app/sitemap-index.xml`. Inspect the homepage,
sources index, and selected source detail URLs with URL Inspection. Request indexing for
important changed pages; indexing is not guaranteed.

Compare the latest 28 days with the previous 28 days, separating brand queries
(`Glanceway`) from non-brand queries. Review impressions, clicks, CTR, and position
by query, page, and country. Improve pages with impressions but weak CTR or queries
where the page does not fully answer the user's task. Track App Store visits
separately from search impressions; they measure different parts of discovery.

## Production checks

```bash
curl -I https://glanceway.app/not-a-real-page-seo-check/
curl -I 'https://www.glanceway.app/zh/sources/?ref=seo-check'
curl -I https://glanceway.app/zh/sources/
```

Expected: an unknown path returns 404; www returns 301 to the same path/query on the
apex; an existing sources page returns 200. Check the deployed sitemap contains canonical
pages only, and that language pages no longer use automatic JavaScript redirects.
The root 404 page has `noindex` and is excluded from the sitemap.
