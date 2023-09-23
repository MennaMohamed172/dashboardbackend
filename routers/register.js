const express = require('express')
const userController = require('../controllers/registerController')

const router = express.Router()


router.post('/user', userController.addNewUser)
router.get('/user', userController.getAllUsers)
router.get('/user/:id', userController.getUserById)
router.put('/user/:id', userController.updateUserInfoById)
router.delete('/user/:id', userController.deleteUserById)

module.exports = router