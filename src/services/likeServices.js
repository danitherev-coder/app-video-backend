import likeRepository from "../repositories/likeRepositorie.js"



const getVideoLiked = async (userID) => {
  const videosLiked = await likeRepository.getVideoLikedRepository(userID);
  return videosLiked
}

const darLikeVideo = async (videoID, userID) => {
  const likeVideo = await likeRepository.darLikeRepository(videoID, userID)
  return likeVideo
}


const likeService = {
  darLikeVideo,
  getVideoLiked
}

export default likeService