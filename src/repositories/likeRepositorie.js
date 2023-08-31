import { LikesModel, UserModel, VideoModel } from "../models/index.js"


const getVideoLikedRepository = async (userID) => {
  const videosLiked = await LikesModel.findAll({
    where: { userID },
    include: [
      {
        model: VideoModel, as: 'video', attributes: ['description', 'video_url'], include: [
          { model: UserModel, as: 'user', attributes: ['firstname', 'lastname', 'img'] },
        ]
      }
    ],
    attributes: ['videoID']
  })

  if (videosLiked.length === 0) return { msg: 'No hay videos que te gusten' }

  return videosLiked

}

const darLikeRepository = async (videoID, userID) => {

  // si el usuario ya dio like al video y vuelve a pulsar el botón de like, se elimina el like
  const like = await LikesModel.findOne({
    where: { videoID, userID }

  })
  if (like) {
    await like.destroy()
    return { msg: 'Like removed' }
  }
  const likeVideo = await LikesModel.create({
    videoID,
    userID
  })
  return likeVideo
}

const likeRepository = {
  darLikeRepository,
  getVideoLikedRepository
}

export default likeRepository