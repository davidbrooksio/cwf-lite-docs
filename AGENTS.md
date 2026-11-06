# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

`cwf-lite-docs` is the documentation site for the `cwf-lite` CSS framework,
built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)
and deployed to GitHub Pages at `/cwf-lite-docs`.

- `src/content/docs/` — the actual documentation pages (`.mdx`), one file per
  framework base/module/utility, mirroring `cwf-lite`'s `style/` layout
  (`base/`, `modules/`, `utilities/`)
- `src/components/CWFCode.astro` / `CWFComponent.astro` — render live,
  shadow-DOM-isolated examples of `cwf-lite` classes inside a doc page
  (`CWFComponent` injects `cwf-lite`'s built CSS, rewriting `:root` to `:host`
  so framework variables apply inside the shadow tree)
- `astro.config.mjs` — Starlight sidebar navigation; every `link` here must
  point at a real file under `src/content/docs/`
- `src/content.config.ts` — Starlight's `docsSchema()` validates frontmatter
  (`title` is required) at build time

The site depends on the published `cwf-lite` package (see
`dependencies.cwf-lite` in `package.json`) for the CSS used in live examples
— bump it when `cwf-lite` ships a new version that docs should reflect.

## Commands

```bash
npm run dev            # astro dev
npm run build           # astro build -> dist/ (also validates content frontmatter)
npm run preview
npm test                # vitest run
npm run test:watch
npm run lint             # eslint .
npm run lint:fix
npm run format           # prettier --write . (includes prettier-plugin-astro)
npm run format:check
```

## Tests

Tests in [`test/`](test/) are intentionally lightweight and don't invoke
Astro — `npm run build` (run in CI, see below) is the real end-to-end check
and will fail on broken MDX, invalid frontmatter per `docsSchema()`, or
broken imports.

- `test/sidebar-links.test.js` — every `link:` entry in `astro.config.mjs`
  resolves to an existing file under `src/content/docs/`. Catches the
  classic "renamed/moved a doc page, forgot to update the sidebar" bug.
- `test/content-frontmatter.test.js` — every `.mdx` under `src/content/docs/`
  has a non-empty `title` in its frontmatter.

When adding a new doc page: add the content file under `src/content/docs/`
_and_ a corresponding sidebar entry in `astro.config.mjs` — both tests above
will fail otherwise, by design.

## Conventions

- New doc pages need frontmatter with at least `title`, `description`, and
  `lastUpdated`.
- Live examples use `<CWFCode code={...} style={...} />`, importing the raw
  CSS partial from `cwf-lite` with `?raw` (e.g.
  `import cssExample from "cwf-lite/style/bases/root.css?raw"`).
- Run `npm run format` and `npm run lint` before committing — CI enforces both.

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push/PR
to `master`: install, lint, format check, test, build. Separately,
[`.github/workflows/astro.yml`](.github/workflows/astro.yml) builds and
deploys to GitHub Pages on push to `master` — it does not gate merges, so
`ci.yml` is the check that should catch problems first.
