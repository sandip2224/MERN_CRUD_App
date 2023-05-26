const mongoose = require('mongoose')

const connectDB = async (val) => {
  try {
    const conn = await mongoose.connect(val, { useNewUrlParser: true, useUnifiedTopology: true })

    console.log(`✔ MongoDB Cluster Connected: ${conn.connection.host}!`)
  }
  catch (err) {
    console.log('🟥 Error in db connection: ' + err)
  }
}

module.exports = connectDB