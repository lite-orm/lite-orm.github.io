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
