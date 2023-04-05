// Nest imports
import { Module } from "@nestjs/common";
import { SessionModule } from "./session/session.module";

// Files import
@Module({
  imports: [FileManagerModule, EmailModule, SessionModule],
  providers: [],
  exports: [FileManagerModule, EmailModule, SessionModule]
})
export class ServiceModule {}