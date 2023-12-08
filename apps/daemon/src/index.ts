import { getProvider } from "@sentry/core";
import { loadConfig } from "./config.js";
import { bootOperator } from "./operator.js";

// Load config from environment variables 
const config = loadConfig()

// Add providers 
getProvider(config.rpcUrl)

// Run the operator
bootOperator(config)
