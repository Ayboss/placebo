const express = require('express')
const usercontroller = require('../controllers/usercontroller')
const router = express.Router()

router.get('/exits', usercontroller.doesUserExits )


module.exports = router