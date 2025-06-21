import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Tuit from './Tuit';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

// 1 Usuario tiene muchos tuits
User.hasMany(Tuit, { foreignKey: 'userId', as: 'tuits' });
// Cada tuit pertenece a un usuario
Tuit.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });

export default User;
