require('dotenv').config()
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 9090
const app = express()

app.use(cors)

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
  } catch (e) {
    console.error(e)
  }
}

start()
