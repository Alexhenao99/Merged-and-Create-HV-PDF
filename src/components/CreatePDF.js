'use client'

import { createPDF, mergePDFS } from '@/utils/functionsPDFS';
import { useEffect, useState } from 'react';

const CreatePDF = ({ data, files }) => {
  const [pdf, setPdf] = useState(null)
  console.log(files)

  const generatePDF = async () => {
    try {
      const pdfBytes = await createPDF(data);
      const mergedFiles = await mergePDFS(pdfBytes, files)
      setPdf(mergedFiles);
    } catch (error) {
      console.error('Error al crear el PDF:', error);
      throw error;
    }
  }

  useEffect(() => {
    generatePDF()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(pdf)

  const handleDownload = async () => {
    try {
      const pdfBytes = pdf;

      // Crear un enlace de descarga para el PDF generado
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      // Crear un elemento de enlace para descargar el PDF
      const link = document.createElement('a');
      link.href = url;
      link.download = `Curriculum de ${data.userName}.pdf`;

      // Simular el clic en el enlace para iniciar la descarga
      link.click();

      // Liberar el objeto URL creado
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    }
  };

  return (
    <section>
      <button id='downloadButton' onClick={handleDownload}>Descarga tu Curriculum Vitae</button>
    </section>
  )
}

export default CreatePDF