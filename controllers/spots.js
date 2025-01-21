const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


// controllers

router.get('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Render index.ejs, passing in all of the current user's
    // applications as data in the context object.
    res.render('spots/index.ejs', {
      spots: currentUser.spots,
      user: req.session.user,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});


router.get('/new', async (req, res) => {
  res.render('spots/new.ejs');
});
router.delete('/:spotId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // using the id supplied from req.params
    currentUser.spots.id(req.params.spotId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/spots`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});


router.put('/:spotId', async (req, res) => {
  try {
    // Find the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the current spot from the id supplied by req.params
    const spot = currentUser.spots.id(req.params.spotId);
    req.body.easyToFind = req.body.easyToFind === 'on';
    // Use the Mongoose .set() method
    // this method updates the current spot to reflect the new form
    // data on `req.body`
    spot.set(req.body);
    // Save the current user
    await currentUser.save();
    // Redirect back to the show view of the current spot
    res.redirect(
      `/users/${currentUser._id}/spots/${req.params.spotId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  // console.log("is it working")
  // console.log(req.session)
  // console.log(req.body)
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // applications array of the current user
    currentUser.spots.push(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the SPOTS index view
     res.redirect(`/users/${currentUser._id}/spots`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});


router.get('/:spotId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const spot = currentUser.spots.id(req.params.spotId);
    res.render('spots/edit.ejs', {
      spot: spot,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});




router.get('/:spotId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the application by the spotId supplied from req.params
    const spot = currentUser.spots.id(req.params.spotId);
    // Render the show view, passing the spot data in the context object
    res.render('spots/show.ejs', {
      
      spot: spot
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});





  

// we will build out our router logic here

module.exports = router;