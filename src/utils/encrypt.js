import bcrypt from 'bcryptjs'

const encrypt = (password) => {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(password, salt)
}

const verifyPassword = (password, passwordDB) => {
  return bcrypt.compareSync(password, passwordDB)
}

export { encrypt, verifyPassword }