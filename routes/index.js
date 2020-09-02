var express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  User = require('../models/user');

// landing
router.get('/', async (req, res) => {
  res.render('landing');
});

// ===================================
// auth. routes
// ===================================

// register route
router.get('/register', (req, res) => {
  res.render('register');
});

// sign up logic
router.post('/register', (req, res) => {
  if (req.body.password !== req.body.password_1) {
    req.flash('error', 'Both password should match!!');
    return res.redirect('/register');
  }
  let newUser = new User({
    username: req.body.username,
    school: req.body.school,
  });
  User.register(newUser, req.body.password, (err, user) => {
    try {
      passport.authenticate('local')(req, res, () => {
        req.flash(
          'success',
          'Successfully Signed Up! Nice to meet you ' + req.body.username
        );
        res.redirect('/grades');
      });
    } catch (err) {
      console.log(err);
      req.flash('error', err.message);
      res.redirect('/register');
    }
  });
});

// log in
router.get('/login', (req, res) => {
  res.render('login');
});

// log in logic
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/grades',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: 'Welcome back',
  }),
  (req, res) => {}
);

// logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged Out!');
  res.redirect('/');
});

module.exports = router;
