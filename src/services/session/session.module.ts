// Nest imports
import { Global, Module } from '@nestjs/common';

// Files import

@Global()
@Module({
  exports: [SessionService],
  providers: [SessionService]
})
export class SessionModule {}