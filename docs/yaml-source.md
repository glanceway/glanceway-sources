# YAML Source Development

YAML sources let you define data extraction rules for JSON APIs without writing code.

## Basic Structure

```yaml
# Required metadata
version: 1.0.0
name: Display Name
description: Brief description of the source
author: authorname
author_url: https://github.com/authorname
category: Developer
tags:
  - tag1
  - tag2

# Optional: User-configurable fields
config:
  - key: API_TOKEN
    name: API Token
    type: secret
    description: Your API token
    required: true

# HTTP source configuration
source:
  url: https://api.example.com/data
  method: GET
  headers:
    Authorization: Bearer ${API_TOKEN}

# Parsing rules
parse:
  root: $.data
  mapping:
    id: $.id
    title: $.name
    subtitle: $.description
    url: $.link
    timestamp: $.created_at
```

## Metadata Fields

| Field | Required | Description |
|-------|----------|-------------|
| `version` | Yes | Semantic version (e.g., `1.0.0`) |
| `name` | Yes | Display name shown in Glanceway |
| `description` | Yes | Brief description of the source |
| `author` | Yes | Author name (string) |
| `author_url` | No | Author URL (e.g., GitHub profile) |
| `category` | Yes | Category for grouping |
| `tags` | No | Array of tags for filtering |
| `min_app_version` | No | Minimum Glanceway app version required (e.g., `1.2.0`) |

## Categories

Use one of these standard categories:
- `Developer` - Development tools, GitHub, APIs
- `News` - News and media
- `Social` - Social media platforms
- `Finance` - Financial data and markets
- `Entertainment` - Games, videos, music
- `Productivity` - Task management, calendars
- `Other` - Anything else

## Configuration Fields

Define user-configurable values:

```yaml
config:
  - key: API_TOKEN
    name: API Token
    type: secret         # string, number, boolean, secret, select, list, or multiselect
    description: Your personal API token
    required: true

  - key: USERNAME
    name: Username
    type: string
    description: Optional username filter
    required: false

  - key: SORT
    name: Sort Order
    type: select         # select requires an options list
    description: Sort order for results
    required: false
    default: hot
    options:
      - hot
      - new
      - top

  - key: CURRENCY
    name: Currency
    type: select
    description: Display currency
    required: false
    default: usd
    options:             # options support label/value objects
      - label: US Dollar
        value: usd
      - label: Euro
        value: eur

  - key: CATEGORIES
    name: Categories
    type: multiselect    # like select but allows multiple; stored as JSON array
    description: Categories to show
    required: false
    options:
      - label: Technology
        value: tech
      - label: Science
        value: science
```

When a config field has a fixed set of possible values, use `type: select` with an `options` array instead of `type: string`. Options can be plain strings or label/value objects. Use `type: multiselect` when users should be able to pick multiple options.

Reference in source using `${KEY}`:

```yaml
source:
  url: https://api.example.com/users/${USERNAME}/data
  headers:
    Authorization: Bearer ${API_TOKEN}
```

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
    X-Custom-Header: value
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

Use dot-notation paths to extract data from JSON responses. Only simple property access is supported — no array operators (`[*]`, `[0:5]`), no wildcards, no recursive descent.

### Basic Extraction

```yaml
parse:
  root: $.data              # Dot-notation path to the array of items
  mapping:
    id: $.id                # Required: unique identifier
    title: $.title          # Required: main display text
    subtitle: $.description # Optional: secondary text
    url: $.url              # Optional: click URL
    timestamp: $.created_at # Optional: timestamp
```

### Path Syntax

| Expression | Description |
|------------|-------------|
| `$` | Entire response (use when response is a top-level array) |
| `$.property` | Child property of root object |
| `$.a.b.c` | Nested property access via dot notation |

### Examples

```yaml
# Response is a top-level array: [{...}, {...}]
parse:
  root: $
  mapping:
    id: $.id
    title: $.title

# Response has a nested array: {"data": {"results": [...]}}
parse:
  root: $.data.results
  mapping:
    title: $.content.title

# Each item has nested fields: [{"metadata": {"display_name": "..."}}]
parse:
  root: $.data
  mapping:
    title: $.metadata.display_name
```

### Base URL

Use `baseUrl` to prepend a base URL to relative paths extracted from the response:

```yaml
parse:
  root: $.items
  mapping:
    id: $.id
    title: $.title
    url: $.path             # e.g., "/articles/123"
  baseUrl: https://example.com  # url becomes "https://example.com/articles/123"
```

## Field Mappings

### Required Fields

| Field | Description |
|-------|-------------|
| `id` | Unique identifier for each item |
| `title` | Main display text |

### Optional Fields

| Field | Description |
|-------|-------------|
| `subtitle` | Secondary text below title |
| `url` | Link when item is clicked |
| `timestamp` | Time associated with item |

### Timestamp Formats

Supported timestamp formats:
- ISO 8601: `2024-01-15T10:30:00Z`
- Unix seconds: `1705315800`
- Unix milliseconds: `1705315800000`

## Filters

Filter items inside the `parse` section:

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

## Complete Example

```yaml
version: 1.0.0
name: Dev.to
description: Top articles from Dev.to
author: example
author_url: https://github.com/example
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

## Tips

1. **Start simple** - Begin with basic extraction, add filters later
2. **Check API docs** - Understand the API response structure first
3. **Use config for secrets** - Never hardcode API tokens
4. **Always use `subtitle`** - Map any descriptive text to subtitle for maximum information at a glance

## When to Use JavaScript Instead

Consider a JavaScript source when you need:
- Multiple API calls or conditional logic
- Complex data transformations (e.g., URL rewriting, combining fields)
- WebSocket connections
- Pagination or OAuth
- Persistent storage between refreshes

See [JS Source Development](./js-source.md) for more.
