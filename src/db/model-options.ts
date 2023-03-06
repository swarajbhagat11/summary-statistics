import { Attributes, DataTypes, InitOptions, Model, ModelAttributes, Optional } from 'sequelize';
import { BaseModelAttributes } from './base-model-attributes';
import { sequelize } from './db-context';

export class ModelOptions {
  static tableOptions = <T extends Model<BaseModelAttributes>>(tableName: string, callback: Function = () => {}) => {
    let options = {
      sequelize, // connection object
      modelName: tableName, // table name
      freezeTableName: true, // use same table name provided. Do not pluralize table name
      underscored: true, // convert column name to underscore i.e. createdAt => created_at
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    } as InitOptions<T>;
    callback(options);

    return options;
  };

  // createdAt and updatedAt columns will automatically handled by sequelize
  static tableColumns = <T extends Model<BaseModelAttributes>>(columns: ModelAttributes<T, Optional<Attributes<T>, never>>) =>
    Object.assign(columns, {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate: {
          isUUID: 4,
        },
      },
    } as ModelAttributes<T, Optional<Attributes<T>, never>>);
}
