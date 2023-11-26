const express=require('express')
const { loginController, registerController, getAllUsersController,getUsersController } = require('../controller/authController')

const router=express.Router()

router.post('/login',loginController)
router.post('/register',registerController)
router.get('/users',getAllUsersController)
router.get('/users/:userId',getUsersController)

module.exports = router;