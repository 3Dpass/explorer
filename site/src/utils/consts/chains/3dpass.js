import { ReactComponent as Polkadot } from "../../../components/icons/polkadot.svg";
import { polkadotColor } from "./common";
import { governanceModules, treasuryModules } from "./modules";

const polkadot = {
  name: "3DPass",
  icon: <Polkadot />,
  identity: "3dpass",
  sub: "3dpass",
  value: "3dpass",
  chain: "3dpass",
  symbol: "3DP",
  decimals: 12,
  chainIcon: "originalPolkadot",
  ...polkadotColor,
  buttonColor: "#E6007A",
  logo: "logo-img-2",
  modules: {
    ...treasuryModules,
    ...governanceModules,
    identity: true,
    multisig: true,
    vestings: true,
    proxy: true,
  },
  treasuryWebsite: "https://polkadot.dotreasury.com",
  subSquareWebsite: "https://polkadot.subsquare.io",
  nodes: [
    { name: "Node1", url: "wss://rpc.3dpass.org/" },
    { name: "Node2", url: "wss://rpc2.3dpass.org/" },
  ],
  useOnChainBlockData: true,
};

export default polkadot;
