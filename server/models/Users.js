const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const usersScheme = new Schema({
  id: ObjectId,
  userName: {
    type: String,
    required: [true, 'Missing username'],
  },
  accountNumber: {
    type: Number,
    min: 1,
    required: [true, 'Missing account number'],
  },
  emailAddress: {
    type: String,
    required: [true, 'Missing email address'],
  },
  identityNumber: {
    type: Number,
    min: 1,
    required: [true, 'Missing identity number'],
  },
})

module.exports = mongoose.model('Users', usersScheme)
