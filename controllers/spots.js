const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// controllers/applications.js

router.get('/', (req, res) => {
    res.send('Hello skatespot index route!');
  });
  
// we will build out our router logic here

module.exports = router;