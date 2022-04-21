const jwt = require("jsonwebtoken");
require ('dotenv').config();
require('./database').connect();
const User = require('../models/User')

const secret = process.env.SECRET

const authToken = (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = jwt.verify(token, secret);
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

async function Admin(req, res, next) {
    const {email} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        res.status(403).json({
            message: 'User not found'
        })
    } else {
        user.role == 'Admin'? next(): res.status(401).json({
            unauthorized: 'Not Authorized to use this route'
        })
    }
}

module.exports = {authToken, Admin};