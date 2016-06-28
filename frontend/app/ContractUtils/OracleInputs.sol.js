// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"mistakes","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"marketAddress","type":"address"},{"name":"price","type":"uint256"},{"name":"blockNr","type":"uint256"}],"name":"giveInput","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"blockNr","type":"uint256"},{"name":"marketAddress","type":"address"}],"name":"provideInput","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bool"}],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "606060405260008054600160a060020a03191633179055610163806100246000396000f3606060405260e060020a600035046367fd2e8681146100315780636d4ad1be1461003a578063cb6d8cc814610061575b005b6100a860015481565b61002f60043560243560443560005433600160a060020a039081169116146100bf57610002565b6100b2600435602435600160a060020a038116600090815260026020526040812081908490603290810190808306908110156100025790900160005054146101425761015c565b6060908152602090f35b6060918252608052604090f35b600160a060020a0383166000908152600260205260409020819060329081019080830690811015610002579090016000505410610103576001805481019055610002565b60406000208190603290810190808306908110156100025790900160006040902091905582906032808406908110156100025790900160005055505050565b604081206032808606908110156100025701549150600190505b925092905056",
    unlinked_binary: "606060405260008054600160a060020a03191633179055610163806100246000396000f3606060405260e060020a600035046367fd2e8681146100315780636d4ad1be1461003a578063cb6d8cc814610061575b005b6100a860015481565b61002f60043560243560443560005433600160a060020a039081169116146100bf57610002565b6100b2600435602435600160a060020a038116600090815260026020526040812081908490603290810190808306908110156100025790900160005054146101425761015c565b6060908152602090f35b6060918252608052604090f35b600160a060020a0383166000908152600260205260409020819060329081019080830690811015610002579090016000505410610103576001805481019055610002565b60406000208190603290810190808306908110156100025790900160006040902091905582906032808406908110156100025790900160005055505050565b604081206032808606908110156100025701549150600190505b925092905056",
    address: "0xb7759fdb4bf78be1f63c9468a1a008ab6f99b217",
    generated_with: "2.0.6",
    contract_name: "OracleInputs"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("OracleInputs error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("OracleInputs error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("OracleInputs error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("OracleInputs error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.OracleInputs = Contract;
  }

})();
