import { ReactComponent as Polkadot } from "../../../components/icons/polkadot.svg";

const threeDpass = {
  name: "3DPass",
  icon: <Polkadot />,
  identity: "3dpass",
  sub: "3dpass",
  value: "3dpass",
  chain: "3dpass",
  symbol: "P3D",
  decimals: 12,
  chainIcon: "originalPolkadot",
  color: "#008c4d",
  colorSecondary: "rgba(230, 0, 122, 0.1)",
  buttonColor: "#008c4d",
  logo: "logo-img-2",
  modules: {
    assets: true,
    identity: true,
    multisig: false,
    vestings: false,
    proxy: false,
  },
  treasuryWebsite: "https://polkadot.dotreasury.com",
  subSquareWebsite: "https://polkadot.subsquare.io",
  nodes: [
    { name: "Node1", url: "wss://rpc.3dpass.org/" },
    { name: "Node2", url: "wss://rpc2.3dpass.org/" },
  ],
  useOnChainBlockData: true,
};

export default threeDpass;
