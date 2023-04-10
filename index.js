const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const port =  3001

app.use('/api/v1', require('./routes/items'))

app.listen(port, () => {
  console.log('Server running on port: ', port)
})