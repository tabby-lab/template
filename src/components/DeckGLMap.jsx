import React, { useRef, useState, useEffect } from 'react'
import DeckGL from '@deck.gl/react'
import { MapView } from '@deck.gl/core'
import { ScatterplotLayer } from '@deck.gl/layers'
import * as THREE from 'three'
import SidePanel from './SidePanel'

const DeckGLMap = ({ data, onHover, onClick }) => {
  const deckRef = useRef(null)
  const [tooltipInfo, setTooltipInfo] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const geometry = new THREE.SphereGeometry(5, 32, 32)
    const material = new THREE.MeshBasicMaterial({
      color: 0x0077ff,
      wireframe: true,
    })
    const globe = new THREE.Mesh(geometry, material)
    scene.add(globe)
    camera.position.z = 10

    const animate = () => {
      requestAnimationFrame(animate)
      globe.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      document.body.removeChild(renderer.domElement)
    }
  }, [])

  const handleHover = (info) => {
    setTooltipInfo(info)
    onHover(info.object || null)
  }

  const handleClick = (info) => {
    setSelectedCountry(info.object || null)
    onClick(info.object || null)
  }

  const handleClosePanel = () => {
    setSelectedCountry(null)
  }

  const deckGlLayers = [
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: data
        ? data.map((d) => ({
            position: [parseFloat(d['Longitude']), parseFloat(d['Latitude'])],
            size: 100,
            color: [255, 0, 0],
            countryName: d['Country Name'],
            governmentEffectiveness: d['Government Effectiveness: Estimate'],
            voiceAndAccountability: d['Voice and Accountability: Estimate'],
            politicalStability:
              d[
                'Political Stability and Absence of Violence/Terrorism: Estimate'
              ],
            controlOfCorruption: d['Control of Corruption: Estimate'],
            unemployment:
              d[
                'Unemployment, total (% of total labor force) (modeled ILO estimate)'
              ],
          }))
        : [],
      getPosition: (d) => d.position,
      getFillColor: (d) => d.color,
      getRadius: (d) => d.size,
      pickable: true,
      onHover: handleHover,
      onClick: handleClick,
    }),
  ]

  return (
    <>
      <DeckGL
        ref={deckRef}
        views={[new MapView({ controller: true })]}
        layers={deckGlLayers}
        initialViewState={{
          longitude: -122.41669,
          latitude: 37.7853,
          zoom: 11,
          pitch: 30,
          bearing: 0,
        }}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      {tooltipInfo && tooltipInfo.object && (
        <div
          style={{
            position: 'absolute',
            left: tooltipInfo.x,
            top: tooltipInfo.y,
            backgroundColor: 'white',
            padding: '10px',
            border: '1px solid black',
            pointerEvents: 'none',
          }}
        >
          <div>
            <strong>{tooltipInfo.object.countryName}</strong>
          </div>
          <div>
            Government Effectiveness:{' '}
            {tooltipInfo.object.governmentEffectiveness}
          </div>
        </div>
      )}
      {selectedCountry && (
        <SidePanel country={selectedCountry} onClose={handleClosePanel} />
      )}
    </>
  )
}

export default DeckGLMap
