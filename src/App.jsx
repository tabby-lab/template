import { useState } from 'react'
import './App.css'
import D3Chart from './components/D3Chart'
import DataLoader from './components/DataLoader'
import SidePanel from './components/SidePanel'
import ZoomControls from './components/ZoomControls' // Import Zoom Controls
import Notes from './components/Notes' // Import Notes

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)

  const handleDataLoaded = (fetchedData) => {
    setData(fetchedData)
    setLoading(false)
  }

  const handleError = (errorMessage) => {
    setError(errorMessage)
    setLoading(false)
  }

  const handleClosePanel = () => {
    setSelectedCountry(null)
  }

  const zoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom * 1.5)
  }

  const zoomOut = () => {
    setZoomLevel((prevZoom) => prevZoom / 1.5)
  }

  return (
    <>
      <h2>Interactive World Bank Data Visualization</h2>
      <DataLoader onDataLoaded={handleDataLoaded} onError={handleError} />
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <D3Chart
          data={data}
          setSelectedCountry={setSelectedCountry}
          zoomLevel={zoomLevel} // Pass zoom level
        />
      )}
      {selectedCountry && (
        <SidePanel country={selectedCountry} onClose={handleClosePanel} />
      )}
      <ZoomControls onZoomIn={zoomIn} onZoomOut={zoomOut} />
      <Notes /> {/* Render Notes component */}
    </>
  )
}

export default App
