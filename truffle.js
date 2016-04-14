module.exports = {
  build: {
  },
  deploy: [
    "Owner",
    "Admin",
	"DAOFunctions",
	"MarketPair",
	"Collateral",
	"Marketplace",
	"OptionCall",
	"OptionPut",
	"OracleInputs",
	"Oracles",
	"OracleWorking"
  ],
	after_deploy: [
  	"./employfully.js"
	],
  rpc: {
    host: "localhost",
    port: 8545
  }
};
