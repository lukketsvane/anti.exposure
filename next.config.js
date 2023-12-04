const withNextra = require('nextra')('nextra-theme-blog', './theme.config.js');


const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/
  });
  module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'mdx', 'md']
  });

  module.exports = withNextra({
    pageExtensions: ['js', 'jsx', 'mdx', 'md']
  }

  );