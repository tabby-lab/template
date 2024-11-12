// ZoomControls.js
import React from 'react'

const ZoomControls = ({ onZoomIn, onZoomOut }) => {
  return (
    <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
      {' '}
      {/* Adjusted position */}
      <button onClick={onZoomIn} style={{ margin: '5px' }}>
        +
      </button>
      <button onClick={onZoomOut} style={{ margin: '5px' }}>
        −
      </button>
    </div>
  )
}

export default ZoomControls
