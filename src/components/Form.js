'use client'

import { professions } from '@/utils/professions'
import { createPDF, mergePDFS } from '@/utils/functionsPDFS'
import { useEffect, useState } from 'react'
import FormAcademicBackground from './FormAcademicBackground'
import FormWorkHistory from './FormWorkHistory'
import { orderData, orderPDFs } from '@/utils/orderPDFs'
import FormPersonalReference from './FormPersonalReferences'
import { useRouter } from 'next/navigation'

const Form = ({ profession }) => {

  const router = useRouter()
  const professionData = professions

  const [pdfMerged, setPdfMerged] = useState(null)

  const [fileReferences, setFileReferences] = useState({
    identificationScan: null,
    militaryPassbook: null,
    professionalCard: null,
    rethusCertificate: null,
    rut: null,
    procuraduria: null,
    contraloria: null,
    personeria: null,
    antecedentesJud: null,
    SNMC: null,
    delitosSexuales: null,
    socialSecurity: null,
    occupationalMedical: null,
    generalMedicalCertificate: null,
    symptomaticDiagnosis: null,
    professionalCardFoodHandling: null,
    savingsAccount: null,
    professionalCardNutrition: null,
  })

  const desiredOrder = [
    'identificationScan',
    'militaryPassbook',
    'academic1',
    'academic2',
    'academic3',
    'academic4',
    'professionalCard',
    'rethusCertificate',
    'work1',
    'work2',
    'work3',
    'rut',
    'procuraduria',
    'contraloria',
    'personeria',
    'antecedentesJud',
    'SNMC',
    'delitosSexuales',
    'socialSecurity',
    'occupationalMedical',
    'professionalCardFoodHandling',
    'generalMedicalCertificate',
    'symptomaticDiagnosis',
    'savingsAccount',
    'professionalCardNutrition',
  ];

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
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value
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

    // filtra el objeto fileReferences para sacar las propiedades vacías
    const filteredFileReferences = Object.fromEntries(
      Object.entries(fileReferences).filter(([key, value]) => value !== null)
    );

    // filtra y ordena los certificados académicos
    const academicPDFs = orderPDFs(userData.academicHistory)
    setUserData({
      ...userData,
      academicHistory: orderData(userData.academicHistory)
    })

    // Agrega los certificados en el filteredFileReference en orden
    for (let i = 0; i < Math.min(academicPDFs.length, 4); i++) {
      const property = `academic${i + 1}` // Propiedades como academic1, academic2, etc.
      filteredFileReferences[property] = academicPDFs[i]
    }

    // filtra los certificados académicos
    const workPDFs = orderPDFs(userData.workHistory)
    setUserData({
      ...userData,
      workHistory: orderData(userData.workHistory)
    })

    // Agrega los certificados académicos en el filteredFileReference en orden
    for (let i = 0; i < Math.min(workPDFs.length, 4); i++) {
      const property = `work${i + 1}` // Propiedades como academic1, academic2, etc.
      filteredFileReferences[property] = workPDFs[i]
    }

    // Organiza los pdf teniendo en cuenta desiredOrder
    const orderedFilesObject = {};
    desiredOrder.forEach((key) => {
      if (filteredFileReferences.hasOwnProperty(key)) {
        orderedFilesObject[key] = filteredFileReferences[key];
      }
    });

    // Crea el PDF
    const pdfCreateBytes = await createPDF(userData, imgProfile)

    // Une los pdf con el orden establecido en fileObject
    const pdfMerged = await mergePDFS(pdfCreateBytes, orderedFilesObject)
    setPdfMerged(pdfMerged)

    const downloadLink = URL.createObjectURL(pdfMerged);
    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = `CV de ${userData.userName} - ${profession}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    localStorage.setItem('userData', JSON.stringify({
      name: userData.userName,
      profession,
    }))

    router.push('/finish')
  }

  //! -------------------- Render PDF ------------------------------------------------------------------------------
  // const renderPdf = async () => {
  //   if (pdfMerged instanceof Blob) {
  //     const pdfUrl = URL.createObjectURL(pdfMerged)

  //     const pdfViewer = document.getElementById('pdfViewer')
  //     pdfViewer.innerHTML = '' // Limpia el contenido anterior

  //     const embed = document.createElement('embed')
  //     embed.src = pdfUrl
  //     embed.type = 'application/pdf'
  //     embed.width = '900px'
  //     embed.height = '900px'

  //     pdfViewer.appendChild(embed)
  //   }
  // }

  // // Llama a renderPdf cuando pdfMerged se actualice
  // useEffect(() => {
  //   renderPdf()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pdfMerged])
  //! --------------------------------------------------------------------------------------------------------------

  // Verifica si la profesión es una opción válida
  const isValidProfession = profession in professionData;

  if (!isValidProfession) {
    // Esto redirigirá a la página de error 404
    router.replace('/not_found');
    return null;
  }

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        className='flex flex-col'
        >
      {/*//!TODO ---------- UserData / AcademicHistory / PersonaReference ----------------- */}
        <section
          id='userData'
          className='flex flex-col'
          >
          <h2> Datos Personales </h2>
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
              <label htmlFor='woman'>
                <input
                  type='radio'
                  onChange={handleData}
                  id='woman'
                  name='biologicalSex'
                  value='woman'
                />
                Femenino
              </label>
            </div>
            <div>
              <label htmlFor='men'>
                <input
                  type='radio'
                  onChange={handleData}
                  id='men'
                  name='biologicalSex'
                  value='men'
                />
                Masculino
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
        </section>
      {/*//!TODO -------------------------------------------------------------------------- */}

      {/*//!TODO ---------- Documents ----------------------------------------------------- */}
        <section
          id='documents'
          className='flex flex-col'
        >
          <h2>Documentación</h2>
          <p>Todos los documentos deben de ser subidos en formato PDF</p>
        {/*//? ----- Cédula -------------------------------------------- */}
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
        {/*//? --------------------------------------------------------- */}
        {/*//? ----- Military Passbook --------------------------------- */}
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
        {/*//? --------------------------------------------------------- */}
        {/*//? ----- RUT ----------------------------------------------- */}
          <label htmlFor='rut'>
            Registro Único Tributario RUT, actualizado al presente año:
            <input
              type='file'
              onChange={handleFile}
              id='rut'
              name='rut'
              accept='.pdf'
            />
          </label>
        {/*//? --------------------------------------------------------- */}
        {/*//? ----- Social Security ----------------------------------- */}
          <label htmlFor='socialSecurity'>
          Certificado de afiliación a Seguridad Social (Salud y Pensión):
            <input
              type='file'
              onChange={handleFile}
              id='socialSecurity'
              name='socialSecurity'
              accept='.pdf'
            />
          </label>
        {/*//? --------------------------------------------------------- */}
        {/*//? ----- Occupational Medical Fitness ---------------------- */}
          <label htmlFor='occupationalMedical'>
            Certificado de Aptitud Médica Ocupacional (todos):
            <input
              type='file'
              onChange={handleFile}
              id='occupationalMedical'
              name='occupationalMedical'
              accept='.pdf'
            />
          </label>
        {/*//? --------------------------------------------------------- */}
        {/*//? ----- Savings Account Certificate ----------------------- */}
          <label htmlFor='savingsAccount'>
            Certificado de Cuenta de Ahorros del Banco Davivienda:
            <input
              type='file'
              onChange={handleFile}
              id='savingsAccount'
              name='savingsAccount'
              accept='.pdf'
            />
          </label>
        {/*//? --------------------------------------------------------- */}
        {/*//! --------- Food handling ------------------------------------------- */}
          {profession === 'manipulador_Alimentos' ? (
            <section
              id='foodHandling'
              className='flex flex-col'
            >
            {/*//? ----- Certificado manipulación de alimentos -------------- */}
              <label htmlFor='professionalCardFoodHandling'>
              Certificado manipulación de alimentos:
                <input
                  type='file'
                  onChange={handleFile}
                  id='professionalCardFoodHandling'
                  name='professionalCardFoodHandling'
                  accept='.pdf'
                  />
              </label>
            {/*//? ---------------------------------------------------------- */}
            {/*//? ----- Certificado médico general ------------------------- */}
              <label htmlFor='generalMedicalCertificate'>
                Certificado médico general:
                <input
                  type='file'
                  onChange={handleFile}
                  id='generalMedicalCertificate'
                  name='generalMedicalCertificate'
                  accept='.pdf'
                  />
              </label>
            {/*//? ---------------------------------------------------------- */}
            {/*//? ----- Diagnóstico sintomático respiratorio y de piel ----- */}
              <label htmlFor='symptomaticDiagnosis'>
                Diagnóstico sintomático respiratorio y de piel en la cual conste la aptitud para la manipulación de alimentos:
                <input
                  type='file'
                  onChange={handleFile}
                  id='symptomaticDiagnosis'
                  name='symptomaticDiagnosis'
                  accept='.pdf'
                  />
              </label>
            {/*//? ---------------------------------------------------------- */}
            </section>
          )  : null}
        {/*//! ------------------------------------------------------------------- */}
        {/*//! --------- Nutrition ----------------------------------------------- */}
          {profession === 'nutricionista' ? (
          //? ----- Nutrition and Dietetics Professional Card --------- */}
            <label htmlFor='professionalCardNutrition'>
              Tarjeta de la Comisión del Ejercicio Profesional de Nutrición y Dietética:
              <input
                type='file'
                onChange={handleFile}
                id='professionalCardNutrition'
                name='professionalCardNutrition'
                accept='.pdf'
                />
            </label>
          //? --------------------------------------------------------- */}
          )  : null}
        {/*//! ------------------------------------------------------------------- */}
        {/*//! --------- Health work --------------------------------------------- */}
          {profession === 'auxiliar_Enfermeria' ? (
            <section
              id='auxiliaryNursingDocuments'
              className='flex flex-col'
            >
            {/*//? ----- Professional Card --------------------------------- */}
              <label htmlFor='professionalCard'>
                Tarjeta profesional, Vigencia tarjeta profesional y antecedentes profesionales (si aplica):
                <input
                  type='file'
                  onChange={handleFile}
                  id='professionalCard'
                  name='professionalCard'
                  accept='.pdf'
                  />
              </label>
            {/*//? --------------------------------------------------------- */}
            {/*//? ----- ReTHUS Certificate -------------------------------- */}
              <label htmlFor='rethusCertificate'>
                Certificado ReTHUS - Registro Único Nacional del Talento Humano en Salud:
                <input
                  type='file'
                  onChange={handleFile}
                  id='rethusCertificate'
                  name='rethusCertificate'
                  accept='.pdf'
                  />
              </label>
            {/*//? --------------------------------------------------------- */}
            </section>
          )  : null}
        {/*//! ------------------------------------------------------------------- */}
        {/*//? ----- Criminal and disciplinary record certificates ----- */}
          <section
            id='disciplinaryRecords'
            className='flex flex-col'
          >
            <h4>Certificados de antecedentes penales y disciplinarios</h4>
          {/*//* ----- Procuraduría ---------------- */}
            <label htmlFor='procuraduria'>
            Procuraduría:
            <input
              type='file'
              onChange={handleFile}
              id='procuraduria'
              name='procuraduria'
              accept='.pdf'
            />
            </label>
          {/*//* ----------------------------------- */}
          {/*//* ----- Contraloría ----------------- */}
            <label htmlFor='contraloria'>
            Contraloría:
            <input
              type='file'
              onChange={handleFile}
              id='contraloria'
              name='contraloria'
              accept='.pdf'
            />
            </label>
          {/*//* ----------------------------------- */}
          {/*//* ----- Personería ------------------ */}
            <label htmlFor='personeria'>
            Personería:
            <input
              type='file'
              onChange={handleFile}
              id='personeria'
              name='personeria'
              accept='.pdf'
            />
            </label>
          {/*//* ----------------------------------- */}
          {/*//* ----- Antecedentes Judiciales ----- */}
            <label htmlFor='antecedentesJud'>
            Antecedentes Judiciales:
            <input
              type='file'
              onChange={handleFile}
              id='antecedentesJud'
              name='antecedentesJud'
              accept='.pdf'
            />
            </label>
          {/*//* ----------------------------------- */}
          {/*//* ----- Sistema Nacional de Medidas Correctivas ------------ */}
            <label htmlFor='SNMC'>
            Sistema Nacional de Medidas Correctivas:
            <input
              type='file'
              onChange={handleFile}
              id='SNMC'
              name='SNMC'
              accept='.pdf'
            />
            </label>
          {/*//* ----------------------------------- */}
          {/*//* ----- Delitos sexuales ------------ */}
            <label htmlFor='delitosSexuales'>
              Inhabilidades antecedentes delitos sexuales:
              <input
                type='file'
                onChange={handleFile}
                id='delitosSexuales'
                name='delitosSexuales'
                accept='.pdf'
              />
            </label>
          {/*//* ----------------------------------- */}
          </section>
        {/*//? --------------------------------------------------------- */}
        </section>
      {/*//!TODO -------------------------------------------------------------------------- */}

        <input
          type='submit'
          value='Descargar CV'
        />
      </form>
      <div
        id='pdfViewer'
        className=''
      ></div>
    </section>
  )
}

export default Form
