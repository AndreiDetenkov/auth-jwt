require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 9090
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
  } catch (e) {
    console.error(e)
  }
}

start()
