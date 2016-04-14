// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"add","type":"address"}],"name":"aktivate","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"activated","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"add","type":"address"}],"name":"setActive","outputs":[],"type":"function"}],
    binary: "606060405260b68060106000396000f3606060405260e060020a60003504633fb410ae8114602e578063779d8677146064578063c06e0ada14607e575b005b73ffffffffffffffffffffffffffffffffffffffff6004351660009081526020819052604090205460ff165b6060908152602090f35b605a60043560006020819052908152604090205460ff1681565b602c60043573ffffffffffffffffffffffffffffffffffffffff81166000908152602081905260409020805460ff191660011790555056",
    unlinked_binary: "606060405260b68060106000396000f3606060405260e060020a60003504633fb410ae8114602e578063779d8677146064578063c06e0ada14607e575b005b73ffffffffffffffffffffffffffffffffffffffff6004351660009081526020819052604090205460ff165b6060908152602090f35b605a60043560006020819052908152604090205460ff1681565b602c60043573ffffffffffffffffffffffffffffffffffffffff81166000908152602081905260409020805460ff191660011790555056",
    address: "",
    generated_with: "2.0.6",
    contract_name: "Mapping"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Mapping error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("Mapping error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Mapping error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Mapping error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Mapping = Contract;
  }

})();
