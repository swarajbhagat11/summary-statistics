import { Attributes, CreateOptions, DestroyOptions, FindOptions, Model, UpdateOptions } from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { BaseModelAttributes } from 'src/db/base-model-attributes';

export interface GenericRepository<T extends Model<BaseModelAttributes>> {
  create(item: MakeNullishOptional<Attributes<T>>, options?: CreateOptions<Attributes<T>> | undefined): Promise<Attributes<T>>;
  update(
    item: Attributes<T>,
    options: UpdateOptions<Attributes<T>>
  ): Promise<[affectedCount: number] | [affectedCount: number, affectedRows: T[]]>;
  delete(options: DestroyOptions<Attributes<T>>): Promise<number>;
  findAll(options: FindOptions<Attributes<T>>): Promise<Attributes<T>[]>;
  findOne(options: FindOptions<Attributes<T>>): Promise<Attributes<T> | null>;
  findByPk(id: string): Promise<Attributes<T> | null>;
}
