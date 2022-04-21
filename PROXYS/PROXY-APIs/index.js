const express = require('express');
const app = express();
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

//Settings
const PORT = process.env.PORT || 2020;
const HOST = process.env.HOST || '127.0.0.1';

//URLs
const API_SERVICE_URL = process.env.API_SERVICE_URL
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL

//Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'));

//Routes
app.get('/info', (req, res, next) => {
    res.json({
        message: 'This is a proxy serving both Auth API and API Server.'
    })
});

//Proxy Endpoints
app.use('/cars', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/cars`]: '',
    },
}))

app.use('/auth', createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/auth`]: '',
    },
}))

app.listen(PORT, HOST, () => console.log(`Proxy Running on http://${HOST}:${PORT}`))