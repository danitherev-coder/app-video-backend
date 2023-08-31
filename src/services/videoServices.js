
import videoRepository from "../repositories/videoRepositorie.js"


const getAllVideosServices = async () => {
  const videos = await videoRepository.getAllVideosRepository()
  return videos
}

const getVideoIDServices = async (id) => {
  const getVideo = await videoRepository.getVideoIDRepository(id)
  return getVideo
}

const getMyVideos = async (userID) => {
  const myVideos = await videoRepository.getMyVideos(userID)
  return myVideos
}

const createVideoServices = async (body, userID) => {
  const createVideo = await videoRepository.createVideoRepository(body, userID)
  return createVideo
}

const updateVideoServices = async (id, body, userID) => {
  const updateVideo = await videoRepository.updateVideoRepository(id, body, userID)
  return updateVideo
}

const deleteVideoServices = async (id, userID) => {
  const deleteVideo = await videoRepository.deleteVideoRepository(id, userID)
  return deleteVideo
}

const publisheVideoServices = async (id, userID) => {
  const publisheVideo = await videoRepository.publisheVideoRepository(id, userID)
  return publisheVideo
}
const unpublisheVideoServices = async (id, userID) => {
  const publisheVideo = await videoRepository.unpublishedVideoRepository(id, userID)
  return publisheVideo
}


const videoServices = {
  getAllVideosServices,
  getVideoIDServices,
  getMyVideos,
  createVideoServices,
  updateVideoServices,
  deleteVideoServices,
  publisheVideoServices,
  unpublisheVideoServices
}


export default videoServices