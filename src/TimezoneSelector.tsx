import { createSignal, onMount } from "solid-js";

const formatTimezone = (timezone: string) => {
	const now = new Date();

	const options = {
		timeZone: timezone,
		timeZoneName: "shortOffset",
	};

	const formatter = new Intl.DateTimeFormat("en-US", options);
	const parts = formatter.formatToParts(now);

	// Extract UTC offset
	const offset = parts.find((p) => p.type === "timeZoneName");

	return offset ? `${timezone} (${offset.value})` : timezone;
};

export default (props) => {
	const [timezones, setTimezones] = createSignal([]);
	const [selectedTimezone, setSelectedTimezone] = createSignal("Europe/Dublin");

	onMount(() => {
		setTimezones(Intl.supportedValuesOf("timeZone"));
	});

	return <>
		<p> Select Timezone </p>
		<select id="timezone" value={selectedTimezone()} onInput={(e) => setSelectedTimezone(e.currentTarget.value)}>
			{timezones().map((timezone) => (
				<option selected={timezone === selectedTimezone()} value={timezone}>{formatTimezone(timezone)}</option>
			))}
		</select>
	</>;
};
