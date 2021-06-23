const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/auth')
const {
  getAllUsers,
  getDataUser,
  updateDataUser,
  deleteDataUser,
} = require('../controllers/user')

router.get('/users', authenticate, getAllUsers)
router.get('/user', authenticate, getDataUser)
router.put('/user', authenticate, updateDataUser)
router.delete('/user', authenticate, deleteDataUser)

module.exports = router
