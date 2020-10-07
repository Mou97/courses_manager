const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CourseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
    },
    year: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    lectures: [
        {
            title: {
                type: String,
                required: true
            },
            pdfLink: {
                type: String,
            },
            videoLink: {
                type: String,
            },
            date: {
                type: Date,
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }

})

const Course = mongoose.model('courses', CourseSchema)
module.exports = Course