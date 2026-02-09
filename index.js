// Import Express
const express = require('express')
const app = express()
//// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//start the server.
app.listen(3000, () => {
  console.log("server is running")
})
