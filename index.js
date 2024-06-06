const express = require('express')
const AuthRouter = require('./routes/AuthRoutes')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api', AuthRouter);
app.get('/', (req, res) => res.send('Welcome to this awesome POC'))

app.listen(port, () => console.log(`JWT server listening on port ${port}!`))