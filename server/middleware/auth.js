require('dotenv').config()
const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const secretKey = process.env.JWT_SECRET
const {
  DB_TABLES: { DB_USERS },
} = require('../lib/const')

exports.authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.get('Authorization')
  let token
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]
  }
  if (!token) {
    res.status(401).json({
      message: 'Not Authenticated',
    })
  }
  try {
    let verify = jwt.verify(token, secretKey)
    req.user = await DB_USERS.findById(verify.id)
    console.log(req.user)
    next()
  } catch (error) {
    res.status(401).json({
      message: 'Not Authenticated',
    })
  }
})
