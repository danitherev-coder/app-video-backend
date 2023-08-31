import { UserModel, VideoModel } from "../models/index.js"


const existeEmail = async (email = '') => {
    const emailRegister = await UserModel.findOne({ where: { email } })
    if (emailRegister) {
        throw new Error('Email already exists')
    }
}

// verify if the video ID exists
const existsIdVideo = async (id) => {
    const existeUsuario = await VideoModel.findByPk(id)
    if (!existeUsuario) {
        throw new Error('The ID video does not exist')
    }
}

// verify if the user ID exists
const existsIdUser = async (id) => {
    const existeUsuario = await UserModel.findByPk(id)
    if (!existeUsuario) {
        throw new Error('The ID user does not exist')
    }
}

export {
    existeEmail,
    existsIdVideo,
    existsIdUser
}