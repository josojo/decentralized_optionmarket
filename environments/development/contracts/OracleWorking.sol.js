// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"oracleIsWorkingSinceEver","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"resettemporarySettlementAllowance","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"evaluteBetStage2","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"transactionhash","type":"bytes32"},{"name":"oracleInputAddress_","type":"address"}],"name":"report","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"marketplace_","type":"address"},{"name":"adminContract_","type":"address"}],"name":"setOracleWorking","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"isWorking","type":"bool"}],"name":"betStage1","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"temporarySettlementAllowed","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"vote","type":"bool"},{"name":"secret_","type":"bytes32"}],"name":"reveal","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"stage","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[],"name":"evaluteBetStage1","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"oracleWithoutIssues","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"isWorkingBlind","type":"bytes32"}],"name":"betStage2","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getChallengeInfoTransaction","outputs":[{"name":"","type":"bytes32"}],"type":"function"}],
    binary: "60606040526000805461ffff1916815560038190556004819055600581905560068190556015805460ff1916905561112390819061003c90396000f3606060405236156100a35760e060020a600035046302209df381146100a55780631a5b2608146100b957806364889cfd146100d857806365c5fe82146100f45780637a5bb78f1461010f5780639161a229146101285780639a39023d14610140578063a6af982214610152578063c040e6b8146101ae578063c55b7057146101ba578063e97fdf7a146101da578063fa3d494f146101f5578063ffa7e9401461020c575b005b6102176000805460ff16156110b35761014f565b6100a36001546107d0014311156100d6576000805461ff00191690555b565b6100a36002546000908190819060ff166001146108ca57610002565b6100a360043560243560025460ff1660001461026357610002565b6100a360043560243560155460ff161561022957610002565b6100a360043560025460ff166001146103fc57610002565b610217600054610100900460ff165b90565b6100a36004356024356002805460009160ff90911614801561017b575043600360076000505401115b1561019c576002805460ff1916600317905543600855600060058190556006555b60025460ff1660031461069557610002565b61021760025460ff1681565b6100a3600254600090819081908190819060ff166001146104fb57610002565b61021760025460009060ff168114156110bb5750600161014f565b6100a36004356002805460ff16146104a857610002565b61021760125461014f565b60408051918252519081900360200190f35b60098054600160a060020a03199081169093179055600a80549092161790556002805460ff19908116909155601580549091166001179055565b670de0b6b3a764000034101561027857610002565b6002805460ff1916600190811790915560408051608081018252438082526020820186905291810184905233606091909101819052601191909155601284905560138054600160a060020a03199081168517909155601480549091169091179055600b805491820180825590919082818380158290116103115760030281600302836000526020600020918201910161031191906103c6565b50505060009283525060408051602080852060608301845233808452349284018390529290930194909452600392909202018054600160a060020a031916909117815560018101829055600201805460ff191690556004805490910190555050565b604051601454600160a060020a031690600090670de0b6b3a76400009082818181858883f150505050505b600b80546000808355919091526105f0906003026000805160206110e3833981519152908101905b808211156103f8578054600160a060020a0319168155600060018201908155600291909101805460ff191690556103c6565b5090565b600b80546001810180835582818380158290116104325760030281600302836000526020600020918201910161043291906103c6565b5050509190906000526020600020906003020160005060408051606081018252338082523460208301819052919092018590528254600160a060020a03191690911782556001820155600201805460ff19168317905550801561049c5760038054340190556104a5565b60048054340190555b50565b6040805160608101825234815260208181018481526000838501818152600160a060020a0333168252600c9093529390932091518255915160018201556002018054915160ff1990921691909117905550565b601154436003909101111561050f57610002565b60045461271090118015610527575060035461c35090115b15610541576002805460ff191681179055436007556105fc565b600454600354901115610603576004546003546000805460ff19166001178155600b54439850919092019550935091505b8282101561037357600b805483908110156100025760009182526003026000805160206110e3833981519152019050600281015490915060ff16156105e45760405160035482546001840154600160a060020a039190911692600092918802919091049082818181858883f150505050505b60019190910190610572565b50600060038190556004555b5050505050565b600454600354600b54910194509250600091505b8282101561039e57600b805483908110156100025760009182526003026000805160206110e3833981519152019050600281015490915060ff16156106895760405160035482546001840154600160a060020a039190911692600092918802919091049082818181858883f150505050505b60019190910190610617565b600a60009054906101000a9004600160a060020a0316600160a060020a0316636e9960c36040518160e060020a0281526004018090506020604051808303816000876161da5a03f11561000257505060405151600160a060020a03908116339091161490506107295750600160a060020a0333166000908152600c60205260409020600281015460ff161561075457610002565b50600160a060020a0333166000908152600c60205260409020600281015460ff161561088857610002565b6040805160f860020a8502815260018181018590529151908190036021019020908201541461078257610002565b8215610796576005805482540190556107a2565b80546006805490910190555b600d80546001810180835582818380158290116107d8576003028160030283600052602060002091820191016107d891906103c6565b505050919090600052602060002090600302016000506040805160608101825233808252855460208301819052919092018790528254600160a060020a03191690911782556001820155600201805460ff19168517905550610883565b80546006805490910190555b604080516060810182523380825283546020830181905291909201859052600e8054600160a060020a031916909217909155600f556010805460ff1916841790555b505050565b6040805160f860020a850281526001818101859052915190819003602101902090820154146108b657610002565b821561083557600580548254019055610841565b43614e206008600050540111156108e057610883565b60045460035411156108f557600192506108fa565b600092505b60009150826001148015610913575060105460ff166001145b15610a38575050600d546000905b80821015610ae457600d80548390811015610002576000919091527fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb76003909102015460ff1615610c3f57600d805483908110156100025760009182526003026000805160206110c38339815191520190506004549054600d8054600554600160a060020a03939093169360009360029391929091908890811015610002579085526003026000805160206110c383398151915201845060010160005054040204600d60005085815481101561000257604051600391909102600080516020611103833981519152015490920191905082818181858883f1935050505050610cab565b6000805461ff001916610100179055436001555b60105460ff168314610cdf5750506000805460ff19166001178155600b545b80821015610e1d57600b80548390811015610002575080546000828152600385026000805160206110e38339815191520154600160a060020a03169290918590811015610002575050604051600385027f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dba01549082818181858883f1505050505060019190910190610a57565b600354600e54600554600f54604051600160a060020a03939093169360009360029390920402919091049082818181858883f15050600b5491945090925050505b80821015610a2457600b80548390811015610002576000919091526003027f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbb015460ff1615610c3357600b805483908110156100025760009182526003026000805160206110e3833981519152019050600b80549154600160a060020a031691600091908590811015610002579082526003026000805160206110e3833981519152018150600b80546004546003546001949094015493926002928990811015610002576040516003919091027f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dba01549092029290920492909204909201915082818181858883f150505050505b60019190910190610b25565b600d8054839081101561000257600082815260039091026000805160206110c383398151915201548254600160a060020a03919091169290859081101561000257600080516020611103833981519152600391909102015460405190915082818181858883f150505050505b60019190910190610921565b600e54600f54604051600160a060020a0392909216916000919082818181858883f150505050505b826000148015610cf4575060105460ff166000145b156110a45750506000805460ff19166001178155600d545b80821015610ecb57600d80548390811015610002576000919091527fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb76003909102015460ff16151561102c57600d805483908110156100025760009182526003026000805160206110c383398151915201905054600d8054600160a060020a039290921691600091908590811015610002579082526003026000805160206110c3833981519152018150600101600050546006600050546002600360005054600d6000508881548110156100025760009182526003026000805160206110c38339815191520190506001016000505402040401604051809050600060405180830381858888f1935050505050611098565b604051601454600160a060020a031690600090670de0b6b3a76400009082818181858883f15050600d5491945090925050505b80821015610cb757600d80548390811015610002575080546000828152600385026000805160206110c38339815191520154600160a060020a031692909185908110156100025750506040516003850260008051602061110383398151915201549082818181858883f1505050505060019190910190610e50565b600354600e54600554600f54604051600160a060020a03939093169360009360029390920402919091049082818181858883f15050600b5491945090925050505b808210156110a457600b80548390811015610002576000919091526003027f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbb015460ff16151561102057600b805483908110156100025760009182526003026000805160206110e3833981519152019050600b80549154600160a060020a031691600091908590811015610002579082526003026000805160206110e3833981519152018150600101600050546004600050546002600360005054600b600050888154811015610002576040516003919091027f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dba01549092029290920492909204909201915082818181858883f150505050505b60019190910190610f0c565b600d8054839081101561000257600082815260039091026000805160206110c383398151915201548254600160a060020a03919091169290859081101561000257600080516020611103833981519152600391909102015460405190915082818181858883f150505050505b60019190910190610d0c565b60006003819055600455505050565b50600161014f565b50600061014f56d7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb50175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db9d7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb6",
    unlinked_binary: "60606040526000805461ffff1916815560038190556004819055600581905560068190556015805460ff1916905561112390819061003c90396000f3606060405236156100a35760e060020a600035046302209df381146100a55780631a5b2608146100b957806364889cfd146100d857806365c5fe82146100f45780637a5bb78f1461010f5780639161a229146101285780639a39023d14610140578063a6af982214610152578063c040e6b8146101ae578063c55b7057146101ba578063e97fdf7a146101da578063fa3d494f146101f5578063ffa7e9401461020c575b005b6102176000805460ff16156110b35761014f565b6100a36001546107d0014311156100d6576000805461ff00191690555b565b6100a36002546000908190819060ff166001146108ca57610002565b6100a360043560243560025460ff1660001461026357610002565b6100a360043560243560155460ff161561022957610002565b6100a360043560025460ff166001146103fc57610002565b610217600054610100900460ff165b90565b6100a36004356024356002805460009160ff90911614801561017b575043600360076000505401115b1561019c576002805460ff1916600317905543600855600060058190556006555b60025460ff1660031461069557610002565b61021760025460ff1681565b6100a3600254600090819081908190819060ff166001146104fb57610002565b61021760025460009060ff168114156110bb5750600161014f565b6100a36004356002805460ff16146104a857610002565b61021760125461014f565b60408051918252519081900360200190f35b60098054600160a060020a03199081169093179055600a80549092161790556002805460ff19908116909155601580549091166001179055565b670de0b6b3a764000034101561027857610002565b6002805460ff1916600190811790915560408051608081018252438082526020820186905291810184905233606091909101819052601191909155601284905560138054600160a060020a03199081168517909155601480549091169091179055600b805491820180825590919082818380158290116103115760030281600302836000526020600020918201910161031191906103c6565b50505060009283525060408051602080852060608301845233808452349284018390529290930194909452600392909202018054600160a060020a031916909117815560018101829055600201805460ff191690556004805490910190555050565b604051601454600160a060020a031690600090670de0b6b3a76400009082818181858883f150505050505b600b80546000808355919091526105f0906003026000805160206110e3833981519152908101905b808211156103f8578054600160a060020a0319168155600060018201908155600291909101805460ff191690556103c6565b5090565b600b80546001810180835582818380158290116104325760030281600302836000526020600020918201910161043291906103c6565b5050509190906000526020600020906003020160005060408051606081018252338082523460208301819052919092018590528254600160a060020a03191690911782556001820155600201805460ff19168317905550801561049c5760038054340190556104a5565b60048054340190555b50565b6040805160608101825234815260208181018481526000838501818152600160a060020a0333168252600c9093529390932091518255915160018201556002018054915160ff1990921691909117905550565b601154436003909101111561050f57610002565b60045461271090118015610527575060035461c35090115b15610541576002805460ff191681179055436007556105fc565b600454600354901115610603576004546003546000805460ff19166001178155600b54439850919092019550935091505b8282101561037357600b805483908110156100025760009182526003026000805160206110e3833981519152019050600281015490915060ff16156105e45760405160035482546001840154600160a060020a039190911692600092918802919091049082818181858883f150505050505b60019190910190610572565b50600060038190556004555b5050505050565b600454600354600b54910194509250600091505b8282101561039e57600b805483908110156100025760009182526003026000805160206110e3833981519152019050600281015490915060ff16156106895760405160035482546001840154600160a060020a039190911692600092918802919091049082818181858883f150505050505b60019190910190610617565b600a60009054906101000a9004600160a060020a0316600160a060020a0316636e9960c36040518160e060020a0281526004018090506020604051808303816000876161da5a03f11561000257505060405151600160a060020a03908116339091161490506107295750600160a060020a0333166000908152600c60205260409020600281015460ff161561075457610002565b50600160a060020a0333166000908152600c60205260409020600281015460ff161561088857610002565b6040805160f860020a8502815260018181018590529151908190036021019020908201541461078257610002565b8215610796576005805482540190556107a2565b80546006805490910190555b600d80546001810180835582818380158290116107d8576003028160030283600052602060002091820191016107d891906103c6565b505050919090600052602060002090600302016000506040805160608101825233808252855460208301819052919092018790528254600160a060020a03191690911782556001820155600201805460ff19168517905550610883565b80546006805490910190555b604080516060810182523380825283546020830181905291909201859052600e8054600160a060020a031916909217909155600f556010805460ff1916841790555b505050565b6040805160f860020a850281526001818101859052915190819003602101902090820154146108b657610002565b821561083557600580548254019055610841565b43614e206008600050540111156108e057610883565b60045460035411156108f557600192506108fa565b600092505b60009150826001148015610913575060105460ff166001145b15610a38575050600d546000905b80821015610ae457600d80548390811015610002576000919091527fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb76003909102015460ff1615610c3f57600d805483908110156100025760009182526003026000805160206110c38339815191520190506004549054600d8054600554600160a060020a03939093169360009360029391929091908890811015610002579085526003026000805160206110c383398151915201845060010160005054040204600d60005085815481101561000257604051600391909102600080516020611103833981519152015490920191905082818181858883f1935050505050610cab565b6000805461ff001916610100179055436001555b60105460ff168314610cdf5750506000805460ff19166001178155600b545b80821015610e1d57600b80548390811015610002575080546000828152600385026000805160206110e38339815191520154600160a060020a03169290918590811015610002575050604051600385027f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dba01549082818181858883f1505050505060019190910190610a57565b600354600e54600554600f54604051600160a060020a03939093169360009360029390920402919091049082818181858883f15050600b5491945090925050505b80821015610a2457600b80548390811015610002576000919091526003027f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbb015460ff1615610c3357600b805483908110156100025760009182526003026000805160206110e3833981519152019050600b80549154600160a060020a031691600091908590811015610002579082526003026000805160206110e3833981519152018150600b80546004546003546001949094015493926002928990811015610002576040516003919091027f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dba01549092029290920492909204909201915082818181858883f150505050505b60019190910190610b25565b600d8054839081101561000257600082815260039091026000805160206110c383398151915201548254600160a060020a03919091169290859081101561000257600080516020611103833981519152600391909102015460405190915082818181858883f150505050505b60019190910190610921565b600e54600f54604051600160a060020a0392909216916000919082818181858883f150505050505b826000148015610cf4575060105460ff166000145b156110a45750506000805460ff19166001178155600d545b80821015610ecb57600d80548390811015610002576000919091527fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb76003909102015460ff16151561102c57600d805483908110156100025760009182526003026000805160206110c383398151915201905054600d8054600160a060020a039290921691600091908590811015610002579082526003026000805160206110c3833981519152018150600101600050546006600050546002600360005054600d6000508881548110156100025760009182526003026000805160206110c38339815191520190506001016000505402040401604051809050600060405180830381858888f1935050505050611098565b604051601454600160a060020a031690600090670de0b6b3a76400009082818181858883f15050600d5491945090925050505b80821015610cb757600d80548390811015610002575080546000828152600385026000805160206110c38339815191520154600160a060020a031692909185908110156100025750506040516003850260008051602061110383398151915201549082818181858883f1505050505060019190910190610e50565b600354600e54600554600f54604051600160a060020a03939093169360009360029390920402919091049082818181858883f15050600b5491945090925050505b808210156110a457600b80548390811015610002576000919091526003027f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbb015460ff16151561102057600b805483908110156100025760009182526003026000805160206110e3833981519152019050600b80549154600160a060020a031691600091908590811015610002579082526003026000805160206110e3833981519152018150600101600050546004600050546002600360005054600b600050888154811015610002576040516003919091027f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dba01549092029290920492909204909201915082818181858883f150505050505b60019190910190610f0c565b600d8054839081101561000257600082815260039091026000805160206110c383398151915201548254600160a060020a03919091169290859081101561000257600080516020611103833981519152600391909102015460405190915082818181858883f150505050505b60019190910190610d0c565b60006003819055600455505050565b50600161014f565b50600061014f56d7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb50175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db9d7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb6",
    address: "0xb627a80404b98ea80cdd09e529add851b0909803",
    generated_with: "2.0.6",
    contract_name: "OracleWorking"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("OracleWorking error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("OracleWorking error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("OracleWorking error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("OracleWorking error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.OracleWorking = Contract;
  }

})();
