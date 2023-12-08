import { getProvider } from "@sentry/core";
import Vorpal from "vorpal";

/**
 * Adds a RPC provider.
 * @param {Vorpal} cli - The Vorpal instance to attach the command to.
 */
export function addProvider(cli: Vorpal) {
    cli
        .command('add-provider', 'Adds a provider')
        .action(async function (this: Vorpal.CommandInstance) {
            const providerPrompt = {
                type: 'input',
                name: 'providerUrl',
                message: 'Enter the new provider URL: '
            };
            const { providerUrl } = await this.prompt(providerPrompt);

            getProvider(providerUrl)

            this.log(`Added '${providerUrl}' as a provider`);
        });
}