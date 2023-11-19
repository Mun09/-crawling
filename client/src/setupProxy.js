const {createProxyMiddleWare} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleWare("/api/data", {
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    )
}