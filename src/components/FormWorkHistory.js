import { validateWorkHistoryData } from '@/utils/validateErrors'
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

  const [errors, setErrors] = useState({
    company: '',
    workstation: '',
    startDate: '',
    finishDate: '',
    directSupervisor: '',
    contactSupervisor: '',
    functions: ''
  })

  const handleWorkHistoryData = (index, e) => {
    const { name, value } = e.target
    const updatedWorkHistory = [...workHistory]

    updatedWorkHistory[index][name] = value
    setWorkHistory(updatedWorkHistory)

    const validationsErrors = validateWorkHistoryData({
      [name]: value
    })
    setErrors({ ...errors, ...validationsErrors })

    onWorkHistoryChange(updatedWorkHistory, validationsErrors)
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

  const getCurrentDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    let month = now.getMonth() + 1
    let day = now.getDate()

    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day

    return `${year}-${month}-${day}`
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
              <label className={!errors.company ? '' : 'text-red'}>
                {errors.company && <p className='text-red text-xs p-0 m-0'>{errors.company} </p>}
                Nombre de la Empresa
                <input
                  type='text'
                  name='company'
                  value={history.company}
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  className={`${!errors.company ? '' : 'border-red focus:border-red valid:border-red text-red'}`}
                  required
                />
              </label>
              <label className={!errors.workstation ? '' : 'text-red'}>
                {errors.workstation && <p className='text-red text-xs p-0 m-0'>{errors.workstation} </p>}
                Cargo que desempeño
                <input
                  type='text'
                  name='workstation'
                  placeholder='Auxiliar Operativo'
                  value={history.workstation}
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  className={`${!errors.workstation ? '' : 'border-red focus:border-red valid:border-red text-red'}`}
                  required
                />
              </label>
              <label className={!errors.startDate ? '' : 'text-red'}>
                {errors.startDate && <p className='text-red text-xs p-0 m-0'>{errors.startDate} </p>}
                Fecha de inicio
                <input
                  type='date'
                  name='startDate'
                  placeholder='Nombre de la institución'
                  value={history.startDate}
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  className={`${!errors.startDate ? '' : 'border-red focus:border-red invalid:border-red text-red'}`}
                  max={getCurrentDate()}
                  required
                />
              </label>
              <label className={!errors.finishDate ? '' : 'text-red'}>
                {errors.finishDate && <p className='text-red text-xs p-0 m-0'>{errors.finishDate} </p>}
                Fecha de finalización
                <input
                  type='date'
                  name='finishDate'
                  placeholder='Nombre de la institución'
                  value={history.finishDate}
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  min={history.startDate}
                  max={getCurrentDate()}
                  disabled={!history.startDate}
                  className={`${!errors.finishDate ? '' : 'border-red focus:border-red invalid:border-red text-red'}`}
                  required
                />
              </label>
              <label className={!errors.directSupervisor ? '' : 'text-red'}>
                {errors.directSupervisor && <p className='text-red text-xs p-0 m-0'>{errors.directSupervisor} </p>}
                Nombre del Jefe Directo
                <input
                  type='text'
                  name='directSupervisor'
                  placeholder='Camilo Hernandez'
                  value={history.directSupervisor}
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  className={`${!errors.directSupervisor ? '' : 'border-red focus:border-red valid:border-red text-red'}`}
                  required
                />
              </label>
              <label className={!errors.contactSupervisor ? '' : 'text-red'}>
                {errors.contactSupervisor && <p className='text-red text-xs p-0 m-0'>{errors.contactSupervisor} </p>}
                Contacto del Jefe Directo
                <input
                  type='text'
                  name='contactSupervisor'
                  placeholder='312 123 4567'
                  value={history.contactSupervisor.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  className={`${!errors.contactSupervisor ? '' : 'border-red focus:border-red valid:border-red text-red'}`}
                  maxLength={12}
                  required
                />
              </label>
              <label className={!errors.functions ? 'md:w-full' : 'text-red md:w-[950px]'}>
                {errors.functions && <p className='text-red text-xs p-0 m-0'>{errors.functions} </p>}
                Funciones
                <textarea
                  type='text'
                  onChange={(e) => handleWorkHistoryData(index, e)}
                  name='functions'
                  placeholder='Escribe tu perfil en máximo 800 caracteres mínimo 500.'
                  rows='10'
                  cols='60'
                  value={history.functions}
                  className={`${!errors.functions ? 'max-w-max max-h-28 min-h-[168px] md:max-w-5xl md:min-w-full md:max-h-96' : 'max-w-max max-h-28 min-h-[168px] md:max-w-5xl md:min-w-full md:max-h-96 border-red focus:border-red valid:border-red text-red'}`}
                  maxLength={800}
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
            Agregar Experiencia
          </button>
        )}
      </section>
    </div>
  )
}

export default FormWorkHistory
