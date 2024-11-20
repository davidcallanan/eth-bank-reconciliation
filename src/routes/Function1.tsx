import { createSignal, Show } from "solid-js";
import Discovering from "../Discovering";
import WalletSelector from "./WalletSelector";
import Loading from "../Loading";
import TimePeriodSelector from "../TimePeriodSelector";
import TimePeriod from "../TimePeriod";
import AddressSelector from "../AddressSelector";

const STEP_INFO = [
	{
		name: "Step 1. Connect to Wallet Provider",
	},
	{
		name: "Step 2. Configure Time Period",
	},
	{
		name: "Step 3. Supply Wallet Addresses"
	},
	{
		type: "loading",
		name: "Fetching information from blockchain...",
	},
];

export default () => {
	const [step, setStep] = createSignal(0);
	const [wallet, setWallet] = createSignal();
	const [period, setPeriod] = createSignal();
	const [addresses, setAddresses] = createSignal();
	const stepInfo = () => STEP_INFO[step()];

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
				<Show when={stepInfo().type !== "loading"}>
					<h2 class="text-white text-center px-2 py-1 bg-green-600 font-bold text-lg"> {stepInfo().name} </h2>
				</Show>
				<Show when={stepInfo().type === "loading"}>
					<h2 class="text-center px-2 py-1 bg-white border-4 border-green-600 font-bold text-lg"> {stepInfo().name} </h2>
					<br/>
					<Loading/>
					<br/>
				</Show>
				<button onClick={() => window.location.reload()} class="bg-gray-200 border border-gray-400 px-3 py-1 hover:bg-gray-300 float-right">
					Start Over
				</button>
				<br/>
				<Show when={step() === 0}>
					<p class="font-bold"> Discovering EIP-6963 Wallets... </p>
					<p> Can't find your wallet? Ensure you have an Ethereum wallet such as <a class="text-blue-800 hover:underline" href="https://metamask.io/" target="_blank">MetaMask</a> installed correctly on your web browser. </p>
					<br/>
					<WalletSelector onSelect={(wallet) => {
						setWallet(wallet);
						setStep(1);
					}}/>
					<br/>
					<Discovering/>
				</Show>
				<Show when={step() === 1}>
					<div class="flex">
						<img src={wallet().info.icon} class="w-8 h-8 mr-4"/>
						<p class="text-xl font-bold"> Connected to {wallet().info.name} </p>
					</div>
					<p>
						Thank you for connecting to your wallet!
					</p>
					<p>
						Now, you must choose the time period for which the statement should be generated.
					</p>
					<br/>
					<TimePeriodSelector onComplete={(period) => {
						setPeriod(period);
						setStep(2);
					}}/>
					<br/>
				</Show>
				<Show when={step() === 2}>
					<p> You have selected the following time period. </p>
					<br/>
					<TimePeriod period={period()}/>
					<br/>
					<p> It remains to supply all the wallet addresses under your control that should form part of the statement. </p>
					<br/>
					<AddressSelector onComplete={(addresses) => {
						setAddresses(addresses);
						setStep(3);
					}}/>
				</Show>
			</div>
		</div>
	</>;
};
