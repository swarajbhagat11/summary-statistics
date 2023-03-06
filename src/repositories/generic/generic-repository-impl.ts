import { Attributes, CreateOptions, DestroyOptions, FindOptions, Model, ModelStatic, UpdateOptions } from 'sequelize';
import { injectable } from 'inversify';
import { BaseModelAttributes } from 'src/db/base-model-attributes';
import { GenericRepository } from './generic-repository';
import { MakeNullishOptional } from 'sequelize/types/utils';

@injectable()
export class GenericRepositoryImpl<T extends Model<BaseModelAttributes>> implements GenericRepository<T> {
  protected model: ModelStatic<T>;
  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  create(item: MakeNullishOptional<Attributes<T>>, options: CreateOptions<Attributes<T>> | undefined = undefined): Promise<Attributes<T>> {
    delete item.updated_at;
    return this.model.create(item, options).then((data) => data.toJSON<Attributes<T>>());
  }

  update(
    item: Attributes<T>,
    options: UpdateOptions<Attributes<T>>
  ): Promise<[affectedCount: number] | [affectedCount: number, affectedRows: T[]]> {
    delete item.created_at;
    return this.model.update(item, options);
  }

  delete(options: DestroyOptions<Attributes<T>>): Promise<number> {
    return this.model.destroy(options);
  }

  findAll(options: FindOptions<Attributes<T>>): Promise<Attributes<T>[]> {
    return this.model.findAll(options).then((data) => data.map((item) => item.toJSON<Attributes<T>>()));
  }

  findOne(options: FindOptions<Attributes<T>>): Promise<Attributes<T> | null> {
    return this.model.findOne(options).then((data) => (data ? data.toJSON<Attributes<T>>() : null));
  }

  findByPk(id: string): Promise<Attributes<T> | null> {
    return this.model.findByPk(id).then((data) => (data ? data.toJSON<Attributes<T>>() : null));
  }
}
