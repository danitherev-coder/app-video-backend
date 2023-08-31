import { VideoModel } from '../models/index.js'


const getAllVideosRepository = async () => {
  const videos = await VideoModel.findAll({
    where: {
      published: true
    }
  })
  return videos
}

const getVideoIDRepository = async (id) => {
  const getVideo = await VideoModel.findOne({
    where: {
      id,
      published: true
    }
  })

  if (!getVideo) {
    return { error: 'El video no esta disponible' }
  }

  return getVideo
}

const getMyVideos = async (userID) => {
  const myVideos = await VideoModel.findAll({ where: { autorID: userID } })
  if (myVideos.length === 0) {
    return { msg: 'No tienes videos creados' }
  }
  return myVideos
}

const createVideoRepository = async (body, userID) => {
  const video = new VideoModel({
    description: body.description,
    video_url: body.video_url,
    cover: body.cover,
    autorID: userID
  })
  await video.save()
  return video
}

const updateVideoRepository = async (id, body, userID) => {
  // si el usuario que inicio sesion, no es autor del video, entonces no puede actualizarlo
  const autorVideo = await VideoModel.findByPk(id)

  if (autorVideo.dataValues.autorID !== userID) {
    return {
      error: 'No tienes permisos para actualizar este video'
    }
  }

  const { published, ...resto } = body

  const video = await VideoModel.update(resto, { where: { id } })

  if (!video) {
    return {
      error: 'Error al actualizar el video'
    }
  }

  return video
}

const deleteVideoRepository = async (id, userID) => {
  const autorVideo = await VideoModel.findByPk(id)

  if (autorVideo.dataValues.autorID !== userID) {
    return {
      error: 'No tienes permisos para eliminar este video'
    }
  }

  const video = await VideoModel.destroy({ where: { id } })

  if (!video) {
    return {
      error: 'Error al eliminar el video'
    }
  }

  return { msg: 'Video eliminado correctamente' }
}

const publisheVideoRepository = async (id, userID) => {
  const autorVideo = await VideoModel.findByPk(id)

  if (autorVideo.dataValues.autorID !== userID) {
    return {
      error: 'No tienes permisos para publicar este video'
    }
  }

  if (autorVideo.dataValues.published === true) {
    return {
      msg: 'El video ya esta publicado'
    }
  } else {
    const video = await VideoModel.update({ published: true }, { where: { id } })

    if (!video) {
      return {
        error: 'Error al publicar el video'
      }
    }

    return { msg: 'Video publicado correctamente' }
  }
}

const unpublishedVideoRepository = async (id, userID) => {
  const autorVideo = await VideoModel.findByPk(id)

  if (autorVideo.dataValues.autorID !== userID) {
    return {
      error: 'No tienes permisos para despublicar este video'
    }
  }

  if (autorVideo.dataValues.published === false) {
    return {
      msg: 'El video ya esta despublicado'
    }
  } else {
    const video = await VideoModel.update({ published: false }, { where: { id } })

    if (!video) {
      return {
        error: 'Error al despublicar el video'
      }
    }

    return { msg: 'Video despublicado correctamente' }
  }
}

const videoRepository = {
  getAllVideosRepository,
  getVideoIDRepository,
  getMyVideos,
  createVideoRepository,
  updateVideoRepository,
  deleteVideoRepository,
  publisheVideoRepository,
  unpublishedVideoRepository
}

export default videoRepository