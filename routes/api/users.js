const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// import models 
const User = require('../../models/User')
const passport = require('passport')

// input validation 
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

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
        return res.sendStatus(500)
    }
})

router.post('/login', async (req, res) => {
    try {
        // validate data
        const { errors, isValid } = validateLoginInput(req.body)
        if (!isValid) {
            return res.status(400).json(errors)
        }
        // login logic
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            errors.auth = 'User not found'
            return res.status(404).json(errors)
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
            errors.auth = "Password not correct"
            return res.status(400).json(errors)
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