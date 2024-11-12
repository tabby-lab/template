import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const D3Chart = ({ data, setSelectedCountry, zoomLevel }) => {
  const svgRef = useRef()
  const [geoData, setGeoData] = useState(null)

  // Filter the data to include only 2022
  const filteredData = data.filter((country) => country.year === 2022)

  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const response = await fetch('/assets/countries.geo.json')
        if (!response.ok) throw new Error('Failed to fetch GeoJSON')
        const geoJson = await response.json()
        setGeoData(geoJson)
      } catch (error) {
        console.error('Error fetching GeoJSON:', error)
      }
    }

    fetchGeoData()
  }, [])

  useEffect(() => {
    if (geoData) {
      drawMap(geoData)
    }
  }, [geoData, zoomLevel])

  const drawMap = (geoJson) => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove() // Clear previous drawings

    const width = 800
    const height = 400

    const projection = d3
      .geoMercator()
      .scale(130 * zoomLevel) // Use zoom level for scaling
      .translate([width / 2, height / 1.5])

    const path = d3.geoPath().projection(projection)

    const colorScale = d3
      .scaleSequential()
      .domain([3, 10])
      .interpolator(d3.interpolateBlues)

    const g = svg.append('g')

    // Create zoom behavior
    const zoomHandler = d3
      .zoom()
      .scaleExtent([1, 10]) // Set the scale limits
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    // Apply zoom handler to the SVG
    svg.call(zoomHandler)

    g.selectAll('path')
      .data(geoJson.features)
      .join('path')
      .attr('d', path)
      .attr('fill', (d) => {
        const countryCode = d.properties.name
        const countryData = filteredData.find(
          (country) => country.country_name === countryCode
        )
        return countryData
          ? colorScale(parseFloat(countryData.unemployment_rate))
          : '#ccc'
      })
      .attr('stroke', '#333')
      .attr('stroke-width', 0.5)
      .on('mouseover', function () {
        d3.select(this).attr('stroke-width', 1.5)
      })
      .on('mouseout', function () {
        d3.select(this).attr('stroke-width', 0.5)
      })
      .on('click', function (event, d) {
        const countryCode = d.properties.name
        const countryData = filteredData.find(
          (country) => country.country_name === countryCode
        )
        setSelectedCountry(countryData || null)
      })
      .append('title')
      .text((d) => {
        const countryData = filteredData.find(
          (country) => country.country_name === d.properties.name
        )
        return countryData
          ? `${countryData.country_name}: ${countryData.unemployment_rate}`
          : 'No data'
      })
  }

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={svgRef} width={800} height={400}></svg>
    </div>
  )
}

export default D3Chart
