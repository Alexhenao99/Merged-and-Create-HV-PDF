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
import logoFUMDIR from '/src/icons/fumdir-logo.png'

const createPDF = async (userData, { imgProfile }) => {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage(PageSizes.A4)
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

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
  const markWater = await addWatermarkTextToPdf(pdfBytes, "PDFCreated")
  return markWater
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
      const markWater = await addWatermarkTextToPdf(pdfBytes, "PdfFinal")
      const uploadedPdf = await PDFDocument.load(markWater, { ignoreEncryption: true })
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

// Función para agregar una marca de agua de texto a todas las páginas del PDF
const addWatermarkTextToPdf = async (pdfBuffer, type) => {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const watermarkImage = await await fetchIcons(logoFUMDIR.src, pdfDoc);

  const pageCount = pdfDoc.getPageCount();
  for (let i = 0; i < pageCount; i++) {
    const page = pdfDoc.getPage(i);
    type === "PdfFinal" ? await addWatermarkTextToPage(page, watermarkImage) : await addWatermarkTextToPDFCreate(page, watermarkImage);
  }

  return await pdfDoc.save();
};

// Función para agregar una marca de agua al PDF Creado
const addWatermarkTextToPDFCreate = async (page, watermarkImage) => {
  const { width, height } = page.getSize();
  const watermarkScale = watermarkImage.scaleToFit(500, 500); // Tamaño de la marca de agua

  page.drawImage(watermarkImage, {
    x: width / 2 - watermarkScale.width / 2,
    y: height / 2 - watermarkScale.height / 2,
    width: watermarkScale.width,
    height: watermarkScale.height,
    opacity: 0.1, // Opacidad de la marca de agua
  });
};

// Función para agregar una marca de agua al PDF Final
const addWatermarkTextToPage = async (page, watermarkImage) => {
  const watermarkText = 'Documento creado con la app web de FUMDIR';
  const fontSize = 15;
  page.drawText(watermarkText, {
    x: 5,
    y: 550,
    size: fontSize,
    rotate: degrees(-90),
    color: rgb(0.1608, 0.3451, 0.5569),
  });

  const watermarkScale = watermarkImage.scaleToFit(100, 100); // Tamaño de la marca de agua
  page.drawImage(watermarkImage, {
    x: 525,
    y: 10,
    width: watermarkScale.width,
    height: watermarkScale.height,
    opacity: 1, // Opacidad de la marca de agua
  });
};

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

export { createPDF, imageToPDF, mergePDFS, mostrarPDF, copiar }
