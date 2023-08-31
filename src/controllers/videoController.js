import { request, response } from "express"
import videoServices from "../services/videoServices.js"

const getAllVideosCTRL = async (req = request, res = response) => {
  try {
    const videos = await videoServices.getAllVideosServices()
    return res.status(200).json(videos)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Hubo un error al momento de obtener los videos' })
  }
}

const getVideoIDCTRL = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const getVideo = await videoServices.getVideoIDServices(id)

    if (getVideo.error) return res.status(400).json(getVideo)

    return res.status(200).json(getVideo)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Hubo un error al momento de obtener el video' })
  }
}

const getMyVideosCTRL = async (req = request, res = response) => {
  try {
    const userID = req.usuario.id
    const myVideos = await videoServices.getMyVideos(userID)
    return res.status(200).json(myVideos)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Hubo un error al momento de obtener tus videos' })
  }
}

const createVideoCTRL = async (req = request, res = response) => {
  try {

    const body = req.body

    const video = await videoServices.createVideoServices(body, req.usuario.id)

    if (video.error) return res.status(400).json(video)

    return res.status(201).json(video)

  } catch (error) {
    console.log(error);
    // return res.status(500).json({ msg: 'Hubo un error al momento de crear el video' })
    return res.status(500).json(error)
  }

}

const updateVideoCTRL = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const body = req.body

    const userID = req.usuario.id

    const video = await videoServices.updateVideoServices(id, body, userID)

    return res.status(200).json(video)

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Hubo un error al momento de actualizar el video' })
  }

}

const deleteVideoCTRL = async (req = request, res = response) => {
  try {

    const { id } = req.params
    const userID = req.usuario.id

    const deleteVideo = await videoServices.deleteVideoServices(id, userID)

    return res.status(200).json(deleteVideo)

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Hubo un error al momento de eliminar el video' })
  }

}

const publisheVideoCTRL = async (req = request, res = response) => {
  try {

    const userID = req.usuario.id
    const { id } = req.body

    const video = await videoServices.publisheVideoServices(id, userID)
    if (video.error) return res.status(400).json(video)

    return res.status(200).json(video)

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Hubo un error al momento de publicar el video' })
  }
}

const unpublisheVideoCTRL = async (req = request, res = response) => {
  try {

    const userID = req.usuario.id
    const { id } = req.body

    const video = await videoServices.unpublisheVideoServices(id, userID)
    if (video.error) return res.status(400).json(video)

    return res.status(200).json(video)

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Hubo un error al momento de DESPUBLICAR el video' })
  }
}

export {
  getAllVideosCTRL,
  getVideoIDCTRL,
  getMyVideosCTRL,
  createVideoCTRL,
  updateVideoCTRL,
  deleteVideoCTRL,
  publisheVideoCTRL,
  unpublisheVideoCTRL
}