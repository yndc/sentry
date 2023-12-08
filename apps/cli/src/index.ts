import { loadConfig } from './config.js';
import { getProvider } from '@sentry/core';
import { bootOperatorDaemon } from './operator.js';
import { interactive } from './interactive.js';

// check for cli arguments
var args = process.argv.slice(2);
if (args?.length > 0) {
    const param = args[0];
    switch (param) {

        // boot the operator 
        case "--operator":
            {
                const config = loadConfig();
                getProvider(config.rpcUrl);
                bootOperatorDaemon(config);
                break;
            }

        default:
            {
                console.error(`Unknown parameter: ${param}`)
                break;
            }
    }
} else {
    interactive();
}
