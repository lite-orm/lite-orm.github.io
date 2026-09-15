import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';

const sourceRoot = resolve(process.env.LYNXUS_SOURCE_DIR ?? resolve(import.meta.dirname, '../lynxus'));
const contributeItem = existsSync(resolve(sourceRoot, 'docs/contribute.md')) ? ['docs/contribute'] : [];

export default defineConfig({
  site: 'https://lynxus-project.github.io',
  integrations: [starlight({
    title: 'Lynxus Docs',
    titleDelimiter: '-',
    description: 'AOT-first compile-time Java ORM with explicit JDBC execution and a generated path suitable for GraalVM Native Image or Spring Boot AOT applications.',
    social: [{icon: 'github', label: 'GitHub', href: 'https://github.com/lynxus-project/lynxus'}],
    defaultLocale: 'root',
    locales: {root: {label: 'English', lang: 'en'}, 'zh-CN': {label: '简体中文', lang: 'zh-CN'}},
    sidebar: [
      {label: 'Start here', items: ['docs', 'docs/user/getting-started', 'docs/user/architecture', ...contributeItem]},
      {label: 'Core', items: ['docs/user/core', 'docs/user/core/mapping', 'docs/user/core/extensions', 'docs/user/core/standalone']},
      {label: 'Integrations', items: ['docs/user/spring', 'docs/user/spring/spring-boot']},
      {label: 'Migration', items: ['docs/user/migration', 'docs/user/migration/from-mybatis', 'docs/user/migration/using-migration-skill']},
      {label: 'Reference', items: ['docs/reference/core-contract', 'docs/reference/extensions', 'docs/reference/mybatis-compatibility']},
    ],
    customCss: ['./src/styles/starlight.css'],
    editLink: {baseUrl: 'https://github.com/lynxus-project/lynxus/edit/main/docs/'},
    pagination: true,
    lastUpdated: true,
    head: [
      {tag: 'meta', attrs: {name: 'keywords', content: 'compile-time Java ORM, GraalVM Native Image Java ORM, MyBatis alternative compile-time, zero reflection JDBC Java, Spring Boot AOT ORM, Lynxus'}},
      {tag: 'meta', attrs: {property: 'og:image', content: 'https://lynxus-project.github.io/img/lynxus-social-card.svg'}},
      {tag: 'meta', attrs: {property: 'og:image:type', content: 'image/svg+xml'}},
      {tag: 'meta', attrs: {property: 'og:image:width', content: '1200'}},
      {tag: 'meta', attrs: {property: 'og:image:height', content: '630'}},
      {tag: 'meta', attrs: {property: 'og:image:alt', content: 'Lynxus - Compile-time Java ORM. SQL mapping, made visible.'}},
      {tag: 'meta', attrs: {name: 'twitter:image', content: 'https://lynxus-project.github.io/img/lynxus-social-card.svg'}},
      {tag: 'meta', attrs: {name: 'twitter:image:alt', content: 'Lynxus - Compile-time Java ORM. SQL mapping, made visible.'}},
      {tag: 'script', attrs: {type: 'application/ld+json'}, content: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'SoftwareSourceCode', name: 'Lynxus',
        description: 'AOT-first compile-time Java ORM with explicit JDBC execution and a generated path suitable for GraalVM Native Image or Spring Boot AOT applications.',
        codeRepository: 'https://github.com/lynxus-project/lynxus', programmingLanguage: 'Java',
        license: 'https://www.apache.org/licenses/LICENSE-2.0', url: 'https://lynxus-project.github.io',
        image: 'https://lynxus-project.github.io/img/lynxus-social-card.svg',
      })},
    ],
  })],
});
