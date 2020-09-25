const express = require('express')
const { route } = require('./users')
const router = express.Router()

router.get('/test', (req, res) => res.json('profile works'))

module.exports = router