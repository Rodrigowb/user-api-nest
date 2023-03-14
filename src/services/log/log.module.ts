// Nest imports
import { Global, Module } from '@nestjs/common'

// Files import

@Global()
@Module({
  exports: [LogService],
  providers: [LogService]
})
export class LogModule {}