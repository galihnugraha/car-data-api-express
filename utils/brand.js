const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'car_data',
  password: 'postgres',
  port: 5432,
})

const fetchData = query => pool.query(query).then(response => response.rows)

const getAllBrands = async () => {
    try {
        const query = 'SELECT * FROM brand'
        const brands = await fetchData(query)
        return brands
    } catch (error) {
        throw error
    }
}

module.exports = { getAllBrands }