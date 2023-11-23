import {useOperatorRuntime} from "@/hooks/useOperatorRuntime";
import {useOperator} from "@/features/operator";
import {useBalance} from "@/hooks/useBalance";
import {recommendedFundingBalance} from "@/features/home/SentryWallet";
import {useGetAccruedEsXaiBulk} from "@/hooks/useGetAccruedEsXaiBulk";
import {useChainDataWithCallback} from "@/hooks/useChainDataWithCallback";

export function useAccruingInfo() {
	const {sentryRunning} = useOperatorRuntime();
	const {publicKey: operatorAddress} = useOperator();
	const {data: balance} = useBalance(operatorAddress);

	const {owners, licensesMap, ownersKycMap} = useChainDataWithCallback();
	const {balances} = useGetAccruedEsXaiBulk();
	const kycRequired = owners?.length > 0 && ownersKycMap && Object.values(ownersKycMap).filter((status) => !status).length > 0;

	const funded = balance && balance.wei !== undefined && balance.wei >= recommendedFundingBalance;
	const accruing = sentryRunning && funded && Object.keys(licensesMap).length > 0;

	return {
		funded,
		accruing,
		balances,
		hasAssignedKeys: Object.keys(licensesMap).length > 0,
		kycRequired,
		owners,
		ownersKycMap,
	}
}
