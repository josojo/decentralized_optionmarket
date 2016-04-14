

var Web3=require('../../node_modules/web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    var Pudding = require("../../node_modules/ether-pudding");
  Pudding.setWeb3(web3);
  web3.eth.defaultAccount=web3.eth.coinbase;

	module.exports = Pudding
