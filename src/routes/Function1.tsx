import { createSignal, Show } from "solid-js";
import Discovering from "../Discovering";
import WalletSelector from "./WalletSelector";

const STEP_INFO = [
	{
		name: "Step 1. Connect to Wallet Provider",
	},
];

export default () => {
	const [step, setStep] = createSignal(1);
	const stepInfo = () => STEP_INFO[step() - 1];

	return <>
		<div class="container mx-auto">
			<div class="mx-8">
				<h2 class="text-blue-800 text-xl">
					<img src="/src/assets/function-1.png" class="w-6 h-6 inline-block align-middle mr-2"/>
					<span class="align-middle"> Function 1. Generate "On-Chain" Statement </span>
				</h2>
				<p class="text-gray-600 pt-4 text-sm">
					This function generates on "on-chain statement" (analogous to a
					bank statement) from a live blockchain. You can connect up
					to your EVM wallet provider and select any ERC20 token of interest.
					You can then supply as many wallet addresses as you like and choose
					a time period for which the statement should be generated.
					The statement can then be downloaded or can be brought to "Function 2" directly.
				</p>
				<br/>
				<h2 class="text-white text-center px-2 py-1 bg-green-600 font-bold text-lg"> {stepInfo().name} </h2>
				<br/>
				<Show when={step() === 1}>
					<p class="font-bold"> Discovering EIP-6963 Wallets... </p>
					<p> Can't find your wallet? Ensure you have an Ethereum wallet such as <a href="https://metamask.io/" target="_blank">MetaMask</a> correctly installed on your web browser. </p>
					<br/>
					<WalletSelector/>
					<br/>
					<Discovering/>
				</Show>
			</div>
		</div>
	</>;
};
