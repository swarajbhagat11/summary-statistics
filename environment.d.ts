declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      DATABASE: string;
      LOG_LEVEL: string;
      SESSION_TIMEOUT: string;
      TOKEN_KEY: string;
      CRYPTO_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
