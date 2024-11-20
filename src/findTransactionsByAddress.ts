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
			// This may not be up-to-date with modern gas calculation?
			tx.timestamp = parseInt(block.timestamp, 16);
			tx.value = tx.value ? BigInt(tx.value, 16) : tx.value;
			tx.gasPrice = tx.gasPrice ? BigInt(tx.gasPrice, 16) : tx.gasPrice;
			tx.gas = tx.gas ? BigInt(tx.gas, 16) : tx.gas;
			tx.gasFee = tx.gasPrice * tx.gas;

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

			if (transactions.length > 10) {
				break;
			}
		} else {
			setProgress?.((blockNumber - startBlock) / (endBlock - startBlock));
		}

		console.log("Transactions", transactions);
    }

    return transactions;
};
