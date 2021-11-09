module.exports =
    process.env.NODE_ENV === 'production'
        ? {
              reactStrictMode: true,
              trailingSlash: true,
              basePath: '/blog'
          }
        : {
              reactStrictMode: true,
              trailingSlash: true
          };