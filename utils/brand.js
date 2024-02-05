const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'car_data',
  password: 'postgres',
  port: 5432,
})

const fetchData = query => pool.query(query).then(response => response.rows)

module.exports = fetchData