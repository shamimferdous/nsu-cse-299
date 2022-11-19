const express = require('express');
const router = express.Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
const axios = require('axios');

const User = require('../models/User');
const passportConfig = require('../config/passport');



//defining sign token function
const signToken = userID => {
    return JWT.sign({
        iss: "Write Hook",
        sub: userID
    }, process.env.SECRET, { expiresIn: "48h" });
}



//user login post route
router.post('/v1/sign-in', async (req, res) => {
    const user = await User.findOne({ facial_id: req.body.facial_id })

    const token = signToken(user._id);

    res.status(200).json({ isAuthenticated: true, user: user, token: token, err: false, msg: 'Logged in successfully!' });
});

//user social login route
router.post('/v2/sign-in', async (req, res) => {



    let user = await User.findOne({ email: req.body.email })
    if (!user) {

        //validating google auth token
        try {
            let google_response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
                headers: {
                    Authorization: `Bearer ${req.body.idToken}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            console.log(google_response.data);

        } catch (error) {
            res.status(400).json({ err: true, msg: 'Invalid Auth Token' });
            return;
        }


        let newUser = new User({
            name: req.body.displayName,
            email: req.body.email,
            facial_id: req.body.facial_id
        })

        await newUser.save();

    }
})

//synching backend and frontend user authentication
router.get('/v1/authenticate', passport.authenticate('jwt', { session: false }), async (req, res) => {


    let user = req.user;
    user.password = undefined;

    res.status(200).json({ isAuthenticated: true, user: user });

});


//exporting routes
module.exports = router;