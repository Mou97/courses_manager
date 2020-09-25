const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server running on port ${port}`))