const express = require('express')
const { body, validationResult } = require('express-validator')
const fetchData = require('./utils/brand')
const jwt = require('jsonwebtoken')

// init app
const app = express()
const port = 3000

// middleware untuk proses body json
app.use(express.json())

// middleware autentikasi headers
app.use((req, res, next) => {
    const requiredHeaders = {
        'APIKey': '7def4ec4deab71e2c5911ee718db181c8bf077582e9cc397af95c76fb0d459f0',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode-block',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'X-Frame-Options': 'SAMEORIGIN'
    }

    for (const header in requiredHeaders) {
        const expectedValue = requiredHeaders[header]

        if (!req.header(header))
            return res.status(401).json({OUT_STAT: 'F', OUT_MESS: 'You do not have permission to access the API!', OUT_DATA: []})

        if (req.header(header) !== expectedValue)
            return res.status(403).json({OUT_STAT: 'F', OUT_MESS: 'You do not have permission to access the API!', OUT_DATA: []})
    }

    next()
})

//routing
// app.get('/:p_search', async (req, res) => {
//     try {
//         const p_search = req.params.p_search
//         const data = await fetchData(`SELECT * FROM brand WHERE desc_brand = '${p_search}'`)
//         res.json({OUT_STAT: 'T', OUT_MESS: 'Success', OUT_DATA: data})
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: 'Internal Server Error' })
//     }
// })

app.post(
    '/',
    [
        // Express Validator
        body('getListFilterUnitBrand.P_SEARCH')
            .matches(/^[a-zA-Z0-9]+$/)
            .isLength({ max: 10 })
    ], 
    async (req, res) => {
        if (req.body.getListFilterUnitBrand && req.body.getListFilterUnitBrand.P_SEARCH !== '') {
            // Melakukan pengecekan hasil validasi express validator
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                // Jika validasi gagal
                console.error('Invalid Input')
                return res.status(422).json({OUT_STAT: 'F', OUT_MESS: 'Invalid Input', OUT_DATA: []})
            } else {
                console.log('get by desc brand')
                try {
                    // let stat, mess
                    const p_search = req.body.getListFilterUnitBrand.P_SEARCH
                    const data = await fetchData(`SELECT * FROM brand WHERE desc_brand = '${p_search}'`)

                    const status = data.length === 0 
                        ? { stat: 'F', mess: 'Tidak ada data yang dicari' } 
                        : { stat: 'T', mess: 'Success' }

                    res.json({OUT_STAT: status.stat, OUT_MESS: status.mess, OUT_DATA: data})
                } catch (error) {
                    console.error(error)
                    res.status(500).json({ error: 'Internal Server Error' })
                }
            }  
        } else {
            console.log('get all data')
            try {
                const data = await fetchData(`SELECT * FROM brand`)
                res.json({OUT_STAT: 'T', OUT_MESS: 'Success', OUT_DATA: data})
            } catch (error) {
                console.error(error)
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }      
    }
)

app.use('/', (req, res) => {
    res.status(404).json({ error: '404 Not Found' })
})

//port
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})