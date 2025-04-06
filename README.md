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

## REST API 

### 1. Network overview: 

URL: https://api.3dpscan.xyz/overview

```
{
  "latestHeight": 1337566,
  "finalizedHeight": 1337564,
  "totalIssuance": "771319474246270346717",
  "signedExtrinsics": 1135042,
  "transfers": 1085854,
  "accounts": 3897
}
```

### 2. Recent transfers: 

URL: https://api.3dpscan.xyz/transfers?page=0&page_size=25&signed_only=true

Paramaters: 

- `page=0` - page number
- `page_size=25` - number of transfers per page
- `signed_only=true` - if only signed transfers required (the `true` is recommended for most of the cases)


Responce: 
```
{
  "items": [
    {
      "indexer": {
        "blockHeight": 1276047,
        "blockHash": "0x9c947e48bee48be9aaf1654141512667348c3af93b026030b737091b91c52975",
        "blockTime": 1740088569406,
        "eventIndex": 14,
        "extrinsicIndex": 7
      },
      "from": "d1GgtEoKL4Kwd12zTdpkV9KChrvvP5ZjhQRVEmjkTTmBVW9Cy",
      "to": "d1FnU4K1YphVHFvQ2FgkLYhcvshb83YkXK52jTDU17uPrcX4n",
      "balance": "218280695797780",
      "isSigned": true,
      "isNativeAsset": true
    },
  ],
  "page": 0,
  "pageSize": 25
}
```

### 3. Transfers history for a given address (both incoming and outgoing):

URL: https://api.3dpscan.xyz/accounts/d1FygYC5r7rJz4P7y14oJRKEGBwohkNpV2h1h6vjudz2DUvfP/transfers?page=0&page_size=25

Paramaters: 

- `../d1FygYC5r7rJz4P7y14oJRKEGBwohkNpV2h1h6vjudz2DUvfP/..` - the address to query blockcain data for
- `page=0` - page number
- `page_size=25` - number of transfers per page

Responce: 
```
{
  "items": [
    {
      "indexer": {
        "blockHeight": 1173176,
        "blockHash": "0x915604004e69261a5e8852a98627840ab087443a79b1f126d7d7c9ea05a306db",
        "blockTime": 1733800300272,
        "eventIndex": 59
      },
      "from": "d1Dhvwtmm6213dcHSQGjVrgBUAPXqyPCkxed6GoWjWpMBM4Zz",
      "to": "d1FygYC5r7rJz4P7y14oJRKEGBwohkNpV2h1h6vjudz2DUvfP",
      "balance": "1044776119402",
      "isSigned": false,
      "isNativeAsset": true
    },
 {
      "indexer": {
        "blockHeight": 1164150,
        "blockHash": "0xb805115134298d9f50a0c02b50947f66431d1118ee6389dd380c55be959cdb59",
        "blockTime": 1733248259849,
        "eventIndex": 10,
        "extrinsicIndex": 5
      },
      "from": "d1FygYC5r7rJz4P7y14oJRKEGBwohkNpV2h1h6vjudz2DUvfP",
      "to": "d1CG3nyJJgJnURJHVsQvE2zHCEay2459Bsv6wF7aLiBZ7xT44",
      "balance": "2744665400000000",
      "isSigned": true,
      "isNativeAsset": true
    }, 

  ],
  "page": 0,
  "pageSize": 25,
  "total": 6803
}
```

