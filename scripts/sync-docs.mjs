import {cp, mkdir, readdir, readFile, rm, writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {dirname, relative, resolve} from 'node:path';

const siteRoot = resolve(import.meta.dirname, '..');
const sourceRoot = resolve(process.env.LITEORM_SOURCE_DIR ?? resolve(siteRoot, '../lite-orm'));
const sourceDocs = resolve(sourceRoot, 'docs');
const targetDocs = resolve(siteRoot, 'docs');

if (!existsSync(sourceDocs)) {
  throw new Error(`LiteORM source docs not found at ${sourceDocs}. Set LITEORM_SOURCE_DIR.`);
}

await rm(targetDocs, {recursive: true, force: true});
await mkdir(targetDocs, {recursive: true});
await cp(resolve(sourceDocs, 'user'), resolve(targetDocs, 'user'), {recursive: true});
await cp(resolve(sourceDocs, 'reference'), resolve(targetDocs, 'reference'), {recursive: true});
await cp(resolve(sourceDocs, 'README.md'), resolve(targetDocs, 'index.md'));
await writeFile(resolve(targetDocs, 'index.md'), `---
sidebar_position: 1
title: Documentation
description: Learn LiteORM through task-oriented guides, architecture notes, and stable reference contracts.
---

# LiteORM documentation

LiteORM generates ordinary Java Mapper implementations at compile time and executes them through a fixed, explicit JDBC lifecycle. This documentation is organized around the work you need to do: get running, understand the model, integrate with Spring, or migrate from MyBatis.

## Choose your path

### Build your first Mapper

Start with dependencies, annotation processing, a small Mapper, and explicit runtime assembly.

[Quick start →](/docs/user/getting-started)

### Understand the architecture

See what moves to javac, what remains at runtime, and how generated code reaches JDBC.

[Read the architecture guide →](/docs/user/architecture)

### Integrate with Spring Boot

Connect named Mapper packages to DataSource domains and participate in Spring transactions without hiding execution behind a session.

[Open the Spring Boot guide →](/docs/user/spring/spring-boot)

### Migrate from MyBatis

Map supported patterns deliberately, understand compatibility boundaries, and identify cases that need an explicit extension.

[Read the migration guide →](/docs/user/migration/from-mybatis)

## Go deeper

- [Core guides](/docs/user/core)
- [Reference contracts](/docs/reference/core-contract)
- [Spring and extension contracts](/docs/reference/extensions)
- [MyBatis compatibility matrix](/docs/reference/mybatis-compatibility)

## Documentation principles

The source repository owns the canonical technical Markdown. This site adds navigation, search, bilingual presentation, stable URLs, and machine-readable indexes for people and AI agents.
`);
if (existsSync(resolve(sourceDocs, 'assets'))) {
  await cp(resolve(sourceDocs, 'assets'), resolve(siteRoot, 'static/assets'), {recursive: true});
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
        return `](https://github.com/lite-orm/lite-orm/blob/main/${repositoryPath}${anchor ? `#${anchor}` : ''})`;
      });
      if (rewritten !== source) await writeFile(path, rewritten);
    }
  }
}

await rewriteLinks(targetDocs);

console.log(`Synced canonical LiteORM Markdown from ${sourceRoot}`);
