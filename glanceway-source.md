---
name: glanceway-source
description: Help users create new Glanceway source plugins (YAML or JavaScript)
---

# Glanceway Source Development

Help users create new source plugins for the Glanceway macOS menu bar app. The end goal is always a `.gwsrc` file that users can import directly into Glanceway via "Import from File".

## Workflow

1. Ask the user what data they want to display (which API/service)
2. Decide YAML vs JavaScript based on requirements
3. Create the source files
4. Package into a `.gwsrc` file
5. Tell the user to import via Glanceway > Sources > Import from File

## Decision Guide: YAML vs JavaScript

**Use a YAML source** when:
- Data comes from a single JSON API endpoint
- You only need simple field mapping from the response
- No complex data transformation, pagination, or conditional logic is required

**Use a JavaScript source** when:
- You need multiple API calls or conditional logic
- You need complex data transformations (e.g., URL rewriting, combining fields)
- You need WebSocket connections for real-time data
- You need pagination or OAuth flows
- You need persistent storage between refreshes

When in doubt, start with YAML.

## Item Schema

Every source emits items with these fields:

| Field       | Type                   | Required | Description                              |
|-------------|------------------------|----------|------------------------------------------|
| `id`        | string                 | Yes      | Unique identifier                        |
| `title`     | string                 | Yes      | Main display text                        |
| `subtitle`  | string                 | No       | Secondary text below title               |
| `url`       | string                 | No       | Link opened on click                     |
| `timestamp` | Date / string / number | No       | ISO 8601, Unix timestamp, or Date object |

Always map a descriptive field to `subtitle` for maximum information at a glance.

## Creating & Packaging a YAML Source

A YAML source is a single `.yaml` file. To package it as `.gwsrc`, simply copy it with the new extension.

### 1. Create the YAML file

```yaml
version: 1.0.0
name: Display Name
description: Brief description
author: authorname
category: Developer  # Developer | News | Social | Finance | Entertainment | Productivity | Other

# Optional: user-configurable fields
# config:
#   - key: API_TOKEN
#     name: API Token
#     type: secret
#     required: true
#     description: Your API token

source:
  url: https://api.example.com/data
  method: GET
  # headers:
  #   Authorization: Bearer ${API_TOKEN}

parse:
  root: $.data
  mapping:
    id: $.id
    title: $.title
    subtitle: $.description
    url: $.link
    timestamp: $.created_at
```

### 2. Package as .gwsrc

```bash
cp my-source.yaml my-source.gwsrc
```

That's it. For YAML sources, the `.gwsrc` file is just the YAML file with a different extension.

### 3. Import

Tell the user: Open Glanceway > Sources > Import from File > select `my-source.gwsrc`.

## Creating & Packaging a JavaScript Source

A JavaScript source needs `manifest.yaml` + `index.js`, packaged as a ZIP with `.gwsrc` extension.

### 1. Create manifest.yaml

```yaml
version: 1.0.0
name: Display Name
description: Brief description
author: authorname
category: Developer
config:
  - key: API_TOKEN
    name: API Token
    type: secret
    required: true
    description: Your API token
```

### 2. Create index.js

```javascript
module.exports = async (api) => {
  const token = api.config.get("API_TOKEN");

  async function fetchData() {
    const res = await api.fetch("https://api.example.com/data", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok || !res.json) {
      throw new Error(`Failed to fetch (HTTP ${res.status})`);
    }
    api.emit(
      res.json.items.map((item) => ({
        id: item.id.toString(),
        title: item.title,
        subtitle: item.description,
        url: item.url,
        timestamp: item.created_at,
      }))
    );
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
```

### 3. Package as .gwsrc

ZIP the two files together (files must be at the root of the archive, not inside a subdirectory):

```bash
zip my-source.gwsrc manifest.yaml index.js
```

### 4. Import

Tell the user: Open Glanceway > Sources > Import from File > select `my-source.gwsrc`.

## Key Constraints

- **No external imports.** Sources cannot use `import` or `require`. All capabilities come from the `api` parameter.
- **Max 500 items** per emit.
- **Use `module.exports = async (api) => { ... }` pattern** — this is required.
- **Config values with `type: secret`** are stored in the macOS Keychain, never in plain text.
- **Read config in the outer closure**, not inside the fetch function. The script reloads on config change.
- **The `.gwsrc` ZIP must have files at the root** — no wrapper directory inside the archive.

## Config Field Types

| Type     | Description                         | Value type  |
|----------|-------------------------------------|-------------|
| `string` | Free-form text input                | `string`    |
| `number` | Numeric input                       | `string`    |
| `boolean`| Toggle switch                       | `string`    |
| `secret` | Stored in macOS Keychain            | `string`    |
| `select` | Dropdown (requires `options` list)  | `string`    |
| `list`   | Multiple string values              | `string[]`  |

## Categories

Use one of: `Developer`, `News`, `Social`, `Finance`, `Entertainment`, `Productivity`, `Other`.

