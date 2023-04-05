import { Attributes, CountOptions, Model } from "sequelize";
import { Repository } from "sequelize-typescript";
import { FindOptions } from "sequelize";
import { SessionService } from "src/services/session/session.service";
import { IRepository } from "./irepository";
import { RepositoryConstraints } from "./repository-constraints";

export class RepositoryAdapter<T extends Model> implements IRepository<T> {

  public readonly constraints: RepositoryConstraints<T> = null;

  public constructor(public readonly repository: Repository<T>, public readonly session: SessionService) {
    this.constraints = RepositoryConstraints.build(this.session);
  }

  public async count(options: CountOptions<Attributes<T>> = {}, withTrashed: boolean = false): Promise<number>{
    this.constraints.applySoftDeleteConstraints(options, withTrashed);
    this.constraints.resetConstraints();
    return await this.repository.count(options)
  }

  public async find(options: FindOptions<Attributes<T>> = {}, withTrashed: boolean = false): Promise<T[]>{
    this.constraints.applySoftDeleteConstraints(options, withTrashed);
    this.constraints.resetConstraints();
    return await this.repository.findAll(options);
  }
}

interface FindAndCountAllRespose<T> {
  rows: T[];
  count: number;
}