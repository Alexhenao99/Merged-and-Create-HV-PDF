'use client'

import { createPDF, mergePDFS } from '@/utils/functionsPDFS';
import { useEffect, useState } from 'react';

const Form = () => {
  // ----------
  const [pdfMerged, setPdfMerged] = useState(null);
  // ----------
  const [fileReferences, setFileReferences] = useState({
    identificationScan: null,
    militaryPassbook: null
  });
  const [imgProfile, setImgProfile] = useState({imgProfile: null})
  const [ userData, setUserData ] = useState(({
    userName: '',
    biologicalSex: '',
    profession: '',
    profile: '',
    phone: '',
    age: '',
    cc: '',
    email: '',
    address: '',
    // academicHistory: []
  }))

  const handleFile = (e) => {
    const id = e.target.id;
    const file = e.target.files[0];

    setFileReferences({
      ...fileReferences,
      [id]: file, // Almacena la referencia al archivo en fileReferences
    });
  };

  const handleImages = (e) => {
    const id = e.target.id;
    const file = e.target.files[0];

    setImgProfile({
      ...imgProfile,
      [id]: file, // Almacena la referencia al archivo en fileReferences
    });
  }

  const handleData = (e) => {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  };

  // const handleAddAcademicHistory = () => {
  //   const newAcademicHistory = {
  //     institution: '',
  //     completionDate: '',
  //     degree: '',
  //     diplomaPDF: null,
  //   };

  //   setUserData({
  //     ...userData,
  //     academicHistory: [...userData.academicHistory, newAcademicHistory],
  //   });
  // };

  // const handleAcademicHistoryData = (e, index) => {
  //   const { id, value } = e.target;
  //   const updatedAcademicHistory = [...userData.academicHistory];
  //   updatedAcademicHistory[index][id] = value;

  //   setUserData({
  //     ...userData,
  //     academicHistory: updatedAcademicHistory,
  //   });
  // };

  // const handleAcademicHistoryFile = (e, index) => {
  //   const file = e.target.files[0];
  //   const updatedAcademicHistory = [...userData.academicHistory];
  //   updatedAcademicHistory[index].diplomaPDF = file;

  //   setUserData({
  //     ...userData,
  //     academicHistory: updatedAcademicHistory,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pdfArrays = {
      identificationScan: fileReferences.identificationScan,
      militaryPassbook: fileReferences.militaryPassbook,
      // ...otros archivos si es necesario
    };

    // crea el PDF
    const pdfCreateBytes = await createPDF(userData, imgProfile)


    const pdfMerged = await mergePDFS(pdfCreateBytes, pdfArrays);
    setPdfMerged(pdfMerged)

    // const downloadLink = URL.createObjectURL(pdfMerged);
    // const a = document.createElement('a');
    // a.href = downloadLink;
    // a.download = `Curriculum de ${userData.userName}.pdf`;
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  };

  // ---------------------
  const renderPdf = async () => {
    if (pdfMerged instanceof Blob) {
      const pdfUrl = URL.createObjectURL(pdfMerged);

      const pdfViewer = document.getElementById('pdfViewer');
      pdfViewer.innerHTML = ''; // Limpia el contenido anterior

      const embed = document.createElement('embed');
      embed.src = pdfUrl;
      embed.type = 'application/pdf';
      embed.width = '900px';
      embed.height = '900px';

      pdfViewer.appendChild(embed);
    }
  };

  // Llama a renderPdf cuando pdfMerged se actualice
  useEffect(() => {
    renderPdf();
  }, [pdfMerged]);

  return (
    <section>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <ul className='max-w-sm'>
          <li>
            <label htmlFor='imgProfile' >Foto de Perfil:
              <input type='file' onChange={handleImages} id="imgProfile" name="imgProfile" accept="image/*" />
            </label>
          </li>
          <li>
            <label htmlFor='userName' >Nombres y Apellidos:
              <input type="text" onChange={handleData} id='userName' name='userName' placeholder='Nombres y Apellidos' required/>
            </label>
          </li>
          <li>
            <fieldset>
              <legend>Seleccione su sexo biológico:</legend>

              <div>
                <label htmlFor="biologicalSex">Mujer
                  <input type="radio" onChange={handleData} id="biologicalSex" name="biologicalSex" value="woman"/>
                </label>
              </div>

              <div>
                <label htmlFor="biologicalSex">Hombre
                  <input type="radio" onChange={handleData} id="biologicalSex" name="biologicalSex" value="men"/>
                </label>
              </div>
            </fieldset>
          </li>
          <li>
            <label htmlFor='age' >Edad:
              <input type="number" onChange={handleData} id='age' name='age' placeholder='25' required/>
            </label>
          </li>
          <li>
            <label htmlFor='cc' >Tipo y Número de identificación:
              <input type="text" onChange={handleData} id='cc' name='cc' placeholder='CC 1234567890' required/>
            </label>
          </li>
          <li>
            <label htmlFor='phone' >Número de celular:
              <input type="number" onChange={handleData} id='phone' name='phone' placeholder='(316) 212-3456' required/>
            </label>
          </li>
          <li>
            <label htmlFor='email' >Correo Personal:
              <input type="email" onChange={handleData} id='email' name='email' placeholder='Ejemplo@gmail.com' required/>
            </label>
          </li>
          <li>
            <label htmlFor='address' >Dirección:
              <input type="text" onChange={handleData} id='address' name='address' placeholder='Kr. 90 # 149 - 73' required/>
            </label>
          </li>
          <li>
            <label htmlFor='profession' >Profesión:
              <input type="text" onChange={handleData} id='profession' name='profession' placeholder='Técnico Operativo' required/>
            </label>
          </li>
          <li>
            <label htmlFor='profile' >Perfil Profesional:
              <textarea type="text" onChange={handleData} id='profile' name='profile' placeholder='Escribe tu perfil en máximo 300 caracteres' rows="3" cols="30"  className='max-w-sm min-w-0' required></textarea>
            </label>
          </li>
          <li>
            <label htmlFor='profile' >Cédula de Ciudadanía: <span className='text-gray'>Escaneada a color al 150% </span>
              <input type='file' onChange={handleFile} id="identificationScan" name="identificationScan" accept=".pdf" />
            </label>
          </li>
          {
            userData.biologicalSex === "men" ?
              <li>
                <label htmlFor='profile' >Libreta Militar:
                <input type='file' onChange={handleFile} id="militaryPassbook" name="militaryPassbook" accept=".pdf" />
                </label>
              </li>
               : null
          }
          <input type="submit" value="Terminar" />
        </ul>
      </form>
      <div id="pdfViewer" className=''></div>
    </section>
  );
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