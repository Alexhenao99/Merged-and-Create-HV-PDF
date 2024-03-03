import { PageSizes, rgb, degrees } from 'pdf-lib'
import pageDesign from './pageDesign'

export const insertOnePage = (pdfDoc, page, userData, yStartLeft, yStartRight, font, fontBold, iconContact, iconDate, iconIdentification, iconEmail, iconAddress, PDFImageProfile) => {
  // Escalas
  const iconContactScale = iconContact.scaleToFit(25, 25)
  const iconDateScale = iconDate.scaleToFit(25, 25)
  const iconIdentificationScale = iconIdentification.scaleToFit(25, 25)
  const iconEmailScale = iconEmail.scaleToFit(25, 25)
  const iconAddressScale = iconAddress.scaleToFit(25, 25)
  const imgProfileScale = PDFImageProfile.scaleToFit(150, 200)

  // Formatos
  let yLeft = yStartLeft
  let yRight = yStartRight
  const maxWidth = 340
  const fontTitleSize = 25
  const fontSubtitlesSize = 14
  const fontTextSize = 12
  const fontDate = 10.5
  const lineHeight = 15
  const division = 30
  const divisionIcon = 20
  const IconHeight = 10

  //* ---------------------------------------------- Left ---------------------------------------------- *\\

  //!TODO Imagen de perfil //
  page.drawImage(PDFImageProfile, {
    x: 44,
    y: 612,
    width: imgProfileScale.width,
    height: imgProfileScale.height
  })

  //? Text Contacto //
  page.drawText('CONTACTO', {
    x: 57,
    y: yLeft,
    lineHeight: lineHeight,
    size: fontSubtitlesSize,
    font: fontBold,
    color: rgb(0, 0, 0)
  })
  yLeft -= lineHeight + divisionIcon

  //! Icon Contact //
  page.drawImage(iconContact, {
    x: 25,
    y: yLeft,
    width: iconContactScale.width,
    height: iconContactScale.height
  })

  //!TODO Contact //
  page.drawText(userData.phone, {
    x: 55,
    y: yLeft - 4 + iconContactScale.height / 2,
    font: font,
    size: fontTextSize,
    color: rgb(0, 0, 0)
  })
  yLeft -= IconHeight + divisionIcon

  //! Icon Date //
  page.drawImage(iconDate, {
    x: 21,
    y: yLeft,
    width: iconDateScale.width,
    height: iconDateScale.height
  })

  //!TODO Date //
  page.drawText(userData.date, {
    x: 55,
    y: yLeft - 4 + iconDateScale.height / 2,
    font: font,
    size: fontTextSize,
    color: rgb(0, 0, 0)
  })
  yLeft -= 2 + divisionIcon

  //! Icon Identification //
  page.drawImage(iconIdentification, {
    x: 20,
    y: yLeft,
    width: iconIdentificationScale.width,
    height: iconIdentificationScale.height
  })

  //!TODO Identification //
  page.drawText(userData.cc, {
    x: 55,
    y: yLeft - 4 + iconIdentificationScale.height / 2,
    font: font,
    size: fontTextSize,
    color: rgb(0, 0, 0)
  })
  yLeft -= IconHeight + divisionIcon

  //! Icon Email //
  page.drawImage(iconEmail, {
    x: 20,
    y: yLeft,
    width: iconEmailScale.width,
    height: iconEmailScale.height
  })

  //!TODO Email //
  page.drawText(userData.email, {
    x: 55,
    y: yLeft - 4 + iconEmailScale.height / 2,
    font: font,
    size: userData.email.length > 25 ? fontDate : fontTextSize,
    color: rgb(0, 0, 0)
  })
  yLeft -= IconHeight + divisionIcon

  //! Icon Address //
  page.drawImage(iconAddress, {
    x: 23,
    y: yLeft,
    width: iconAddressScale.width,
    height: iconAddressScale.height
  })

  //!TODO Address //
  page.drawText(userData.address, {
    x: 55,
    y: yLeft - 4 + iconAddressScale.height / 2,
    maxWidth: 200,
    font: font,
    size: userData.address.length > 25 ? fontDate : fontTextSize,
    color: rgb(0, 0, 0)
  })
  yLeft -= division

  //? Text Formación académica //
  page.drawText('FORMACIÓN ACADÉMICA', {
    x: 14,
    y: yLeft,
    size: fontSubtitlesSize,
    font: fontBold,
    color: rgb(0, 0, 0)
  })
  yLeft -= division

  //!TODO Formación académica //
  userData.academicHistory.map((academic) => {
    page.drawText(academic.finishDate, {
      x: 14,
      y: yLeft,
      maxWidth: 285,
      font: font,
      size: fontDate,
      color: rgb(0, 0, 0)
    })
    yLeft -= lineHeight
    page.drawText(academic.title, {
      x: 14,
      y: yLeft,
      maxWidth: 190,
      lineHeight: lineHeight,
      font: fontBold,
      size: academic.title.length > 22 ? fontDate : fontSubtitlesSize,
      color: rgb(0, 0, 0)
    })// 60 caracteres
    yLeft -= academic.title.length > 30 ? lineHeight * 2 : lineHeight
    page.drawText(academic.institution, {
      x: 14,
      y: yLeft,
      maxWidth: 190,
      lineHeight: lineHeight,
      font: font,
      size: fontTextSize,
      color: rgb(0, 0, 0)
    })// 60 caracteres
    yLeft -= academic.institution.length > 30 ? lineHeight * 3 : lineHeight * 2
  })

  //* ---------------------------------------------- Right ---------------------------------------------- *\\

  //!TODO Name //
  page.drawText(userData.userName, {
    x: 265,
    y: yRight,
    maxWidth: 285,
    font: fontBold,
    size: fontTitleSize,
    color: rgb(0, 0, 0)
  })
  yRight -= userData.userName.length > 21 ? lineHeight * 3 + 5 : lineHeight + 10

  //!TODO Profession //
  page.drawText(userData.profession, {
    x: 265,
    y: yRight,
    font: font,
    size: fontSubtitlesSize + 2,
    color: rgb(0, 0, 0)
  }) // máximo 32 caracteres
  yRight -= division

  //? Text Perfil profesional //
  page.drawText('PERFIL PROFESIONAL', {
    x: 230,
    y: yRight,
    size: fontSubtitlesSize,
    font: fontBold,
    color: rgb(0, 0, 0)
  })
  yRight -= lineHeight + 10

  //!TODO Profile //
  page.drawText(userData.profile, {
    x: 230,
    y: yRight,
    maxWidth: maxWidth,
    lineHeight: lineHeight,
    font: font,
    size: fontTextSize,
    color: rgb(0, 0, 0)
  })
  const profileHeight = estimateTextHeight(userData.profile, font, fontTextSize, maxWidth, lineHeight)
  yRight -= profileHeight + division * 2

  //? Experiencia Laboral //
  page.drawText('EXPERIENCIA LABORAL', {
    x: 230,
    y: yRight,
    size: fontSubtitlesSize,
    font: fontBold,
    color: rgb(0, 0, 0)
  })
  yRight -= division

  //!TODO Experiencia Laboral //
  userData.workHistory.map((work) => {
    if (yRight <= 200) {
      page = pdfDoc.addPage(PageSizes.A4)
      pageDesign(page, rgb, degrees)
      yRight = 760
    }
    page.drawText(work.company, {
      x: 230,
      y: yRight,
      maxWidth: maxWidth,
      lineHeight: lineHeight,
      font: fontBold,
      size: fontSubtitlesSize,
      color: rgb(0, 0, 0)
    })
    const companyHeight = estimateTextHeight(work.company, fontBold, fontTextSize, maxWidth, lineHeight)
    yRight -= companyHeight
    page.drawText(work.workstation, {
      x: 230,
      y: yRight,
      maxWidth: maxWidth,
      font: font,
      size: fontSubtitlesSize,
      color: rgb(0, 0, 0)
    })
    yRight -= lineHeight
    page.drawText(`${work.startDate} - ${work.finishDate}`, {
      x: 230,
      y: yRight,
      maxWidth: maxWidth,
      lineHeight: lineHeight,
      font: font,
      size: fontDate,
      color: rgb(0, 0, 0)
    })
    yRight -= lineHeight
    page.drawText(work.directSupervisor, {
      x: 230,
      y: yRight,
      maxWidth: maxWidth,
      font: font,
      size: fontDate,
      color: rgb(0, 0, 0)
    })
    yRight -= lineHeight
    page.drawText(work.contactSupervisor, {
      x: 230,
      y: yRight,
      maxWidth: maxWidth,
      font: font,
      size: fontDate,
      color: rgb(0, 0, 0)
    })
    yRight -= lineHeight
    page.drawText(work.functions, {
      x: 230,
      y: yRight,
      maxWidth: maxWidth,
      lineHeight: lineHeight,
      font: font,
      size: fontDate,
      color: rgb(0, 0, 0)
    })
    const functionHeight = estimateTextHeight(work.functions, font, fontTextSize, maxWidth, lineHeight)
    yRight -= functionHeight
  })

  //? Text Referencias //
  page.drawText('REFERENCIAS PERSONALES', {
    x: 230,
    y: yRight,
    size: fontSubtitlesSize,
    font: fontBold,
    color: rgb(0, 0, 0)
  })
  yRight -= division

  //!TODO Referencias personales //
  page.drawText(userData.personalReferences[0].name, {
    x: 230,
    y: yRight,
    size: fontSubtitlesSize,
    font: fontBold,
    color: rgb(0, 0, 0)
  }) // max 16 caracteres
  yRight -= lineHeight
  page.drawText(userData.personalReferences[0].profession, {
    x: 230,
    y: yRight,
    size: fontSubtitlesSize,
    font: font,
    color: rgb(0, 0, 0)
  })
  yRight -= lineHeight
  page.drawText(userData.personalReferences[0].contact, {
    x: 230,
    y: yRight,
    size: fontSubtitlesSize,
    font: font,
    color: rgb(0, 0, 0)
  })
  yRight -= lineHeight

  //!TODO Referencias personales 2//
  page.drawText(userData.personalReferences[0].name2, {
    x: 420,
    y: yRight + 45,
    size: fontSubtitlesSize,
    font: fontBold,
    color: rgb(0, 0, 0)
  })// max 16 caracteres
  yRight -= lineHeight
  page.drawText(userData.personalReferences[0].profession2, {
    x: 420,
    y: yRight + 45,
    size: fontSubtitlesSize,
    font: font,
    color: rgb(0, 0, 0)
  })
  yRight -= lineHeight
  page.drawText(userData.personalReferences[0].contact2, {
    x: 420,
    y: yRight +45,
    size: fontSubtitlesSize,
    font: font,
    color: rgb(0, 0, 0)
  })
  yRight -= lineHeight
}

export const estimateTextHeight = (text, font, size, maxWidth, lineHeight) => {
  const words = text.split(/\s+/) // Dividir por espacios en blanco y saltos de línea
  let lines = []
  let currentLine = words[0]

  for (let i = 1; i < words.length; i++) {
    const word = words[i]
    const width = font.widthOfTextAtSize(currentLine + ' ' + word, size)

    if (width <= maxWidth) {
      currentLine += ' ' + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine)
  }

  return lines.length * lineHeight
}
