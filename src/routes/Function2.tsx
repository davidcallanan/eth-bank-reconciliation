export default () => {
	return <>
		<div class="container mx-auto">
			<div class="mx-8">
				<h2 class="text-blue-800 text-xl">
					<img src="/src/assets/function-2.png" class="w-6 h-6 inline-block align-middle mr-2"/>
					<span class="align-middle"> Function 2. Generate Cash Book Reconciliation </span>
					</h2>
				<p class="text-gray-600 pt-4 text-sm">
					This function finds discrepancies between an "on-chain statement" and a "cash book".
					You must supply both the "on-chain statement" and the "cash book" and they should be
					of the same period. Any discrepancies will be detected and a reconciliation process will be initiated.
					You can then make any needed amendments until all discrepancies are rectified.
					A reconciliation report can then be downloaded. The information in this report
					can be used to make the necessary adjustments to your internal accounts.
				</p>
				<br/>
				<br/>
				<h1> Function 2 is currently being developed. Please check back at a later date. </h1>
			</div>
		</div>
	</>;
};
