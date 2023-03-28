// Nest imports
import { Module } from "@nestjs/common";

// Files import
import { databaseProvider } from './database.provider'

@Module({
  imports: [],
  exports: [...databaseProvider],
  controllers: [],
  providers: [...databaseProvider]
})
export class DatabaseModule {}