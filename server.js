const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/db.config')
const User = require('./models/user.model')
const app = express()
app.use(express.json())

dotenv.config()

connectDB()

app.get('/users', paginatedMiddleware(User), (req, res) => {
  res.status(200).json(res.paginatedResults)
})

function paginatedMiddleware(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    
    const results = {}

    if(endIndex < await model.countDocuments()) {
      results.next = {
        page: page + 1,
        limit
      }
    }

    if(startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit
      }
    }
    try {
      results.resultSet = await model.find().limit(limit).skip(startIndex)
      res.paginatedResults = results
      next()
    } catch(err) {
      console.log(err.message)
      res.status(500).json({
        message : 'server error'
      })
    }

  }
}

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})