export default (props) => <>
	<div class="bg-blue-100 p-4 rounded-lg">
		<p> <b>PERIOD RANGE:</b> {props.period.range} </p>
		<p class="text-blue-800 text-xl font-mono font-bold"> start day.. {props.period.start} </p>
		<p class="text-blue-800 text-xl font-mono font-bold"> end day.... {props.period.end} </p>
	</div>
</>;
