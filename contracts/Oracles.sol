import "Marketplace.sol";
contract Oracles{

	address marketplace;
	address adminContract;
	address admin;
	//Oracleserver
	struct OracleServer
    {
        string apiUrl; // apiUrl for seeing if oracle is working
		bytes32 hash; // hash of image attached
		string imagineAttachedTime; //
		address oracleAddress; /// private address, inputs from oracle must come in here
    }
	OracleServer[] public oracles;
 bool oraclesSet=false;
	function setOracles(address marketplace_, address adminContract_){
	if(oraclesSet)throw;
		marketplace=marketplace_;
		Marketplace m=Marketplace(marketplace_);
		adminContract=adminContract_;
		oraclesSet=true;

	}

	function updateAdmin(){
		Marketplace m=Marketplace(marketplace);
		adminContract=m.getAdminContractAddress();
		admin=Admin(adminContract);
	}
	modifier onlyIsAdmin(address own) { if (own !=admin ) throw; _ }

	function IsOracle(address own) constant returns (bool){
		uint i=0;
		for( i=0;i<oracles.length;i++){
			if (own == oracles[i].oracleAddress) return true;
		}
		return false;
	}
	function addOracle(string url, bytes32 hashimage, string time, address oracleAddress_) onlyIsAdmin(msg.sender){
		oracles.push(OracleServer({
			apiUrl: url, // apiUrl for seeing if oracle is working
			hash: hashimage, // hash of image attached
			imagineAttachedTime:time,
			oracleAddress:oracleAddress_
		}));
	}
	function getOracleInputAddress(uint index) constant returns (address){
		return oracles[index].oracleAddress;
	}

	function deleteOracle(uint index) onlyIsAdmin(msg.sender){
	  delete oracles[index];
	}

	function countOracles() constant returns (uint){
	  return oracles.length;
	}
}
