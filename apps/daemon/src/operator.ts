import { getSignerFromPrivateKey, operatorRuntime } from "@sentry/core";
import { Config } from "./config.js"
import { logger } from "./log.js";

/**
 * Starts the operator with the given configuration
 * @param config 
 * @returns 
 */
export async function bootOperator(config: Config) {
    const walletKey = config.privateKey

    if (!walletKey || walletKey.length < 1) {
        throw new Error("No private key passed in. Please provide a valid private key in SENTRY_OPERATOR_PRIVATE_KEY environment variable.")
    }

    const { signer } = getSignerFromPrivateKey(walletKey);

    return operatorRuntime(
        signer,
        undefined,
        logger
    )
}
