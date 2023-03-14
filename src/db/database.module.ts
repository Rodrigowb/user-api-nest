// Nest imports
import { Module } from "@nestjs/common";

// Files import

@Module({
  imports: [],
  exports: [...databaseProvider],
  controllers: [],
  providers: [...databaseProvider]
})
export class DatabaseModule {}