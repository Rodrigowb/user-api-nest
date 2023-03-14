// Nest imports
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

// Files import



@Module({
  imports: [ApplicationModule, SessionModule, DomainModule],
  controllers: [PublicController, BlacklistController, UserController],
  providers: [LocalStrategy, JwtStrategy, JwtService, MiddlewareModule]
})
export class HttpModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}