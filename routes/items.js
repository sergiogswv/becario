const express = require('express')
require('express-group-routes')
const app = express()
const router = express.Router()
const items = require('../controllers/items')

app.group('/', () => {
  router.get('/', items.getItems)
  router.post('/', items.postItems)
})

module.exports = router