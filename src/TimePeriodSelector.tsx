import { createSignal, Show } from "solid-js";

import DaySelector from "./DaySelector";
import WeekSelector from "./WeekSelector";
import MonthSelector from "./MonthSelector";
import TimezoneSelector from "./TimezoneSelector";

export default (props) => {
	const [range, setRange] = createSignal("daily");
	const [timezone, setTimezone] = createSignal("Europe/Dublin");

	return <>
		<div class="border-2 border-gray px-4 py-2 inline-block">
			<TimezoneSelector onChange={(timezone) => setTimezone(timezone)}/>
		</div>
		<br/><br/>
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
		<Show when={range() === "daily"}>
			<DaySelector onComplete={({ start, end }) => {
				props?.onComplete?.({
					range: "daily",
					start,
					end,
				});
			}} />
		</Show>
		<Show when={range() === "weekly"}>
			<WeekSelector onComplete={({ start, end }) => {
				props?.onComplete?.({
					range: "weekly",
					start,
					end,
				});
			}} />
		</Show>
		<Show when={range() === "monthly"}>
			<MonthSelector onComplete={({ start, end }) => {
				props?.onComplete?.({
					range: "monthly",
					start,
					end,
				});
			}} />
		</Show>
	</>;
};
