export const insertOnePage = (page, rgb, userData, yStartLeft, yStartRight, font, fontBold, iconContact, iconDate, iconIdentification, iconEmail, iconAddress, PDFImageProfile) => {
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
  const maxWidth = 350
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
    y: yLeft - 4 + (iconContactScale.height / 2),
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
    y: yLeft - 4  + iconIdentificationScale.height / 2,
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
  yLeft -= lineHeight

  //!TODO Formación académica //


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
  }) // máximo 500 caracteres
  const profileHeight = estimateTextHeight(userData.profile, font, fontTextSize, maxWidth, lineHeight)
  yRight -= profileHeight + division

  //? Text Referencias //
  page.drawText('REFERENCIAS PERSONALES', {
    x: 230,
    y: 160,
    size: fontSubtitlesSize,
    font: fontBold,
    color: rgb(0, 0, 0)
  })

  //? Experiencia Laboral //
  page.drawText('EXPERIENCIA LABORAL', {
    x: 230,
    y: yRight,
    size: fontSubtitlesSize,
    font: fontBold,
    color: rgb(0, 0, 0)
  })
  yRight -= lineHeight
}

export const estimateTextHeight = (text, font, size, maxWidth, lineHeight) => {
  const words = text.split(' ')
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
