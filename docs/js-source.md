# JavaScript Source Development

JavaScript sources provide full control over data fetching and processing.

## Create Sources with AI

Add [`glanceway-source.md`](../glanceway-source.md) as a skill in Claude Desktop or Claude Code, then ask it to create a source for any API or service. It knows the full Glanceway source spec and will generate a ready-to-import `.gwsrc` file.

## Getting Started

Create a directory with a `manifest.yaml` and an `index.js` file.

If you want to develop in TypeScript, or have an AI agent build the source for you, use [`create-glanceway-source`](https://github.com/glanceway/create-glanceway-source) to scaffold a project with build tooling, type definitions, and a CLAUDE.md for AI agents:

```bash
npm create glanceway-source
```

## manifest.yaml

Every JavaScript source requires a `manifest.yaml` file:

```yaml
version: 1.0.0 # Required: semantic version
name: Display Name # Required: shown in Glanceway
description: Brief summary # Required
author: yourname # Required
author_url: https://... # Optional
category: Developer # Required: Developer | News | Social | Finance | Entertainment | Productivity | Other
tags: # Optional
  - tag1
  - tag2
min_app_version: 1.2.0 # Optional: minimum Glanceway app version required
config: # Optional: user-configurable values
  - key: API_TOKEN
    name: API Token
    type: secret # string, number, boolean, secret, select, list, or multiselect
    required: true
    description: Your API token
  - key: TAGS
    name: Tags
    type: list # list for string arrays (multiple values)
    required: false
    description: Tags to filter by
  - key: SORT
    name: Sort Order
    type: select # select requires options list
    required: false
    default: hot
    options:
      - hot
      - new
      - top
  - key: CURRENCY
    name: Currency
    type: select
    required: false
    default: usd
    options:              # options support label/value objects
      - label: US Dollar
        value: usd
      - label: Euro
        value: eur
  - key: CATEGORIES
    name: Categories
    type: multiselect     # like select but allows picking multiple options; stored as JSON array
    required: false
    options:
      - label: Technology
        value: tech
      - label: Science
        value: science
```

Config values defined here can be read in your source via `api.config.get("KEY")`.

## JavaScript API Reference

Complete reference for the Glanceway Source API.

### API Object

The API object is passed to your source's exported function:

```javascript
module.exports = async (api) => {
  async function fetchData() {
    /* fetch, transform, emit */
  }

  await fetchData();

  return {
    refresh: fetchData,
    stop() {
      /* optional cleanup */
    },
  };
};
```

---

### api.emit(items)

Sends information items to Glanceway for display.

#### InfoItem

| Field       | Type                   | Required | Description                                   |
| ----------- | ---------------------- | -------- | --------------------------------------------- |
| `id`        | string                 | Yes      | Unique identifier                             |
| `title`     | string                 | Yes      | Main display text                             |
| `subtitle`  | string                 | No       | Secondary text                                |
| `url`       | string                 | No       | Clickable link                                |
| `timestamp` | Date / string / number | No       | Item time (ISO 8601, Unix timestamp, or Date) |

#### Example

```javascript
api.emit([
  {
    id: "123",
    title: "New notification",
    subtitle: "From repository",
    url: "https://github.com/...",
    timestamp: "2024-01-15T10:30:00Z",
  },
]);
```

#### Timestamp Formats

All of these are valid:

```javascript
// ISO 8601 string
timestamp: "2024-01-15T10:30:00Z";

// Unix timestamp (seconds)
timestamp: 1705315800;

// Unix timestamp (milliseconds)
timestamp: 1705315800000;

// JavaScript Date object
timestamp: new Date();
```

---

### api.fetch(url, options?)

Makes HTTP requests.

#### FetchOptions

| Field     | Type   | Default | Description                                          |
| --------- | ------ | ------- | ---------------------------------------------------- |
| `method`  | string | `"GET"` | `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`, or `"PATCH"` |
| `headers` | object | —       | Key-value pairs for request headers                  |
| `body`    | string | —       | Request body                                         |
| `timeout` | number | `30000` | Timeout in milliseconds                              |

#### FetchResponse

| Field     | Type    | Description                     |
| --------- | ------- | ------------------------------- |
| `ok`      | boolean | `true` if status 200–299        |
| `status`  | number  | HTTP status code                |
| `headers` | object  | Response headers                |
| `text`    | string  | Raw response body               |
| `json`    | any     | Parsed JSON (if valid)          |
| `error`   | string  | Error message if request failed |

#### Examples

##### GET Request

```javascript
const response = await api.fetch("https://api.example.com/data");

if (response.ok && response.json) {
  const articles = response.json.items;
}
```

##### POST Request

```javascript
const response = await api.fetch("https://api.example.com/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer token123",
  },
  body: JSON.stringify({
    query: "search term",
  }),
});
```

##### With Timeout

```javascript
const response = await api.fetch("https://slow-api.example.com/data", {
  timeout: 60000, // 60 seconds
});
```

---

### api.log(level, message)

Logs messages for debugging. Levels: `"info"`, `"error"`, `"warn"`, `"debug"`.

#### Examples

```javascript
api.log("info", "Starting refresh");
api.log("debug", `Fetched ${items.length} items`);
api.log("warn", "Rate limit approaching");
api.log("error", "Failed to connect");
```

---

### api.storage

Persistent key-value storage that survives between refreshes and app restarts.

- `api.storage.get(key)` — Returns the stored string value, or `undefined` if not set.
- `api.storage.set(key, value)` — Stores a string value.

#### Use Cases

- Tracking last seen item ID
- Caching data between refreshes (e.g., company names)
- Storing pagination cursors
- Remembering state for change detection

---

### api.config

Access user-configured values defined in the `config` section of [manifest.yaml](#manifestyaml).

#### Examples

```javascript
module.exports = async (api) => {
  const token = api.config.get("API_TOKEN"); // string
  const tags = api.config.get("TAGS"); // string[]

  // Get all config values
  const allConfig = api.config.getAll();

  // ...
};
```

---

### api.appVersion

Current Glanceway app version string (e.g., `"1.2.0"`).

```javascript
api.log("info", `Running on Glanceway ${api.appVersion}`);
```

---

### api.websocket

Create WebSocket connections for real-time data.

`api.websocket.connect(url, callbacks)` accepts a URL and a callbacks object:

| Callback    | Arguments    | Description                                                         |
| ----------- | ------------ | ------------------------------------------------------------------- |
| `onConnect` | `connection` | Called when connected. Use `connection.send(msg)` to send messages. |
| `onMessage` | `data`       | Called when a message is received (string).                         |
| `onError`   | `error`      | Called on error (string).                                           |
| `onClose`   | `code`       | Called when connection closes (number).                             |

The returned connection object has `send(message)` and `close()` methods.

#### Example

```javascript
module.exports = async (api) => {
  const ws = await api.websocket.connect("wss://stream.example.com", {
    onConnect(connection) {
      api.log("info", "Connected");
      connection.send(JSON.stringify({ type: "subscribe" }));
    },

    onMessage(data) {
      const event = JSON.parse(data);
      api.emit([
        {
          id: event.id,
          title: event.message,
        },
      ]);
    },

    onError(error) {
      api.log("error", `Error: ${error}`);
    },

    onClose(code) {
      api.log("info", `Closed: ${code}`);
    },
  });

  return {
    stop() {
      ws.close();
    },
  };
};
```

---

### Source Export

Your source module must export an async function via `module.exports` that receives the API and returns an object with optional `refresh` and `stop` methods.

#### Start Phase

The exported function runs when the source is loaded. It should `await` the initial data fetch before returning. The app does NOT call `refresh()` on initial load.

```javascript
module.exports = async (api) => {
  async function fetchData() {
    // Fetch and emit data
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
```

#### refresh()

Called periodically based on user settings. NOT called on initial load.

#### stop()

Called when the source is stopped or removed. Use for cleanup (e.g., closing WebSocket connections).
