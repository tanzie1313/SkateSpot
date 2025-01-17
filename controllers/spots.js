const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


// controllers/applications.js

router.get('/', async (req, res) => {
  try {
    res.render('spots/index.ejs');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});
// controllers/applications.js

router.get('/new', async (req, res) => {
  res.render('spots/new.ejs');
});



  
// we will build out our router logic here

module.exports = router;