# 3DPscan block Explorer

3DPscan is a block Explorer providing blockchain data for ["The Ledger of Things"](https://github.com/3dpass/3DP) and also can be used for
[Substrate](https://github.com/paritytech/substrate)-based blockchains.

## Installation
Run `init.sh` to initialize repository; this will basically run:
  * `git submodule update --init --recursive`  
  * `cp explorer-ui-config.json explorer-ui/src/assets/config.json`

The [explorer-ui-config.json](https://github.com/3Dpass/explorer/blob/main/explorer-ui-config.json) file contains 
the URLs of theexposed Substrate and Explorer API endpoints

## Running the application
* `docker-compose up --build`

## Links
* 3DPscan UI: http://127.0.0.1:8080/
* 3DPscan API playground: http://127.0.0.1:8000/graphql/
* 3DPscan API websocket: ws://127.0.0.1:8000/graphql-ws

## Components

The explorer application consist of several components:

### Harvester component

The [harvester](https://github.com/3Dpass/harvester) retrieves data from the connected 
3DPass node and stores it into a MySQL (by default) database.

### Explorer API component

The [explorer API](https://github.com/3dpass/explorer-api) transforms the data via an ETL process into an 
explorer-specific format. It exposes a GraphQL endpoint and enables subscription-based communication to the UI.

### Explorer UI component

[Explorer UI](https://github.com/3dpass/explorer-ui) is a client-sided [Angular](https://angular.io/) based application that utilizes 
[PolkADAPT](https://github.com/polkascan/polkadapt) and its Adapters to obtain data from multiple data sources, like 
the Explorer API and the Substrate node. Its design is based on flat [Material](https://material.angular.io/) component 
design.

# Modifications

## The Node
By default, a build of [3DPass Node](https://github.com/3Dpass/3DP) is 
used. If a local node is already running on the host machine, you can change
environment variable in the [docker-compose.yml](https://github.com/3Dpass/explorer/blob/main/docker-compose.yml):
`SUBSTRATE_RPC_URL=ws://host.docker.internal:9944`

Using any public or private websocket API endpoint:

To use 3DPass wallet and explorer with the local node, go to https://wallet.3dpass.org and change wss API point in the settings. 

## Explorer UI 

### Datasources

The UI is utilizing [PolkAdapt](https://github.com/polkascan/polkadapt) to combine on-chain data retrieved directly from the Substrate node, with the GraphQL endpoint with indexed data served by the [Explorer API](https://github.com/polkascan/explorer-api). In this way data like events and extrinsics can be retrieved fast, with the verification of on-chain data.


By default, the UI are using the 3DPass endpoints, new networks can be added by extending the dict:

```json
{
  "local": {
    "substrateRpcUrlArray": ["ws://127.0.0.1:9944"],
    "explorerWsUrlArray": ["ws://127.0.0.1:8000/graphql-ws"]
  },
  "3DPass": {
    "substrateRpcUrlArray": ["wss://<PUBLIC_ENDPOINT>"],
    "explorerWsUrlArray": ["wss://<HOSTED_EXPLORER_API_ENDPOINT>/graphql-ws"]
  }
}
```
