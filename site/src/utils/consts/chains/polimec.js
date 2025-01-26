import { ReactComponent as Polimec } from "../../../components/icons/polimec.svg";
import { collectivesModules } from "./collectives";

const nodes = [
  {
    name: "Amforc",
    url: "wss://polimec.rpc.amforc.com/",
  },
  {
    name: "Helikon",
    url: "wss://rpc.helikon.io/polimec",
  },
  {
    name: "IBP1",
    url: "wss://polimec.ibp.network/",
  },
  {
    name: "IBP2",
    url: "wss://polimec.dotters.network/",
  },
  {
    name: "Polimec Foundation",
    url: "wss://rpc.polimec.org",
  },
];

const polimec = {
  name: "Polimec",
  icon: <Polimec />,
  identity: "polimec",
  chain: "polkadot",
  value: "polimec",
  symbol: "PLMC",
  decimals: 10,
  color: "#74A84D",
  colorSecondary: "rgba(116,168,77, 0.1)",
  modules: collectivesModules,
  nodes,
  useOnChainBlockData: true,
};

export default polimec;
