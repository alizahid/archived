declare namespace NodeJS {
  export interface ProcessEnv {
    CACHE_EXPIRY: string
    GITHUB_API_KEY: string
    GITHUB_API_URI: string
    PORT: string
    REDIS_URI: string
  }
}
