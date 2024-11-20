# EVM Bank Reconciliation

This is a proof-of-concept web application that allows users to perform the analog of bank reconciliation in Ethereum.

The project can be viewed live at [].

 - Rather than "bank" reconciliation, we consider "on-chain" reconciliation.
 - The app connects up to the user's wallet provider, and allows the user to select a particular token of interest.
 - The user can supply as many wallet addresses as they wish, and the app will handle them all simultaneously. The app will automatically detect the wallet address selected by the user's wallet provider.
 - The app can then generate an "on-chain statement", which can optionally be download for use at a later date. The user may manually upload an "on-chain statement" instead.
 - The user can then upload a "cash book" CSV file, which would be produced by their internal accounting system. The app will then compare the "cash book" to the "on-chain statement", and attempt to reconcile the two.
 - Any discrepancies will be highlighted, and a reconciliation report will be generated.
 - The user can make amendments to the report until the reconciliation is complete.
 - The user can then download the report, and use the information in the report to make the necessary adjustments to their internal accounts.

## Development

### Prerequisites

 - [Node.js](https://nodejs.org/) `^20`.
 - [`pnpm`](https://pnpm.io/): `npm i -g pnpm@9`. 

### Setup

 - Install dependencies: `pnpm install`

### Start Dev Server

 - `pnpm run dev`

## Future Work

 - Support could be added for non-EVM blockchains.
 - One could support beyond just simple ERC transactions and consider more complex transactions.
 - One could support combination with other bank statements, and allow for a all-encompassing reconciliation process.
