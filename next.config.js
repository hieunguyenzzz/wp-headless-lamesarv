module.exports =
    process.env.NODE_ENV === 'production'
        ? {
              reactStrictMode: true,
              trailingSlash: true,
              basePath: '/blog',
              outDir: './blog'
          }
        : {
              reactStrictMode: true,
              trailingSlash: true
          };
