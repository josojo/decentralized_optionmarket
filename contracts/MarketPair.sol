import "PriceFeed.sol";
import "Marketplace.sol";
import "OracleWorking.sol";
import "Oracles.sol";

import "Admin.sol";
import "OracleInputs.sol";

contract MarketPair is PriceFeed{
	bool marketPairSet=false;

	function setMarketPair(address marketplaceadd, address oracleWorking_, string name2, address adminContract_, address oraclesAdd){
		if(marketPairSet)throw;
		marketplace=Marketplace(marketplaceadd);
		oracleWorking = OracleWorking(oracleWorking_);
		adminContract=adminContract_;
		name=name2;
		oracles=Oracles(oraclesAdd);
		marketPairSet=true;
	}
	////////////////////////////////////////////////////////////////////////////

	event test(uint name);
	address[] optionPuts;
	address[] optionCalls;


	modifier onlyIsAdmin(address own) { if (own != Admin(adminContract).getAdmin()) throw; _ }


	function listOptionPuts()  constant returns (address[]){
test(6);
		return optionPuts;
	}
	function listOptionCalls()  constant returns (address[]){
		return optionCalls;
	}

	function addOptionPut(address add) onlyIsAdmin(msg.sender){
		optionPuts.push(add);
	}
	function addOptionCall(address add) onlyIsAdmin(msg.sender){
		optionCalls.push(add);
	}

	function delOptionPut(uint ind) onlyIsAdmin(msg.sender){
		delete optionPuts[ind];
	}
	function delOptionCall(uint ind) onlyIsAdmin(msg.sender){
		delete optionCalls[ind];
	}

}
