const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Profile = require('../../models/Profile')
const Users = require('../../models/User')

router.get('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            let errors = {}

            const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
            if (!profile) {
                errors.profile = "There is no profile for this user"
                return res.status(404).json(errors)
            }
            return res.json(profile)
        } catch (error) {
            console.log(error)
        }

    })

router.post('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        let errors = {}
        const profileFields = {
            user: req.user.id,
            handle: req.body.bio || '',
            bio: req.body.bio || '',
            position: req.body.position || '',
            university: req.body.university || '',
            fields: req.body.fields ? req.body.fields.split(',') : [],
            social: {}
        }
        profileFields.social = {
            email: req.body.email || '',
            youtube: req.body.youtube || '',
            linkedin: req.body.linkedin || '',
            googleScholar: req.body.googleScholar || '',
            researchgate: req.body.researchgate || '',
        }
        let profile = await Profile.findOne({ user: req.user.id })
        if (profile) {
            // update profile
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
            return res.send(profile)
        } else {
            // create profile
            // check if handle exists 
            let profile = await Profile.findOne({ handle: profileFields.handle })
            if (profile) {
                errors.handle = 'That handle already exists'
                return res.status(400).json(errors)
            }
            // save profile
            let newProfile = await new Profile(profileFields).save()
            return res.json(newProfile)
        }
    })

module.exports = router