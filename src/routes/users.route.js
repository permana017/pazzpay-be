const express = require('express');
const router = express();
const formUpload = require('../middleware/formUpload')

// import controller
const usersController = require('../controllers/users.controller.js')

router.get('/', usersController.read)
router.get('/:id', usersController.readDetail)
router.post('/', formUpload.single('img'), usersController.create)
router.patch('/:id', formUpload.single('img'), usersController.update)
router.delete('/:id', usersController.remove)

module.exports = router