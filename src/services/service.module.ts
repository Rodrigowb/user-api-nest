// Nest imports
import { Module } from "@nestjs/common";
import { SessionModule } from "./session/session.module";

// Files import
@Module({
  imports: [SessionModule],
  providers: [],
  exports: [SessionModule]
})
export class ServiceModule {}