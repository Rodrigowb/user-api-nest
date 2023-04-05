export class AppConstants{
  public static NODE_ENV = {
    LOCAL: 'local',
    TEST: 'test',
    DEVELOPMENT: 'development',
    PRODUCTION: 'production'
  };

  public static DOT_ENV_KEYS = {
    JWT_SECRET: 'JWT_SECRET',
    SALT_ROUNDS: 'SALT_ROUNDS'
  };

  public static ROLES = {
    ADMIN: 'ADMIN',
    MASTER: 'MASTER',
    COMMON: 'COMMON'
  };
}