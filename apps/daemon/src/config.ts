export interface Config {
    rpcUrl: string
    privateKey?: string
}

/**
 * Loads configuration from environment variables
 * @returns Config
 */
export function loadConfig(): Config {
    return {
        rpcUrl: assertLoadEnvString("SENTRY_RPC_URL"),
        privateKey: loadEnvString("SENTRY_OPERATOR_PRIVATE_KEY")
    }
}

/**
 * Loads a string from an environment variable
 * @param key 
 * @returns 
 */
export function loadEnvString(key: string): string | undefined {
    const value = process.env[key]
    if (!value || value.length == 0)
        return undefined

    return value
}

/**
 * Loads a string from an environment variable, if the variable is not found or empty, an error will be thrown
 * @param key 
 * @returns 
 */
export function assertLoadEnvString(key: string): string {
    const value = loadEnvString(key)
    if (value === undefined)
        throw new Error(`Failed to load environment variable '${key}'`)

    return value
}