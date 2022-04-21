const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require("bcrypt");
const cors = require('cors');
const morgan = require('morgan');
const rfs = require("rotating-file-stream");

//Local Imports
require('./utils/database').connect();
require ('dotenv').config();
const User = require('./models/User')

//Settings
const PORT = process.env.PORT || 2000;
const HOST = process.env.HOST || '127.0.0.1';

const secret = process.env.SECRET

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

//API Routes
app.get('/', morgan, (req, res) => {
    res.json({
        message: `this auth api is working on http://${HOST}:${PORT}`
    })
});

app.post("/register", morgan, async (req, res) => {

  const {email, password, role} = req.body;

  //Verifying logic
  
      //Verifies that the email is unique in the database
      const existingUser = await User.findOne({ email: email }).lean()

      if(!existingUser) {
      try {
        
        if (role == 'admin') {
          /*Register logic to the mongo database if they're an admin or not*/ 
          const newUser = new User({email, password, role: 'Admin'});
          
          newUser.password = await newUser.encryptPassword(newUser.password);
          
          await newUser.save();
        } else {
          const newUser = new User({email, password, role: 'Common'});
          
          newUser.password = await newUser.encryptPassword(newUser.password);
          
          await newUser.save();
        }
          

      } catch (error) {
          console.log(error.message);
      }
    } else if(existingUser) {
      return res.status(400).json({
        message: 'Email already exists'
      })
    }
})

app.post('/login', morgan, async (req, res) => {
    
    const { email, password } = req.body

    //Using Jwt to authenticate the user 
    const user = await User.findOne({email});
    if (!user) return res.status(401).send('incorrect email or password');

    const match = await bcrypt.compare(password, user.password);

    if(!(match)){
        return res.status(401).send('incorrect email or password');
    }

    const token = jwt.sign({_id: user._id}, secret);
    res.json({
      message: 'Use this in your header to sign in: "Authorization: Bearer <token>',
      token
    })
})

app.listen(PORT, () => console.log(`AUTH Server Running on http://${HOST}:${PORT}`))