import { request, response } from "express";
import likeService from "../services/likeServices.js";


const getVideoLiked = async (req = request, res = response) => {
  try {

    const userID = req.usuario.id
    const videosLiked = await likeService.getVideoLiked(userID);
    if (videosLiked.msg) return res.status(200).json(videosLiked);

    return res.status(200).json(videosLiked);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Hubo un error al obtener los videos que diste like.' })
  }
}


const likeVideo = async (req = request, res = response) => {
  try {

    const userID = req.usuario.id;
    const { videoID } = req.body;
    const darLike = await likeService.darLikeVideo(videoID, userID);

    if (darLike.error) {
      return res.status(400).json(darLike);
    }

    res.status(200).json(darLike);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Contact the administrator' })
  }
}


export { likeVideo, getVideoLiked }