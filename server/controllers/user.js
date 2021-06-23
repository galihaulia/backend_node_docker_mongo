require('dotenv').config()
const asyncHandler = require('../middleware/asyncHandler')

const {
  DB_TABLES: { DB_USERS },
} = require('../lib/const')

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await DB_USERS.find({})

  let data = []
  if (users) {
    for (user of users) {
      let obj = {
        id: user._id,
        userName: user.userName,
        accountNumber: user.accountNumber,
        emailAddress: user.emailAddress,
        identityNumber: user.identityNumber,
      }

      data.push(obj)
    }
  }

  return res.jsend.success(data)
})

exports.getDataUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.user

  const user = await DB_USERS.findById(_id)

  let data
  if (user) {
    data = {
      id: user._id,
      userName: user.userName,
      accountNumber: user.accountNumber,
      emailAddress: user.emailAddress,
      identityNumber: user.identityNumber,
    }
  } else {
    return res.status(400).jsend.error({
      message: 'User not found',
    })
  }

  return res.jsend.success(data)
})

exports.updateDataUser = asyncHandler(async (req, res, next) => {
  const now = Date()
  const { user_id, user_name, account_number, email_address, identity_number } =
    req.body

  const user = await DB_USERS.findById(user_id)

  if (user) {
    try {
      user.userName = user_name
      user.accountNumber = account_number
      user.emailAddress = email_address
      user.identityNumber = identity_number
      user.updatedAt = now
      await user.save()

      return res.jsend.success({
        message: 'User has been updated.',
      })
    } catch (error) {
      return res.status(400).jsend.error({
        message: 'Failed! User has not been updated.',
      })
    }
  }
})

exports.deleteDataUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.user

  if (_id) {
    const deleteUser = await DB_USERS.findByIdAndDelete(_id)

    return res.jsend.success({
      message: 'User has been deleted.',
    })
  }
})
