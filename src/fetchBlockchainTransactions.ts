import { findBlockByTimestamp } from "./findBlockByTimestamp";
import { findTransactionsByAddress } from "./findTransactionsByAddress";

const convertStartDayToTimestamp = (timezone, startDay) => {
	// TODO: take timezone into account

	const startDate = new Date(startDay.replaceAll("/", "-"));
	startDate.setHours(0, 0, 0, 0);
	return startDate.getTime();
};

const convertEndDayToTimestamp = (timezone, endDay) => {
	// TODO: take timezone into account
	// NOTE: end day is exclusive

	const endDate = new Date(endDay.replaceAll("/", "-"));
	endDate.setHours(0, 0, 0, 0);
	endDate.setDate(endDate.getDate() + 1);
	return endDate.getTime();
};

export const fetchBlockchainTransactions = async (options) => {
	console.log(convertStartDayToTimestamp(undefined,options.period.start), convertEndDayToTimestamp(undefined,options.period.end));
	const startBlock = await findBlockByTimestamp(options.wallet.provider, convertStartDayToTimestamp(options.period.timezone, options.period.start));
	const endBlock = await findBlockByTimestamp(options.wallet.provider, convertEndDayToTimestamp(options.period.timezone, options.period.end)) - 1;
	const transactions = await findTransactionsByAddress(options.setProgress, options.wallet.provider, options.addresses, startBlock, endBlock);

	const entries = [];

	for (const tx of transactions) {
		if (options.addresses.includes(tx.from.toLowerCase())) {
			if (tx.value) {
				entries.push({
					hash: tx.hash,
					credit: tx.value,
					debit: 0n,
					timestamp: tx.timestamp,
					category: "transfer",
				});
			}

			if (tx.gasFee) {
				entries.push({
					hash: tx.hash,
					credit: tx.gasFee,
					debit: 0n,
					timestamp: tx.timestamp,
					category: "gas_fee",
				});
			}
		}

		if (options.addresses.includes(tx.to.toLowerCase())) {
			if (tx.value) {
				entries.push({
					hash: tx.hash,
					credit: 0n,
					debit: tx.value,
					timestamp: tx.timestamp,
					category: "transfer",
				});
			}
		}
	}

	console.log("Entries", entries);

	return entries;
};
