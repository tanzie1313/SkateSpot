const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



router.get('/', async (req, res) => {
  try {

    const currentUser = await User.findById(req.session.user._id);

    res.render('spots/index.ejs', {
      spots: currentUser.spots,
      user: req.session.user,
    });
  } catch (error) {

    console.log(error);
    res.redirect('/');
  }
});


router.get('/new', async (req, res) => {
  res.render('spots/new.ejs');
});
router.delete('/:spotId', async (req, res) => {
  try {

    const currentUser = await User.findById(req.session.user._id);

    currentUser.spots.id(req.params.spotId).deleteOne();

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/spots`);
  } catch (error) {

    console.log(error);
    res.redirect('/');
  }
});


router.put('/:spotId', async (req, res) => {
  try {

    const currentUser = await User.findById(req.session.user._id);

    const spot = currentUser.spots.id(req.params.spotId);
    req.body.easyToFind = req.body.easyToFind === 'on';

    spot.set(req.body);

    await currentUser.save();
    t
    res.redirect(
      `/users/${currentUser._id}/spots/${req.params.spotId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {

  try {

    const currentUser = await User.findById(req.session.user._id);

    currentUser.spots.push(req.body);

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/spots`);
  } catch (error) {

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

    const currentUser = await User.findById(req.session.user._id);

    const spot = currentUser.spots.id(req.params.spotId);

    res.render('spots/show.ejs', {

      spot: spot
    });
  } catch (error) {

    console.log(error);
    res.redirect('/');
  }
});









module.exports = router;