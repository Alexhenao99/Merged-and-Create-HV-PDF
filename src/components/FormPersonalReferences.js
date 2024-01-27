'use client'

import { useState } from 'react'
import { validatePersonalReference } from '@/utils/validateErrors'

const FormPersonalReference = ({ onPersonalReferenceChange }) => {
  const [personalReference, setPersonalReference] = useState([
    {
      name: '',
      profession: '',
      contact: '',
      name2: '',
      profession2: '',
      contact2: ''
    }
  ])

  const [errors, setErrors] = useState({
    name: '',
    profession: '',
    contact: '',
    name2: '',
    profession2: '',
    contact2: ''
  })

  const handlePersonalReferenceData = (index, e) => {
    const { name, value } = e.target
    const updatedPersonalReference = [...personalReference]

    updatedPersonalReference[index][name] = value
    setPersonalReference(updatedPersonalReference)

    const validationsErrors = validatePersonalReference({
      [name]: value
    })
    setErrors({...errors, ...validationsErrors});

    onPersonalReferenceChange(updatedPersonalReference, validationsErrors)
  }

  return (
    <div>
      <h2>Referencias Personales</h2>
      <section className='flex flex-col text-left mx-auto'>
        {personalReference.map((reference, index) => (
          <div
            key={index}
            className='mx-auto md:w-3/4'
          >
            <h4 className='text-center'>Referencia 1</h4>
            <section className='flex flex-col md:flex-row md:flex-wrap justify-between mx-auto md:w-3/4'>
              <label className={!errors.name ? '' : 'text-red'}>
                {errors.name && <p className='text-red text-xs p-0 m-0'>{errors.name} </p>}
                Nombre
                <input
                  type='text'
                  name='name'
                  placeholder='Camilo Hernandez'
                  value={reference.name}
                  onChange={(e) => handlePersonalReferenceData(index, e)}
                  className={`${!errors.name? '' : 'border-red focus:border-red valid:border-red text-red'}`}
                  required
                />
              </label>
              <label className={!errors.profession ? '' : 'text-red'}>
                {errors.profession && <p className='text-red text-xs p-0 m-0'>{errors.profession} </p>}
                Profesión
                <input
                  type='text'
                  name='profession'
                  placeholder='Manipulador de Alimentos'
                  value={reference.profession}
                  onChange={(e) => handlePersonalReferenceData(index, e)}
                  className={`${!errors.profession? '' : 'border-red focus:border-red valid:border-red text-red'}`}
                  required
                />
              </label>
              <label className={!errors.contact ? '' : 'text-red'}>
                {errors.contact && <p className='text-red text-xs p-0 m-0'>{errors.contact} </p>}
                Contacto
                <input
                  type='text'
                  name='contact'
                  placeholder='312 123 4567'
                  value={reference.contact.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}
                  onChange={(e) => handlePersonalReferenceData(index, e)}
                  maxLength={12}
                  className={`${!errors.contact? '' : 'border-red focus:border-red valid:border-red text-red'}`}
                  required
                />
              </label>
            </section>
            <h4 className='text-center'>Referencia 2</h4>
            <section className='flex flex-col md:flex-row md:flex-wrap justify-between mx-auto md:w-3/4'>
              <label className={!errors.name2 ? '' : 'text-red'}>
                {errors.name2 && <p className='text-red text-xs p-0 m-0'>{errors.name2} </p>}
                Nombre
                <input
                  type='text'
                  name='name2'
                  placeholder='Luisa Torres'
                  value={reference.name2}
                  onChange={(e) => handlePersonalReferenceData(index, e)}
                  className={`${!errors.name2? '' : 'border-red focus:border-red valid:border-red text-red'}`}
                  required
                />
              </label>
              <label className={!errors.profession2 ? '' : 'text-red'}>
                {errors.profession2 && <p className='text-red text-xs p-0 m-0'>{errors.profession2} </p>}
                Profesión
                <input
                  type='text'
                  name='profession2'
                  placeholder='Ingeniero Ambiental'
                  value={reference.profession2}
                  onChange={(e) => handlePersonalReferenceData(index, e)}
                  className={`${!errors.profession2? '' : 'border-red focus:border-red valid:border-red text-red'}`}
                  required
                />
              </label>
              <label className={!errors.contact2 ? '' : 'text-red'}>
                {errors.contact2 && <p className='text-red text-xs p-0 m-0'>{errors.contact2} </p>}
                Contacto
                <input
                  type='text'
                  name='contact2'
                  placeholder='312 123 4567'
                  value={reference.contact2.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}
                  onChange={(e) => handlePersonalReferenceData(index, e)}
                  maxLength={12}
                  className={`${!errors.contact2? '' : 'border-red focus:border-red valid:border-red text-red'}`}
                  required
                />
              </label>
            </section>
          </div>
        ))}
      </section>
    </div>
  )
}

export default FormPersonalReference
