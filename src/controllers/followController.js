import { request, response } from "express";
import FollowUnfollowServices from "../services/followServices.js";

const followCTRL = async (req = request, res = response) => {
  try {

    const followerID = req.usuario.id
    const { followedID } = req.body

    const follow = await FollowUnfollowServices.followServices(followerID, followedID)
    if (follow.error) return res.status(400).json(follow)

    res.status(200).json(follow)

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error interno' })
  }
}

const unFollowCTRL = async (req = request, res = response) => {
  try {

    const followerID = req.usuario.id
    const { followedID } = req.body

    const follow = await FollowUnfollowServices.unfollowServices(followerID, followedID)
    if (follow.error) return res.status(400).json(follow)

    res.status(200).json(follow)

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error interno' })
  }
}

const seguidosCTRL = async (req = request, res = response) => {
  try {
    const followerID = req.usuario.id

    const follow = await FollowUnfollowServices.seguidosServices(followerID)
    if (follow.error) return res.status(400).json(follow)

    res.status(200).json(follow)

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error interno' })
  }
}

export {
  followCTRL,
  unFollowCTRL,
  seguidosCTRL
}