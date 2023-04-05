// Nest imports
import { CanActivate, Inject, mixin } from "@nestjs/common";

// Files import
import { SessionService } from "src/services/session/session.service";
import { AppConstants } from '../constants/app.constants';

export const RoleGuard: any = (roles: string[]) => {
  class RoleGuardMixin implements CanActivate {
      public constructor(@Inject(SessionService) private readonly session) {}

      public canActivate() {
          if (process.env.NODE_ENV.toString() === AppConstants.NODE_ENV.TEST) return true;
          return roles.includes(this.session.getUser().role);
      }
  }

  const guard: any = mixin(RoleGuardMixin);
  return guard;
};