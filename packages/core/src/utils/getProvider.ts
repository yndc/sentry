import { ethers } from 'ethers';

// global storage of providers
const providers: { [url: string]: ethers.JsonRpcProvider } = {};

/**
 * Creates an ethers provider from a given RPC URL. If the same RPC URL is passed in, 
 * the same instance of the provider is returned (Singleton nature).
 * @param rpcUrl - The RPC URL. Defaults to Arbitrum One's public RPC.
 * @returns An ethers provider.
 */
export function getProvider(_rpcUrl?: string): ethers.JsonRpcProvider {
    if (_rpcUrl) {
        if (providers[_rpcUrl]) {
            return providers[_rpcUrl]
        } else {
            const provider = new ethers.JsonRpcProvider(_rpcUrl)
            providers[_rpcUrl] = provider
            return provider
        }
    } else {
        const providersCount = Object.keys(providers).length
        if (providersCount == 0)
            throw new Error("No RPC provider is provided")
        return providers[Object.keys(providers)[Math.floor(Math.random() * providersCount)]];
    }
}
