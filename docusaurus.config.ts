import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'LiteORM',
  tagline: 'Compile-time SQL mapping for explicit Java and JDBC systems',
  favicon: 'img/favicon.ico',
  url: 'https://lite-orm.github.io',
  baseUrl: '/',
  trailingSlash: false,
  organizationName: 'lite-orm',
  projectName: 'lite-orm.github.io',
  onBrokenLinks: 'throw',
  i18n: {defaultLocale: 'en', locales: ['en', 'zh-Hans']},
  presets: [
    ['classic', {
      docs: {
        path: './docs',
        routeBasePath: 'docs',
        sidebarPath: './sidebars.ts',
        editUrl: 'https://github.com/lite-orm/lite-orm/tree/main/docs/',
      },
      blog: {
        showReadingTime: true,
        editUrl: 'https://github.com/lite-orm/lite-orm.github.io/tree/main/blog/',
      },
      sitemap: {
        changefreq: 'weekly',
        priority: 0.5,
      },
      theme: {customCss: './src/css/custom.css'},
    } satisfies Preset.Options],
  ],
  themeConfig: {
    image: 'img/liteorm-social-card.svg',
    colorMode: {respectPrefersColorScheme: true},
    navbar: {
      title: 'LiteORM',
      logo: {alt: 'LiteORM logo', src: 'img/logo.svg'},
      items: [
        {type: 'docSidebar', sidebarId: 'docsSidebar', position: 'left', label: 'Documentation'},
        {to: '/docs/user/migration/from-mybatis', label: 'Migration', position: 'left'},
        {to: '/docs/user/spring/spring-boot', label: 'Spring Boot', position: 'left'},
        {type: 'localeDropdown', position: 'right'},
        {href: 'https://github.com/lite-orm/lite-orm', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {title: 'Docs', items: [
          {label: 'Getting started', to: '/docs/user/getting-started'},
          {label: 'Architecture', to: '/docs/user/architecture'},
          {label: 'Reference', to: '/docs/reference/core-contract'},
        ]},
        {title: 'Project', items: [
          {label: 'Examples', href: 'https://github.com/lite-orm/lite-orm/tree/main/lite-orm-examples'},
          {label: 'GitHub', href: 'https://github.com/lite-orm/lite-orm'},
        ]},
      ],
      copyright: `Copyright © ${new Date().getFullYear()} LiteORM contributors.`,
    },
    prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula},
  } satisfies Preset.ThemeConfig,
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content: 'Java SQL mapper, compile-time SQL, JDBC, MyBatis alternative, Spring Boot',
      },
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'LiteORM',
        description: 'Compile-time SQL mapping for explicit Java and JDBC systems.',
        codeRepository: 'https://github.com/lite-orm/lite-orm',
        programmingLanguage: 'Java',
        license: 'https://www.apache.org/licenses/LICENSE-2.0',
        url: 'https://lite-orm.github.io',
      }),
    },
  ],
};

export default config;
