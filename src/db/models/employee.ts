import { DataTypes, Model } from 'sequelize';
import { BaseModelAttributes } from '../base-model-attributes';
import { ModelOptions } from '../model-options';

export interface EmployeeAttributes extends BaseModelAttributes {
  name: string;
  currency: string;
  salary: number;
  on_contract: boolean;
  department: string;
  sub_department: string;
}

class Employee extends Model<EmployeeAttributes> {}

Employee.init(
  ModelOptions.tableColumns<Employee>({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    on_contract: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }),
  ModelOptions.tableOptions<Employee>('employees')
);

export { Employee };
