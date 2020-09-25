const express = require('express')

require('dotenv').config()

const app = express()

// connect to the db 
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.log(err))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server running on port ${port}`))