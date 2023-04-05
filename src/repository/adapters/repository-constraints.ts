import { Model, Paranoid } from "sequelize";
import { SessionService } from "src/services/session/session.service";

export class RepositoryConstraints<T extends Model> {
  protected skipMasterRole: boolean = false;
  protected withTrashed: boolean = false;

  public constructor(public readonly session: SessionService) { }

  public static build<T extends Model>(session: SessionService): RepositoryConstraints<T>{
    return new RepositoryConstraints(session);
  }

  public setSkipMasterRole(value: boolean = true): void {
    this.skipMasterRole = value;
  }

  public setWithTrashed(value: boolean = true): void{
    this.withTrashed = value;
  }
  
  public applySoftDeleteConstraints(options: Paranoid, forceWithTrashed: boolean = false): Paranoid{
    this.withTrashed = forceWithTrashed;
    options.paranoid = !forceWithTrashed;
    return options
  }

  public resetConstraints(): void{
    this.setSkipMasterRole(false);
    this.setWithTrashed(false);
  }
}