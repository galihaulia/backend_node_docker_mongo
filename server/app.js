const express = require('express')
const cors = require('cors')
const jsend = require('jsend')
const path = require('path')
const app = express()
const router = express.Router()
const swaggerUI = require('swagger-ui-express')
const openApiDoc = require('./openApiDoc')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect('mongodb://mongodb:27017/' + process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'CONNECTION ERROR'))
db.once('open', function () {
  console.log('Connected')
})

//ROUTE PATH
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

const publicPath = path.join(__dirname, '../public')
//MIDDLEWARE
app.use(cors())
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(jsend.middleware)

//ROUTES
router.use(authRoute)
router.use(userRoute)

app.use('/', router)
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(openApiDoc.default()))
app.get('*', (req, res, next) => {
  res.status(200).json({
    message: 'Server ON',
    status: 200,
  })
})

// SWAGGER
// ROUTE PATH

// ROUTES
console.log(publicPath)
module.exports = app
