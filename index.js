const express = require('express')
const app = express()
const cors = require('cors')
const routers = require('./router/routers')
const authRouters = require('./router/authRouters')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// process.env.PORT
const PORT = process.env.PORT || 3000

// mongoose connection
mongoose.Promise = global.Promise

mongoose.connect('mongodb://issue_admin:Googleplus9@ds133659.mlab.com:33659/issue_db')
//mongoose.connect('mongodb://localhost:27017/probdb')

app.use(bodyParser.urlencoded ({ extended: true}))
app.use(bodyParser.json())
app.use(cors())

// api routes
routers(app)

// routes for authentication
authRouters(app)

app.get('/', (req, res) => 
    res.send(`Server is running on ${PORT}`)
)

app.listen(PORT, () => 
    console.log(`Example app listening on port ${PORT}`))