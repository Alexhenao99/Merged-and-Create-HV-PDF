'use client'

const { PDFDocument, rgb, PageSizes, StandardFonts, degrees } = require('pdf-lib')

import { fetchIcons, imgPDFProfile } from './imgToPDFImage';

import iconContactPng from '/src/icons/IconContact.png'
import iconIdentificationPng from '/src/icons/IconIdentification.png'
import iconEmailPng from '/src/icons/IconEmail.png'
import iconAddressPng from '/src/icons/IconAddress.png'

const createPDF = async (userData, { imgProfile }) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage(PageSizes.A4);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaFontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // Formatos
  const { width, height } = page.getSize();
  const fontTitleSize = 16;
  const fontSubtitlesSize = 14;
  const fontText = 13.5;
  const fontDate = 12;

  // Icons
  const iconContact = await fetchIcons(iconContactPng.src, pdfDoc)
  const iconContactScale = iconContact.scaleToFit(25, 25)

  const iconIdentification = await fetchIcons(iconIdentificationPng.src, pdfDoc)
  const iconIdentificationScale = iconIdentification.scaleToFit(25, 25)

  const iconEmail = await fetchIcons(iconEmailPng.src, pdfDoc)
  const iconEmailScale = iconEmail.scaleToFit(25, 25)

  const iconAddress = await fetchIcons(iconAddressPng.src, pdfDoc)
  const iconAddressScale = iconAddress.scaleToFit(25, 25)


  // Traer la Imagen de perfil
  const PDFImageProfile = await imgPDFProfile(imgProfile, pdfDoc)
  const imgProfileScale = PDFImageProfile.scaleToFit(150, 200)


//!TODO ---*---*---*---*---*---*---*--- Objetos ---*--*---*---*---*---*---*---*---*

  // Barra Superior
  page.drawRectangle({
    x: -1,
    y: 841.89,
    width: 596,
    height: -20,
    color: rgb(0.067, 0.145, 0.275)
  })

  // Barra diagonal Izquierda-Superior
  page.drawRectangle({
    x: -1,
    y: 550,
    width: 450,
    height: 250,
    rotate: degrees(45),
    color: rgb(0.129, 0.271, 0.502)
  })

  // Barra Inferior
  page.drawRectangle({
    x: -1,
    y: 0,
    width: 596,
    height: 23,
    color: rgb(0.067, 0.145, 0.275)
  })

  // Barra diagonal Derecha-inferior
  page.drawRectangle({
    x: 450,
    y: 0,
    width: 300,
    height: -250,
    rotate: degrees(45),
    color: rgb(0.129, 0.271, 0.502)
  })


  // Circulo Superior-Derecho
  page.drawCircle({
    x: 596,
    y: 800,
    size: 60,
    color: rgb(0.361, 0.435, 0.561),
    opacity: 0.3,
  })

  // Circulo Inferior-Izquierdo
  page.drawCircle({
    x: 20,
    y: 40,
    size: 60,
    color: rgb(0.361, 0.435, 0.561),
    opacity: 0.3,
  })

//!TODO ---*---*---*---*---*---*---*---*---*---*---*--*---*---*---*---*---*---*---*

//!TODO ---*---*---*---*---*---*---*--- Icons ---*--*---*---*---*---*---*---*---*

  // Contact
  page.drawImage(iconContact, {
    x: 25,
    y: 545,
    width: iconContactScale.width,
    height: iconContactScale.height,
  })

  // Identification
  page.drawImage(iconIdentification, {
    x: 20,
    y: 520,
    width: iconIdentificationScale.width,
    height: iconIdentificationScale.height,
  })

  // Email
  page.drawImage(iconEmail, {
    x: 20,
    y: 485,
    width: iconEmailScale.width,
    height: iconEmailScale.height,
  })

  // Address
  page.drawImage(iconAddress, {
    x: 23,
    y: 450,
    width: iconAddressScale.width,
    height: iconAddressScale.height,
  })

