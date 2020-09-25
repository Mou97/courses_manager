const { json } = require('express')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// import models 
const User = require('../../models/User')

router.get('/', async (req, res) => {
    let users = await User.find({})
    res.send(users)
})
router.post('/register', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({
                seccuss: false,
                message: 'Email exists already'
            })
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    let createdUser = await newUser.save()
                    res.json(createdUser)
                })
            })
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router