const express = require('express')

const router = express.Router()
const { authenticator } = require('../middleware/auth')
const home = require('./modules/home')
const record = require('./modules/record')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/record', authenticator, record)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)
router.use('/', generalErrorHandler)
module.exports = router