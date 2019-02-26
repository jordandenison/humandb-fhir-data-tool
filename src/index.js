require('app-module-path').addPath(__dirname)

const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.post('/export', async (req, res, next) => {
  try {
    // TODO: implement
    res.json({ status: 'ok' })
  } catch (e) {
    next(e)
  }
})

app.post('/import', async (req, res, next) => {
  try {
    // TODO: implement
    res.json({ status: 'ok' })
  } catch (e) {
    next(e)
  }
})

app.listen(port, async () => console.log(`Data reporting container listening on port ${port}!`))
