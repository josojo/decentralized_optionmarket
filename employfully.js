var src = "./environments/development/contracts/";
var dest = "./frontend/app/ContractUtils/";
var Promise = require("bluebird");
//clear old files
var fs = require('fs');
var path = require('path');
var deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
deleteFolderRecursive(dest);
fs.mkdir(dest);


var copyRecursiveSync = function(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (exists && isDirectory) {
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName),
                path.join(dest, childItemName));
        });
    } else {
        fs.linkSync(src, dest);
    }
};
copyRecursiveSync(src, dest);

var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var Pudding = require("ether-pudding");
web3.eth.defaultAccount = web3.eth.coinbase;
Pudding.setWeb3(web3);

var COwner = require("./frontend/app/ContractUtils/Owner.sol.js");
COwner.load(Pudding);


var CDAOFunctions = require("./frontend/app/ContractUtils/DAOFunctions.sol.js");
CDAOFunctions.load(Pudding);
CDAOFunctions.at(CDAOFunctions.address).setDAOFunctions(COwner.address);

var CAdmin = require("./frontend/app/ContractUtils/Admin.sol.js");
CAdmin.load(Pudding);
CAdmin.at(CAdmin.address).setAdmin();

var CMarketplace = require("./frontend/app/ContractUtils/Marketplace.sol.js");
CMarketplace.load(Pudding);

var COracleWorking = require("./frontend/app/ContractUtils/OracleWorking.sol.js");
COracleWorking.load(Pudding);
COracleWorking.at(COracleWorking.address).setOracleWorking(CMarketplace.address, CAdmin.address);

var COracles = require("./frontend/app/ContractUtils/Oracles.sol.js");
COracles.load(Pudding);
COracles.at(COracles.address).setOracles(CMarketplace.address, CAdmin.address);

CMarketplace.at(CMarketplace.address).setMarketplace(CAdmin.address, COracles.address, COwner.address, COracleWorking.address);

var CMarketPair = require("./frontend/app/ContractUtils/MarketPair.sol.js");
CMarketPair.load(Pudding);
CMarketPair.at(CMarketPair.address).setMarketPair(CMarketplace.address, COracleWorking.address, "ETH/BTC", CAdmin.address, COracles.address);
CMarketplace.at(CMarketplace.address).registerMarket(CMarketPair.address);

var CMarketPair2 = CMarketPair.new().then(function(market) {
  CMarketPair.at(market.address).setMarketPair(CMarketplace.address, COracleWorking.address, "ETH/USD", CAdmin.address, COracles.address)
  CMarketplace.at(CMarketplace.address).registerMarket(market.address);
}).catch(function(err) {
  console.log("Error creating contract!");
  console.log(err.stack);
});

var CMarketPair3 = CMarketPair.new().then(function(market) {
  CMarketPair.at(market.address).setMarketPair(CMarketplace.address, COracleWorking.address, "BTC/USD", CAdmin.address, COracles.address)
  CMarketplace.at(CMarketplace.address).registerMarket(market.address);
}).catch(function(err) {
  console.log("Error creating contract!");
  console.log(err.stack);
});

var CMarketPair4= CMarketPair.new().then(function(market) {
  CMarketPair.at(market.address).setMarketPair(CMarketplace.address, COracleWorking.address, "DJIA/USD", CAdmin.address, COracles.address);
  CMarketplace.at(CMarketplace.address).registerMarket(market.address);
}).catch(function(err) {
  console.log("Error creating contract!");
  console.log(err.stack);
});

var CCollateral = require("./frontend/app/ContractUtils/Collateral.sol.js");
CCollateral.load(Pudding);
CCollateral.at(CCollateral.address).setCollateral(CMarketplace.address, COracleWorking.address, "DAI/ETH", CAdmin.address, COracles.address);
CMarketplace.at(CMarketplace.address).registerCollateral(CCollateral.address);


var COptionPut = require("./frontend/app/ContractUtils/OptionPut.sol.js");
COptionPut.load(Pudding);
COptionPut.at(COptionPut.address).setOptionPut(CMarketPair.address, CCollateral.address, 60, 10000, 1000);
CMarketPair.at(CMarketPair.address).addOptionPut(COptionPut.address);

var COptionCall = require("./frontend/app/ContractUtils/OptionCall.sol.js");
COptionCall.load(Pudding);
COptionCall.at(COptionCall.address).setOptionCall(CMarketPair.address, CCollateral.address, 60, 30000, 1000);
CMarketPair.at(CMarketPair.address).addOptionCall(COptionCall.address);



Promise.delay(10000).then(function (){
  console.log("contracts linked on chain");
  process.exit();
});
