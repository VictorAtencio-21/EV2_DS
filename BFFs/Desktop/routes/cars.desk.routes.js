const express = require('express');
const router = express.Router();
const axios = require('axios').default;

require('dotenv').config();

//Proxy Routes
const auth = process.env.AUTH
const api = process.env.API

//Desktop Routes
router.post('/desk/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await axios.post(auth + 'login',{
            email: email,
            password: password
        });
        res.json(response.data);
    } catch (err) {
        console.log(err)
    }
})

router.post('/desk/signup', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const response = await axios.post(auth + 'register',{
            email: email,
            password: password,
            admin: role
        });
        res.json(response.data);
    } catch (err) {
        console.log(err)
    }
})

router.get('/desk/allcars', async (req, res) => {
    try {
        const response = await axios.get(api + 'cars');
        res.json(response.data);
    } catch (err) {
        console.log(err)
    }
})

router.post('/desk/addcar', async (req, res) => {
    const { brand, model, year } = req.body;

    try {
        const response = await axios.post(api + 'post',{
            brand: brand,
            model: model,
            year: year
        });
        res.json(response.data);
    } catch (err) {
        console.log(err)
    }
})

router.delete('/desk/deletecar/:model', async (req, res) => {
   
    try {
        const response = await axios.delete(api + 'del/:model');
        res.json(response.data);
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;