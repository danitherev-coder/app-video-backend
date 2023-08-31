import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const UserModel = db.define('user', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  img: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'USER'
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  token: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  // defaultScope: {
  //   attributes: { exclude: ['password', 'role', 'img'] } // Excluye los campos especificados por defecto
  // }
});

export default UserModel;
