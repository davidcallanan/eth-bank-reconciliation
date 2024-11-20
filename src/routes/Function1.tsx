import { createSignal, Show } from "solid-js";
import Discovering from "../Discovering";
import WalletSelector from "./WalletSelector";
import Loading from "../Loading";
import TimePeriodSelector from "../TimePeriodSelector";
import TimePeriod from "../TimePeriod";
import AddressSelector from "../AddressSelector";
import { fetchBlockchainTransactions } from "../fetchBlockchainTransactions";

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
	{
		name: "Step 4. Save \"On-Chain\" Statement",
	},
];

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default () => {
	const [step, setStep] = createSignal(0);
	const [wallet, setWallet] = createSignal();
	const [period, setPeriod] = createSignal();
	const [progress, setProgress] = createSignal(0);
	const [addresses, setAddresses] = createSignal(new Set());
	const [entries, setEntries] = createSignal([]);
	const [downloadUrl, setDownloadUrl] = createSignal("");
	const [downloadFileName, setDownloadFileName] = createSignal("");
	const stepInfo = () => STEP_INFO[step()];

	const fetchBlockchainData = async () => {
		const options = {
			period: period(),
			addresses: Array.from(addresses()),
			wallet: wallet(),
			setProgress,
		};

		const entries = await fetchBlockchainTransactions(options);
		setEntries(entries);

		let csv = "timestamp,category,debit_wei,credit_wei,tx_hash\n";

		for (const entry of entries) {
			csv += `${entry.timestamp * 1000},${entry.category},${entry.debit},${entry.credit},${entry.hash}\n`;
		}

		const blob = new Blob([csv], { type: "text/csv" });
		setDownloadUrl(URL.createObjectURL(blob));
		setDownloadFileName(`statement-${options.period.range}-ending-${options.period.end.replaceAll("/", "-")}`);

		setStep(4);
	};

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
					to your EVM wallet for any EVM-compatible blockchain.
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
					<p> It remains for you to supply all the wallet addresses that should form part of the statement. </p>
					<br/>
					<ul class="list-disc list-inside">
						<li class="text-md text-blue-800">For testing purposes, you may find any active wallet from etherscan or similar, and supply here.</li>
						<li class="text-md text-green-700">You may also leave blank to sample arbitrary transactions from the blockchian.</li>
						<li class="text-md text-red-700">Note: The report is currently capped at 100 transactions to avoid excessive load on the provider.</li>
					</ul>
					<br/>
					<AddressSelector onComplete={(addresses) => {
						setAddresses(addresses);
						setStep(3);
						fetchBlockchainData();
					}}/>
				</Show>
				<Show when={step() === 3}>
					<p> Progress: <b>{(progress() * 100).toFixed(0)}%</b></p>
					<p> Please, be patient. This may take a while... </p>
				</Show>
				<Show when={step() === 4}>
					<p class="font-bold"> Your "On-Chain" Statement has been generated and is ready for download. </p>
					<p> The statement has also been stored locally and is ready for use with <a href="/function-2" class="underline text-blue-700">Function 2</a> directly. </p>
					<br/>
					<ul class="list-disc list-inside">
						<li>
							<a download={downloadFileName()} class="bg-gray-100 border-2 border-blue-700 text-blue-700 px-2 py-1 rounded-full hover:bg-gray-200 hover:text-black" href={downloadUrl()}> Download Statement </a>
						</li>
					</ul>
					<br/>
					<table class="font-mono">
						<thead>
							<tr class="font-bold border-b-2 border-gray-400">
								<th>Timestamp</th>
								<th>Category</th>
								<th>Debit</th>
								<th>Credit</th>
								<th>TX Hash</th>
							</tr>
						</thead>
						<tbody>
							<For each={entries()}>
								{(entry) => (
									<tr>
										<td class="px-2 py-1">{formatDate(new Date(entry.timestamp * 1000))}</td>
										<td class="px-2 py-1">{entry.category}</td>
										<td class="px-2 py-1">{(Number(entry.debit) / 1000000000000000000).toFixed(6)} ETH</td>
										<td class="px-2 py-1">{(Number(entry.credit) / 1000000000000000000).toFixed(6)} ETH</td>
										<td class="px-2 py-1">{entry.hash.substring(0, 6)}..{entry.hash.substring(entry.hash.length - 4, entry.hash.length)}</td>
									</tr>
								)}
							</For>
						</tbody>
					</table>
				</Show>
			</div>
		</div>
	</>;
};
