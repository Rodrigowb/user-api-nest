// Nest imports
import { BadRequestException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

// Files import (services)
import { SessionService } from "src/services/session/session.service";

@Injectable()
export class UserApplication {
  public constructor(
    private readonly userDomain: UserDomain,
    private readonly sessionService: SessionService,
  ) { }
  
  public async list(): Promise<User[]>{
    return await this.userDomain.list()
  }

}