import FollowUnfollowRepository from "../repositories/followRepositorie.js"

const followServices = async (followerID, followedID) => {
  const follow = await FollowUnfollowRepository.followRepository(followerID, followedID)
  return follow
}
const unfollowServices = async (followerID, followedID) => {
  const follow = await FollowUnfollowRepository.unfollowRepository(followerID, followedID)
  return follow
}

const seguidosServices = async (followerID) => {
  const follow = await FollowUnfollowRepository.seguidosRepository(followerID)
  return follow
}



const FollowUnfollowServices = {
  followServices,
  unfollowServices,
  seguidosServices
}

export default FollowUnfollowServices