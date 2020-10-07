const express = require('express')
const router = express.Router()
const passport = require('passport')
const Course = require('../../models/Course')

const Courses = require('../../models/Course')

router.get('/mycourses',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const courses = await Courses.find({ user: req.user.id })
            if (courses.length == 0)
                return res.status(400).json({ courses: 'No courses available' })
            return res.json(courses)
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    })
router.post('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            let courseFields = {
                user: req.user.id,
                title: req.body.title || '',
                year: req.body.year || '',
                cover: req.body.cover || '',
                level: req.body.level || '',
                speciality: req.body.speciality || '',
                tags: req.body.tags ? req.body.tags.split(',').map(item => item.trim()) : [],
                lectures: req.body.lectures ? JSON.parse(req.body.lectures) : []
            }
            let course = await Courses.findOne({ title: courseFields.title, user: courseFields.user })
            if (course) {
                // update course 
                course = await Courses.findOneAndUpdate({ title: courseFields.title, user: courseFields.user }, { $set: courseFields }, { new: true })
                return res.send(course)
            } else {
                // Create new course 
                let newCourse = await new Courses(courseFields).save()
                return res.json(newCourse)
            }

        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    })

module.exports = router