const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Users = require('../models/users')
const helpers = require('./helpers')

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const user = await new Users(req.body)
    user.password = await helpers.encryptpassword(user.password)
    user.id = user.insertId
    await user.save()
    done(null, user)
}))

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const user = await Users.findOne({email: email})

    const match = await helpers.macthpasssword(password, user.password)
    if(match){
        done(null, user)
    }else{
        done(null, false)
    }
    
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
    const user = await Users.findById(id)
    done(null, user)
})