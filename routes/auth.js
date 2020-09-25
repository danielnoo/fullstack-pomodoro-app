const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc Authenticate with Google
// @ route GET /

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc Google Auth Callback
// @ route GET /auth/google/callback

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), 
          (req, res) => {
            res.redirect('/')
 }
)

// @desc Logout user
// @route /auth/logout

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


module.exports = router