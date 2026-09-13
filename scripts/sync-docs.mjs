import {cp, mkdir, readdir, readFile, rm, writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';

const siteRoot = resolve(import.meta.dirname, '..');
const sourceRoot = resolve(process.env.LITEORM_SOURCE_DIR ?? resolve(siteRoot, '../lite-orm'));
const sourceDocs = resolve(sourceRoot, 'docs');
const targetDocs = resolve(siteRoot, 'src/content/docs');

if (!existsSync(sourceDocs)) {
  throw new Error(`LiteORM source docs not found at ${sourceDocs}. Set LITEORM_SOURCE_DIR.`);
}

await rm(targetDocs, {recursive: true, force: true});
await mkdir(targetDocs, {recursive: true});
await cp(resolve(sourceDocs, 'user'), resolve(targetDocs, 'user'), {recursive: true});
await cp(resolve(sourceDocs, 'reference'), resolve(targetDocs, 'reference'), {recursive: true});
await cp(resolve(sourceDocs, 'README.md'), resolve(targetDocs, 'index.md'));
const migrationIndex = resolve(targetDocs, 'user/migration/README.md');
if (existsSync(migrationIndex)) {
  const migrationSource = await readFile(migrationIndex, 'utf8');
  await writeFile(migrationIndex, migrationSource
    .replace('Classify each Mapper method before migrating it.', 'Classify each Mapper method before migrating it.\n\nFor project-wide or ambiguous changes, start with the [migration skill](/docs/user/migration/using-migration-skill).')
    .replace('](from-mybatis.md)', '](/docs/user/migration/from-mybatis)')
    .replace('](using-migration-skill.md)', '](/docs/user/migration/using-migration-skill)'));
}
await writeFile(resolve(targetDocs, 'index.md'), `---
sidebar_position: 1
title: Documentation
description: Learn LiteORM through task-oriented guides, architecture notes, and stable reference contracts.
slug: docs
---

# LiteORM documentation

LiteORM generates ordinary Java Mapper implementations at compile time and executes them through a fixed, explicit JDBC lifecycle. Start with the architecture below, then expand into the chapter that matches your task.

![LiteORM compile-time and runtime architecture](/assets/liteorm-architecture.svg)

The compiler owns stable decisions—SQL validation, parameter planning, dynamic SQL compilation, and result-shape checks. The generated Mapper then calls SqlExecutor, while JDBC connection, statement, mapping, and cleanup remain visible at runtime.

## Why teams choose LiteORM

LiteORM keeps the programming model small while moving stable work to compilation. The result is a runtime path that is easier to inspect, test, and operate.

| Concern | LiteORM approach | Practical benefit |
| --- | --- | --- |
| SQL validation | Annotation processing and javac diagnostics | Find invalid statements and signatures before deployment |
| Mapper dispatch | Generated Java implementations | No runtime proxy lookup on the request path |
| Type handling | Compile-time parameter and result planning | Fewer surprises from implicit conversions |
| Object mapping | Generated assemblers and typed row mappers | Readable code with explicit construction rules |
| Dynamic SQL | Supported expressions compiled into Java control flow | No runtime expression interpreter is required |
| Extension model | Narrow providers, binders, row mappers, and interceptors | Extend one responsibility without replacing the lifecycle |
| DataSource ownership | One Mapper belongs to one DataSource domain | Routing and transaction boundaries remain unambiguous |

## Choose your path

### Build your first Mapper

Start with dependencies, annotation processing, a small Mapper, and explicit runtime assembly.

[Quick start →](/docs/user/getting-started)

This chapter covers dependencies, annotation processing, a first Mapper, and explicit runtime assembly.

### Understand the architecture

See what moves to javac, what remains at runtime, and how generated code reaches JDBC.

[Read the architecture guide →](/docs/user/architecture)

This chapter explains compile-time generation, the generated source boundary, and the fixed JDBC lifecycle.

### Integrate with Spring Boot

Connect named Mapper packages to DataSource domains and participate in Spring transactions without hiding execution behind a session.

[Open the Spring Boot guide →](/docs/user/spring/spring-boot)

This chapter covers Mapper scanning, package-to-DataSource bindings, transactions, and routing boundaries.

### Migrate existing Mappers

Map supported patterns deliberately, understand compatibility boundaries, and identify cases that need an explicit extension.

[Read the migration guide →](/docs/user/migration/from-mybatis)

This chapter classifies supported patterns, deliberate non-goals, and explicit extension points.

## Go deeper

- [Core guides](/docs/user/core)
- [Reference contracts](/docs/reference/core-contract)
- [Spring and extension contracts](/docs/reference/extensions)
- [Compatibility matrix](/docs/reference/mybatis-compatibility)

## How the chapters fit together

| Chapter | What you will learn | Best next step |
| --- | --- | --- |
| User guides | Install, model, integrate, and migrate | [Start here](/docs/user) |
| Core reference | Mapper contracts and JDBC behavior | [Read the core contract](/docs/reference/core-contract) |
| Extensions | Providers, binders, row mappers, and interceptors | [Choose an extension](/docs/reference/extensions) |
| Compatibility | Supported patterns and explicit boundaries | [Check the matrix](/docs/reference/mybatis-compatibility) |

## Documentation principles

The source repository owns the canonical technical Markdown. This site adds navigation, search, bilingual presentation, stable URLs, and machine-readable indexes for people and AI agents.
`);
if (existsSync(resolve(sourceDocs, 'assets'))) {
  await cp(resolve(sourceDocs, 'assets'), resolve(siteRoot, 'public/assets'), {recursive: true});
}
if (existsSync(resolve(siteRoot, 'static/img'))) {
  await cp(resolve(siteRoot, 'static/img'), resolve(siteRoot, 'public/img'), {recursive: true});
}
for (const filename of ['robots.txt', '.nojekyll']) {
  if (existsSync(resolve(siteRoot, 'static', filename))) {
    await cp(resolve(siteRoot, 'static', filename), resolve(siteRoot, 'public', filename));
  }
}

async function rewriteLinks(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteLinks(path);
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      const source = await readFile(path, 'utf8');
      const withImages = source.replace(/!\[([^\]]*)\]\((?!https?:\/\/|#)([^)]+)\)/g, (match, alt, link) => {
        const [pathPart, anchor = ''] = link.split('#', 2);
        const sourceTarget = resolve(sourceDocs, relative(targetDocs, dirname(path)), pathPart);
        const assetRelative = relative(resolve(sourceDocs, 'assets'), sourceTarget).replace(/\\/g, '/');
        if (assetRelative.startsWith('../')) return match;
        return `![${alt}](/assets/${assetRelative}${anchor ? `#${anchor}` : ''})`;
      });
      const rewritten = withImages.replace(/\]\((?!https?:\/\/|#|\/)([^)]+)\)/g, (match, link) => {
        const [pathPart, anchor = ''] = link.split('#', 2);
        const sourceTarget = resolve(sourceDocs, relative(targetDocs, dirname(path)), pathPart);
        const docsRelative = relative(sourceDocs, sourceTarget).replace(/\\/g, '/');
        const repositoryPath = docsRelative.startsWith('../')
          ? docsRelative.replace(/^(\.\.\/)+/, '')
          : `docs/${docsRelative}`;
        const sitePath = repositoryPath.replace(/^docs\//, '/docs/').replace(/\/README$/, '');
        return `](${sitePath}${anchor ? `#${anchor}` : ''})`;
      });
      const normalized = rewritten
        .replace(/\]\(\/docs\/assets\//g, '](/assets/')
        .replace(/\]\(\/docs\/research\/([^)#]+)(#[^)]*)?\)/g, '](https://github.com/lite-orm/lite-orm/blob/main/docs/research/$1$2)')
        .replace(/\]\((\/docs)\/README(?:\.md)?(#[^)]*)?\)/g, ']($1$2)')
        .replace(/\]\((\/docs\/[^)#]+)\/README\.md(#[^)]*)?\)/g, ']($1$2)')
        .replace(/\]\((\/docs\/[^)#]+)\.md(#[^)]*)?\)/g, ']($1$2)');
      if (normalized !== source) await writeFile(path, normalized);
    }
  }
}

await rewriteLinks(targetDocs);

async function addStarlightFrontmatter(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await addStarlightFrontmatter(path);
    } else if (/\.(md|mdx)$/.test(entry.name) && path !== resolve(targetDocs, 'index.md')) {
      const source = await readFile(path, 'utf8');
      if (source.startsWith('---')) continue;
      const relativePath = relative(targetDocs, path).replace(/\\/g, '/').replace(/\.(md|mdx)$/, '');
      const slugPath = relativePath.endsWith('/README') ? relativePath.slice(0, -'/README'.length) : relativePath;
      const title = source.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? entry.name.replace(/\.(md|mdx)$/, '');
      await writeFile(path, `---\ntitle: ${title.replace(/[:#]/g, '')}\nslug: docs/${slugPath}\n---\n\n${source}`);
    }
  }
}

await addStarlightFrontmatter(targetDocs);

console.log(`Synced canonical LiteORM Markdown from ${sourceRoot}`);
