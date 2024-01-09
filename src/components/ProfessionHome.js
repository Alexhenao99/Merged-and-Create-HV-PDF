'use client'

import { professions } from '@/utils/professions'
import Link from 'next/link'
import { useState } from 'react'

 export const ProfessionHome = () => {
  const professionData = professions

  const [selectedProfession, setSelectedProfession] = useState('')

  const professionSelect = () => {
    const options = []

    for (const profession in professionData) {
      options.push(
        <option
          value={profession}
          key={profession}
        >
          {professionData[profession]}
        </option>
      )
    }

    return options
  }

  const handleSelect = (e) => {
    const value = e.target.value
    setSelectedProfession(value)
  }

  return (
    <div className='flex flex-col'>
      <label htmlFor='professionsSelect' className='mb-2'>Seleccione el cargo a aplicar</label>
      <select
        id='professionsSelect'
        onChange={handleSelect}
        value={selectedProfession}
        className='rounded-lg p-2'
      >
        <option
          key="default"
          value=""
          disabled
          // hidden
        >
          Seleccione un Cargo
        </option>
        {professionSelect()}
      </select>
      <Link href={`/form/${selectedProfession}`}>
        <button className='rounded-md py-3 px-7 mt-4 bg-blue_button hover:bg-blue_button_hover border-none md:py-4 md:px-7 md:mt-8 text-xl' disabled={!selectedProfession ? true : false}>Continuar</button>
      </Link>
    </div>
  )
}

export default ProfessionHome
