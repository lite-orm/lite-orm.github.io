# LiteORM documentation site

The site is built with Docusaurus and deployed by GitHub Actions to GitHub Pages.
User and reference Markdown remain canonical in the private `lite-orm` repository;
the workflow checks out the selected ref and builds a Pages artifact without committing
generated files.

## Cross-repository access

Because `lite-orm` is private, configure a repository secret named `LITEORM_READ_TOKEN`
in this repository. It must be a fine-grained token that can read the LiteORM repository
(Contents: read). The workflow uses it only for the documentation checkout.

## Machine-readable documentation

The build publishes `/llms.txt` as a concise index and `/llms-full.txt` as a generated
plain-text mirror for search and AI agents. These files are derived artifacts; edit the
canonical Markdown in `lite-orm` instead.

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

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

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub Pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
