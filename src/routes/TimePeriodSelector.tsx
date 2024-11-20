import { createSignal } from "solid-js";

export default () => {
	const [range, setRange] = createSignal("weekly");
// need to conditionally set class depending on range()
	return <>
		<div class="flex">
			<div class={`${range() === "daily" ? "bg-green-100 font-bold border-b-4" : "bg-blue-200"} border-blue-900 cursor-pointer px-4 py-2`} onClick={ () => setRange("daily")}>
				Daily
			</div>
			<div class={`${range() === "weekly" ? "bg-green-100 font-bold border-b-4" : "bg-blue-200"} border-blue-900 cursor-pointer px-4 py-2`} onClick={ () => setRange("weekly")}>
				Weekly
			</div>
			<div class={`${range() === "monthly" ? "bg-green-100 font-bold border-b-4" : "bg-blue-200"} border-blue-900 cursor-pointer px-4 py-2`} onClick={ () => setRange("monthly")}>
				Monthly
			</div>
		</div>
	</>;
};
