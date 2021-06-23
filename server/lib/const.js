// const Users = require('../models/users')
// const Tokens = require('../models/tokens')
// const Events = require('../models/events')

const { Users, Tokens } = require('../models')

exports.DB_TABLES = {
  DB_USERS: Users,
  DB_TOKENS: Tokens,
}
