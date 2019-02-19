function workBear (bear) {
  if (
    !bear.birthDate ||
    !(typeof bear.birthDate === 'string')
  ) {
    throw new Error('Bear should have a string birthdate')
  }

  // Will naturaly throw if invalid
  const realBirthDate = new Date(bear.birthDate)
  const now = new Date()

  return Math.floor(now.getUTCFullYear() - realBirthDate.getUTCFullYear())
}

module.exports = workBear