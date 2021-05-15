const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
  return res.send('<h1>Welcome to IAM Service</h1>')
})

module.exports = { endpoint: '/', router }
