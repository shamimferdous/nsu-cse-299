const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('../models/User');


//defining the cookieExtractor function
const cookieExtractor = req => {
    let token = null;
    if (req && req.headers) {
        token = req.headers.accesstoken
    }
    return token;
}



// authorization to protect resource
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.SECRET
}, (payload, done) => {

    User.findById({ _id: payload.sub }, (err, user) => {

        if (err) {

            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {

            return done(null, false);
        }
    });
}));



// for authenticate a user using localStrategy + email and password
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password', }, (email, password, done) => {
    //overwritten default username field to email
    User.findOne({ email }, (err, user) => {

        //if somethings wrong with mongodb
        if (err)
            return done(err);

        //if user does't exist
        if (!user)
            return done(null, false);

        //validating password
        user.comparePassword(password, done);

    });
}));