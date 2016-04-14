// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lastTransaction","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"adminadd_","type":"address"}],"name":"changeMarketAdmin","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"add","type":"address"}],"name":"getLastTransactionBlock","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"newmarketplace","type":"address"}],"name":"changeMarketplace","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getFunds","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lastVote","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"newSharesTrading","type":"address"}],"name":"changeDAOFunctionAddress","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"add","type":"address"}],"name":"getBalanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getAmountOfShares","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"daoFunction_","type":"address"},{"name":"marketp","type":"address"},{"name":"adminContractAdd","type":"address"}],"name":"settingOnce","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "6060604052633b9aca006007556008805460ff1916600117905560018054600160a060020a03191633908117909155600160a060020a03166000908152600460205260409020633b9aca0090556103858061005a6000396000f3606060405236156100985760e060020a60003504630531be92811461009a5780630885fd9d146100b25780633b14764a146100d45780634cac2598146100f95780634d9b37351461011b5780636accc8cf1461013f57806370a08231146101575780637cf4a29a1461016f5780639b96eece14610191578063beabacc8146101b5578063ca499424146101dd578063e3385cbb146101f3575b005b6101e160043560056020526000908152604090205481565b610098600435600354600160a060020a03908116339091161461037057610002565b6101e1600435600160a060020a0381166000908152600560205260409020545b919050565b610098600435600054600160a060020a03908116339091161461037057610002565b6101e16002546000908190600160a060020a03908116339091161461025a57610002565b6101e160043560066020526000908152604090205481565b6101e160043560046020526000908152604090205481565b610098600435600254600160a060020a03908116339091161461035b57610002565b6101e1600435600160a060020a0381166000908152600460205260409020546100f4565b610098600435602435604435600254600160a060020a03908116339091161461028957610002565b6007545b60408051918252519081900360200190f35b61009860043560243560443560085460ff16151561021057610002565b60015433600160a060020a0390811691161461022b57610002565b60008054600160a060020a03199081168417909155600280548216851790556003805490911682179055505050565b5060025430600160a060020a0390811680319290911690839031606082818181858883f1509395945050505050565b600160a060020a038316600090815260046020526040902054819010156102af57610002565b600160a060020a0382166000908152604090205480820110156102d157610002565b806004600050600084600160a060020a03168152602001908152602001600020600082828250540192505081905550806004600050600085600160a060020a03168152602001908152602001600020600082828250540392505081905550436005600050600084600160a060020a0316815260200190815260200160002060005081905550505050565b60028054600160a060020a0319168217905550565b60008054600160a060020a031916821790555056",
    unlinked_binary: "6060604052633b9aca006007556008805460ff1916600117905560018054600160a060020a03191633908117909155600160a060020a03166000908152600460205260409020633b9aca0090556103858061005a6000396000f3606060405236156100985760e060020a60003504630531be92811461009a5780630885fd9d146100b25780633b14764a146100d45780634cac2598146100f95780634d9b37351461011b5780636accc8cf1461013f57806370a08231146101575780637cf4a29a1461016f5780639b96eece14610191578063beabacc8146101b5578063ca499424146101dd578063e3385cbb146101f3575b005b6101e160043560056020526000908152604090205481565b610098600435600354600160a060020a03908116339091161461037057610002565b6101e1600435600160a060020a0381166000908152600560205260409020545b919050565b610098600435600054600160a060020a03908116339091161461037057610002565b6101e16002546000908190600160a060020a03908116339091161461025a57610002565b6101e160043560066020526000908152604090205481565b6101e160043560046020526000908152604090205481565b610098600435600254600160a060020a03908116339091161461035b57610002565b6101e1600435600160a060020a0381166000908152600460205260409020546100f4565b610098600435602435604435600254600160a060020a03908116339091161461028957610002565b6007545b60408051918252519081900360200190f35b61009860043560243560443560085460ff16151561021057610002565b60015433600160a060020a0390811691161461022b57610002565b60008054600160a060020a03199081168417909155600280548216851790556003805490911682179055505050565b5060025430600160a060020a0390811680319290911690839031606082818181858883f1509395945050505050565b600160a060020a038316600090815260046020526040902054819010156102af57610002565b600160a060020a0382166000908152604090205480820110156102d157610002565b806004600050600084600160a060020a03168152602001908152602001600020600082828250540192505081905550806004600050600085600160a060020a03168152602001908152602001600020600082828250540392505081905550436005600050600084600160a060020a0316815260200190815260200160002060005081905550505050565b60028054600160a060020a0319168217905550565b60008054600160a060020a031916821790555056",
    address: "0x27dbb708e07fbe4af42b14361c6bf79cf4320e0b",
    generated_with: "2.0.6",
    contract_name: "Owner"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Owner error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Owner error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Owner error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Owner error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Owner = Contract;
  }

})();
