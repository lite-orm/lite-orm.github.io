import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';

const sourceRoot = resolve(process.env.LITEORM_SOURCE_DIR ?? resolve(import.meta.dirname, '../lite-orm'));
const contributeItem = existsSync(resolve(sourceRoot, 'docs/contribute.md')) ? ['docs/contribute'] : [];

export default defineConfig({
  site: 'https://lite-orm.github.io',
  integrations: [starlight({
    title: 'LiteORM',
    description: 'Compile-time SQL mapping for explicit Java and JDBC systems.',
    social: [{icon: 'github', label: 'GitHub', href: 'https://github.com/lite-orm/lite-orm'}],
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
    editLink: {baseUrl: 'https://github.com/lite-orm/lite-orm/edit/main/docs/'},
    pagination: true,
    lastUpdated: true,
    head: [
      {tag: 'meta', attrs: {name: 'keywords', content: 'Java SQL mapper, compile-time SQL, JDBC, MyBatis alternative, Spring Boot'}},
      {tag: 'script', attrs: {type: 'application/ld+json'}, content: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'SoftwareSourceCode', name: 'LiteORM',
        description: 'Compile-time SQL mapping for explicit Java and JDBC systems.',
        codeRepository: 'https://github.com/lite-orm/lite-orm', programmingLanguage: 'Java',
        license: 'https://www.apache.org/licenses/LICENSE-2.0', url: 'https://lite-orm.github.io',
      })},
    ],
  })],
});
