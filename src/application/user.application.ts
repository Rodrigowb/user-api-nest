// Nest imports
import { BadRequestException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

// Files import
import { SessionService } from "src/services/session/session.service";
import { User } from "src/db/models/user";
import { UserDomain } from "src/domain/user.domain";


@Injectable()
export class UserApplication {
  public constructor(
    private readonly userDomain: UserDomain,
    private readonly sessionService: SessionService,
  ) { }
  
  public async list(): Promise<User[]>{
    return await this.userDomain.list()
  }

  public async find(id: string): Promise<User> {
    const user: User = await this.userDomain.findById(id);
    user.password = null;
    return user
  }

}