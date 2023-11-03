import {drawerStateAtom, DrawerView} from "../features/drawer/DrawerManager";
import {BiLinkExternal} from "react-icons/bi";
import {useSetAtom} from "jotai";
import {AiFillWarning} from "react-icons/ai";
import {useOperator} from "../features/operator";
import {useState} from "react";
import {AssignWalletTransactionInProgressModal} from "../features/home/modals/AssignWalletTransactionInProgressModal";
import {WalletConnectedModal} from "../features/home/modals/WalletConnectedModal";

export function AssignKeysFromNewWallet() {
	const setDrawerState = useSetAtom(drawerStateAtom);
	const {loading: isOperatorLoading, publicKey: operatorAddress} = useOperator();
	const [showInProgress, setShowInProgress] = useState(false);
	const [assignedWallet, setAssignedWallet] = useState<{show: boolean, txHash: string}>({show: false, txHash: ""});

	(window as any).deeplinks?.assignedWallet((_event, txHash) => {
		console.log("event:", _event);
		setShowInProgress(false);
		setAssignedWallet({show: true, txHash});
	});

	function startAssignment() {
		setShowInProgress(true);
		window.electron.openExternal(`http://localhost:7555/assign-wallet/${operatorAddress}`);
	}

	function onCloseWalletConnectedModal() {
		setAssignedWallet({show: false, txHash: ""});
	}

	return (
		<>
			{showInProgress && (
				<AssignWalletTransactionInProgressModal/>
			)}

			{assignedWallet.show && (
				<WalletConnectedModal
					txHash={assignedWallet.txHash}
					onClose={onCloseWalletConnectedModal}
				/>
			)}

			<div className="flex flex-col justify-center items-center gap-4">
				<AiFillWarning className="w-16 h-16 text-[#F59E28]"/>
				<p className="text-2xl font-semibold">
					Keys not assigned
				</p>
				<p className="text-lg text-[#525252]">
					Add wallets to assign keys to the Sentry
				</p>

				<button
					onClick={startAssignment}
					disabled={isOperatorLoading}
					className="flex justify-center items-center gap-1 text-[15px] text-white bg-[#F30919] font-semibold mt-2 px-6 py-3"
				>
					Assign keys from new wallet
					<BiLinkExternal className="w-5 h-5"/>
				</button>

				<p className="text-[15px] text-[#525252] mt-2">
					Don't own any keys?

					<a
						onClick={() => setDrawerState(DrawerView.BuyKeys)}
						className="text-[#F30919] ml-1 cursor-pointer"
					>
						Purchase keys
					</a>
				</p>
			</div>
		</>
	);
}