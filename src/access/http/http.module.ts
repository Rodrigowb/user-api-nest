// Nest imports
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

// Files import (modules)
import { ApplicationModule } from 'src/application/application.module';
import { SessionModule } from "src/services/session/session.module";
import { DomainModule } from 'src/domain/domain.module';

// Files import (controllers)
import { PublicController } from './controllers/public/public.controller';



@Module({
  imports: [ApplicationModule, SessionModule, DomainModule],
  controllers: [PublicController, UserController],
  providers: [LocalStrategy, JwtStrategy, JwtService, MiddlewareModule]
})
export class HttpModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}