import { createSignal, Show } from "solid-js";

export default (props) => {
	const [error, setError] = createSignal("");

	const addressRegex = /^0x[a-fA-F0-9]{40}$/;

	let textarea;

	const handleComplete = () => {
		const final = textarea.value.replaceAll("\r", "").trim().split("\n").map(address => address.toLowerCase());

		if (final.length === 0 || final.some(entry => !addressRegex.test(entry))) {
			setError("Please enter at least one address and enter valid addresses prefixed by 0x");
			return;
		}

		props?.onComplete?.(new Set(final));
	};

	return <>
		<p> <b>Please separate each wallet address by newline. </b> </p>
		<textarea ref={textarea} class="text-xs w-80 h-40 border border-blue-300 my-2" placeholder="0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5"></textarea>
		<Show when={error() !== ""}>
			<p class="text-red-500 text-xl">{error()}</p>
		</Show>
		<br/>
		<button onClick={handleComplete} class="bg-black text-white rounded-full px-4 py-2"> Generate Statement </button>

	</>;
};
