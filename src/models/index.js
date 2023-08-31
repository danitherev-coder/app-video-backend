import VideoModel from "./VideoModel.js";
import UserModel from "./UserModel.js";
import LikesModel from "./LikesModel.js";
import FollowersModel from "./Followers.js";

// crea una relación donde cada video pertenece a un usuario (autor) específico
VideoModel.belongsTo(UserModel, { foreignKey: 'autorID' })
// establece que cada usuario puede tener muchos videos relacionados en la tabla de videos
UserModel.hasMany(VideoModel, { foreignKey: 'autorID' });

// Aquí estás definiendo una relación entre el modelo User y el modelo Like. Indica que un usuario puede tener muchos "likes".
UserModel.hasMany(LikesModel, { foreignKey: 'userID' });
// Aquí se establece la relación inversa.Estás diciendo que un "like" pertenece a un usuario específico.
LikesModel.belongsTo(UserModel, { foreignKey: 'userID' });
// Esto establece una relación entre el modelo Video y el modelo Like, indicando que un video puede tener muchos "likes"
VideoModel.hasMany(LikesModel, { foreignKey: 'videoID' });
// De manera similar al punto anterior, esto establece la relación inversa desde el lado del modelo Like, indicando que un "like" pertenece a un video específico.
LikesModel.belongsTo(VideoModel, { foreignKey: 'videoID' });

FollowersModel.belongsTo(UserModel, { foreignKey: 'followerID' });
UserModel.hasMany(FollowersModel, { foreignKey: 'followerID' });

FollowersModel.belongsTo(UserModel, { foreignKey: 'followedID' });
UserModel.hasMany(FollowersModel, { foreignKey: 'followedID' });

export {
  VideoModel,
  UserModel,
  LikesModel,
  FollowersModel
}