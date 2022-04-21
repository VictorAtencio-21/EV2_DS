const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rfs = require("rotating-file-stream");
const app = express();
const {authToken, Admin} = require('../AuthService/utils/auth');

//Local Imports
require('./utils/database').connect();
require ('dotenv').config();

const Cars = require('./models/Cars')

//Settings
const PORT = process.env.PORT || 2010;
const HOST = process.env.HOST || '127.0.0.1';

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
app.get('/cars', async (req, res) => {
    try {
        let cars = await Cars.find({});
        res.json(cars);
    } catch (err) {

    }
})

app.post('/post', authToken, Admin, async (req, res) => {
    const { brand, model, year } = req.body;

    let newCar = new Cars({ brand, model, year });

    await newCar.save();

    return res.json({newCar});
})

app.delete('/del/:model', authToken, Admin, async (req, res) =>{
    try {
        const { model } = req.params

        const car = await Cars.findOne({ model });

        if (car){
            await car.delete();
            res.json({
                message: 'Car Deleted'
            })
        }
    } catch {

    }
})

app.listen(PORT, () => console.log(`API Server Running on http://${HOST}:${PORT}`))