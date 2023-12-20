'use client'

import { useState } from 'react'

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

  const handlePersonalReferenceData = (index, e) => {
    const { name, value } = e.target
    const updatedPersonalReference = [...personalReference]

    updatedPersonalReference[index][name] = value
    setPersonalReference(updatedPersonalReference)
    onPersonalReferenceChange(updatedPersonalReference)
  }

  return (
    <div>
      <h2>Referencias Personales</h2>
      <section className='my-10'>
        {personalReference.map((reference, index) => (
          <div
            key={index}
            className='flex flex-col mb-5'
          >
            <section>
              <label>
                Nombre
                <input
                  type='text'
                  name='name'
                  placeholder='Camilo Hernandez'
                  value={reference.name}
                  onChange={(e) => handlePersonalReferenceData(index, e)}
                  required
                />
              </label>
              <label>
                Profesión
                <input
                  type='text'
                  name='profession'
                  placeholder='Manipulador de Alimentos'
                  value={reference.profession}
                  onChange={(e) => handlePersonalReferenceData(index, e)}
                  required
                />
              </label>
              <label>
                Contacto
                <input
                  type='text'
                  name='contact'
                  placeholder='(321) 463-6839'
                  value={reference.contact}
                  onChange={(e) => handlePersonalReferenceData(index, e)}
                  required
                />
              </label>
            </section>
            <section>
              <label>
                Nombre
                <input
                  type='text'
                  name='name2'
                  placeholder='Luisa Torres'
                  value={reference.name2}
                  onChange={(e) => handlePersonalReferenceData(index, e)}
                  required
                />
              </label>
              <label>
                Profesión
                <input
                  type='text'
                  name='profession2'
                  placeholder='Ingeniero Ambiental'
                  value={reference.profession2}
                  onChange={(e) => handlePersonalReferenceData(index, e)}
                  required
                />
              </label>
              <label>
                Contacto
                <input
                  type='text'
                  name='contact2'
                  placeholder='(321) 463-6839'
                  value={reference.contact2}
                  onChange={(e) => handlePersonalReferenceData(index, e)}
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
