import { PageSizes, rgb, degrees } from 'pdf-lib'
import pageDesign from './pageDesign'

export const insertOnePage = (pdfDoc, page, userData, yStartLeft, yStartRight, font, fontBold, icons, iconsScale, PDFImageProfile, imgProfileScale) => {
  let pageN = page;
  let yLeft = yStartLeft;
  let yRight = yStartRight;

  const checkNewPage = () => {
    if (yRight <= 100) {
      pageN = pdfDoc.addPage(PageSizes.A4);
      pageDesign(pageN, rgb, degrees);
      yRight = 760;
    }
    return yRight;
  };

  const drawTextWithIcon = (text, icon, iconScale, xIcon, yPos, xText, fontSize) => {
    pageN.drawImage(icon, {
      x: xIcon,
      y: yPos,
      width: iconScale.width,
      height: iconScale.height
    });

    pageN.drawText(text, {
      x: xText,
      y: yPos - 4 + iconScale.height / 2,
      font: font,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
  };

  const drawSectionHeader = (text, xPos, yPos) => {
    pageN.drawText(text, {
      x: xPos,
      y: yPos,
      font: fontBold,
      size: 14,
      color: rgb(0, 0, 0),
    });
  };

  // * ------------------------------------------- Sección izquierda ---------------------------------------------

  // Imagen de perfil
  pageN.drawImage(PDFImageProfile, {
    x: 44,
    y: 612,
    width: imgProfileScale.width,
    height: imgProfileScale.height
  });

  // Sección de contacto
  drawSectionHeader('CONTACTO', 57, yLeft);
  yLeft -= 30;

  drawTextWithIcon(userData.phone, icons.contact, iconsScale.contact, 25, yLeft, 55, 12);
  yLeft -= 30;

  drawTextWithIcon(userData.date, icons.date, iconsScale.date, 21, yLeft, 55, 12);
  yLeft -= 25;

  drawTextWithIcon(userData.cc, icons.identification, iconsScale.identification, 20, yLeft, 55, 12);
  yLeft -= 30;

  drawTextWithIcon(userData.email, icons.email, iconsScale.email, 20, yLeft, 55, userData.email.length > 25 ? 10.5 : 12);
  yLeft -= 30;

  drawTextWithIcon(userData.address, icons.address, iconsScale.address, 23, yLeft, 55, userData.address.length > 25 ? 10.5 : 12);
  yLeft -= 25;

  // Sección de formación académica
  drawSectionHeader('FORMACIÓN ACADÉMICA', 14, yLeft);
  yLeft -= 25;

  userData.academicHistory.forEach(academic => {
    pageN.drawText(academic.finishDate, {
      x: 14,
      y: yLeft,
      maxWidth: 285,
      font: font,
      size: 10.5,
      color: rgb(0, 0, 0)
    });
    yLeft -= 15;

    pageN.drawText(academic.title, {
      x: 14,
      y: yLeft,
      maxWidth: 190,
      font: fontBold,
      size: 13,
      lineHeight: 15,
      color: rgb(0, 0, 0)
    });
    yLeft -= estimateTextHeight(academic.title, fontBold, 13, 285, 15);

    pageN.drawText(academic.institution, {
      x: 14,
      y: yLeft,
      maxWidth: 190,
      font: font,
      size: 12,
      lineHeight: 15,
      color: rgb(0, 0, 0)
    });
    yLeft -= estimateTextHeight(academic.institution, font, 12, 285, 25);
  });

  // * ------------------------------------------- Sección derecha ---------------------------------------------
  pageN.drawText(userData.userName, {
    x: 265,
    y: yRight,
    maxWidth: 285,
    font: fontBold,
    size: 25,
    color: rgb(0, 0, 0)
  });
  yRight -= estimateTextHeight(userData.userName, fontBold, 25, 285, 25);

  pageN.drawText(userData.profession, {
    x: 265,
    y: checkNewPage(),
    maxWidth: 285,
    font: font,
    size: 16,
    lineHeight: 15,
    color: rgb(0, 0, 0)
  });
  yRight -= estimateTextHeight(userData.profession, font, 16, 285, 25);

  drawSectionHeader('PERFIL PROFESIONAL', 230, checkNewPage());
  yRight -= 25;

  pageN.drawText(userData.profile, {
    x: 230,
    y: checkNewPage(),
    maxWidth: 340,
    lineHeight: 15,
    font: font,
    size: 12,
    color: rgb(0, 0, 0)
  });
  yRight -= estimateTextHeight(userData.profile, font, 12, 340, 15) + 30;
  checkNewPage()

  drawSectionHeader('EXPERIENCIA LABORAL', 230, checkNewPage());
  yRight -= 25;

  userData.workHistory.forEach(work => {
    pageN.drawText(work.company, {
      x: 230,
      y: yRight,
      maxWidth: 340,
      font: fontBold,
      size: 14,
      lineHeight: 15,
      color: rgb(0, 0, 0)
    });
    yRight -= estimateTextHeight(work.company, fontBold, 14, 340, 15);
    checkNewPage()

    pageN.drawText(work.workstation, {
      x: 230,
      y: yRight,
      maxWidth: 340,
      font: font,
      size: 14,
      lineHeight: 15,
      color: rgb(0, 0, 0)
    });
    yRight -= estimateTextHeight(work.workstation, font, 14, 340, 15);
    checkNewPage()

    pageN.drawText(`${work.startDate} - ${work.finishDate}`, {
      x: 230,
      y: yRight,
      maxWidth: 340,
      font: font,
      size: 10.5,
      color: rgb(0, 0, 0)
    });
    yRight -= 15;
    checkNewPage()

    pageN.drawText(work.directSupervisor + " - " + work.contactSupervisor, {
      x: 230,
      y: yRight,
      maxWidth: 340,
      font: font,
      size: 10.5,
      color: rgb(0, 0, 0)
    });
    yRight -= 15;
    checkNewPage()

    pageN.drawText(work.functions, {
      x: 230,
      y: yRight,
      // y: yRight = drawLongText(pdfDoc,pageN, work.functions, 230, yRight, 340, font, 12, 1.5),
      maxWidth: 340,
      size: 10.5,
      lineHeight: 15,
      font: font,
      color: rgb(0, 0, 0)
    });
    yRight -= estimateTextHeight(work.functions, font, 12, 340, 15);
    checkNewPage()
  });

  drawSectionHeader('REFERENCIAS PERSONALES', 230, checkNewPage());
  yRight -= 25;
  checkNewPage()

  // Referencias personales
  userData.personalReferences.forEach((reference) => {
    let yRightReference1 = yRight
    let yRightReference2 = yRight

    pageN.drawText(reference.name, {
      x: 230,
      y: yRightReference1,
      maxWidth: 150,
      font: fontBold,
      size: 14,
      lineHeight: 15,
      color: rgb(0, 0, 0)
    });
    yRightReference1 -= estimateTextHeight(reference.name, fontBold, 14, 150, 15)

    pageN.drawText(reference.profession, {
      x: 230,
      y: yRightReference1,
      font: font,
      maxWidth: 150,
      size: 14,
      lineHeight: 15,
      color: rgb(0, 0, 0)
    });
    yRightReference1 -= estimateTextHeight(reference.profession, font, 14, 150, 15)

    pageN.drawText(reference.contact, {
      x: 230,
      y: yRightReference1,
      font: font,
      size: 14,
      color: rgb(0, 0, 0)
    });
    yRightReference1 -= 25;

    pageN.drawText(reference.name2, {
      x: 420,
      y: yRightReference2,
      maxWidth: 150,
      font: fontBold,
      size: 14,
      lineHeight: 15,
      color: rgb(0, 0, 0)
    });
    yRightReference2 -= estimateTextHeight(reference.name2, fontBold, 14, 150, 15)

    pageN.drawText(reference.profession2, {
      x: 420,
      y: yRightReference2,
      font: font,
      maxWidth: 150,
      size: 14,
      lineHeight: 15,
      color: rgb(0, 0, 0)
    });
    yRightReference2 -= estimateTextHeight(reference.profession2, font, 14, 150, 15)

    pageN.drawText(reference.contact2, {
      x: 420,
      y: yRightReference2,
      font: font,
      size: 14,
      color: rgb(0, 0, 0)
    });
    yRightReference2 -= 25;
  });
};

// const drawLongText = (pdfDoc, pageN, text, x, y, maxWidth, font, size, lineHeight) => {
//   const paragraphs = text.split('\n') // Dividir por saltos de línea
//   let lines = []

//   paragraphs.forEach(paragraph => {
//     const words = paragraph.split(/\s+/) // Dividir por espacios en blanco
//     let currentLine = words[0]

//     for (let i = 1; i < words.length; i++) {
//       const word = words[i]
//       const width = font.widthOfTextAtSize(currentLine + ' ' + word, size)

//       if (width <= maxWidth) {
//         currentLine += ' ' + word
//       } else {
//         lines.push(currentLine)
//         currentLine = word
//       }
//     }

//     if (currentLine.length > 0) {
//       lines.push(currentLine)
//     }
//   })

//   // Dibuja las líneas, creando nuevas páginas si es necesario
//   lines.forEach(line => {
//     const textHeight = font.heightAtSize(size) * lineHeight;

//     // Verifica si hay espacio suficiente en la página actual
//     if (y < textHeight) {
//       pageN = pdfDoc.addPage(PageSizes.A4);
//       pageDesign(pageN, rgb, degrees);
//       y = 760; // Reset del valor de y en la nueva página
//     }

//     pageN.drawText(line, {
//       x: x,
//       y: y,
//       font: font,
//       size: size,
//       color: rgb(0, 0, 0)
//     });

//     y -= textHeight;
//   });

//   return y;
// };

export const estimateTextHeight = (text, font, size, maxWidth, lineHeight) => {
  const paragraphs = text.split('\n') // Dividir por saltos de línea
  let lines = []

  paragraphs.forEach(paragraph => {
    const words = paragraph.split(/\s+/) // Dividir por espacios en blanco
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
  })

  return lines.length * lineHeight
}
