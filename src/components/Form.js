'use client'

import { createPDF, mergePDFS } from '@/utils/functionsPDFS'
import { useEffect, useState } from 'react'
import FormAcademicBackground from './FormAcademicBackground'
import FormWorkHistory from './FormWorkHistory'
import { orderData, orderPDFs } from '@/utils/oderPDFs'
import FormPersonalReference from './FormPersonalReferences'

const Form = () => {
  // ----------
  const [pdfMerged, setPdfMerged] = useState(null)
  // ----------
  const [fileReferences, setFileReferences] = useState({
    identificationScan: null,
    militaryPassbook: null
  })
  const [imgProfile, setImgProfile] = useState({ imgProfile: null })
  const [userData, setUserData] = useState({
    userName: '',
    biologicalSex: '',
    profession: '',
    profile: '',
    phone: '',
    date: '',
    cc: '',
    email: '',
    address: '',
    academicHistory: [],
    workHistory: [],
    personalReferences: []
  })

  const handleFile = (e) => {
    const id = e.target.id
    const file = e.target.files[0]

    setFileReferences({
      ...fileReferences,
      [id]: file // Almacena la referencia al archivo en fileReferences
    })
  }

  const handleImages = (e) => {
    const id = e.target.id
    const file = e.target.files[0]

    setImgProfile({
      ...imgProfile,
      [id]: file // Almacena la referencia al archivo en fileReferences
    })
  }

  const handleData = (e) => {
    const { id, value } = e.target
    setUserData({
      ...userData,
      [id]: value
    })
  }

  const handleAcademicHistoryChange = (updatedAcademicHistory) => {
    setUserData({
      ...userData,
      academicHistory: updatedAcademicHistory
    })
  }

  const handleWorkHistoryChange = (updatedWorkHistory) => {
    setUserData({
      ...userData,
      workHistory: updatedWorkHistory
    })
  }

  const handlePersonalReferencesChange = (updatedPersonalReferences) => {
    setUserData({
      ...userData,
      personalReferences: updatedPersonalReferences
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let fileObject =
      userData.biologicalSex === 'men'
        ? {
            identificationScan: fileReferences.identificationScan,
            militaryPassbook: fileReferences.militaryPassbook
          }
        : {
            identificationScan: fileReferences.identificationScan
          }

    // filtra y ordena los certificados académicos
    const academicPDFs = orderPDFs(userData.academicHistory)
    setUserData({
      ...userData,
      academicHistory: orderData(userData.academicHistory)
    })

    // Agrega los certificados en el fileObject en orden
    for (let i = 0; i < Math.min(academicPDFs.length, 4); i++) {
      const property = `academic${i + 1}` // Propiedades como academic1, academic2, etc.
      fileObject[property] = academicPDFs[i]
    }

    // filtra los certificados académicos
    const workPDFs = orderPDFs(userData.workHistory)
    setUserData({
      ...userData,
      workHistory: orderData(userData.workHistory)
    })
    // Agrega los certificados en el fileObject en orden
    for (let i = 0; i < Math.min(workPDFs.length, 4); i++) {
      const property = `work${i + 1}` // Propiedades como academic1, academic2, etc.
      fileObject[property] = workPDFs[i]
    }

    console.log(userData)
    console.log(fileObject)
    // Crea el PDF
    const pdfCreateBytes = await createPDF(userData, imgProfile)

    // Une los pdf con el orden establecido en fileObject
    const pdfMerged = await mergePDFS(pdfCreateBytes, fileObject)
    setPdfMerged(pdfMerged)

    // const downloadLink = URL.createObjectURL(pdfMerged);
    // const a = document.createElement('a');
    // a.href = downloadLink;
    // a.download = `Curriculum de ${userData.userName}.pdf`;
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  }

  //! ------------------------------------------------------------------------------------------------------------

  const renderPdf = async () => {
    if (pdfMerged instanceof Blob) {
      const pdfUrl = URL.createObjectURL(pdfMerged)

      const pdfViewer = document.getElementById('pdfViewer')
      pdfViewer.innerHTML = '' // Limpia el contenido anterior

      const embed = document.createElement('embed')
      embed.src = pdfUrl
      embed.type = 'application/pdf'
      embed.width = '900px'
      embed.height = '900px'

      pdfViewer.appendChild(embed)
    }
  }

  // Llama a renderPdf cuando pdfMerged se actualice
  useEffect(() => {
    renderPdf()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfMerged])

  //! --------------------------------------------------------------------------------------------------------------

  return (
    <section>
      <h2> Datos Personales </h2>
      <form
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        className='flex flex-col'
      >
        <label htmlFor='imgProfile'>
          Foto de Perfil:
          <input
            type='file'
            onChange={handleImages}
            id='imgProfile'
            name='imgProfile'
            accept='image/*'
            required
          />
        </label>
        <label htmlFor='userName'>
          Nombres y Apellidos:
          <input
            type='text'
            onChange={handleData}
            id='userName'
            name='userName'
            placeholder='Nombres y Apellidos'
            required
          />
        </label>
        <fieldset>
          <legend>Seleccione su sexo biológico:</legend>
          <div>
            <label htmlFor='biologicalSex'>
              Mujer
              <input
                type='radio'
                onChange={handleData}
                id='biologicalSex'
                name='biologicalSex'
                value='woman'
              />
            </label>
          </div>
          <div>
            <label htmlFor='biologicalSex'>
              Hombre
              <input
                type='radio'
                onChange={handleData}
                id='biologicalSex'
                name='biologicalSex'
                value='men'
              />
            </label>
          </div>
        </fieldset>
        <label htmlFor='date'>
          Fecha de nacimiento:
          <input
            type='date'
            onChange={handleData}
            id='date'
            name='date'
            placeholder='25'
            required
          />
        </label>
        <label htmlFor='cc'>
          Tipo y Número de identificación:
          <input
            type='text'
            onChange={handleData}
            id='cc'
            name='cc'
            placeholder='CC 1234567890'
            required
          />
        </label>
        <label htmlFor='phone'>
          Número de celular:
          <input
            type='number'
            onChange={handleData}
            id='phone'
            name='phone'
            placeholder='(316) 212-3456'
            required
          />
        </label>
        <label htmlFor='email'>
          Correo Personal:
          <input
            type='email'
            onChange={handleData}
            id='email'
            name='email'
            placeholder='Ejemplo@gmail.com'
            required
          />
        </label>
        <label htmlFor='address'>
          Dirección:
          <input
            type='text'
            onChange={handleData}
            id='address'
            name='address'
            placeholder='Kr. 90 # 149 - 73'
            required
          />
        </label>
        <label htmlFor='profession'>
          Profesión:
          <input
            type='text'
            onChange={handleData}
            id='profession'
            name='profession'
            placeholder='Técnico Operativo'
            required
          />
        </label>
        <label htmlFor='profile'>
          Perfil Profesional:
          <textarea
            type='text'
            onChange={handleData}
            id='profile'
            name='profile'
            placeholder='Escribe tu perfil en máximo 300 caracteres'
            rows='3'
            cols='30'
            className='max-w-sm min-w-0'
            required
          ></textarea>
        </label>
        <section>
          <FormAcademicBackground onAcademicHistoryChange={handleAcademicHistoryChange} />
        </section>
        <section>
          <FormWorkHistory onWorkHistoryChange={handleWorkHistoryChange} />
        </section>
        <section>
          <FormPersonalReference onPersonalReferenceChange={handlePersonalReferencesChange} />
        </section>
        <label htmlFor='identificationScan'>
          Cédula de Ciudadanía: <span className='text-gray'>Escaneada a color al 150% </span>
          <input
            type='file'
            onChange={handleFile}
            id='identificationScan'
            name='identificationScan'
            accept='.pdf'
          />
        </label>
        {userData.biologicalSex === 'men' ? (
          <label htmlFor='profile'>
            Libreta Militar:
            <input
              type='file'
              onChange={handleFile}
              id='militaryPassbook'
              name='militaryPassbook'
              accept='.pdf'
            />
          </label>
        ) : null}
        <input
          type='submit'
          value='Terminar'
        />
      </form>
      <div
        id='pdfViewer'
        className=''
      ></div>
    </section>
  )
}
// <section>
//   {/* ... Otros campos existentes ... */}
//   {userData.academicHistory.map((academic, index) => (
//     <ul className='max-w-sm' key={index}>
//       <li>
//         <label htmlFor={`institution${index}`} >Nombre de la institución:
//           <input type="text" onChange={(e) => handleAcademicHistoryData(e, index)} id={`institution${index}`} name={`institution${index}`} placeholder='Nombre de la institución' required />
//         </label>
//       </li>
//       {/* Otros campos de historia académica */}
//       <li>
//         <label htmlFor={`diplomaPDF${index}`} >Diploma o acta:
//           <input type='file' onChange={(e) => handleAcademicHistoryFile(e, index)} id={`diplomaPDF${index}`} name={`diplomaPDF${index}`} accept=".pdf" encType="multipart/form-data" />
//         </label>
//       </li>
//     </ul>
//   ))}
//   <button type="button" onClick={handleAddAcademicHistory}>Agregar Historial Académico</button>
//   <input type="submit" value="Terminar" />
// </section>

export default Form
