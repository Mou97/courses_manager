const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    position: {
        type: String
    },
    university: {
        type: String
    },
    fields: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    social: {
        email: {
            type: String
        },
        youtube: {
            type: String
        },
        linkedin: {
            type: String
        },
        googleScholar: {
            type: String
        },
        researchgate: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }

})

const Profile = mongoose.model('profiles', ProfileSchema)
module.exports = Profile