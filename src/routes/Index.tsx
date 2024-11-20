import { Component } from "solid-js";

const Index: Component = () => {
	return <>
		<div class="container mx-auto">
			<div class="mx-8">
				<p>
					<a target="_blank" class="font-bold hover:underline text-blue-800" href="https://www.investopedia.com/terms/b/bankreconciliation.asp">Bank Reconciliation</a><span> </span>
					is a crucial process in accounting. It ensures internal accounting records line up with actual bank balances, giving adjustments to remedy any mismatches. This utility allows users to perform the analog of bank reconciliation with EVM balances.
				</p>
				<br/>
				<h2 class="text-blue-800 text-2xl"> Functions </h2>
				<br/>
				<a href="/function-1">
					<div class="flex flex-col items-center bg-red-50 hover:bg-red-100 border-2 border-gray-400 px-8 py-6 rounded-2xl group hover:bg-gray-100 hover:border-gray-500">
						<img src="/src/assets/function-1.png" class="block w-8 h-8 mb-4"/>
						<h2 class="text-blue-800 text-center text-lg font-bold group-hover:underline"> Function 1. Generate "On-Chain" Statement </h2>
						<p class="text-gray-600 pt-4 text-sm">
							This function generates on "on-chain statement" (analogous to a
							bank statement) from a live blockchain. You can connect up
							to your EVM wallet provider and select any ERC20 token of interest.
							You can then supply as many wallet addresses as you like and choose
							a time period for which the statement should be generated.
							The statement can then be downloaded or can be brought to "Function 2" directly.
						</p>
					</div>
				</a>
				<br/>
				<a href="/function-2">
					<div class="flex flex-col items-center bg-green-50 hover:bg-green-100 border-2 border-gray-400 px-8 py-6 rounded-2xl group hover:bg-gray-100 hover:border-gray-500">
						<img src="/src/assets/function-2.png" class="block w-8 h-8 mb-4"/>
						<h2 class="text-blue-800 text-center text-lg font-bold group-hover:underline"> Function 2. Generate Cash Book Reconciliation </h2>
						<p class="text-gray-600 pt-4 text-sm">
							This function finds discrepancies between an "on-chain statement" and a "cash book".
							You must supply both the "on-chain statement" and the "cash book" and they should be
							of the same period. Any discrepancies will be detected and a reconciliation process will be initiated.
							You can then make any needed amendments until all discrepancies are rectified.
							A reconciliation report can then be downloaded. The information in this report
							can be used to make the necessary adjustments to your internal accounts.
						</p>
					</div>
				</a>
			</div>
		</div>
	</>;
};

export default Index;
