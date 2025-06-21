import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';

interface TuitAttributes {
  id: number;
  contenido: string;
  userId: number;
  createdAt: Date; 
}

// No incluimos createdAt como opcional
interface TuitCreationAttributes extends Optional<TuitAttributes, 'id'> {}

class Tuit extends Model<TuitAttributes, TuitCreationAttributes> implements TuitAttributes {
  public id!: number;
  public contenido!: string;
  public userId!: number;
  public createdAt!: Date;
}

Tuit.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  contenido: {
    type: DataTypes.STRING(280),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Tuit',
  tableName: 'tuits',
  updatedAt: false, // opcional si no querés updatedAt
});

export default Tuit;
