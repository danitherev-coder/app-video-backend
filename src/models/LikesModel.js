import { DataTypes } from "sequelize";
import db from "../config/db.js";

const LikesModel = db.define('like', {
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  videoID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true
})

export default LikesModel;