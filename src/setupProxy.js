const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://sg-openapi.keruyun.com/open/v1',
      changeOrigin: true,
    })
  );
};