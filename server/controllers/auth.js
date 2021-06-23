require('dotenv').config()
const asyncHandler = require('../middleware/asyncHandler')

const {
  DB_TABLES: { DB_USERS, DB_TOKENS },
} = require('../lib/const')

const { generateTokens, upsert } = require('../lib/helper')

exports.register = asyncHandler(async (req, res, next) => {
  const { user_name, account_number, email_address, identity_number } = req.body

  console.log(req.body)

  const cekEmail = await DB_USERS.findOne({
    emailAddress: email_address,
  })

  if (!cekEmail) {
    try {
      const user = await DB_USERS.create({
        userName: user_name,
        accountNumber: account_number,
        emailAddress: email_address,
        identityNumber: identity_number,
      })

      const token = await generateTokens(user)

      const createToken = await DB_TOKENS.create({
        usersId: user.id,
        token: token,
      })

      return res.jsend.success({
        message: 'User has been created',
        token: token,
      })
    } catch (error) {
      return res.status(400).jsend.error({
        message: 'Something wrong.',
      })
    }
  } else {
    return res.status(400).jsend.error({
      message: 'Email already exist.',
    })
  }
})

exports.login = asyncHandler(async (req, res, next) => {
  const { email_address, account_number } = req.body

  const user = await DB_USERS.findOne({
    emailAddress: email_address,
  })

  let token
  if (user) {
    if (account_number === user.accountNumber) {
      token = await generateTokens(user)
      const upSert = await upsert(
        {
          usersId: user.id,
          token: token,
        },
        { usersId: user.id },
        DB_TOKENS,
      )
    } else {
      return res.status(400).jsend.error({
        message: 'Password not match',
      })
    }
  } else {
    return res.status(400).jsend.error({
      message: 'User not found',
    })
  }

  return res.jsend.success({
    token: token,
  })
})
