const isDev = true;

// TODO: very inefficient to use RPC calls for this
export const findTransactionsByAddress = async (setProgress, provider, addresses, startBlock, endBlock) => {
    const transactions = [];
	
	console.log(startBlock, endBlock);
    for (let blockNumber = startBlock; blockNumber <= endBlock; blockNumber++) {
		console.log("iterating");
        const block = await provider.request({
            method: "eth_getBlockByNumber",
            params: [`0x${blockNumber.toString(16)}`, true],
        });

		for (const tx of block.transactions) {
			if (false
				|| (tx.to && (addresses.includes(tx.to.toLowerCase())))
				|| (tx.from && (addresses.includes(tx.from.toLowerCase())))
			) {
				transactions.push(tx);
			}
        }

		if (isDev) {
			setProgress?.(Math.max(
				(blockNumber - startBlock) / (endBlock - startBlock),
				transactions.length / 100,
			));

			if (transactions.length > 100) {
				break;
			}
		} else {
			setProgress?.((blockNumber - startBlock) / (endBlock - startBlock));
		}

		console.log("Transactions", transactions);
    }

    return transactions;
};
