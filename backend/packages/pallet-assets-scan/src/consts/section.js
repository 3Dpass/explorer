const {
  env: { currentChain },
} = require("@osn/scan-common");

const chainSections = {
  statemint: "assets",
  polimec: "foreignAssets",
  "3dpass": "poscanAssets",
};

function getSection() {
  return chainSections[currentChain()] || "assets";
}

module.exports = {
  getAssetsSection: getSection,
};
