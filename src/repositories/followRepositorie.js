import { FollowersModel, UserModel } from "../models/index.js"

const followRepository = async (followerID, followedID) => {
  if (followerID === followedID) {
    return {
      error: 'No puedes seguirte a ti mismo'
    }
  }

  // si ya sigo al usuario, entonces mostrar mensaje de que ya sigo al usuario
  const followExist = await FollowersModel.findOne({
    where: {
      followerID,
      followedID
    }
  })

  if (followExist) return { msg: 'Ya sigues a este usuario' }


  const follow = new FollowersModel({ followerID, followedID })

  if (!follow) {
    return {
      error: 'Error al seguir'
    }
  }

  await follow.save()

  return follow
}

const unfollowRepository = async (followerID, followedID) => {
  if (followerID === followedID) {
    return {
      error: 'No puedes dejarte de seguir a ti mismo'
    }
  }

  // si no sigo al usuario, entonces mostrar mensaje de que no sigo al usuario
  const followExist = await FollowersModel.findOne({
    where: {
      followerID,
      followedID
    }
  })

  if (!followExist) return { msg: 'No sigues a este usuario' }

  // eliminar mi follow que le di a otro usuario
  const unfollow = await FollowersModel.destroy({
    where: {
      followerID,
      followedID
    }
  })

  return { msg: 'Dejaste de seguir a este usuario' }
}

const seguidosRepository = async (followerID) => {
  const seguidos = await FollowersModel.findAll({
    where: {
      followerID
    },
    include: [
      { model: UserModel, attributes: ['firstname', 'lastname', 'img'] }
    ],
    attributes: ['followedID']
  })

  return seguidos
}

const FollowUnfollowRepository = {
  followRepository,
  unfollowRepository,
  seguidosRepository
}

export default FollowUnfollowRepository