import React from 'react'

const SidePanel = ({ country, onClose }) => {
  // Use the provided country data directly
  const data = country || {}

  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '300px',
        height: '100%',
        backgroundColor: '#00008B',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        overflowY: 'auto',
      }}
    >
      <button onClick={onClose} style={{ marginBottom: '10px' }}>
        Close
      </button>
      <h2>{data.country_name || 'No Data'}</h2>
      <p>
        <strong>Government Effectiveness:</strong>{' '}
        {data.government_effectiveness || 'No Data'}
      </p>
      <p>
        <strong>Voice and Accountability:</strong>{' '}
        {data.voice_and_accountability || 'No Data'}
      </p>
      <p>
        <strong>Political Stability:</strong>{' '}
        {data.political_stability || 'No Data'}
      </p>
      <p>
        <strong>Control of Corruption:</strong>{' '}
        {data.control_of_corruption || 'No Data'}
      </p>
      <p>
        <strong>Unemployment:</strong> {data.unemployment_rate || 'No Data'}
      </p>

      {/* Add more fields as needed */}
    </div>
  )
}

export default SidePanel

// import React from 'react'

// const SidePanel = ({ country, onClose }) => {
//   // Use the provided country data directly
//   const data = country || {}

//   return (
//     <div
//       style={{
//         position: 'absolute',
//         right: 0,
//         top: 0,
//         width: '300px',
//         height: '100%',
//         backgroundColor: 'lightgray',
//         padding: '20px',
//         boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
//         overflowY: 'auto',
//       }}
//     >
//       <button onClick={onClose} style={{ marginBottom: '10px' }}>
//         Close
//       </button>
//       <h2>{data['Country Name'] || 'No Data'}</h2>
//       <p>
//         <strong>Government Effectiveness:</strong>{' '}
//         {data['Government Effectiveness'] || 'No Data'}
//       </p>
//       <p>
//         <strong>Voice and Accountability:</strong>{' '}
//         {data['Voice and Accountability'] || 'No Data'}
//       </p>
//       <p>
//         <strong>Political Stability:</strong>{' '}
//         {data['Political Stability'] || 'No Data'}
//       </p>
//       <p>
//         <strong>Control of Corruption:</strong>{' '}
//         {data['Control of Corruption'] || 'No Data'}
//       </p>
//       <p>
//         <strong>Unemployment:</strong>{' '}
//         {data[
//           'Unemployment, total (% of total labor force) (modeled ILO estimate)'
//         ] || 'No Data'}
//       </p>
//       {/* Add more fields as needed */}
//     </div>
//   )
// }

// export default SidePanel
