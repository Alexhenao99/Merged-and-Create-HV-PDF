'use client'

import { professions } from '@/utils/professions'
import { copiar, createPDF, mergePDFS } from '@/utils/functionsPDFS'
import { useEffect, useState } from 'react'
import FormAcademicBackground from './FormAcademicBackground'
import FormWorkHistory from './FormWorkHistory'
import { orderData, orderPDFs } from '@/utils/orderPDFs'
import FormPersonalReference from './FormPersonalReferences'
import { useRouter } from 'next/navigation'
import { validateData } from '@/utils/validateErrors'

const Form = ({ profession }) => {

  const router = useRouter()
  const professionData = professions

  // const [pdfMerged, setPdfMerged] = useState()
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

//? -----------------------Documentation --------------------

  const rethus = ['enfermero_jefe' ,'fisioterapeuta' ,'fonoaudiologo' ,'nutricionista' ,'psicologo' ,'auxiliar_enfermeria' ,'terapeuta' ,'gerontologo' ,'regente']
  const certificacionManipulacionA = ['nutricionista', 'tecnologo_alimentos', 'manipulador', 'tecnico_gastronomia', 'auxiliar_servicios']

//? ---------------------------------------------------------
  const desiredOrder = [
    'identificationScan',
    'militaryPassbook',
    'academic1',
    'academic2',
    'academic3',
    'academic4',
    'professionalCard',
    'professionalCardNutrition',
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
    'savingsAccount',
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

  const [errors, setErrors] = useState({
    userName: '',
    biologicalSex: '',
    profession: '',
    profile: '',
    phone: '',
    date: '',
    cc: '',
    email: '',
    address: '',

    //* Personal Reference
    name: '',
    profession: '',
    contact: '',
    name2: '',
    profession2: '',
    contact2: '',

    //* Academic Info
    finishDate: '',
    title: '',
    institution: '',

    //* Work information
    company: '',
    workstation: '',
    startDate: '',
    finishDate: '',
    directSupervisor: '',
    contactSupervisor: '',
    functions: '',
  })

  // const [pdfMerged, setPdfMerged] = useState()

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

    const validationsErrors = validateData({
      [name]: value
    })

    setErrors({...errors, ...validationsErrors});
  }

  const handleAcademicHistoryChange = (updatedAcademicHistory, validationsErrors) => {
    setUserData({
      ...userData,
      academicHistory: updatedAcademicHistory
    })

    setErrors({...errors, ...validationsErrors});
  }

  const handleWorkHistoryChange = (updatedWorkHistory, validationsErrors) => {
    setUserData({
      ...userData,
      workHistory: updatedWorkHistory
    })

    setErrors({...errors, ...validationsErrors});
  }

  const handlePersonalReferencesChange = (updatedPersonalReferences, validationsErrors) => {
    setUserData({
      ...userData,
      personalReferences: updatedPersonalReferences
    })

    setErrors({...errors, ...validationsErrors});
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
  // setPdfMerged(pdfMerged)
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

  // Verifica si hay errores para habilitar el botón de descarga
  const errorsValue = Object.values(errors);
  const isErrorsEmpty = errorsValue.every(value => value === '');

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        className='flex flex-col text-left mx-auto'
        >
      {/*//!TODO ---------- UserData / AcademicHistory / PersonaReference ----------------- */}
        <h2> Datos Personales </h2>
        <section
          id='userData'
          className='flex flex-col md:flex-row md:flex-wrap justify-between mx-auto md:w-3/4 md:max-w-[60rem]'
          >
          <label htmlFor='imgProfile' className='text-lg'>
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
          <label htmlFor='userName' className={!errors.userName ? '' : 'text-red'}>
            {errors.userName && <p className='text-red text-xs p-0 m-0'>{errors.userName} </p>}
            Nombres y Apellidos:
            <input
              type='text'
              onChange={handleData}
              id='userName'
              name='userName'
              placeholder='Nombres y Apellidos'
              className={`${!errors.userName? '' : 'border-red focus:border-red valid:border-red text-red'}`}
              required
            />
          </label>
          <label htmlFor='date' className={!errors.date ? '' : 'text-red'}>
            {errors.date && <p className='text-red text-xs p-0 m-0'>{errors.date}</p>}
            Fecha de nacimiento:
            <input
              type='date'
              onChange={handleData}
              id='date'
              name='date'
              className={`${!errors.date ? '' : 'border-red focus:border-red valid:border-red text-red'}`}
              required
            />
          </label>
          <label htmlFor='cc' className={!errors.cc ? '' : 'text-red'}>
            {errors.cc && <p className='text-red text-xs p-0 m-0'>{errors.cc}</p>}
            <span className='text-base'>Tipo y Número de identificación:</span>
            <a href='https://www.marialabaja-bolivar.gov.co/NuestraAlcaldia/Informes/REQUISITOS%20DE%20DOCUMENTOS.pdf' target="_blank" rel="noopener noreferrer" className='text-xs text-blue_title hover:text-blue_button_hover'>Tipos validos: CC, CE, PEP, DNI, SRC, PA &#128270;</a>
            <input
              type='text'
              value={userData.cc.toUpperCase()}
              onChange={handleData}
              id='cc'
              name='cc'
              placeholder='CC 1234567890'
              className={`${!errors.cc ? '' : 'border-red focus:border-red valid:border-red text-red'}`}
              required
            />
          </label>
          <label htmlFor='phone' className={!errors.phone ? '' : 'text-red'}>
            {errors.phone && <p className='text-red text-xs p-0 m-0'>{errors.phone} </p>}
            Número de celular:
            <input
              type='text'
              value={userData.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}
              onChange={handleData}
              id='phone'
              name='phone'
              placeholder='312 123 4567'
              maxLength={12}
              className={`${!errors.phone ? '' : 'border-red focus:border-red valid:border-red text-red'}`}
              required
            />
          </label>
          <label htmlFor='email' className={!errors.email ? '' : 'text-red'}>
            {errors.email && <p className='text-red text-xs p-0 m-0'>{errors.email} </p>}
            Correo Personal:
            <input
              type='email'
              onChange={handleData}
              id='email'
              name='email'
              placeholder='Ejemplo@gmail.com'
              className={`${!errors.email ? '' : 'border-red focus:border-red valid:border-red text-red'}`}
              required
            />
          </label>
          <label htmlFor='address' className={!errors.address ? '' : 'text-red'}>
            {errors.address && <p className='text-red text-xs p-0 m-0'>{errors.address} </p>}
            Dirección:
            <input
              type='text'
              onChange={handleData}
              id='address'
              name='address'
              placeholder='Kr. 90 # 149 - 73'
              className={`${!errors.address ? '' : 'border-red focus:border-red valid:border-red text-red'}`}
              required
            />
          </label>
          <label htmlFor='profession' className={!errors.profession ? '' : 'text-red'}>
            {errors.profession && <p className='text-red text-xs p-0 m-0'>{errors.profession} </p>}
            Profesión:
            <input
              type='text'
              onChange={handleData}
              id='profession'
              name='profession'
              placeholder='Técnico Operativo'
              className={`${!errors.profession ? '' : 'border-red focus:border-red valid:border-red text-red'}`}
              required
            />
          </label>
          <fieldset>
            <legend className='text-sm ml-2'>Seleccione su sexo biológico:</legend>
            <label htmlFor='woman' className='block w-40'>
              <input
                type='radio'
                onChange={handleData}
                id='woman'
                name='biologicalSex'
                value='woman'
                className='w-[13px] mr-4'
              />
              Femenino
            </label>
            <label htmlFor='men' className='block w-40'>
              <input
                type='radio'
                onChange={handleData}
                id='men'
                name='biologicalSex'
                value='men'
                className='w-[13px] mr-4'
                required
              />
              Masculino
            </label>
          </fieldset>
        </section>
        <section className='mx-auto'>
          <label htmlFor='profile' className={!errors.profile ? 'md:w-2/3' : 'text-red md:w-2/3'}>
          {errors.profile && <p className='text-red text-xs p-0 m-0'>{errors.profile} </p>}
            Perfil Profesional:
            <textarea
              type='text'
              onChange={handleData}
              id='profile'
              name='profile'
              placeholder='Escribe tu perfil en máximo 800 caracteres mínimo 500.'
              rows='10'
              cols='60'
              className={`${!errors.profile ? 'max-w-max max-h-28 min-h-[168px] md:max-w-5xl md:min-w-min md:max-h-96' : 'border-red focus:border-red valid:border-red text-red max-w-max max-h-28 min-h-[168px] md:max-w-5xl md:min-w-min md:max-h-96'}`}
              maxLength={800}
              required
            ></textarea>
          </label>
        </section>
        <section>
          <FormAcademicBackground onAcademicHistoryChange={handleAcademicHistoryChange} />
        </section>
        <section>
          <FormWorkHistory onWorkHistoryChange={handleWorkHistoryChange} />
        </section>
        <section>
          <FormPersonalReference onPersonalReferenceChange={handlePersonalReferencesChange} />
        </section>
      {/*//!TODO -------------------------------------------------------------------------- */}

      {/*//!TODO ---------- Documents ----------------------------------------------------- */}
        <section
          id='documents'
          className='flex justify-center flex-col mx-auto md:w-3/4'
        >
          <h2>Documentación</h2>
          <span className='text-dark text-center'>Nota: Subir todos los archivos solicitados en formato PDF si tiene una imagen conviértela con <a href="https://www.ilovepdf.com/es/jpg_a_pdf" target="_blank" rel="noopener noreferrer" className='no-underline text-red'>Convertir en IlovePDF<span className='text-xs'>&#128270;</span></a></span>
          <span className='text-dark text-center mb-6'>Si necesita unir documentos PDF puede hacerlo aquí <a href="https://www.ilovepdf.com/es/unir_pdf" target="_blank" rel="noopener noreferrer" className='no-underline text-red'>Unir en IlovePDF<span className='text-xs'>&#128270;</span></a></span>

          <section className='flex flex-col md:flex-row md:flex-wrap justify-between mx-auto md:w-3/4'>
          {/*//? ----- Cédula -------------------------------------------- */}
            <label htmlFor='identificationScan' className='block text-base'>
              Cédula de Ciudadanía <span className='text-gray text-sm'>Escaneada a color al 150% </span>:
              <input
                type='file'
                onChange={handleFile}
                id='identificationScan'
                name='identificationScan'
                accept='.pdf'
                required
              />
            </label>
          {/*//? --------------------------------------------------------- */}
          {/*//? ----- Military Passbook --------------------------------- */}
            {userData.biologicalSex === 'men' ? (
              <label htmlFor='profile' className='block text-base'>
                Libreta Militar:
                <input
                  type='file'
                  onChange={handleFile}
                  id='militaryPassbook'
                  name='militaryPassbook'
                  accept='.pdf'
                  required
                />
              </label>
            ) : null}
          {/*//? --------------------------------------------------------- */}
          {/*//? ----- RUT ----------------------------------------------- */}
            <label htmlFor='rut' className='block text-base'>
              Registro Único Tributario RUT, actualizado al presente año:
              <input
                type='file'
                onChange={handleFile}
                id='rut'
                name='rut'
                accept='.pdf'
                required
              />
            </label>
          {/*//? --------------------------------------------------------- */}
          {/*//? ----- Social Security ----------------------------------- */}
            <label htmlFor='socialSecurity' className='block text-base'>
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
            <label htmlFor='occupationalMedical' className='block text-base'>
              Certificado de Aptitud Médica Ocupacional:
              <input
                type='file'
                onChange={handleFile}
                id='occupationalMedical'
                name='occupationalMedical'
                accept='.pdf'
                required
              />
            </label>
          {/*//? --------------------------------------------------------- */}
          {/*//? ----- Savings Account Certificate ----------------------- */}
            <label htmlFor='savingsAccount' className='block text-base'>
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
            {certificacionManipulacionA.includes(profession) && (
              //? ----- Certificado manipulación de alimentos -------------- */}
              <label htmlFor='professionalCardFoodHandling' className='block text-base'>
              Carnet Manipulación de Alimentos y exámenes de laboratorio aptos para manipular alimentos:
                <input
                  type='file'
                  onChange={handleFile}
                  id='professionalCardFoodHandling'
                  name='professionalCardFoodHandling'
                  accept='.pdf'
                  required = {profession !== 'auxiliar_servicios' && true}
                  />
              </label>
              //? ---------------------------------------------------------- */}
            )}
          {/*//! ------------------------------------------------------------------- */}
          {/*//! --------- Nutrition ----------------------------------------------- */}
            {profession === 'nutricionista' ? (
            //? ----- Nutrition and Dietetics Professional Card --------- */}
            <label htmlFor='professionalCardNutrition' className='block text-base'>
              Tarjeta de la Comisión del Ejercicio Profesional de Nutrición y Dietética:
              <input
                type='file'
                onChange={handleFile}
                id='professionalCardNutrition'
                name='professionalCardNutrition'
                accept='.pdf'
                  required
                />
            </label>
            //? --------------------------------------------------------- */}
            )  : null}
          {/*//! ------------------------------------------------------------------- */}
            {!certificacionManipulacionA.includes(profession) && (
              //? ----- Professional Card --------------------------------- */}
              <label htmlFor='professionalCard' className='block text-base'>
                Tarjeta profesional, Resolución y/o antecedentes profesionales:
                <input
                  type='file'
                  onChange={handleFile}
                  id='professionalCard'
                  name='professionalCard'
                  accept='.pdf'
                  required
                  />
              </label>
              //? --------------------------------------------------------- */}
            )}
          {/* //! --------- Health work --------------------------------------------- */}
            { rethus.includes(profession) && (
              //? ----- ReTHUS Certificate -------------------------------- */}
              <label htmlFor='rethusCertificate' className='block text-base'>
                Certificado ReTHUS - Registro Único Nacional del Talento Humano en Salud:
                <input
                  type='file'
                  onChange={handleFile}
                  id='rethusCertificate'
                  name='rethusCertificate'
                  accept='.pdf'
                    required
                  />
              </label>
              //? --------------------------------------------------------- */}
            )}
          {/*//! ------------------------------------------------------------------- */}
          </section>
        {/*//? ----- Criminal and disciplinary record certificates ----- */}
          <h4 className='text-center'>Certificados de antecedentes penales y disciplinarios</h4>
          <section
            id='disciplinaryRecords'
            className='flex flex-col md:flex-row md:flex-wrap justify-between mx-auto md:w-3/4'
          >
          {/*//* ----- Procuraduría ---------------- */}
            <label htmlFor='procuraduria' className='block text-base'>
            Procuraduría<a href="https://www.procuraduria.gov.co/Pages/Generacion-de-antecedentes.aspx" target="_blank" rel="noopener noreferrer"><span className='text-xs'> Descargar aquí</span>&#128270;</a>:
            <input
              type='file'
              onChange={handleFile}
              id='procuraduria'
              name='procuraduria'
              accept='.pdf'
              required
            />
            </label>
          {/*//* ----------------------------------- */}
          {/*//* ----- Contraloría ----------------- */}
            <label htmlFor='contraloria' className='block text-base'>
            Contraloría<a href="https://www.contraloria.gov.co/web/guest/persona-natural" target="_blank" rel="noopener noreferrer"><span className='text-xs'> Descargar aquí</span>&#128270;</a>:
            <input
              type='file'
              onChange={handleFile}
              id='contraloria'
              name='contraloria'
              accept='.pdf'
              required
            />
            </label>
          {/*//* ----------------------------------- */}
          {/*//* ----- Personería ------------------ */}
            <label htmlFor='personeria' className='block text-base'>
            Personería<a href="https://antecedentes.personeriabogota.gov.co/expedicion-antecedentes" target="_blank" rel="noopener noreferrer"><span className='text-xs'> Descargar aquí</span>&#128270;</a>:
            <input
              type='file'
              onChange={handleFile}
              id='personeria'
              name='personeria'
              accept='.pdf'
              required
            />
            </label>
          {/*//* ----------------------------------- */}
          {/*//* ----- Antecedentes Judiciales ----- */}
            <label htmlFor='antecedentesJud' className='block text-base'>
            Antecedentes Jud.<a href="https://antecedentes.policia.gov.co:7005/WebJudicial/" target="_blank" rel="noopener noreferrer"><span className='text-xs'> Descargar aquí</span>&#128270;</a>:
            <input
              type='file'
              onChange={handleFile}
              id='antecedentesJud'
              name='antecedentesJud'
              accept='.pdf'
              required
            />
            </label>
          {/*//* ----------------------------------- */}
          {/*//* ----- Sistema Nacional de Medidas Correctivas ------------ */}
            <label htmlFor='SNMC' className='block text-base'>
            Sistema Nacional de Medidas Correctivas<a href="https://srvcnpc.policia.gov.co/PSC/frm_cnp_consulta.aspx" target="_blank" rel="noopener noreferrer"><span className='text-xs'> Descargar aquí</span>&#128270;</a>:
            <input
              type='file'
              onChange={handleFile}
              id='SNMC'
              name='SNMC'
              accept='.pdf'
              required
            />
            </label>
          {/*//* ----------------------------------- */}
          {/*//* ----- Delitos sexuales ------------ */}
            <section>
              <label htmlFor='delitosSexuales' className='block text-base'>
                Inhabilidades antecedentes delitos sexuales<a href="https://inhabilidades.policia.gov.co:8080/" target="_blank" rel="noopener noreferrer"><span className='text-xs'> Descargar aquí</span>&#128270;</a>:
              </label>
              <p className='text-xs w-[270px] ml-[10px] mb-0'> Entidad consultante: <span onClick={(event) => copiar('Fundación Misioneros Divina Redención')} className='cursor-pointer text-blue_title underline hover:text-blue_button'>Fundación Misioneros Divina Redención </span>&#128221;</p>
              <p className='text-xs w-[270px] ml-[10px] mt-0'> NIT de la Entidad: <span onClick={(event) => copiar('8301431519')} className='cursor-pointer text-blue_title underline hover:text-blue_button'>8301431519</span>&#128221;</p>
              <input
                type='file'
                onChange={handleFile}
                id='delitosSexuales'
                name='delitosSexuales'
                className='ml-[10px]'
                accept='.pdf'
                required
              />
            </section>
          {/*//* ----------------------------------- */}
          </section>
        {/*//? --------------------------------------------------------- */}
        </section>
      {/*//!TODO -------------------------------------------------------------------------- */}
      <section className='mx-auto'>
        {isErrorsEmpty ?
          <input
            type='submit'
            value='Descargar CV'
            className='rounded-md py-3 px-7 mt-4 bg-blue_button hover:bg-blue_button_hover border-none text-xl'
          />
          : <h2 className='text-red'>Revisa los datos, podría haber algún error.</h2>
        }
      </section>
      </form>
      <div
        id='pdfViewer'
        className=''
      ></div>
    </section>
  )
}

export default Form
