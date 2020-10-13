const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest} = require('../middleware/auth')
const mongoose = require('mongoose')
const User = require('../models/User')
const Badge = require('../models/badges')




// @desc login 
// @ route GET /
router.post('/dashboard', ensureAuth, async (req, res) => {
  console.log(req.user)
  let rewardBadge = new Badge({
    name: req.body.name,
    user: req.user.id,
    focus: req.body.focus,
    createdAt: new Date()
  })
  try {
    rewardBadge = await rewardBadge.save()
    
    res.json('Badge stored in DB!')
      
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

// @desc dashboard
// @ route GET /dashboard

router.get('/dashboard', ensureAuth, (req, res) => {
  try {
    res.render('dashboard', {
      name: req.user.firstName,
      image: req.user.image,
      layout: 'main',
    })
    console.log(req.session)
  } catch(err) { 
    console.error(err)
    res.render('error/500')
  }
})





module.exports = router