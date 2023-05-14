export interface Config {
  API_PORT: number;
  DB: {
    USER_NAME: string;
    PASSWORD: string;
    PORT: number;
    HOST: string;
    NAME: string;
  };
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES_IN: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES_IN: string;
  SALT: number;
}

function parseProcessOrFail(envVar: string | undefined): string;
function parseProcessOrFail(
  envVar: string | undefined,
  toType: 'number',
): number;
function parseProcessOrFail(envVar: string | undefined, toType?: 'number') {
  if (!envVar) {
    throw new Error('');
  }

  if (toType === 'number') {
    return Number.parseInt(envVar);
  }

  return envVar;
}

export default (): Config => ({
  API_PORT: parseProcessOrFail(process.env.API_PORT, 'number'),
  DB: {
    USER_NAME: parseProcessOrFail(process.env.DB_USERNAME),
    PORT: parseProcessOrFail(process.env.DB_PORT, 'number'),
    HOST: parseProcessOrFail(process.env.DB_HOST),
    NAME: parseProcessOrFail(process.env.DB_NAME),
    PASSWORD: parseProcessOrFail(process.env.DB_PASSWORD),
  },
  JWT_ACCESS_SECRET: parseProcessOrFail(process.env.JWT_ACCESS_SECRET),
  JWT_ACCESS_EXPIRES_IN: parseProcessOrFail(process.env.JWT_ACCESS_EXPIRES_IN),
  JWT_REFRESH_SECRET: parseProcessOrFail(process.env.JWT_REFRESH_SECRET),
  JWT_REFRESH_EXPIRES_IN: parseProcessOrFail(
    process.env.JWT_REFRESH_EXPIRES_IN,
  ),
  SALT: parseProcessOrFail(process.env.SALT, 'number'),
});
