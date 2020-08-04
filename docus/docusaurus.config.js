module.exports = {
  title: 'Covid-19 Dashboard',
  tagline: 'More than numbers, we hope to help answer essential questions.',
  url: 'https://github.com/EP-Visual-Design/covid19-dashboard',
  baseUrl: '/covid19-document/',
  // baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'EP-Visual-Design', // Usually your GitHub org/user name.
  projectName: 'covid19-dashboard', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'covid19-document',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo192.png',
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Pages',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/EP-Visual-Design/covid19-dashboard.git',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs - Test',
        //   items: [
        //     {
        //       label: 'Style Guide',
        //       to: 'docs/',
        //     },
        //     {
        //       label: 'Second Doc',
        //       to: 'docs/doc2/',
        //     },
        //   ],
        // },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/docusaurus',
        //     },
        //   ],
        // },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'Blog',
        //       to: 'blog',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/facebook/docusaurus',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} John Henry Thompson.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'd00-doc',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/EP-Visual-Design/covid19-dashboard/edit/master/edition/docus/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/EP-Visual-Design/covid19-dashboard/edit/master/edition/docus/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
