// Nest imports
import { Global, Module } from '@nestjs/common';

// Files import
import { SessionService } from './session.service';

@Global()
@Module({
  exports: [SessionService],
  providers: [SessionService]
})
export class SessionModule {}