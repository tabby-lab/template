// DataDisplay.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DataDisplay = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the port here if you changed it
        const response = await axios.get('http://localhost:5001/api/data')
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DataDisplay
