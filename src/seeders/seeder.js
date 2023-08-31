import { exit } from 'node:process'
import userSeed from './userSeed.js'
import videoSeed from './videoSeed.js'
import followSeed from './followSeed.js'
import likeSeed from './likeSeed.js'
import { UserModel, VideoModel, LikesModel, FollowersModel } from '../models/index.js'
import db from '../config/db.js'
import 'dotenv/config'

const importarDatos = async () => {
  try {
    // autenticar la conexión a la base de datos
    await db.authenticate()
    await db.sync()

    // insertar datos
    await Promise.all([
      UserModel.bulkCreate(userSeed),
      VideoModel.bulkCreate(videoSeed),
      FollowersModel.bulkCreate(followSeed),
      LikesModel.bulkCreate(likeSeed)
    ])
    console.log('Datos importados correctamente')
    exit(0)

  } catch (error) {
    console.log(error);
    exit(1)
  }
}

const eliminarDatos = async () => {
  try {
    // PRIMERA FORMA DE ELIMINAR DATOS
    await Promise.all([
      LikesModel.destroy({ where: {}, truncate: true, cascade: true }),
      VideoModel.destroy({ where: {}, truncate: true, cascade: true }),
      FollowersModel.destroy({ where: {}, truncate: true, cascade: true }),
      UserModel.destroy({ where: {}, truncate: true, cascade: true }),
    ]);


    // SEGUNDA FORMA DE ELIMINAR DATOS
    // await db.sync({ force: true }) // esto elimina las tablas y las vuelve a crear
    console.log('Datos eliminados correctamente');
    exit(0);
  } catch (error) {
    console.log(error);
  }
}

// importar datos
if (process.argv[2] === "-i") {
  importarDatos()
}

// Eliminar datos
if (process.argv[2] === "-e") {
  eliminarDatos()
}