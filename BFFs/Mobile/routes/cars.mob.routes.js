const express = require('express');
const router = express.Router();
const axios = require('axios').default;

//Proxy Routes
const auth = process.env.AUTH
const api = process.env.API

//Mobile Routes
router.post('/mob/login', async (req, res) => {
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

router.post('/mob/signup', async (req, res) => {
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

router.get('/mob/allcars', async (req, res) => {
    try {
        const response = await axios.get(api + 'cars')
        res.json(response.data)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;