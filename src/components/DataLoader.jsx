import React, { useEffect } from 'react'
import axios from 'axios'

const DataLoader = ({ onDataLoaded, onError }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/d3data') // API endpoint
        console.log('Fetched Data:', response.data) // Log the fetched data
        onDataLoaded(response.data) // Pass data to parent
      } catch (error) {
        console.error('Error loading data from API:', error)
        if (onError) onError(error.message) // Handle errors
      }
    }

    fetchData()
  }, [onDataLoaded, onError])

  // return <p>Loading data...</p> // Loading message
}

export default DataLoader