# YAML Source Reference

## Source Configuration

### URL and Method

```yaml
source:
  url: https://api.example.com/data
  method: GET  # GET, POST, PUT, DELETE (default: GET)
```

### Headers

```yaml
source:
  url: https://api.example.com/data
  headers:
    Authorization: Bearer ${API_TOKEN}
    Accept: application/json
```

### Body (POST/PUT)

```yaml
source:
  url: https://api.example.com/data
  method: POST
  headers:
    Content-Type: application/json
  body: |
    {
      "query": "search term",
      "limit": 20
    }
```

## Parse Section

Use dot-notation paths to extract data from JSON responses. Only simple property access is supported — no array operators, no wildcards, no recursive descent.

### Path Syntax

| Expression   | Description                                          |
|--------------|------------------------------------------------------|
| `$`          | Entire response (use when response is a top-level array) |
| `$.property` | Child property of root object                        |
| `$.a.b.c`   | Nested property access via dot notation              |

### Base URL

```yaml
parse:
  root: $.items
  mapping:
    id: $.id
    title: $.title
    url: $.path
  baseUrl: https://example.com  # prepends to relative url paths
```

### Filters

```yaml
parse:
  root: $.data
  mapping:
    id: $.id
    title: $.title
  filter:
    - field: $.type
      equals: "article"
    - field: $.status
      notEquals: "draft"
```

## Complete YAML Example

```yaml
version: 1.0.0
name: Dev.to
description: Top articles from Dev.to
author: example
category: Developer
tags:
  - dev
  - articles

source:
  url: https://dev.to/api/articles?per_page=500&top=7
  method: GET

parse:
  root: $
  mapping:
    id: $.id
    title: $.title
    subtitle: $.description
    url: $.url
    timestamp: $.published_at
```

# JavaScript Source Reference

## API Object

The API object is passed to your source's exported function:

```javascript
module.exports = async (api) => {
  async function fetchData() {
    /* fetch, transform, emit */
  }

  await fetchData();

  return {
    refresh: fetchData,
    stop() { /* optional cleanup */ },
  };
};
```

## api.emit(items)

Sends items to Glanceway for display. See Item Schema above for fields.

Timestamp formats (all valid):

```javascript
timestamp: "2024-01-15T10:30:00Z"  // ISO 8601
timestamp: 1705315800              // Unix seconds
timestamp: 1705315800000           // Unix milliseconds
timestamp: new Date()              // Date object
```

## api.fetch(url, options?)

Makes HTTP requests.

Options: `method` (default `"GET"`), `headers` (object), `body` (string), `timeout` (default 30000ms).

Response: `ok` (boolean), `status` (number), `headers` (object), `text` (string), `json` (parsed if valid), `error` (string).

```javascript
const res = await api.fetch("https://api.example.com/data", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: "Bearer token" },
  body: JSON.stringify({ query: "search" }),
});
if (res.ok && res.json) {
  // use res.json
}
```

## api.log(level, message)

Levels: `"info"`, `"error"`, `"warn"`, `"debug"`.

## api.storage

Persistent key-value storage. Survives between refreshes and app restarts.

- `api.storage.get(key)` — Returns stored string or `undefined`.
- `api.storage.set(key, value)` — Stores a string value.

Use cases: tracking last seen ID, caching data, pagination cursors.

## api.config

- `api.config.get(key)` — Get a user-configured value by key.
- `api.config.getAll()` — Get all config values as a key-value map.

Read config **in the outer closure**, not inside the fetch function.

## api.websocket.connect(url, callbacks)

Callbacks: `onConnect(connection)`, `onMessage(data)`, `onError(error)`, `onClose(code)`.

Connection object: `send(message)`, `close()`.

```javascript
module.exports = async (api) => {
  const ws = await api.websocket.connect("wss://stream.example.com", {
    onConnect(conn) { conn.send(JSON.stringify({ type: "subscribe" })); },
    onMessage(data) {
      const event = JSON.parse(data);
      api.emit([{ id: event.id, title: event.message }]);
    },
    onError(error) { api.log("error", error); },
    onClose(code) { api.log("info", `Closed: ${code}`); },
  });

  return { stop() { ws.close(); } };
};
```

## api.appVersion

Current Glanceway app version string (e.g., `"1.2.0"`).

## Source Lifecycle

1. **Start phase**: Exported function runs on load. Await initial fetch before returning. `refresh()` is NOT called on initial load.
2. **Refresh phase**: `refresh()` called periodically based on user settings.
3. **Stop phase**: `stop()` called when source is removed. Use for cleanup.

## Code Conventions

- Define pure utility functions at module top, before `module.exports`.
- Read config in the outer closure (script reloads on config change).
- Use `Promise.allSettled` (never `Promise.all`) for parallel requests.
- Check `res.ok && res.json` before using response data. Throw on failure for main requests; skip silently for parallel sub-requests.
