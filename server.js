const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const app = express()

require('dotenv').config()

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const courses = require('./routes/api/courses')

// connect to the db 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).catch(err => console.log(err))

// set up request body parser 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// CORS

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONT_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
// passport middleware 
app.use(passport.initialize())
require('./config/passport')(passport)

// set routes 
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/courses', courses)

// set up port 
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server running on port ${port}`))