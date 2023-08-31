import { Sequelize } from 'sequelize'
import 'dotenv/config'

const db = new Sequelize(
  process.env.NAME_DB,
  process.env.USER_DB,
  process.env.PASSWORD_DB ?? '',
  {
    host: process.env.HOST_DB,
    port: Number(process.env.PORT_DB),
    dialect: 'postgres',
    define: {
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorAliases: false
  }
)

export default db
