// Nest imports
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

// Files import 

@Module({
  controllers: [],
  imports: [SessionModule],
  providers: [JwtService]
})
export class MiddlewareModule {}