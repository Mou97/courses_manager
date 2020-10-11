const express = require('express')
const router = express.Router()
const passport = require('passport')
const Course = require('../../models/Course')

const Courses = require('../../models/Course')
const { route } = require('./profile')

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
                description: req.body.description || '',
                level: req.body.level || '',
                speciality: req.body.speciality || '',
                tags: req.body.tags ? req.body.tags.split(',').map(item => item.trim()) : [],
                lectures: req.body.lectures ? JSON.parse(req.body.lectures) : []
            }
            let course = await Courses.findOne({ title: courseFields.title, user: courseFields.user })
            if (course) {
                // update course 
                course = await Courses.findOneAndUpdate({ title: courseFields.title, user: courseFields.user }, { $set: courseFields }, { new: true })
                return res.send({ success: true, course })
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
router.delete('/:course_id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            let course = Courses.findOne({ id: req.params.course_id, user: req.user.id })
            if (course) {
                Courses.findOneAndDelete(req.params.course_id).then(course => {
                    if (!course) {
                        return res.status(404).json({ course: 'No course with this id' })
                    }
                    return res.json({ course: `course with id ${req.params.course_id} was deleted` })
                })

            }
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    }
)

router.post('/edit/:course_id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            let courseFields = {
                title: req.body.title || '',
                year: req.body.year || '',
                description: req.body.description || '',
                level: req.body.level || '',
                speciality: req.body.speciality || '',
                tags: req.body.tags ? req.body.tags.split(',').map(item => item.trim()) : [],
                lectures: req.body.lectures ? JSON.parse(req.body.lectures) : []
            }
            let course = Courses.findOne({ id: req.params.course_id, user: req.user.id })
            if (course) {
                course = await Courses.findOneAndUpdate({ _id: req.params.course_id }, { $set: courseFields }, { new: true })
                return res.send({ success: true, course })
            }
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    }
)

router.get('/all', async (req, res) => {
    try {
        const courses = await Courses.find().populate('user', ['name', 'avatar'])
        if (courses.length === 0) {
            return res.status(400).json({ courses: 'No courses available' })
        }
        return res.json(courses)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('user', ['name', 'avatar'])
        if (!course) {
            return res.status(404).json({ course: `No course with id ${req.params.id}` })
        }
        return res.json(course)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})



module.exports = router