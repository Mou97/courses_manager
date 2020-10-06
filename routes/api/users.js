const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// import models 
const User = require('../../models/User')
const passport = require('passport')

// input validation 
const validateRegisterInput = require('../../validation/register')

router.get('/', async (req, res) => {
    let users = await User.find({})
    res.send(users)
})
router.post('/register', async (req, res) => {
    try {
        // validate user input
        const { errors, isValid } = validateRegisterInput(req.body)
        if (!isValid) {
            return res.status(400).json(errors)
        }
        // registration logic
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            errors.email = "Email already exists"
            return res.status(400).json(errors)
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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const payload = { id: user.id, name: user.name, avatar: user.avatar }
            jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' }, (err, token) => {
                return res.json({
                    success: true,
                    token: `Bearer ${token}`
                })
            })

        } else {
            return res.status(400).json({ error: "Password not correct" })
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

})

router.get('/current', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        return res.json({
            id: req.user.id,
            name: req.user.email,
            avatar: req.user.avatar,
        })
    })

module.exports = router