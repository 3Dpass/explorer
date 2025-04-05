# 3dpscan

3dpscan is a blockchain explorer for The Ledger of Things.

## Terminology

- Data indexing: we use js scripts to query blockchain history data, normalize and save them to database.
- Scan: it's a process that we index blockchain data in a height asc order.

## Requirements
Full archive LoT blockchain data base is required for the explorer to operate. Run the [Node](https://github.com/3dpass/P3D) with the 
`--pruning archive` flag and sync it from genesis block to get the db prepared for scanning. 

```
./target/release/poscan-consensus \
 --base-path ~/3dp-chain/ \
 --chain mainnetSpecRaw.json \
 --name "my 160 USD dedicated server" \ 
 --validator \
 --telemetry-url "wss://submit.3dpass.network/submit 0" \
 --author <your mining pub key> \
 --no-mdns \
 --unsafe-ws-external \
 --unsafe-rpc-external \
 --rpc-cors all \
 --ws-port 9945 \
 --rpc-port 9934 \
 --pruning archive \
```

## Code structure

This code base can be divided into 3 parts: data indexing, servers(restful and graphql) and fronted pages.

### Data indexing

Currently, we have the following packages for data indexing.

- [block-scan](./backend/packages/block-scan) for block/extrinsic/event/transfer data.
- [account-scan](./backend/packages/account-scan) for latest account balance info.
- [runtime-scan](./backend/packages/account-scan) for history runtime metadata versions.
- [identity-scan](./backend/packages/identity-scan) for identity related business.
- [assets-scan](./backend/packages/pallet-assets-scan)
  for [pallet assets](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/assets) business.
- [pallet-proxy-scan](./backend/packages/pallet-proxy-scan)
  for [proxy pallet](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/proxy) business.
- [pallet-recovery-scan](./backend/packages/pallet-recovery-scan)
  for [recover pallet](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/recovery) business.
- [vesting-scan](./backend/packages/vesting-scan) for latest vesting data.
- [multisig-scan](./backend/packages/multisig-scan) for multisig data indexing.
- [uniques-scan](./backend/packages/uniques-scan) for previous uniques pallet business indexing, outdated.

### Data servers

We have a [RESTful server](./backend/packages/server) and a [GraphQL server](./backend/packages/graphql-server), and the
RESTful server will be finally replaced by the GraphQL server.

### [Site](./site)

The site package call APIs from servers and render fronted pages.

## Setup

We should install [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/) first for data
storage.

Then generally we should first index necessary data, then setup restful and graphql servers, and finally the site.
Servers rely on the indexed data, and site reply on the APIs by the servers.
