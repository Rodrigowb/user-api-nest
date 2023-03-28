// Nest imports
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// Files import
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public constructor(private reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }
    const canActivate: boolean | Promise<boolean> | Observable<boolean> = super.canActivate(context);
    if (typeof canActivate === 'boolean') {
      return canActivate;
    }

    const canActivatePromise: Promise<boolean> = canActivate as Promise<boolean>;

    return canActivatePromise.catch((error: any) => {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException();
    })
    
  }
}