import { Networkish, ethers } from 'ethers';

// global storage of providers
const providers: { [key: string]: ethers.JsonRpcProvider | ethers.WebSocketProvider | ethers.AlchemyProvider } = {};

/**
 * Creates an ethers provider from a given RPC URL. If the same RPC URL is passed in and ignoreMemo is false, 
 * the same instance of the provider is returned (Singleton nature).
 * @param rpcUrl - The RPC URL. Defaults to Arbitrum One's public RPC.
 * @param ignoreMemo - A flag to ignore the memo. Defaults to false.
 * @returns An ethers provider.
 */
export function getProvider(
    _rpcUrl?: string,
    ignoreMemo: boolean = false,
    alchemyNetwork: Networkish = {name: "arbitrum", chainId: 42161}
): ethers.JsonRpcProvider {
    if (_rpcUrl) {
        if (providers[_rpcUrl]) {
            return providers[_rpcUrl] as any
        } else {
            const provider = new ethers.JsonRpcProvider(_rpcUrl)
            providers[_rpcUrl] = provider
            return provider
        }
    } else {
        const providersCount = Object.keys(providers).length
        if (providersCount == 0)
            throw new Error("No RPC provider is provided")
        return providers[Object.keys(providers)[Math.floor(Math.random() * providersCount)]] as any;
    }
}
