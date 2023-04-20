const express = require('express')
require('express-group-routes')
const app = express()
const router = express.Router()
const auth = require('../controllers/auth')

app.group('/', () => {
  router.post('/', auth.autheticateUser)
  router.get('/', auth.authUser)
})

module.exports = router