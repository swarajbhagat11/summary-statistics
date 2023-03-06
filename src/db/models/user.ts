import { DataTypes, Model } from 'sequelize';
import { BaseModelAttributes } from '../base-model-attributes';
import { ModelOptions } from '../model-options';

export interface UserAttributes extends BaseModelAttributes {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

class User extends Model<UserAttributes> {}

User.init(
  ModelOptions.tableColumns<User>({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }),
  ModelOptions.tableOptions<User>('users')
);

export { User };
