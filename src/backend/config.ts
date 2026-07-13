export default function appConfig() {
  const {
    PORT,
    BASE_PATH,
    TRUST_PROXY,
    DISABLE_DEFAULT_API_ENDPOINT,
  } = process.env;

  let trustProxy: string | boolean = false;

  if (TRUST_PROXY == '*') {
    trustProxy = true;
  }

  return {
    port: Number(PORT ?? 3000),

    apiBasePath: BASE_PATH ?? '',
    trustProxy,

    disableDefaultApiEndpoint: DISABLE_DEFAULT_API_ENDPOINT == 'true',

    logging: {
      levelConsole: process.env.LOG_LEVEL_CONSOLE || 'http',
      levelFile: process.env.LOG_LEVEL_FILE || 'info',
    },
  };
}
