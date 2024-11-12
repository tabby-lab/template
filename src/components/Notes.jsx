import React, { useEffect, useState } from 'react'

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState('')

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'))
    if (savedNotes) {
      setNotes(savedNotes)
    }
  }, [])

  const handleSaveNote = () => {
    const updatedNotes = [...notes, currentNote]
    setNotes(updatedNotes)
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
    setCurrentNote('')
  }

  const handleClearNotes = () => {
    setNotes([])
    localStorage.removeItem('notes') // Clear from localStorage
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: '#00008B', // Change background color to dasme color as side panel
        color: '#fff', // Change text color for visibility
        padding: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        width: '250px',
      }}
    >
      <h3>Notes</h3>
      <input
        type='text'
        value={currentNote}
        onChange={(e) => setCurrentNote(e.target.value)}
        placeholder='Type your note'
        style={{ width: '100%', marginBottom: '5px' }}
      />
      <button onClick={handleSaveNote} style={{ marginBottom: '10px', backgroundColor: 'black', color: '#fff', margin: '10px'}}>
        Save Note
      </button>
      <button
        onClick={handleClearNotes}
        style={{ marginBottom: '10px', backgroundColor: 'black', color: '#fff' }}
      >
        Clear Notes
      </button>
      <ul style={{ maxHeight: '150px', overflowY: 'auto' }}>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  )
}

export default Notes
