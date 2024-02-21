const express = require('express')
const app = express()
const port = 8000

app.post('/signup', (req, res) => {
  res.send('Hello World! signup')
})

app.post('/login', (req, res) => {
  res.send('Hello World! login ')
})

app.get('/questions', (req, res) => {
  res.send('Hello World! questions')
})

app.post('/submissions', (req, res) => {
  res.send('Hello World! submissions')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})