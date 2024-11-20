import { createSignal, onMount } from "solid-js";

export default (props) => {
	const [error, setError] = createSignal("");
	let input;

	onMount(() => {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const day = now.getDate();
		input.value = `${year.toString().padStart(4)}/${month.toString().padStart(2)}/${day.toString().padStart(2)}`;
	});

	const handleComplete = () => {
		if (!input.checkValidity()) {
			setError("Please enter a valid date");
			return;
		}

		props?.onComplete?.({
			start: input.value,
			end: input.value,
		});
	};

	return <>
		<br/>
		<p> Please enter a date in YYYY/MM/DD format </p>
		<input type="text" placeholder="YYYY/MM/DD" ref={input} onkeypress={(event) => {
			if (event.key === "Enter") {
				handleComplete();
			}
		}} required pattern="[0-9]{4}/[0-9]{2}/[0-9]{2}" class="bg-orange-200 px-2 py-1"/>
		<br/>
		<Show when={error() !== ""}>
			<p class="px-4 bg-red-600 text-white border-2 border-red-900"> {error} </p>
		</Show>
		<br/>
		<button onClick={handleComplete} class="bg-black text-white rounded-full px-4 py-2"> Use Date </button>
	</>;
};
