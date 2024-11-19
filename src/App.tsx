import type { Component } from "solid-js";
import s from "./App.module.css";

// // On page load or when changing themes, best to add inline in `head` to avoid FOUC
// document.documentElement.classList.toggle(
// 	'dark',
// 	localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
//   )
  
//   // Whenever the user explicitly chooses light mode
//   localStorage.theme = 'light'
  
//   // Whenever the user explicitly chooses dark mode
//   localStorage.theme = 'dark'
  
//   // Whenever the user explicitly chooses to respect the OS preference
//   localStorage.removeItem('theme')

const App: Component = () => {
	return (<>
		<a href="/">
			<div class="group flex justify-center items-center p-2 text-xl text-orange-500 font-bold border-b-2 border-orange-200">
				<img src="/src/assets/favicon.ico" class="w-8 h-8 mr-4 border-2 border-orange-400 rounded-full"/>
				<h1 class="group-hover:underline"> Eth Bank Reconciliation </h1>
			</div>
		</a>

		<div class="container mx-auto">
			<div class="mx-8">
				<br/>
				<br/>
				<h2 class="text-blue-700 text-2xl"> Functions </h2>
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
							The statement can be downloaded or can be brought to "Function 2" directly.
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
							of the same period. Any discrepancies will be detected and a reconciliation will be generated.
							You can then make any amendments to the reconciliation until it is complete.
							A reconciliation report can then be downloaded. The information in this report
							can be used to make the necessary adjustments to your internal accounts.
						</p>
					</div>
				</a>
			</div>
		</div>

	</>);
};

export default App;
