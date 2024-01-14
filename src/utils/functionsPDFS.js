'use client'

const { PDFDocument, rgb, PageSizes, StandardFonts, degrees } = require('pdf-lib')
import { fetchIcons, imgPDFProfile } from './imgToPDFImage'

// Imp. funciones
import { insertOnePage } from './insertOnePage'
import pageDesign from './pageDesign'

// Imp. iconos
import iconContactPng from '/src/icons/IconContact.png'
import iconDatePng from '/src/icons/calendario.png'
import iconIdentificationPng from '/src/icons/IconIdentification.png'
import iconEmailPng from '/src/icons/IconEmail.png'
import iconAddressPng from '/src/icons/IconAddress.png'

const createPDF = async (userData, { imgProfile }) => {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage(PageSizes.A4)
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  console.log(userData)

  // Icons
  const iconContact = await fetchIcons(iconContactPng.src, pdfDoc)
  const iconDate = await fetchIcons(iconDatePng.src, pdfDoc)
  const iconIdentification = await fetchIcons(iconIdentificationPng.src, pdfDoc)
  const iconEmail = await fetchIcons(iconEmailPng.src, pdfDoc)
  const iconAddress = await fetchIcons(iconAddressPng.src, pdfDoc)

  // Traer la Imagen de perfil
  const PDFImageProfile = await imgPDFProfile(imgProfile, pdfDoc)

  // Formatos
  let yStartLeft = 582
  let yStartRight = 790

  // Diseño del pdf
  pageDesign(page, rgb, degrees)

  // Insertar datos
  insertOnePage(pdfDoc, page, userData, yStartLeft, yStartRight, font, fontBold, iconContact, iconDate, iconIdentification, iconEmail, iconAddress, PDFImageProfile)

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}

const imageToPDF = async (imageBytes) => {
  const pdfDoc = await PDFDocument.create()
  const image = await pdfDoc.embedJpg(imageBytes)

  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()

  page.drawImage(image, {
    x: 50,
    y: height - 100,
    width: 100,
    height: 100
  })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}

const mergePDFS = async (pdfCreate, pdfArrays) => {
  const pdfDoc = await PDFDocument.create()

  // Agregar el primer PDF (pdfCreate)
  const firstPdf = await PDFDocument.load(pdfCreate)
  const firstCopiedPages = await pdfDoc.copyPages(firstPdf, firstPdf.getPageIndices())
  firstCopiedPages.forEach((page) => pdfDoc.addPage(page))

  // Agregar los demás PDFs en el orden que se especifica en pdfArrays
  for (const key in pdfArrays) {
    if (pdfArrays.hasOwnProperty(key)) {
      const file = pdfArrays[key]
      const pdfBytes = await file.arrayBuffer()
      const uploadedPdf = await PDFDocument.load(pdfBytes)
      const copiedPages = await pdfDoc.copyPages(uploadedPdf, uploadedPdf.getPageIndices())
      copiedPages.forEach((page) => pdfDoc.addPage(page))
    }
  }

  // Generar el PDF final
  const pdfBytesFinal = await pdfDoc.save()
  const pdfBlob = new Blob([pdfBytesFinal], { type: 'application/pdf' })

  return pdfBlob
}

const mostrarPDF = async () => {
  // Suponiendo que ya tienes los bytes del PDF final en la variable mergedPDFBytes

  const pdfDataUri = await PDFDocument.load(mergedPDFBytes).toDataUri()
  const pdfViewer = document.getElementById('pdfViewer')
  pdfViewer.src = pdfDataUri
}

function copiar(text) {
  // Intenta enfocar el documento antes de copiar al portapapeles
  document.querySelector('body').focus()

  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert('¡Copiado con éxito!')
    })
    .catch((err) => {
      console.error('Error al copiar al portapapeles: ', err)
    })
}

const validate = (validar) => {
  let errors = {};

  if ('userName' in validar) {
    if (validar.userName === '') errors.userName = 'Este Campo Es Obligatorio *';
    else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(validar.userName)) errors.userName = 'El nombre o el apellido es inválido.';
    else if (!/^\S{3,}(?:\s\S{3,})+$/.test(validar.userName)) errors.userName = 'Debe escribir su Nombre Completo';
  }

  if ('cc' in validar) {
    if (validar.cc === '') errors.cc = 'Este Campo Es Obligatorio *';
    else if (!/^(CC|TI)/.test(validar.cc)) errors.cc = 'El tipo de documento es inválido.';
    else if (!/^(CC|TI)\s\d{10,12}$/.test(validar.cc)) errors.cc = 'El numero de documento es inválido.';
  }

  if ('phone' in validar) {
    if (validar.phone === '') errors.phone = 'Este Campo es obligatorio';
    else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(validar.phone)) errors.phone = 'El número de celular es inválido.'
  }

  return errors;
};


export { createPDF, imageToPDF, mergePDFS, mostrarPDF, copiar, validate }
