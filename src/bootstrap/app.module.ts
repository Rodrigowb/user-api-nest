// Nest imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';

// Files import (modules)
import { MiddlewareModule } from 'src/cross-cutting/middlewares/middleware.module';
import { HttpModule } from 'src/access/http/http.module';
import { DatabaseModule } from 'src/db/database.module';
import { SessionModule } from 'src/services/session/session.module';
import { LogModule } from 'src/services/log/log.module';


@Module({
  imports: [
    MiddlewareModule,
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    DatabaseModule,
    SessionModule,
    LogModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransactionInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor
    }
  ]
})

export class AppModule {}