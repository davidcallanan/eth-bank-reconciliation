// This wallet selector implements EIP-6963:
// https://eips.ethereum.org/EIPS/eip-6963

import { createSignal, For, onCleanup, onMount } from "solid-js";

export default () => {
	const [wallets, setWallets] = createSignal([]);

	const listener = (event) => {
		const { info, provider } = event.detail;
		setWallets([
			...wallets(),
			{ info, provider },
		]);
	};

	onMount(() => {
		window.addEventListener("eip6963:announceProvider", listener);
		window.dispatchEvent(new Event("eip6963:requestProvider"));
	});

	onCleanup(() => {
		window.removeEventListener("eip6963:announceProvider", listener);
	});

	return <>
		<For each={wallets()}>
			{(wallet) => <>
				<div style="max-width: 400px;" class="cursor-pointer select-none">
					<div class="group bg-gray-100 rounded-2xl p-6 border border-gray-200">
						<div class="flex">
							<img src={wallet.info.icon} style="width: 24px; height: 24px;" class="mr-4"/>
							<p class="font-bold"> {wallet.info.name} </p>
						</div>
						<p class="text-purple-700 font-mono"> {wallet.info.rdns} </p>
						<p class="text-gray text-xs font-mono"> {wallet.info.uuid} </p>
						<div class="group-hover:bg-blue-700 group-hover:text-white bg-white text-blue-500 text-sm font-bold inline-block rounded-2xl px-4 py-2 mt-4 border border-gray-200">
							SELECT WALLET
						</div>
					</div>
				</div>
				<br/>
			</>}
		</For>
	</>;
};
