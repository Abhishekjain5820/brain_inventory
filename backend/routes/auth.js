const express=require('express')
const { loginController, registerController, getAllUsersController } = require('../controller/authController')

const router=express.Router()

router.post('/login',loginController)
router.post('/register',registerController)
router.get('/users',getAllUsersController)

module.exports = router;