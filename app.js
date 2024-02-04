const express = require('express')
// const {body, validationResult} = require('express-validator')

// init app
const app = express()
const port = 3000

//routing
app.get('/', (req, res) => {
    res.json({
        test: 'ok'
    })
})

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404 Not Found</h1>')
})

//port
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})