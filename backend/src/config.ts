export interface Config {
  port: number;
  apiBasePath: string;
  disableDefaultApiEndpoint: boolean;
  trustProxy: string | boolean;
}

export default function appConfig(): Config {
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
  };
}
