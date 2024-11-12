const express = require('express') // Import Express
const cors = require('cors') // Import CORS
const { Pool } = require('pg') // Import PostgreSQL client
require('dotenv').config() // Load environment variables

const app = express() // Create an Express app
const port = process.env.PORT || 5432 // Set the port

app.use(cors()) // Enable CORS
app.use(express.json()) // Enable JSON parsing

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_NAME,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the World Bank API!')
})

// Define your API endpoint with detailed error logging
app.get('/api/d3data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM worldbank_bank') // Ensure this matches your actual table name
    res.json(result.rows)
  } catch (err) {
    console.error('Error retrieving data:', err.message) // Log the specific error message
    res.status(500).send(`Error retrieving data: ${err.message}`) // Return detailed error message
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
//test