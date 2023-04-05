import { Attributes, BulkCreateOptions, CreateOptions, CountOptions, CreationAttributes, DestroyOptions, FindOptions, Model, RestoreOptions, UpsertOptions } from "sequelize";  

export interface IRepository<T extends Model> {
  count(options: CountOptions<Attributes<T>>, withTrashed: boolean): Promise<number>;
  find(options: FindOptions<Attributes<T>>, withTrashed: boolean): Promise<T[]>;
}