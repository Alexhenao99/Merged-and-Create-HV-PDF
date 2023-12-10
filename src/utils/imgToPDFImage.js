'use client'

export const fetchIcons = async (url, pdfDoc) => {

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al obtener la imagen');
    }
    const arrayBuffer = await response.arrayBuffer();
    const PDFImg = await pdfDoc.embedPng(arrayBuffer)

    return PDFImg;
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    return null;
  }
};

export const imgPDFProfile = async (imgProfileForm, pdfDoc) => {

  const imgBytes = await imgProfileForm.arrayBuffer();
  const img = imgProfileForm.type === 'image/png' ? await pdfDoc.embedPng(imgBytes) : await pdfDoc.embedJpg(imgBytes)

  return img
};