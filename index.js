const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(express.json())
app.use(cors())

const port =  3001

app.use('/api/v1/items', require('./routes/items'))
app.use('/api/v1/user', require('./routes/user'))
app.use('/api/v1/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log('Server running on port: ', port)
})