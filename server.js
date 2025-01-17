const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const authController = require('./controllers/auth.js');
const spotsController = require('./controllers/spots.js');
// server.js



// require our new middleware!
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');


const port = process.env.PORT ? process.env.PORT : '3007';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView);
// app.get('/', (req, res) => {
//   res.render('index.ejs', {
//     user: req.session.user,
//   });
// });

app.get('/', (req, res) => {
    // Check if the user is signed in
    if (req.session.user) {
        // Redirect signed-in users to their applications index
        res.redirect(`/users/${req.session.user._id}/spots`);
    } else {
        // Show the homepage for users who are not signed in
        res.render('index.ejs');
    }
    });



app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/spots', spotsController);
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});