//!TODO ---*---*---*---*---*---*---*---*---*---*---*--*---*---*---*---*---*---*---*

//!TODO ---*---*---*---*---*---*---*--- Textos ---*--*---*---*---*---*---*---*---*

  // Contacto
  page.drawText('CONTACTO',{
    x: 57,
    y: 582,
    size: fontSubtitlesSize,
    font: helveticaFontBold,
    color: rgb(0, 0, 0)
  })

  // Formación académica
  page.drawText('FORMACIÓN ACADÉMICA',{
    x: 14,
    y: 424,
    size: fontSubtitlesSize,
    font: helveticaFontBold,
    color: rgb(0, 0, 0)
  })

  // Perfil profesional
  page.drawText('PERFIL PROFESIONAL',{
    x: 230,
    y: 720,
    size: fontSubtitlesSize,
    font: helveticaFontBold,
    color: rgb(0, 0, 0)
  })

  // Experiencia Laboral
  page.drawText('EXPERIENCIA LABORAL',{
    x: 230,
    y: 580,
    size: fontSubtitlesSize,
    font: helveticaFontBold,
    color: rgb(0, 0, 0)
  })

  // Referencias
  page.drawText('REFERENCIAS PERSONALES',{
    x: 230,
    y: 160,
    size: fontSubtitlesSize,
    font: helveticaFontBold,
    color: rgb(0, 0, 0)
  })

//!TODO ---*---*---*---*---*---*---*---*---*---*---*--*---*---*---*---*---*---*---*

//!TODO ---*---*---*---*---*---*---*--- Datos traídos del Usuario ---*--*---*---*---*---*---*---*---*

console.log(width)
console.log(height)
  // Imagen de perfil
  page.drawImage(PDFImageProfile, {
    x: 44,
    y: 612,
    width: imgProfileScale.width,
    height: imgProfileScale.height,
  })

  // page.drawText(userData.userName,{
  //   x: 10,
  //   y: 5,
  //   size: fontSize,
  //   font: helveticaFont,
  //   color: rgb(0.129, 0.271, 0.502)
  // })

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

const imageToPDF = async (imageBytes) => {
  const pdfDoc = await PDFDocument.create();
  const image = await pdfDoc.embedJpg(imageBytes);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  page.drawImage(image, {
    x: 50,
    y: height - 100,
    width: 100,
    height: 100,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

const mergePDFS = async (pdfCreate, pdfArrays) => {
  const pdfDoc = await PDFDocument.create();

  // Agregar el primer PDF (pdfCreate)
  const firstPdf = await PDFDocument.load(pdfCreate);
  const firstCopiedPages = await pdfDoc.copyPages(firstPdf, firstPdf.getPageIndices());
  firstCopiedPages.forEach((page) => pdfDoc.addPage(page));

  // Agregar los demás PDFs en el orden que se especifica en pdfArrays
  for (const key in pdfArrays) {
    if (pdfArrays.hasOwnProperty(key)) {
      const file = pdfArrays[key];
      const pdfBytes = await file.arrayBuffer();
      const uploadedPdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await pdfDoc.copyPages(uploadedPdf, uploadedPdf.getPageIndices());
      copiedPages.forEach((page) => pdfDoc.addPage(page));
    }
  }

  // Generar el PDF final
  const pdfBytesFinal = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytesFinal], { type: 'application/pdf' });

  return pdfBlob
}

const mostrarPDF = async () => {
  // Suponiendo que ya tienes los bytes del PDF final en la variable mergedPDFBytes

  const pdfDataUri = await PDFDocument.load(mergedPDFBytes).toDataUri();
  const pdfViewer = document.getElementById('pdfViewer');
  pdfViewer.src = pdfDataUri;
}

export {
  createPDF,
  imageToPDF,
  mergePDFS,
  mostrarPDF
}