import {readdir, readFile, writeFile} from 'node:fs/promises';
import {resolve, relative} from 'node:path';

const siteRoot = resolve(import.meta.dirname, '..');
const docsRoot = resolve(siteRoot, 'src/content/docs');
const pages = [];
const documents = [];

async function visit(directory) {
  for (const entry of (await readdir(directory, {withFileTypes: true})).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await visit(path);
    else if (/\.(md|mdx)$/.test(entry.name)) {
      const source = await readFile(path, 'utf8');
      const title = source.match(/^#\s+(.+)$/m)?.[1] ?? entry.name;
      const urlPath = relative(docsRoot, path).replace(/\\/g, '/').replace(/\.(md|mdx)$/, '');
      pages.push(`- [${title}](https://lynxus-project.github.io/docs/${urlPath})`);
      documents.push({path, title, urlPath, source});
    }
  }
}

await visit(docsRoot);
await writeFile(resolve(siteRoot, 'public/llms.txt'), [
  '# Lynxus documentation',
  '',
  'Canonical technical documentation is maintained in the Lynxus source repository.',
  'Pages are static, versioned, and intended for people and AI agents.',
  '',
  ...pages,
  '',
].join('\n'));
await writeFile(resolve(siteRoot, 'public/llms-full.txt'), [
  '# Lynxus documentation (full text)',
  '',
  'This machine-readable mirror is generated from the canonical Markdown in https://github.com/lynxus-project/lynxus/tree/main/docs.',
  'Use the linked HTML pages for navigation and the source repository for change history.',
  '',
  ...documents.flatMap(({title, urlPath, source}) => [
    `## ${title}`,
    `Source: https://lynxus-project.github.io/docs/${urlPath}`,
    '',
    source.trim(),
    '',
  ]),
].join('\n'));
console.log(`Generated agent index with ${pages.length} Markdown pages`);
