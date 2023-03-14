import { ReactComponent as Litmus } from "../../../components/icons/litmus.svg";
import { governanceModules } from "./modules";

const litmus = {
  name: "Litmus",
  icon: <Litmus />,
  identity: "kusama",
  sub: "litentry",
  value: "litmus",
  chain: "kusama",
  symbol: "LIT",
  decimals: 12,
  chainIcon: "litmus",
  color: "#6431EC",
  colorSecondary: "rgba(100, 49, 236, 0.1)",
  buttonColor: "#6431EC",
  para: {
    relay: "Kusama",
    id: "2106",
  },
  modules: {
    ...governanceModules,
  },
  subSquareWebsite: "https://litmus.subsquare.io",
};

export default litmus;
