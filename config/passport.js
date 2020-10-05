const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const mongoose = require('mongoose')
const passport = require('passport')
const User = mongoose.model('users')
const { SECRET } = process.env

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
}

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, async (payload, done) => {
        try {
            const user = await User.findById(payload.id)
            if (user) {
                return done(null, user)
            }
            return done(null, false)
        } catch (error) {
            console.log(error)
        }

    }))
}