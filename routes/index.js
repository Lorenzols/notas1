var express = require('express');
var router = express.Router();

const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/protect')

/* GET home page. */
router.get('/', isNotLoggedIn, async(req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/signup', isNotLoggedIn, async(req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
  successRedirect: '/notas',
  failureRedirect: '/signup'
}));

router.get('/signin', isNotLoggedIn, async(req, res, next) => {
  res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {console.log(req.body), next();}, async(req, res, next) => {
    passport.authenticate('local.signin', { 
      successRedirect: '/notas',
      failureRedirect: '/signin'
    })(req, res, next)
});



router.get('/logout', isLoggedIn, async(req, res, next) => {
  req.logOut()
  res.redirect('/signin')
});

module.exports = router;
