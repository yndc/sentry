import { ethers } from 'ethers';
import { config } from '../config.js';

// global storage of providers
const providers: { [url: string]: ethers.JsonRpcProvider } = {};

/**
 * Creates an ethers provider from a given RPC URL. If the same RPC URL is passed in, 
 * the same instance of the provider is returned (Singleton nature).
 * @param rpcUrl - The RPC URL. Defaults to Arbitrum One's public RPC.
 * @returns An ethers provider.
 */
export function getProvider(_rpcUrl?: string): ethers.JsonRpcProvider {
    const providerUrls = [
        "https://arb-mainnet.g.alchemy.com/v2/p_LSgTIj_JtEt3JPM7IZIZFL1a70yvQJ",
        // "https://arb1.arbitrum.io/rpc",
        "https://arb1.arbitrum.io/rpc"
    ];
    const rpcUrl = _rpcUrl ? _rpcUrl : providerUrls[Math.floor(Math.random() * providerUrls.length)];
    if (!providers[rpcUrl]) {
        providers[rpcUrl] = new ethers.JsonRpcProvider(rpcUrl);
    }
    return providers[rpcUrl];
}
