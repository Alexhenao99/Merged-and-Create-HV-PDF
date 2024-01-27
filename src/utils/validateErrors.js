const validateData = (validar) => {
  let errors = {}

  if ('userName' in validar) {
    if (validar.userName === '') errors.userName = 'Este Campo Es Obligatorio *'
    else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(validar.userName)) errors.userName = 'El nombre o el apellido es inválido.'
    else if (!/^\S{3,}(?:\s\S{3,})+$/.test(validar.userName)) errors.userName = 'Debe escribir su Nombre Completo'
    else if (validar.userName.length) errors.userName = ''
  }

  if ('cc' in validar) {
    if (validar.cc === '') errors.cc = 'Este Campo Es Obligatorio *'
    else if (!/^(CC|CE|PEP|DNI|SRC|PA)/.test(validar.cc)) errors.cc = 'El tipo de documento es inválido.'
    else if (!/^(CC|CE|PEP|DNI|SRC|PA)\s\d{10,12}$/.test(validar.cc)) errors.cc = 'El numero de documento es inválido.'
    else if (validar.cc.length) errors.cc = ''
  }

  if ('phone' in validar) {
    if (validar.phone === '') errors.phone = 'Este Campo Es Obligatorio *'
    else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(validar.phone)) errors.phone = 'El número de celular es inválido.'
    else if (validar.phone.length) errors.phone = ''
  }

  if ('date' in validar) {
    const fechaNacimiento = new Date(validar.date)
    const hoy = new Date()

    const diferenciaMilisegundos = hoy - fechaNacimiento
    const edad = diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365.25)

    if (edad <= 18) errors.date = 'Debes ser mayor de 18 años'
    else if (validar.date.length) errors.date = ''
  }

  if ('email' in validar) {
    if (validar.email === '') errors.email = 'Este Campo Es Obligatorio *'
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(validar.email)) errors.email = 'El email es inválido.'
    else if (validar.email.length) errors.email = ''
  }

  if ('address' in validar) {
    if (validar.address === '') errors.address = 'Este Campo Es Obligatorio *'
    else if (validar.address.length) errors.address = ''
  }

  if ('profession' in validar) {
    if (validar.profession === '') errors.profession = 'Este Campo Es Obligatorio *'
    else if (validar.profession.length) errors.profession = ''
  }

  if ('profile' in validar) {
    const character = validar.profile.length

    if (validar.profile === '') errors.profile = 'Este Campo Es Obligatorio *'
    else if (character < 500) errors.profile = `Debe ser mayor de 500 caracteres: ${character}`
    else if (validar.profile.length) errors.profile = ''
  }

  return errors
}

const validateAcademicHistoryData = (validar) => {
  let errors = {}

  if ('title' in validar) {
    if (validar.title === '') errors.title = 'Este Campo Es Obligatorio *'
    else if (validar.title.length) errors.title = ''
  }

  if ('institution' in validar) {
    if (validar.institution === '') errors.institution = 'Este Campo Es Obligatorio *'
    else if (validar.institution.length) errors.institution = ''
  }

  return errors
}

const validateWorkHistoryData = (validar) => {
  let errors = {}

  if ('company' in validar) {
    if (validar.company === '') errors.company = 'Este Campo Es Obligatorio *'
    else if (validar.company.length) errors.company = ''
  }

  if ('workstation' in validar) {
    if (validar.workstation === '') errors.workstation = 'Este Campo Es Obligatorio *'
    else if (validar.workstation.length) errors.workstation = ''
  }

  if ('directSupervisor' in validar) {
    if (validar.directSupervisor === '') errors.directSupervisor = 'Este Campo Es Obligatorio *'
    else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(validar.directSupervisor)) errors.directSupervisor = 'El nombre o el apellido es inválido.'
    else if (!/^\S{3,}(?:\s\S{3,})+$/.test(validar.directSupervisor)) errors.directSupervisor = 'Debe escribir mínimo un Nombre y un Apellido'
    else if (validar.directSupervisor.length) errors.directSupervisor = ''
  }

  if ('contactSupervisor' in validar) {
    if (validar.contactSupervisor === '') errors.contactSupervisor = 'Este Campo Es Obligatorio *'
    else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(validar.contactSupervisor)) errors.contactSupervisor = 'El número de celular es inválido.'
    else if (validar.contactSupervisor.length) errors.contactSupervisor = ''
  }

  if ('startDate' in validar) {
    if (validar.startDate === '') errors.startDate = 'Este Campo Es Obligatorio *'
    else if (validar.startDate.length) errors.startDate = ''
  }

  if ('finishDate' in validar) {
    if (validar.finishDate === '') errors.finishDate = 'Este Campo Es Obligatorio *'
    else if (validar.finishDate.length) errors.finishDate = ''
  }

  if ('functions' in validar) {
    const character = validar.functions.length

    if (validar.functions === '') errors.functions = 'Este Campo Es Obligatorio *'
    else if (character < 500) errors.functions = `Debe ser mayor de 500 caracteres: ${character}`
    else if (validar.functions.length) errors.functions = ''
  }

  return errors
}

const validatePersonalReference = (validar) => {
  let errors = {}

  if ('name' in validar) {
    if (validar.name === '') errors.name = 'Este Campo Es Obligatorio *'
    else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(validar.name)) errors.name = 'El nombre o el apellido es inválido.'
    else if (!/^\S{3,}(?:\s\S{3,})+$/.test(validar.name)) errors.name = 'Debe escribir mínimo un Nombre y un Apellido'
    else if (validar.name.length) errors.name = ''
  }

  if ('profession' in validar) {
    if (validar.profession === '') errors.profession = 'Este Campo Es Obligatorio *'
    else if (validar.profession.length) errors.profession = ''
  }

  if ('contact' in validar) {
    if (validar.contact === '') errors.contact = 'Este Campo Es Obligatorio *'
    else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(validar.contact)) errors.contact = 'El número de celular es inválido.'
    else if (validar.contact.length) errors.contact = ''
  }

  if ('name2' in validar) {
    if (validar.name2 === '') errors.name2 = 'Este Campo Es Obligatorio *'
    else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(validar.name2)) errors.name2 = 'El nombre o el apellido es inválido.'
    else if (!/^\S{3,}(?:\s\S{3,})+$/.test(validar.name2)) errors.name2 = 'Debe escribir mínimo un Nombre y un Apellido'
    else if (validar.name2.length) errors.name2 = ''
  }

  if ('profession2' in validar) {
    if (validar.profession2 === '') errors.profession2 = 'Este Campo Es Obligatorio *'
    else if (validar.profession2.length) errors.profession2 = ''
  }

  if ('contact2' in validar) {
    if (validar.contact2 === '') errors.contact2 = 'Este Campo Es Obligatorio *'
    else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(validar.contact2)) errors.contact2 = 'El número de celular es inválido.'
    else if (validar.contact2.length) errors.contact2 = ''
  }

  return errors
}

export { validateData, validateAcademicHistoryData, validateWorkHistoryData, validatePersonalReference }
