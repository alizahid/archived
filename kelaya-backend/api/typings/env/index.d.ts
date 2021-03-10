declare namespace NodeJS {
  export interface ProcessEnv {
    // network
    PORT: string

    // server
    DATABASE_URI: string

    // app
    TOKEN_SECRET: string
  }
}
