const mongoose = require('mongoose')
require('dotenv').config({ path: "/etc/secrets/variables.env"})

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('DB Conectada');
  } catch (error) {
    console.log(error)
    console.log('Hubo un error')
    process.exit(1)
  }
}

module.exports = connectDB