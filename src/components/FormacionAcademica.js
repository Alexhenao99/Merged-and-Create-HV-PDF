import React, { useState } from 'react'

const AcademicBackground = ({ onAcademicHistoryChange }) => {
  const [academicHistory, setAcademicHistory] = useState([{
    graduationDate: '',
    title: '',
    institution: '',
    diplomaPDF: null
  }])

  const handleAcademicHistoryData = (index, e) => {
    const { name, value } = e.target
    const updatedAcademicHistory = [...academicHistory]
    updatedAcademicHistory[index][name] = value
    setAcademicHistory(updatedAcademicHistory)
    onAcademicHistoryChange(updatedAcademicHistory)
  }

  const handleAcademicHistoryFile = (index, e) => {
    const file = e.target.files[0]
    const updatedAcademicHistory = [...academicHistory]
    updatedAcademicHistory[index].diplomaPDF = file
    setAcademicHistory(updatedAcademicHistory)
    onAcademicHistoryChange(updatedAcademicHistory)
  }

  const handleAddAcademicHistory = () => {
    setAcademicHistory([...academicHistory, { graduationDate: '', title: '', institution: '', diplomaPDF: null }])
  }

  const handleRemoveAcademicHistory = (indexToRemove) => {
    const updatedAcademicHistory = academicHistory.filter((_, index) => index !== indexToRemove)
    setAcademicHistory(updatedAcademicHistory)
    onAcademicHistoryChange(updatedAcademicHistory)
  }

  return (
    <div>
      <h2>Historia Académica</h2>
      {academicHistory.map((history, index) => (
        <div key={index} className='flex flex-col'>
          <label>
            Fecha de Graduación
            <input
              type='date'
              name='graduationDate'
              value={history.graduationDate}
              onChange={(e) => handleAcademicHistoryData(index, e)}
            />
          </label>
          <label>
            Titulo
            <input
              type='text'
              name='title'
              placeholder='Titulo'
              value={history.title}
              onChange={(e) => handleAcademicHistoryData(index, e)}
            />
          </label>
          <label>
            Nombre de la Institución
            <input
              type='text'
              name='institution'
              placeholder='Nombre de la institución'
              value={history.institution}
              onChange={(e) => handleAcademicHistoryData(index, e)}
            />
          </label>
          <label>
            Certificado o acta de la institución
            <input
              type='file'
              onChange={(e) => handleAcademicHistoryFile(index, e)}
              accept='.pdf'
            />
          </label>
          {academicHistory.length > 1 && (
            <button
              type='button'
              onClick={() => handleRemoveAcademicHistory(index)}
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
      {academicHistory.length < 5 && (
        <button
          type='button'
          onClick={handleAddAcademicHistory}
        >
          Agregar Historia Académica
        </button>
      )}
    </div>
  )
}

export default AcademicBackground
