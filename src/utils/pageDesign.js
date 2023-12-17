const pageDesign = (page, rgb, degrees) => {
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
}

export default pageDesign