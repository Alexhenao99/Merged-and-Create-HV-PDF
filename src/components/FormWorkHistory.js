import { useState } from 'react'

const FormWorkHistory = ({ onWorkHistoryChange }) => {
  const [workHistory, setWorkHistory] = useState([
    {
      company: '',
      workstation: '',
      startDate: '',
      finishDate: '',
      directSupervisor: '',
      contactSupervisor: '',
      functions: '',
      certificatePDF: null
    }
  ])

  const handleWorkHistoryData = (index, e) => {
    const { name, value } = e.target
    const updatedWorkHistory = [...workHistory]

    updatedWorkHistory[index][name] = value
    setWorkHistory(updatedWorkHistory)
    onWorkHistoryChange(updatedWorkHistory)
  }

  const handleWorkHistoryFile = (index, e) => {
    const file = e.target.files[0]
    const updatedWorkHistory = [...workHistory]

    updatedWorkHistory[index].certificatePDF = file
    setWorkHistory(updatedWorkHistory)
    onWorkHistoryChange(updatedWorkHistory)
  }

  const handleAddWorkHistory = () => {
    setWorkHistory([
      ...workHistory,
      {
        company: '',
        workstation: '',
        startDate: '',
        finishDate: '',
        directSupervisor: '',
        contactSupervisor: '',
        functions: '',
        certificatePDF: null
      }
    ])
  }

  const handleRemoveWorkHistory = (indexToRemove) => {
    const updatedWorkHistory = workHistory.filter((_, index) => index !== indexToRemove)

    setWorkHistory(updatedWorkHistory)
    onWorkHistoryChange(updatedWorkHistory)
  }

  return (
    <div>
      <h2>Experiencia Laboral</h2>
      <section className='flex flex-col text-left mx-auto'>
        {workHistory.map((history, index) => (
          <div
            key={index}
            className='mx-auto md:w-3/4'
          >
            <section className='flex flex-col md:flex-row md:flex-wrap justify-between mx-auto md:w-3/4'>
              <label>
                Nombre de la Empresa
                <input
                  type='text'
                  name='company'
                  value={history.company}
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  required
                />
              </label>
              <label>
                Cargo que desempeño
                <input
                  type='text'
                  name='workstation'
                  placeholder='Auxiliar Operativo'
                  value={history.workstation}
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  required
                />
              </label>
              <label>
                Fecha de inicio
                <input
                  type='date'
                  name='startDate'
                  placeholder='Nombre de la institución'
                  value={history.startDate}
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  required
                />
              </label>
              <label>
                Fecha de finalización
                <input
                  type='date'
                  name='finishDate'
                  placeholder='Nombre de la institución'
                  value={history.finishDate}
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  required
                />
              </label>
              <label>
                Nombre del Jefe Directo
                <input
                  type='text'
                  name='directSupervisor'
                  placeholder='Camilo Hernandez'
                  value={history.directSupervisor}
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  required
                />
              </label>
              <label>
                Contacto del Jefe Directo
                <input
                  type='number'
                  name='contactSupervisor'
                  placeholder='(321) 463-6839'
                  value={history.contactSupervisor}
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  required
                />
              </label>
              <label>
                Funciones
                <textarea
                  type='text'
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  name='functions'
                  placeholder='Escribe tu perfil en máximo 300 caracteres'
                  rows='3'
                  cols='30'
                  className='max-w-sm min-w-0'
                  value={history.functions}
                  required
                ></textarea>
              </label>
              <label>
                Certificado Laboral
                <input
                  type='file'
                  onChange={(e) => handleWorkHistoryFile(index, e)}
                  accept='.pdf'
                  required
                />
              </label>
            </section>
            {workHistory.length > 1 && (
              <section className='flex justify-center mb-5 w-auto'>
                <button
                  type='button'
                  onClick={() => handleRemoveWorkHistory(index)}
                  className='w-16 h-8 p-1 border-red_hover text-red_hover hover:border-red hover:text-red'
                >
                  Eliminar
                </button>
              </section>
            )}
          </div>
        ))}
        {workHistory.length < 3 && (
          <button
            type='button'
            onClick={handleAddWorkHistory}
            className='mx-auto'
          >
            Agregar
          </button>
        )}
      </section>
    </div>
  )
}

export default FormWorkHistory
