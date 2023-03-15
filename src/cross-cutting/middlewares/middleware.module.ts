// Nest imports
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

// Files import 
import { SessionModule } from 'src/services/session/session.module';

@Module({
  controllers: [],
  imports: [SessionModule],
  providers: [JwtService]
})
export class MiddlewareModule {}