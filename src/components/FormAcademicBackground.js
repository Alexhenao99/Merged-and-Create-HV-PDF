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
      <section className='flex flex-col text-left mx-auto'>
        {academicHistory.map((history, index) => (
          <div
            key={index}
            className='mx-auto md:w-3/4'
          >
            <section className='flex flex-col md:flex-row md:flex-wrap justify-between mx-auto md:w-3/4'>

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
              <label className='text-sm'>
                Certificado o acta de Graduación
                <input
                  type='file'
                  onChange={(e) => handleAcademicHistoryFile(index, e)}
                  accept='.pdf'
                  required
                />
              </label>
            </section>
            {academicHistory.length > 1 && (
              <section className='flex justify-center mb-5 w-auto'>
                <button
                  type='button'
                  onClick={() => handleRemoveAcademicHistory(index)}
                  className='w-16 h-8 p-1 border-red_hover text-red_hover hover:border-red hover:text-red'
                >
                  Eliminar
                </button>
              </section>
            )}
          </div>
        ))}
        {academicHistory.length < 4 && (
          <button
            type='button'
            onClick={handleAddAcademicHistory}
            className='mx-auto'
          >
            Agregar Formación
          </button>
        )}
      </section>
    </div>
  )
}

export default FormAcademicBackground
