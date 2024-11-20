export const findBlockByTimestamp = async (provider, timestamp) => {
	// Does a binary search.

    let low = 0;
    let high = parseInt(await provider.request({ method: "eth_blockNumber" }), 16);
    let closestBlock = undefined;
    let closestTimestampDiff = Infinity;

	console.log("boo")
    while (low <= high) {
		console.log("LH", low, high);
        const mid = Math.floor((low + high) / 2);
        const block = await provider.request({
            method: "eth_getBlockByNumber",
            params: [`0x${mid.toString(16)}`, false],
        });

        const timestampDifference = Math.abs(block.timestamp - timestamp);

        if (timestampDifference < closestTimestampDiff) {
            closestTimestampDiff = timestampDifference;
            closestBlock = block;
        }

        if (parseInt(block.timestamp, 16) * 1000 < timestamp) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return closestBlock ? parseInt(closestBlock.number, 16) : undefined;
}
