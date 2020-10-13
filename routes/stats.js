const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Badge = require('../models/badges')


router.get('/', ensureAuth, async (req, res) => {
  try {
    console.log(req.user.id)
    const badges = await Badge.find({user: req.user.id})
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('stats', { 
      badges,
      name: req.user.firstName,
      layout: 'stats',
     })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }

})




module.exports = router

