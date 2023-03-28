// Nest imports
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';

// Files import

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(private publicApplication: PublicApplication) {
    super({ usernameField: 'email' });
  }
  public async validate(email: string, password: string){
    return await this.publicApplication.validateUserCredentials(email, null, password);
  }
}