// Nest imports
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

// Files import

@Module({
  imports: [RepositoryModule, ValidationModule],
  providers: [
    BlacklistDomain,
    ConfigService,
    JwtService,
    LogService,
    RefreshTokenDomain,
    UserDomain,
    UserPasswordTokenDomain
  ],
  exports: [
    BlacklistDomain,
    ConfigService,
    JwtService,
    LogService,
    RefreshTokenDomain,
    UserDomain,
    UserPasswordTokenDomain
  ]
})
export class DomainModule {}