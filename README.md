# LiteORM documentation site

The site is built with Astro and Starlight and deployed by GitHub Actions to GitHub Pages.
The `lite-orm` code repository is the single canonical owner of technical Markdown.
This repository owns only presentation, navigation, theme, and build configuration.
The workflow checks out the selected ref and builds a Pages artifact without committing
the generated documentation mirror.

## Cross-repository access

Because `lite-orm` is private, configure a repository secret named `LITEORM_READ_TOKEN`
in this repository. It must be a fine-grained token that can read the LiteORM repository
(Contents: read). The workflow uses it only for the documentation checkout.

## Machine-readable documentation

The build publishes `/llms.txt` as a concise index and `/llms-full.txt` as a generated
plain-text mirror for search and AI agents. These files are derived artifacts; edit the
canonical Markdown in `lite-orm` instead.

## Installation

```bash
npm install
```

**Note**: feel free to use the package manager of your choice.

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `dist` directory and can be served using any static contents hosting service.

## Deployment

GitHub Actions uploads `dist/` as a Pages artifact and deploys it with the official Pages actions.
