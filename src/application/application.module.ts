// Nest imports
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

// Files import (modules)
import { DomainModule } from "src/domain/domain.module";
import { ServiceModule } from "src/services/service.module";
import { SessionModule } from "src/services/session/session.module";
import { MiddlewareModule } from "src/cross-cutting/middlewares/middleware.module";

// Files import (providers)
import { PublicApplication } from './public.application';
import { UserApplication } from './user.application';

const jwtSecret: string = process.env.JWT_SECRET;
const expiresIn: number = parseInt(process.env.JWT_EXPIRATION_TIME);

@Module({
  imports: [
    DomainModule,
    ServiceModule,
    ConfigModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {expiresIn: expiresIn}
    }),
    SessionModule,
    MiddlewareModule
  ],
  providers: [
    PublicApplication,
    UserApplication
  ],
  exports: [
    PublicApplication,
    UserApplication
  ]
})
export class ApplicationModule {}