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
    <div>
      <label htmlFor='professionsSelect'>Seleccione el cargo a aplicar</label>
      <select
        id='professionsSelect'
        onChange={handleSelect}
        value={selectedProfession}
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
        <button>Continuar</button>
      </Link>
    </div>
  )
}

export default ProfessionHome
