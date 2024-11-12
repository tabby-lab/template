const express = require('express') // Import Express
const cors = require('cors') // Import CORS
const { Pool } = require('pg') // Import PostgreSQL client
require('dotenv').config() // Load environment variables

const app = express() // Create an Express app
const port = process.env.PORT || 5001 // Set the port

app.use(cors()) // Enable CORS
app.use(express.json()) // Enable JSON parsing

// Define your API endpoint
app.get('/api/d3data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM worldbank_data') // Make sure to replace with your actual table name
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error retrieving data')
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
