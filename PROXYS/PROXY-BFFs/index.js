const express = require('express');
const app = express();
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

//Settings
const PORT = process.env.PORT || 2050;
const HOST = process.env.HOST || '127.0.0.1';

//URLs
const DESKTOP = 'http://localhost:2030/'
const MOBILE = 'http://localhost:2040/'

//Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'));

//Routes
app.get('/info', (req, res, next) => {
    res.json({
        message: 'This is a proxy serving both BFFs Servers.'
    })
});

//Proxy Endpoints
app.use('/desk', createProxyMiddleware({
    target: DESKTOP,
    changeOrigin: true,
    pathRewrite: {
        [`^/desk`]: '',
    },
}))

app.use('/mob', createProxyMiddleware({
    target: MOBILE,
    changeOrigin: true,
    pathRewrite: {
        [`^/mob`]: '',
    },
}))

app.listen(PORT, HOST, () => console.log(`Proxy Running on http://${HOST}:${PORT}`))