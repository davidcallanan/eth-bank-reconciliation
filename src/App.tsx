import type { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import Index from "./routes/Index";
import Function1 from "./routes/Function1";
import Function2 from "./routes/Function2";

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
	return <>
		<a href="/">
			<div class="group flex justify-center items-center p-2 text-xl text-orange-500 font-bold border-b-2 border-orange-200">
				<img src="/src/assets/favicon.ico" class="w-8 h-8 mr-4 border-2 border-orange-400 rounded-full"/>
				<h1 class="group-hover:underline"> EVM Bank Reconciliation </h1>
			</div>
		</a>
		<br/>
		<Router>
			<Route path='/' component={Index} />
			<Route path='/function-1' component={Function1} />
			<Route path='/function-2' component={Function2} />
		</Router>
		<br/>
		<div class="text-right border-t-2 border-gray-300 px-4 py-2 text-gray-500">
			Website by <a href="https://dcallanan.com/" target="_blank" class="text-gray-700 hover:underline hover:text-blue-800">David P. Callanan</a>
		</div>
	</>;	
};

export default App;
