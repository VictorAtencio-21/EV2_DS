const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");

//Settings
const PORT = process.env.PORT || 2040;
const HOST = process.env.HOST || '127.0.0.1';

//Local Import
const carMobRoutes = require('./routes/cars.mob.routes')

//Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({
    origin: "*",
    credentials: true,
}));

// MORGAN SETUP
// create a log stream
const rfsStream = rfs.createStream('../../logs.txt', {
    size: '10M', // rotate every 10 MegaBytes written
    interval: '1d', // rotate daily
    compress: 'gzip' // compress rotated files
  })
  
  // add log stream to morgan to save logs in file
  app.use(morgan('common', {
    stream: rfsStream
  }));

//Routes
app.get('/mob', async (req, res) => {
    res.json({
        message: 'Hello, BFF for Mobile Running'
    })
})

app.use(carMobRoutes);

//Init Server
app.listen(PORT, () => console.log(`Mobile Server Running on http://${HOST}:${PORT}`))