// Nest imports
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MiddlewareModule } from "src/cross-cutting/middlewares/middleware.module";
import { SessionModule } from "src/services/session/session.module";

// Files import

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
    BlacklistApplication,
    PublicApplication,
    UserApplication
  ],
  exports: [
    BlacklistApplication,
    PublicApplication,
    UserApplication
  ]
})
export class ApplicationModule {}