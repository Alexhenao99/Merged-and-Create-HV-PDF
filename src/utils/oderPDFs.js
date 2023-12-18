export const orderPDFs = (data) => {
  // Ordena la formación académica por fecha
  const certificatesOrdered = data.sort((a, b) => {
    const dateA = new Date(a.finishDate)
    const dateB = new Date(b.finishDate)
    return dateB - dateA
  })

  // filtra los certificados
  const soloPDFs = certificatesOrdered.map((certificate) => certificate.certificatePDF)
  return soloPDFs
}

export const orderData = (data) => {
  // Ordena la formación académica por fecha
  const dataOrdered = data.sort((a, b) => {
    const dateA = new Date(a.finishDate)
    const dateB = new Date(b.finishDate)
    return dateB - dateA
  })

  // // filtra los certificados
  // const soloPDFs = dataOrdered.map((certificate) => certificate.certificatePDF)
  return dataOrdered
}
