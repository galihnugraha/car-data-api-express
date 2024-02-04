const express = require('express')
// const {body, validationResult} = require('express-validator')

const { getAllBrands } = require('./utils/brand')

// init app
const app = express()
const port = 3000

// app.use(express.urlencoded({extended: true}))

//routing
app.get('/', async (req, res) => {
    try {
        const stat = 'T'
        const mess = 'Success'
        const data = await getAllBrands();
        res.json({OUT_STAT: stat, OUT_MESS: mess, OUT_DATA: data});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.use('/', (req, res) => {
    res.status(404).json({ error: '404 Not Found' })
})

//port
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})