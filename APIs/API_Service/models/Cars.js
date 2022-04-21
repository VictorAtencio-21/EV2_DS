const mongoose = require('mongoose')
const {Schema, model} = require('mongoose')

const CarsSchema = new Schema(
    {
        brand: {type: String},
        model: {type: String},
        year: {type: String},
    }
)


module.exports = model('Cars', CarsSchema);