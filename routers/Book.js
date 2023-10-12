const express = require('express')
const BookController = require('../controllers/BookController')
// const auth = require('../middleware/auth')
// const checkRole = require("../middleware/role.js")
const{Patient ,Receptionist,Admin} = require("mongodb")
const router = express.Router()
//routers for each function that found in articalControllers in controllers
router.post('/Book',BookController.BookNow)
router.get('/Book', BookController.getAllElement)
router.get('/Book/:id',  BookController.getElmenetById)
router.put('/Book/:id', BookController.updateBookById)
router.delete('/Book/:id', BookController.deletById)

module.exports = router