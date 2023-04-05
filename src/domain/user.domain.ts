import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "sequelize-typescript";
import { AppConstants } from "src/cross-cutting/constants/app.constants";
import { ProviderNames } from "src/cross-cutting/constants/provider-names.constants";
import { SessionService } from "src/services/session/session.service";
import { Op } from "sequelize";
import { User } from "src/db/models/user";
import { RepositoryAdapter } from "src/repository/adapters/repository-adapter";

@Injectable()
export class UserDomain extends RepositoryAdapter<User> {
  public constructor(
    public readonly session: SessionService,
    public readonly createValidation: CreateUserValidation,
    private readonly configService: ConfigService,
    @Inject(ProviderNames.userRepository) public readonly repository: Repository<User>
  ) {
    super(repository, session);
    this.createValidation.injectDomain(this);
  }
  public async countAll(): Promise<number>{
    return await this.count();
  }

  public async list(): Promise<User[]>{
    const users: Array<User> = await this.find({
      where: {
        role: {
          [Op.not]: AppConstants.ROLES.MASTER
        }
      }
    });
    return users.map((user: User) => {
      user.password = null;
      return user
    })
  }
}