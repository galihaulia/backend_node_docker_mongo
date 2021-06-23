require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET
const expired = process.env.JWT_EXPIRE

exports.generateTokens = async (user) => {
  console.log(user)
  const token = jwt.sign(
    {
      id: user._id,
    },
    secretKey,
    {
      expiresIn: expired,
    },
  )
  return token
}

exports.upsert = async (values, condition, MODEL) => {
  return MODEL.find(condition).then((result) => {
    if (result.length != 0) {
      return MODEL.updateOne(condition, values)
    }
    return MODEL.create(values)
  })
}
