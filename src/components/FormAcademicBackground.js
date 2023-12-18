import React, { useState } from 'react'

const FormAcademicBackground = ({ onAcademicHistoryChange }) => {
  const [academicHistory, setAcademicHistory] = useState([
    {
      finishDate: '',
      title: '',
      institution: '',
      certificatePDF: null
    }
  ])

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

    updatedAcademicHistory[index].certificatePDF = file
    setAcademicHistory(updatedAcademicHistory)
    onAcademicHistoryChange(updatedAcademicHistory)
  }

  const handleAddAcademicHistory = () => {
    setAcademicHistory([...academicHistory, { graduationDate: '', title: '', institution: '', certificatePDF: null }])
  }

  const handleRemoveAcademicHistory = (indexToRemove) => {
    const updatedAcademicHistory = academicHistory.filter((_, index) => index !== indexToRemove)
    setAcademicHistory(updatedAcademicHistory)
    onAcademicHistoryChange(updatedAcademicHistory)
  }

  return (
    <div>
      <h2>Formación Académica</h2>
      <section className='my-10'>
        {academicHistory.map((history, index) => (
          <div
            key={index}
            className='flex flex-col mb-5'
          >
            <label>
              Fecha de Graduación
              <input
                type='date'
                name='finishDate'
                value={history.finishDate}
                onChange={(e) => handleAcademicHistoryData(index, e)}
                required
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
                required
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
                required
              />
            </label>
            <label>
              Certificado o acta de la institución
              <input
                type='file'
                onChange={(e) => handleAcademicHistoryFile(index, e)}
                accept='.pdf'
                required
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
        {academicHistory.length < 4 && (
          <button
            type='button'
            onClick={handleAddAcademicHistory}
          >
            Agregar
          </button>
        )}
      </section>
    </div>
  )
}

export default FormAcademicBackground
