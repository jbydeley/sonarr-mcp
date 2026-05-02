# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common commands

- `npm run build` — clean `dist/`, run `tsc`, then `tsc-alias` to rewrite the `@/*` path alias into relative paths, then mark `dist/src/main.js` executable. The build excludes `__specs__/` directories.
- `npm start` — run the server locally over stdio via `tsx`. Requires `SONARR_URL` and `SONARR_API_KEY` in env or `.env`.
- `npm test` — run the full vitest suite once. Vitest's `root` is `./src`, so its CWD is the source tree (see `vitest.config.ts`).
- `npm run test:watch` — vitest watch mode.
- Run a single test file: `npx vitest run common/__specs__/sonarr.http-client.spec.ts` (path is relative to `src/` because of the vitest root). Or pass a name filter: `npx vitest run -t 'search-series'`.
- `npm run lint` / `npm run lint:fix` — Biome lints `src/**` and `test/**`. Formatter uses single quotes and spaces (see `biome.json`).

`test/setup-env.ts` injects placeholder `SONARR_URL`/`SONARR_API_KEY` so `src/common/env.ts` (which calls `process.exit(1)` on missing vars) doesn't kill the test process at import time.

## Architecture

This is an MCP (Model Context Protocol) server that exposes Sonarr's HTTP API as tools and resources for MCP clients (e.g. Claude Desktop). It runs over stdio.

**Layered design — keep this separation when adding features:**

1. **Transport / wiring** — `src/main.ts` → `src/api/index.ts` connects an `McpServer` (built in `src/api/server.ts`) to a `StdioServerTransport`. `server.ts` iterates the arrays exported from `src/registry.ts` and calls `registerTool` / `registerResource`. Adding a new tool means appending to that registry, not touching the server file.

2. **Tools and resources** — `src/tools/*.ts` and `src/resources/*.ts`. Each tool exports a Zod schema (`...Schema`) and a handler (`...Handler`). Handlers stay thin: build the gateway via `createSonarrGateway()`, then return `runSonarrTool(gateway.someMethod(...), optionalFormatter)`. Both helpers live in `src/common/mcp-helpers.ts`.

3. **Sonarr access** — split into two pieces on purpose:
   - `SonarrHttpClient` (`src/common/sonarr.http-client.ts`) — generic `get<T>` / `post<T>` wrapper around `fetch` with the `X-Api-Key` header, a 10s `AbortSignal.timeout`, JSON parsing, and optional debug logging to stderr. It knows nothing about Sonarr endpoints.
   - `SonarrGateway` (`src/common/sonarr.gateway.ts`) — owns every Sonarr API path. All `/api/v3/...` URLs and the `toUrlParams` query-string assembly live here; tools and resources never construct paths themselves.

4. **`runSonarrTool` contract** — accepts `Promise<T>` (not a thunk) plus an optional formatter `(T) => CallToolResult`. It awaits, formats, and translates thrown errors into `{ isError: true, content: [...] }` MCP results. Handlers therefore call `gateway.x(...)` eagerly and pass the resulting promise in.

5. **Entities** — `src/common/entities/*.ts` are plain TypeScript interfaces describing Sonarr API shapes. They're excluded from coverage (`vitest.config.ts`) and from biome formatting they're treated like any other source.

**Module resolution:** `tsconfig.json` uses `module: NodeNext` with `paths: { "@/*": ["./src/*"] }`. Imports must include `.js` extensions (NodeNext rule, even from `.ts` sources). The `@/...` alias works at compile time and in tests (via `vite-tsconfig-paths`); `tsc-alias` rewrites aliases to relative paths in the build output so the published package doesn't need a runtime resolver.

**Env handling:** `src/common/env.ts` parses `process.env` once at import with Zod and exits the process on failure. Don't read env vars elsewhere — import `env` from this module. `SONARR_MCP_DEBUG=true` enables the per-request stderr log line.

## Testing conventions

- Tests live in `__specs__/` folders next to the code they cover (e.g. `src/tools/__specs__/search-series.tool.spec.ts`).
- HTTP is mocked with `nock` against `http://localhost:8989` (the test env's `SONARR_URL`). Tool/resource specs typically assert both schema parsing and that the handler hits the expected Sonarr path.
- Many specs use `afterEach` with `nock.isDone()` to fail if a registered interceptor was never called — keep that pattern when adding new specs.

## Release flow

Pushes to `main` trigger `.github/workflows/publish.yml`, which runs `semantic-release` (config in `release.config.cjs`). Versioning, the `CHANGELOG.md`, the npm publish, and the GitHub release are all driven by **Conventional Commit** messages on `main` — use `feat:`, `fix:`, `refactor:`, `docs:`, `chore:` etc. so the right version bump happens automatically. The published package ships only `dist/`, `README.md`, and `LICENSE` (see `package.json` `files`).
