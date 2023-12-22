'use client'

import Link from 'next/link'
import { useState } from 'react'

const ProfessionHome = () => {
  const professionData = {
    tecnologo_Ambiental: 'Tecnológo Ambiental',
    auxiliar_Enfermeria: 'Auxiliar de Enfermería'
  }

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
