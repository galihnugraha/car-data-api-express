const express = require('express')
const {body, validationResult} = require('express-validator')
const { getAllBrands, getSearchBrands } = require('./utils/brand')

// init app
const app = express()
const port = 3000

app.use(express.json());

//routing
// app.get('/', async (req, res) => {
    // try {
    //     const stat = 'T'
    //     const mess = 'Success'
    //     const data = await getAllBrands();
    //     res.json({OUT_STAT: stat, OUT_MESS: mess, OUT_DATA: data});
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
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
        // Melakukan pengecekan hasil validasi
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Jika validasi gagal
            console.error('Inavlid Input')
            return res.status(422).json({OUT_STAT: 'F', OUT_MESS: 'Invalid Input', OUT_DATA: []});
        } else {
            const getAll = async () => {
                console.log('get all')
                try {
                    const stat = 'T'
                    const mess = 'Success'
                    const data = await getAllBrands();
                    res.json({OUT_STAT: stat, OUT_MESS: mess, OUT_DATA: data});
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }

            const getSpecific = async () => {
                console.log('get spesific')
                try {
                    let stat, mess
                    const data = await getSearchBrands(req.body.getListFilterUnitBrand.P_SEARCH);
            
                    if (data.length === 0) {
                        stat = 'F'
                        mess = 'Tidak ada data yang dicari'
                    } else {
                        stat = 'T'
                        mess = 'Success'
                    }
                    res.json({OUT_STAT: stat, OUT_MESS: mess, OUT_DATA: data});
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }

            if (req.body.getListFilterUnitBrand) {
                if (req.body.getListFilterUnitBrand.P_SEARCH !== '') {
                    getSpecific()
                } else {
                    getAll()
                }
            } else {
                getAll()
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