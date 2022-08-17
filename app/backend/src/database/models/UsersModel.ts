import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class User extends Model {
  id!: number;
  email!: string;
  passwordHash!: string;
  name!: string;
  phone!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;