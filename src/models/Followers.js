import { DataTypes } from "sequelize";
import db from "../config/db.js";

const FollowersModel = db.define('follower', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  followerID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  followedID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
})

export default FollowersModel